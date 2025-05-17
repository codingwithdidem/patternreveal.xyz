"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type PasswordFormState = {
  error: string | null;
  success?: boolean;
  redirectUrl?: string;
};

export async function verifyPassword(
  prevState: PasswordFormState,
  formData: FormData
): Promise<PasswordFormState> {
  const password = formData.get("password") as string;
  const reportId = formData.get("reportId") as string;

  if (!password || !reportId) {
    return {
      error: "Please provide a password"
    };
  }

  try {
    const report = await prisma.report.findUnique({
      where: { id: reportId },
      select: { password: true }
    });

    if (!report?.password) {
      return {
        error: "Report not found or not password protected"
      };
    }

    const isValid = report.password === password;

    if (!isValid) {
      return {
        error: "Invalid password"
      };
    }

    // Set a cookie to remember the password
    const cookieStore = await cookies();
    await cookieStore.set(`report_password_${reportId}`, password, {
      path: `/share/${reportId}`,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax"
    });

    revalidatePath(`/share/${reportId}`);

    // Instead of redirecting directly, return the redirect URL
    return {
      error: null,
      success: true,
      redirectUrl: `/share/${reportId}`
    };
  } catch (error) {
    console.error("Error verifying password:", error);
    return {
      error: "An error occurred while verifying the password"
    };
  }
}
