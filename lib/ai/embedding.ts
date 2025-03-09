import { PrismaVectorStore } from "@langchain/community/vectorstores/prisma";
import { Prisma, type Embedding } from "@prisma/client";
import prisma from "../prisma";
import { OpenAIEmbeddings } from "@langchain/openai";

const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
  model: "text-embedding-ada-002"
});

const generateChunks = (input: string): string[] => {
  return input
    .trim()
    .split(".")
    .filter((i) => i !== "");
};

export const generateEmbedding = async (value: string): Promise<number[]> => {
  const input = value.replaceAll("\\n", " ");
  const embedding = await embeddings.embedQuery(input);
  return embedding;
};

export const findRelevantContent = async (userQuery: string) => {
  const userQueryEmbedded = await generateEmbedding(userQuery);

  const vectorStore = PrismaVectorStore.withModel<Embedding>(prisma).create(
    embeddings,
    {
      prisma: Prisma,
      tableName: "Embedding",
      vectorColumnName: "embedding",
      columns: {
        id: PrismaVectorStore.IdColumn,
        content: PrismaVectorStore.ContentColumn
      }
    }
  );

  const results = await vectorStore.similaritySearchVectorWithScore(
    userQueryEmbedded,
    1
  );

  return results.map((result) => {
    console.log({
      content: result[0].pageContent,
      similarity: result[1]
    });
    return {
      content: result[0].pageContent,
      similarity: result[1]
    };
  });
};
