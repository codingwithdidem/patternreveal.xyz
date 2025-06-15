import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function PublicReportPage({ params }: PageProps) {
  const { id } = await params;
  const report = await prisma.reflection.findUnique({
    where: {
      id: id
    },
    include: {
      analysisReport: true,
      user: true
    }
  });

  if (!report) {
    notFound();
  }

  return <div>{report?.title}</div>;
}
