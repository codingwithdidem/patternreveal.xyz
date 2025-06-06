"use client";

import { useEditorStore } from "@/lib/store/useEditorStore";
import { useEditor, EditorContent } from "@tiptap/react";
import type { Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Underline from "@tiptap/extension-underline";
import CharacterCount from "@tiptap/extension-character-count";
import TextStyle from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import { Color } from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import { FontFamily } from "@tiptap/extension-font-family";
import { cx } from "class-variance-authority";

type TiptapProps = {
  content: string;
  saveStatus: string;
  charsCount: number;
  onContentUpdate: (editor: Editor) => void;
  className?: string;
};
const Tiptap = ({
  content,
  onContentUpdate,
  saveStatus,
  charsCount,
  className
}: TiptapProps) => {
  const { setEditor } = useEditorStore();

  const editor = useEditor({
    immediatelyRender: true,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6]
        },
        bulletList: {
          HTMLAttributes: {
            class: cx("list-disc list-outside leading-3 -mt-2")
          }
        },
        orderedList: {
          HTMLAttributes: {
            class: cx("list-decimal list-outside leading-3 -mt-2")
          }
        }
      }),
      TaskList.configure({
        HTMLAttributes: {
          class: cx("not-prose pl-2")
        }
      }),
      TaskItem.configure({
        nested: true,
        HTMLAttributes: {
          class: cx("flex gap-2 items-start my-2")
        }
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"]
      }),
      CharacterCount,
      Placeholder.configure({
        placeholder: `
        A Normal Morning, Ruined Again

I woke up feeling cautiously optimistic today. The sun was shining through the curtains, and I thought maybe today would be a good day. I decided to make breakfast for both of us—his favorite—hoping it would set a nice tone.

When he walked into the kitchen, he didn’t even say good morning. He just looked at the eggs on the plate and muttered, “Why do you always overcook them?” His tone wasn’t loud, but it hit me like a punch.

I apologized quietly, though I didn’t think they were overcooked. He just rolled his eyes and sat down at the table, scrolling on his phone. I tried to sit across from him and make small talk, but he barely responded, only grunting or giving one-word answers.

After breakfast, I asked him if he’d help me move the boxes in the garage like we talked about last week. His face instantly darkened, and he snapped, “Can you just stop nagging me? I’ll do it when I feel like it. God, you’re so controlling.”

I didn’t say anything after that. I just nodded and quietly walked away. My chest felt tight, and I could feel the tears starting to well up, but I didn’t want to cry in front of him. He always makes fun of me when I cry, calling me “overly sensitive” or “dramatic.”

The rest of the day, he barely spoke to me, except to ask where his clean socks were. I tried to tell myself it wasn’t that bad. Maybe he’s just stressed, or maybe I really do nag him too much. But deep down, I know this isn’t how it’s supposed to feel.

It’s like I’m walking on eggshells every moment we’re together, trying not to do or say something that will set him off. And yet, no matter how hard I try, it’s never good enough.

By the time I went to bed, I felt invisible. Like I’m not even a person to him—just someone who’s there to serve his needs and absorb his anger.
        `,
        includeChildren: true
      }),
      FontFamily,
      TextStyle,
      Underline,
      Color,
      Highlight.configure({
        multicolor: true
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        protocols: ["http", "https"],
        isAllowedUri: (url, ctx) => {
          try {
            // construct URL
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`${ctx.defaultProtocol}://${url}`);

            // use default validation
            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false;
            }

            // disallowed protocols
            const disallowedProtocols = ["ftp", "file", "mailto"];
            const protocol = parsedUrl.protocol.replace(":", "");

            if (disallowedProtocols.includes(protocol)) {
              return false;
            }

            // only allow protocols specified in ctx.protocols
            const allowedProtocols = ctx.protocols.map((p) =>
              typeof p === "string" ? p : p.scheme
            );

            if (!allowedProtocols.includes(protocol)) {
              return false;
            }

            // disallowed domains
            const disallowedDomains = [
              "example-phishing.com",
              "malicious-site.net"
            ];
            const domain = parsedUrl.hostname;

            if (disallowedDomains.includes(domain)) {
              return false;
            }

            // all checks have passed
            return true;
          } catch {
            return false;
          }
        },
        HTMLAttributes: {
          class: cx(
            "text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer"
          )
        }
      })
    ],
    content: content
      ? JSON.parse(content)
      : {
          type: "doc",
          content: [
            {
              type: "paragraph"
            }
          ]
        },
    autofocus: true,
    editorProps: {
      attributes: {
        style: "padding-left: 56px; padding-right: 56px;",
        class:
          "prose prose-pink prose-sm sm:prose-base focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] min-w-[816px] pt-10 pr-14 pb-10 cursor-text selection:bg-gray-950 selection:text-white bg-[url('https://s.ytimg.com/yt/imgbin/www-refreshbg-vflC3wnbM.png')]"
      }
    },
    onCreate: ({ editor }) => {
      setEditor(editor);
    },
    onDestroy: () => {
      setEditor(null);
    },
    onUpdate: ({ editor }) => {
      onContentUpdate(editor);
      setEditor(editor);
    },
    onSelectionUpdate: ({ editor }) => {
      setEditor(editor);
    },
    onTransaction: ({ editor }) => {
      setEditor(editor);
    },
    onFocus: ({ editor }) => {
      setEditor(editor);
    },
    onBlur: ({ editor }) => {
      setEditor(editor);
    },
    onContentError: ({ editor }) => {
      setEditor(editor);
    }
  });

  return (
    <div className="size-full overflow-x-auto w-full font-[family-name:var(--font-satoshi) rounded-md print:p-0 print:bg-white print:overflow-visible">
      <div
        className={cx(
          "relative flex justify-center w-full print:py-0 print:w-full print:min-w-0 mx-auto",
          className
        )}
      >
        <div className="flex absolute right-8 top-6 z-10 mb-5 gap-2">
          <div className="rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground">
            {saveStatus}
          </div>
          <div
            className={
              charsCount
                ? "rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground"
                : "hidden"
            }
          >
            {charsCount} Words
          </div>
        </div>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Tiptap;
