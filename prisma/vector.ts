import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createPgVectorExtension() {
  await prisma.$executeRawUnsafe(`
    CREATE EXTENSION IF NOT EXISTS vector;
  `);
  console.log("pgvector extension created!");
}

// Call the function
createPgVectorExtension()
  .catch((e) => {
    console.error("Error:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
