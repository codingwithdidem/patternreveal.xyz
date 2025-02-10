-- AddForeignKey
ALTER TABLE "Embedding" ADD CONSTRAINT "Embedding_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;


CREATE INDEX "embeddingIndex" ON "Embedding"
USING hnsw ("embedding" vector_cosine_ops);