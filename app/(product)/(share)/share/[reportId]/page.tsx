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
  const report = await getSharedReport({ reportId });

  if (!report?.linkId) {
    return;
  }

  return constructMetadata({
    title: `Shared report for ${report.reflection.title}`,
    noIndex: !report.index
  });
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
