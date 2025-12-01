import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import prisma from "@/lib/prisma";
import type { PutBlobResult } from "@vercel/blob";
import { PrismaVectorStore } from "@langchain/community/vectorstores/prisma";
import { Prisma } from "@prisma/client";
import type { Embedding } from "@prisma/client";

const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
  model: "text-embedding-ada-002",
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
  console.log("Text ", text);
  const loader = new TextLoader(new Blob([text]));
  return loader.load();
}

async function processDocument(blob: PutBlobResult) {
  try {
    console.log("Processing document ", blob);
    // Load document based on file type
    const docs = await loadDocument(
      blob.url,
      blob.pathname.endsWith(".pdf") ? "pdf" : "txt"
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

    await vectorStore.addModels(
      await prisma.$transaction(
        chunks.map((chunk) =>
          prisma.embedding.create({
            data: {
              resourceId: resource.id,
              content: chunk.pageContent,
            },
          })
        )
      )
    );

    console.log(`Processing completed for document: ${blob.url}`);
  } catch (error) {
    console.error("Error processing document:", error);
    throw error;
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  console.log("body", body);
  console.log("token", process.env.BLOB_READ_WRITE_TOKEN);

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      token: process.env.BLOB_READ_WRITE_TOKEN,
      onBeforeGenerateToken: async (pathname) => {
        return {
          allowedContentTypes: ["application/pdf", "text/plain"],
        };
      },
      onUploadCompleted: async ({ blob }) => {
        // Called by Vercel API on client upload completion
        // Use tools like ngrok if you want this to work locally
        console.log("blob uploaded", blob);
        await processDocument(blob);
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
