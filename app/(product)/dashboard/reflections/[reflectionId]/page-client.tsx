"use client";

import Tiptap from "@/components/editor/Tiptap";
import Toolbar from "@/components/editor/Toolbar";
import useReflection from "@/lib/swr/use-reflection";
import { useParams } from "next/navigation";
import type { Editor } from "@tiptap/react";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { mutate } from "swr";

export default function ReflectionEditorClientPage() {
  const params = useParams() as { reflectionId: string };
  const { reflection, isLoading, error } = useReflection(params.reflectionId);

  const [saveStatus, setSaveStatus] = useState("Saved");
  const [charsCount, setCharsCount] = useState(0);

  const debouncedUpdates = useDebouncedCallback(async (editor: Editor) => {
    const json = editor.getJSON();
    setCharsCount(editor.storage.characterCount.words());
    setSaveStatus("Saving...");

    try {
      await fetch(`/api/reflections/${params.reflectionId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          content: json
        })
      });

      setSaveStatus("Saved");
      mutate(`/api/reflections/${params.reflectionId}`);
    } catch (error) {
      setSaveStatus("Failed to save");
    }
  }, 500);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!reflection || error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="h-full w-full grid grid-cols-7">
      <div className="col-span-5">
        <Toolbar />
        <Tiptap
          saveStatus={saveStatus}
          charsCount={charsCount}
          content={reflection.content}
          onContentUpdate={debouncedUpdates}
        />
      </div>
      <div className="col-span-2">menu</div>
    </div>
  );
}
