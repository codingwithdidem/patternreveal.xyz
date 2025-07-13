import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashToken } from "@/lib/auth/hash-token";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { encode } from "next-auth/jwt";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const callbackUrl = searchParams.get("callbackUrl");

  if (!token || !email || !callbackUrl) {
    return NextResponse.redirect(
      new URL("/login?error=invalid-invite", request.url)
    );
  }

  try {
    // Hash the token to match what's stored in the database
    const hashedToken = await hashToken(token, { secret: true });

    // Find the verification token in the database
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        identifier: email,
        token: hashedToken,
        expires: {
          gt: new Date()
        }
      }
    });

    if (!verificationToken) {
      return NextResponse.redirect(
        new URL("/login?error=invalid-or-expired-invite", request.url)
      );
    }

    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { email }
    });

    // If user doesn't exist, create one
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          emailVerified: new Date(),
          // You might want to set a default name or get it from somewhere
          name: email.split("@")[0]
        }
      });
    } else if (!user.emailVerified) {
      // If user exists but email is not verified, verify it
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      });
    }

    // Clean up the verification token
    await prisma.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: email,
          token: hashedToken
        }
      }
    });

    // Check if user is already logged in
    const session = await getServerSession(authOptions);

    if (session?.user?.email === email) {
      // User is already logged in, redirect to the callback URL
      return NextResponse.redirect(new URL(callbackUrl, request.url));
    }

    // Create a session for the user
    const sessionToken = await encode({
      token: {
        sub: user.id,
        name: user.name,
        email: user.email,
        picture: user.image,
        defaultWorkspace: user.defaultWorkspace
      },
      secret: process.env.NEXTAUTH_SECRET || "",
      maxAge: 30 * 24 * 60 * 60 // 30 days
    });

    // Create session in database
    const sessionExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
    await prisma.session.create({
      data: {
        sessionToken,
        userId: user.id,
        expires: sessionExpiry
      }
    });

    // Set the session cookie and redirect
    const response = NextResponse.redirect(new URL(callbackUrl, request.url));
    response.cookies.set("next-auth.session-token", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
      sameSite: "lax"
    });

    return response;
  } catch (error) {
    console.error("Error in email callback:", error);
    return NextResponse.redirect(
      new URL("/login?error=invite-processing-error", request.url)
    );
  }
}
