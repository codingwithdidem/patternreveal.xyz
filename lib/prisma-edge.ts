import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const connectionString = process.env.DATABASE_URL;

const adapter = new PrismaNeon({
  connectionString
});

export const prismaEdge = new PrismaClient({
  adapter,
  log: ["query", "info", "warn", "error"]
});
