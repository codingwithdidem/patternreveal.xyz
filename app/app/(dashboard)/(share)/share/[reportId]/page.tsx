import { PasswordForm } from "@/components/reports/PasswordForm";
import { getSharedReport } from "@/lib/reports/get-shared-report";
import { constructMetadata } from "@/utils/functions/construct-metadata";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params
}: { params: Promise<{ reportId: string }> }) {
  const { reportId } = await params;

  try {
    const report = await getSharedReport({ reportId });

    if (!report?.linkId) {
      return constructMetadata({
        title: "Shared Report Not Found - PatternReveal",
        description:
          "The requested shared relationship analysis report could not be found or may have been removed.",
        noIndex: true
      });
    }

    const isPasswordProtected = !!report.password;

    return constructMetadata({
      title: `Shared Analysis: ${report.reflection.title}`,
      description: `A shared relationship pattern analysis. ${isPasswordProtected ? "Password-protected " : ""}Insights into relationship dynamics and emotional patterns from PatternReveal.xyz.`,
      image: "/images/example-report.png",
      noIndex: !report.index
    });
  } catch (error) {
    return constructMetadata({
      title: "Shared Relationship Analysis - PatternReveal",
      description:
        "A shared relationship pattern analysis report with AI-powered insights and expert guidance.",
      noIndex: true
    });
  }
}

export default async function ShareReportPage({
  params
}: { params: Promise<{ reportId: string }> }) {
  const { reportId } = await params;
  const report = await getSharedReport({ reportId });
  const cookieStore = await cookies();
  const cookiePassword = cookieStore.get(`report_password_${reportId}`)?.value;

  if (!report?.linkId) {
    notFound();
  }

  // The report is password protected
  if (report.password && report.password !== cookiePassword) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
        <div className=" flex flex-col gap-4 rounded-lg border border-gray-200 p-4">
          <PasswordForm />
        </div>
      </div>
    );
  }

  return <div className="">ShareReportPage</div>;
}
