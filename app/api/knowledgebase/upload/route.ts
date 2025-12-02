import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { queueDocumentProcessing } from "@/lib/api/knowledgebase";

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  console.log("body", body);
  console.log("token", process.env.BLOB_VERCEL_READ_WRITE_TOKEN);

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      token: process.env.BLOB_VERCEL_READ_WRITE_TOKEN,
      onBeforeGenerateToken: async () => {
        return {
          allowedContentTypes: ["application/pdf", "text/plain"],
        };
      },
      onUploadCompleted: async ({ blob }) => {
        // Called by Vercel API on client upload completion
        // Queue background processing via QStash instead of processing inline
        console.log("blob uploaded, queueing for processing:", blob);
        await queueDocumentProcessing({
          blobUrl: blob.url,
          pathname: blob.pathname,
        });
      },
    });

    console.log("jsonResponse", jsonResponse);
    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error("Error uploading document:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
