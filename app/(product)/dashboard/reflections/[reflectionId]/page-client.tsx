"use client";

import Tiptap from "@/components/editor/Tiptap";
import Toolbar from "@/components/editor/Toolbar";
import useReflection from "@/lib/swr/use-reflection";
import { useParams } from "next/navigation";
import type { Editor } from "@tiptap/react";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { mutate } from "swr";
import ReflectionsMenuBar from "@/components/reflections/ReflectionsMenuBar";
import { useChat } from "ai/react";

export default function ReflectionEditorClientPage() {
  const params = useParams() as { reflectionId: string };
  const { reflection, isLoading, error } = useReflection(params.reflectionId);
  const { messages, input, handleInputChange, handleSubmit } = useChat();

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
    <div className="h-full w-full p-2">
      <ReflectionsMenuBar reflection={reflection} />
      <div className="grid grid-cols-7 pl-2">
        <div className="col-span-5">
          <Toolbar />
          <Tiptap
            saveStatus={saveStatus}
            charsCount={charsCount}
            content={reflection.content}
            onContentUpdate={debouncedUpdates}
          />
        </div>
        <div className="col-span-2">
          <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
            <div className="space-y-4">
              {messages.map((m) => (
                <div key={m.id} className="whitespace-pre-wrap">
                  <div>
                    <div className="font-bold">{m.role}</div>
                    <p>{m.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              <input
                className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
                value={input}
                placeholder="Say something..."
                onChange={handleInputChange}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
