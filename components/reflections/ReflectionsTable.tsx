import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import type { Prisma, Reflection } from "@prisma/client";
import { FileIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import ReflectionsActionMenu from "./ReflectionsActionMenu";

type ReflectionsTableProps = {
  reflections: Prisma.ReflectionGetPayload<{
    include: {
      analysisReport: true;
    };
  }>[];
};

export default function ReflectionsTable({
  reflections
}: ReflectionsTableProps) {
  const router = useRouter();

  const onRowClick = (reflectionId: string) => {
    router.push(`/reports/${reflectionId}`);
  };

  const onOpenInNewTabClick = (reflectionId: string) => {
    window.open(`/reports/${reflectionId}`, "_blank");
  };

  return (
    <Table>
      <TableCaption>A list of your recent reflections.</TableCaption>
      <TableHeader>
        <TableRow className="hover:bg-transparent border-none">
          <TableHead>Name</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead className="text-right">{""}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reflections.map((reflection) => (
          <TableRow
            key={reflection.id}
            onClick={() => onRowClick(reflection.id)}
            className="cursor-pointer"
          >
            <TableCell className="flex items-center gap-2">
              <FileIcon className="w-6" />
              {reflection.title}
            </TableCell>
            <TableCell>
              {format(new Date(reflection.createdAt), "MMM dd, yyyy")}
            </TableCell>
            <TableCell className="text-right">
              <ReflectionsActionMenu
                reflectionTitle={reflection.title}
                reflectionId={reflection.id}
                onOpenInNewTabClick={() => onOpenInNewTabClick(reflection.id)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
