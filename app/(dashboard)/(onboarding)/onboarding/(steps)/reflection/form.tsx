"use client";

import Tiptap from "@/components/editor/Tiptap";
import Toolbar from "@/components/editor/Toolbar";
import type { Editor } from "@tiptap/react";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { mutate } from "swr";

type CreateReflectionFormProps = {
  reflectionId: string;
};

export default function CreateReflectionForm({
  reflectionId
}: CreateReflectionFormProps) {
  console.log("reflectionId", reflectionId);
  const [saveStatus, setSaveStatus] = useState("Saved");
  const [charsCount, setCharsCount] = useState(0);

  const debouncedUpdates = useDebouncedCallback(async (editor: Editor) => {
    const json = editor.getJSON();
    setCharsCount(editor.storage.characterCount.words());
    setSaveStatus("Saving...");

    try {
      await fetch(`/api/reflections/${reflectionId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          content: json
        })
      });

      setSaveStatus("Saved");
      mutate(`/api/reflections/${reflectionId}`);
    } catch (error) {
      setSaveStatus("Failed to save");
    }
  }, 500);

  return (
    <div className="w-full h-[400px] flex flex-col items-center justify-center gap-4">
      <Toolbar className="bg-black" />
      <Tiptap
        saveStatus={saveStatus}
        charsCount={charsCount}
        onContentUpdate={debouncedUpdates}
        content={""}
        className="w-full h-full rounded-lg bg-white"
      />
    </div>
  );
}
