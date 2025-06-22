import { getServerSession } from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { sendEmail } from "@/emails/send";
import { LoginLink } from "@/emails/login-link";
import prisma from "@/lib/prisma";
import { validatePassword } from "./password";
import { User } from "@prisma/client";
import { UserProps } from "../types";
import { ratelimit } from "../upstash/ratelimit";
import {
  exceededLoginAttemptsThreshold,
  incrementLoginAttempts,
  isAccountLocked
} from "./lock-account";
import StripeWelcomeEmail from "@/emails/stripe-welcome";
import { waitUntil } from "@vercel/functions";
import { createContact } from "../resend/create-contact";

export const authOptions: NextAuthOptions = {
  providers: [
    // EmailProvider({
    //   sendVerificationRequest({ identifier, url }) {
    //     console.log("sendVerificationRequest", identifier, url);
    //     if (process.env.NODE_ENV === "development") {
    //       console.log(`Login Link ${url}`);
    //     } else {
    //       // Send verification email
    //       sendEmail({
    //         email: identifier,
    //         subject: "Sign in to your account",
    //         react: LoginLink({ url, email: identifier })
    //       });
    //     }
    //   }onboarding@resend.dev
    // }),
    CredentialsProvider({
      id: "credentials",
      name: "patternreveal.xyz",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("no-credentials");
        }

        const { email, password } = credentials;

        const { success } = await ratelimit(3, "1 m").limit(
          `login-attempts:${email}`
        );

        if (!success) {
          throw new Error("too-many-login-attempts");
        }

        const user = await prisma.user.findUnique({
          where: { email },
          select: {
            id: true,
            email: true,
            password: true,
            name: true,
            image: true,
            invalidLoginAttempts: true,
            emailVerified: true,
            lockedAt: true
          }
        });

        if (!user || !user.password) {
          throw new Error("invalid-credentials");
        }

        if (exceededLoginAttemptsThreshold(user)) {
          throw new Error("exceeded-login-attempts");
        }

        const passwordMatch = await validatePassword(password, user.password);

        if (!passwordMatch) {
          const exceededLoginAttempts = exceededLoginAttemptsThreshold(
            await incrementLoginAttempts(user)
          );

          if (exceededLoginAttempts) {
            throw new Error("exceeded-login-attempts");
          }

          throw new Error("invalid-credentials");
        }

        if (!user.emailVerified) {
          throw new Error("email-not-verified");
        }

        // Reset the login attempts
        await prisma.user.update({
          where: { id: user.id },
          data: { invalidLoginAttempts: 0 }
        });

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image
        };
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
      profile(profile, tokens) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture
        };
      },
      style: { logo: "/google.svg", bg: "#fff", text: "#000" }
    })
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login",
    error: "/login"
  },
  callbacks: {
    signIn: async ({ user, account, profile }) => {
      if (!user.email) {
        return false;
      }

      const dbUser = await prisma.user.findUnique({
        where: { email: user.email },
        select: { lockedAt: true }
      });

      if (dbUser?.lockedAt) {
        return false;
      }

      if (account?.provider === "google") {
        const userExists = await prisma.user.findUnique({
          where: { email: user.email },
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        });

        if (!userExists || !profile) return true;

        // update the user's name and image
        if (userExists && profile) {
          const userAlreadyHasImage = userExists.image;

          const updatedUser = await prisma.user.update({
            where: { email: user.email },
            data: {
              ...(userExists.name ? {} : { name: profile.name }),
              ...(userAlreadyHasImage ? {} : { image: profile["picture"] })
            }
          });

          return true;
        }
      }

      return true;
    },
    jwt: async ({ token, user, trigger }) => {
      const refreshedUser = await prisma.user.findUnique({
        where: { id: token.sub },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          createdAt: true,
          defaultWorkspace: true
        }
      });
      if (user) {
        console.log("user", user);
        token.user = {
          ...user,
          defaultWorkspace: refreshedUser?.defaultWorkspace,
          createdAt: refreshedUser?.createdAt.toISOString()
        };
      }

      // refresh the user's data if they update their name / email
      if (trigger === "update") {
        const refreshedUser = await prisma.user.findUnique({
          where: { id: token.sub },
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            createdAt: true
          }
        });
        if (refreshedUser) {
          token.user = refreshedUser;
        } else {
          return {};
        }
      }

      return token;
    },
    session: async ({ session, token }) => {
      session.user = {
        id: token.sub,
        // @ts-ignore
        ...(token || session).user
      };

      return session;
    }
  },
  events: {
    async signIn(message) {
      if (message.isNewUser) {
        const user = await prisma.user.findUnique({
          where: { id: message.user.id }
        });

        if (!user) return;
        //  TODO: Check if user is really new

        waitUntil(
          Promise.allSettled([
            createContact({
              email: user.email,
              name: user.name ?? ""
            }),
            sendEmail({
              email: user.email,
              subject: "Welcome to patternreveal.xyz",
              react: StripeWelcomeEmail(),
              // Send the email 5 minutes from now
              scheduledAt: new Date(Date.now() + 5 * 60 * 1000).toISOString()
            })
          ])
        );
      }
    }
  }
};

export interface Session {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string;
    defaultWorkspace?: string;
  };
}

export const getSession = () =>
  getServerSession(authOptions) as Promise<{
    user: UserProps;
  }>;
