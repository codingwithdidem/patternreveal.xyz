"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";
import { useRef, useState } from "react";
import { constructMetadata } from "@/utils/functions/construct-metadata";

export const metadata = constructMetadata({
  title: "Upload Knowledge Base Documents - Admin",
  description:
    "Upload and manage training documents for PatternReveal's AI knowledge base. Add expert resources on relationship patterns and abuse recognition.",
  noIndex: true
});

export default function Home() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen gap-16 font-[family-name:var(--font-satoshi)]">
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          setIsUploading(true);

          try {
            if (!inputFileRef.current?.files) {
              throw new Error("No file selected");
            }

            const file = inputFileRef.current.files[0];
            const newBlob = await upload(
              `documents/${crypto.randomUUID()}/${file.name}`,
              file,
              {
                access: "public",
                handleUploadUrl: "/api/knowledgebase/upload"
              }
            );

            setBlob(newBlob);
          } catch (error) {
            console.error(error);
            alert(error instanceof Error ? error.message : "Upload failed");
          } finally {
            setIsUploading(false);
          }
        }}
      >
        <Input
          name="file"
          ref={inputFileRef}
          type="file"
          accept=".txt,.pdf"
          required
        />
        <Button type="submit" disabled={isUploading}>
          {isUploading ? "Uploading..." : "Upload"}
        </Button>
      </form>
      {blob && (
        <div>
          Document uploaded: <a href={blob.url}>{blob.url}</a>
        </div>
      )}
    </div>
  );
}
