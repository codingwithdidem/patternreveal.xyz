import { qstash } from "@/lib/cron";

export async function queueDocumentProcessing({
  blobUrl,
  pathname,
}: {
  blobUrl: string;
  pathname: string;
}) {
  return await qstash.publishJSON({
    url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/knowledgebase/process`,
    body: {
      blobUrl,
      pathname,
    },
  });
}
