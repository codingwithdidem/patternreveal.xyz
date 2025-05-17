import { getServerSession } from "next-auth";
import type { NextAuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

// import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { sendEmail } from "@/emails/send";
import { LoginLink } from "@/emails/login-link";
import prisma from "@/lib/prisma";
import { validatePassword } from "./password";
import { User } from "@prisma/client";
import { UserProps } from "../types";

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
    //   }
    // }),
    CredentialsProvider({
      id: "credentials",
      name: "Manipulated.io",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("authorize", credentials);
        if (!credentials?.email || !credentials?.password) {
          throw new Error("no-credentials");
        }

        const { email, password } = credentials;

        // TODO: Add rate limit for brute force attacks

        const user = await prisma.user.findUnique({
          where: { email },
          select: {
            id: true,
            email: true,
            password: true,
            name: true,
            emailVerified: true
          }
        });

        if (!user || !user.password) {
          throw new Error("invalid-credentials");
        }

        const passwordMatch = await validatePassword(password, user.password);

        if (!passwordMatch) {
          throw new Error("invalid-credentials");
        }

        // if (!user.emailVerified) {
        //   throw new Error("email-not-verified");
        // }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: ""
        };
      }
    })

    // TODO: Add more providers here
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    //   profile(profile) {
    //     return {
    //       // Return all the profile information you need.
    //       // The only truly required field is `id`
    //       // to be able identify the account when added to a database
    //     };
    //   }
    // })
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt"
  },
  callbacks: {
    jwt: async ({ token, user, trigger }) => {
      if (user) {
        token.user = user;
      }

      // refresh the user's data if they update their name / email
      if (trigger === "update") {
        const refreshedUser = await prisma.user.findUnique({
          where: { id: token.sub }
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
  }
};

export const getSession = () =>
  getServerSession(authOptions) as Promise<{
    user: UserProps;
  }>;
