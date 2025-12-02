import { NextResponse } from "next/server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import prisma from "@/lib/prisma";
import { PrismaVectorStore } from "@langchain/community/vectorstores/prisma";
import { Prisma } from "@prisma/client";
import type { Embedding } from "@prisma/client";
import { verifyQstashSignature } from "@/lib/cron/verify-qstash";
import { handleAndReturnErrorResponse } from "@/lib/api/errors";
import { z } from "zod";
import * as Sentry from "@sentry/nextjs";

export const dynamic = "force-dynamic";

// Allow up to 5 minutes for processing (QStash has its own timeout handling)
export const maxDuration = 300;

const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
  model: "text-embedding-ada-002",
});

const schema = z.object({
  blobUrl: z.string().url(),
  pathname: z.string(),
});

async function loadDocument(url: string, type: "pdf" | "txt") {
  console.log("Loading document ", url);
  const response = await fetch(url);
  const blob = await response.blob();

  if (type === "pdf") {
    const loader = new PDFLoader(blob, {
      splitPages: true,
    });
    return loader.load();
  }

  const text = await blob.text();
  const loader = new TextLoader(new Blob([text]));
  return loader.load();
}

// POST /api/knowledgebase/process - Called by QStash
export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    await verifyQstashSignature({ req, rawBody });

    const { blobUrl, pathname } = schema.parse(JSON.parse(rawBody));

    console.log("Processing document from QStash:", { blobUrl, pathname });

    // Load document based on file type
    const docs = await loadDocument(
      blobUrl,
      pathname.endsWith(".pdf") ? "pdf" : "txt"
    );

    console.log(`Loaded ${docs.length} document pages`);

    // Combine all document pages
    const fullText = docs.map((doc) => doc.pageContent).join("\n");

    // Create resource entry
    const resource = await prisma.resource.create({
      data: {
        content: fullText,
      },
    });

    // Split text into chunks
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const chunks = await splitter.splitDocuments(docs);

    console.log(`Split into ${chunks.length} chunks`);

    const vectorStore = PrismaVectorStore.withModel<Embedding>(prisma).create(
      embeddings,
      {
        prisma: Prisma,
        tableName: "Embedding",
        vectorColumnName: "embedding",
        columns: {
          id: PrismaVectorStore.IdColumn,
          content: PrismaVectorStore.ContentColumn,
        },
      }
    );

    // Process embeddings in batches to avoid memory issues
    const BATCH_SIZE = 10;
    for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
      const batch = chunks.slice(i, i + BATCH_SIZE);

      await vectorStore.addModels(
        await prisma.$transaction(
          batch.map((chunk) =>
            prisma.embedding.create({
              data: {
                resourceId: resource.id,
                content: chunk.pageContent,
              },
            })
          )
        )
      );

      console.log(
        `Processed batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(
          chunks.length / BATCH_SIZE
        )}`
      );
    }

    console.log(`Processing completed for document: ${blobUrl}`);

    return NextResponse.json({ success: true, resourceId: resource.id });
  } catch (error) {
    console.error("Error processing document:", error);
    Sentry.captureException(error);
    return handleAndReturnErrorResponse(error);
  }
}
