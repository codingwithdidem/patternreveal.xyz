"use client";

import type { Reflection } from "@prisma/client";
import { useRef, useState } from "react";
import { mutate } from "swr";
import { useDebouncedCallback } from "use-debounce";

type ReflectionTitleInputProps = {
  title: Reflection["title"];
  reflectionId: Reflection["id"];
};

export default function ReflectionTitleInput({
  title,
  reflectionId
}: ReflectionTitleInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(title);

  const debouncedUpdate = useDebouncedCallback(async (newTitle) => {
    try {
      const response = await fetch(`/api/reflections/${reflectionId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: newTitle
        })
      });

      if (response.ok) {
        mutate(`/api/reflections/${reflectionId}`);
      }
    } catch (error) {
      console.error(error);
    }
  }, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    debouncedUpdate(e.target.value);
  };

  return (
    <div>
      {isEditing ? (
        <form className="relative w-fit max-w-[50ch] bg-red-600">
          <span className="invisible whitespace-pre px-1.5 text-lg">
            {value || ""}
          </span>
          <input
            ref={inputRef}
            value={value}
            onChange={handleChange}
            onBlur={() => setIsEditing(false)}
            className="absolute inset-0 text-lg px-1.5 text-black bg-transparent truncate"
          />
        </form>
      ) : (
        <span
          onClick={() => {
            setIsEditing(true);
            setTimeout(() => inputRef.current?.focus(), 0); // Focus input after click
          }}
          onKeyUp={(e) => e.key === "Enter" && setIsEditing(true)}
          className="text-lg px-1.5 truncate cursor-pointer"
        >
          {title}
        </span>
      )}
    </div>
  );
}
