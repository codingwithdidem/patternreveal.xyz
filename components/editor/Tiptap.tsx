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
import type { TextEvidence } from "@/lib/zod/schemas/analysis";
import { useEffect } from "react";

type TiptapProps = {
  content: string;
  saveStatus: string;
  charsCount: number;
  onContentUpdate: (editor: Editor) => void;
  className?: string;
  textEvidence?: TextEvidence[];
};
const Tiptap = ({
  content,
  onContentUpdate,
  saveStatus,
  charsCount,
  className,
  textEvidence = []
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

When he walked into the kitchen, he didn't even say good morning. He just looked at the eggs on the plate and muttered, "Why do you always overcook them?" His tone wasn't loud, but it hit me like a punch.

I apologized quietly, though I didn't think they were overcooked. He just rolled his eyes and sat down at the table, scrolling on his phone. I tried to sit across from him and make small talk, but he barely responded, only grunting or giving one-word answers.

After breakfast, I asked him if he'd help me move the boxes in the garage like we talked about last week. His face instantly darkened, and he snapped, "Can you just stop nagging me? I'll do it when I feel like it. God, you're so controlling."

I didn't say anything after that. I just nodded and quietly walked away. My chest felt tight, and I could feel the tears starting to well up, but I didn't want to cry in front of him. He always makes fun of me when I cry, calling me "overly sensitive" or "dramatic."

The rest of the day, he barely spoke to me, except to ask where his clean socks were. I tried to tell myself it wasn't that bad. Maybe he's just stressed, or maybe I really do nag him too much. But deep down, I know this isn't how it's supposed to feel.

It's like I'm walking on eggshells every moment we're together, trying not to do or say something that will set him off. And yet, no matter how hard I try, it's never good enough.

By the time I went to bed, I felt invisible. Like I'm not even a person to him—just someone who's there to serve his needs and absorb his anger.
        `,
        includeChildren: true
      }),
      FontFamily,
      TextStyle,
      Underline,
      Color,
      Highlight.extend({
        addOptions() {
          return {
            multicolor: true,
            HTMLAttributes: {
              class: "evidence-highlight"
            }
          };
        },
        addAttributes() {
          return {
            ...this.parent?.(),
            dataAnalysis: {
              default: null,
              parseHTML: (element) => element.getAttribute("data-analysis"),
              renderHTML: (attributes) => {
                if (!attributes.dataAnalysis) {
                  return {};
                }
                return {
                  "data-analysis": attributes.dataAnalysis
                };
              }
            }
          };
        }
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
          "prose prose-pink prose-sm sm:prose-base focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col h-[1054px] overflow-y-auto scrollbar-hide min-w-[816px] pt-10 pr-14 pb-10 cursor-text selection:bg-gray-950 selection:text-white bg-[url('https://s.ytimg.com/yt/imgbin/www-refreshbg-vflC3wnbM.png')]"
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

  // Highlight text evidence when editor is ready and evidence changes
  useEffect(() => {
    if (!editor || !textEvidence.length) return;

    const editorText = editor.getText();

    // Clear existing highlights first
    editor.commands.unsetHighlight();

    // Apply highlights for each evidence
    for (const evidence of textEvidence) {
      const quote = evidence.quote.trim();
      const startIndex = editorText.indexOf(quote);

      if (startIndex !== -1) {
        const endIndex = startIndex + quote.length;

        // Create a highlight with blue background
        editor.commands.setTextSelection({
          from: startIndex + 1,
          to: endIndex + 1
        });
        editor.commands.setHighlight({
          color: "#dbeafe" // Light blue background
        });
      }
    }

    // Add tooltip data after DOM is updated
    setTimeout(() => {
      const editorElement = editor.view.dom;

      // Try multiple selectors to find highlight elements
      let highlightElements = editorElement.querySelectorAll(
        'mark[data-color="#dbeafe"]'
      );
      if (highlightElements.length === 0) {
        highlightElements = editorElement.querySelectorAll(
          'mark[style*="#dbeafe"]'
        );
      }
      if (highlightElements.length === 0) {
        highlightElements = editorElement.querySelectorAll("mark");
      }

      console.log("Processing highlight elements...");
      for (const element of highlightElements) {
        const highlightText = element.textContent?.trim();
        console.log("Found highlight element:", element);
        console.log("Highlight text:", highlightText);
        console.log(
          "Available evidence quotes:",
          textEvidence.map((e) => e.quote.trim())
        );

        if (highlightText) {
          // Find matching evidence by quote text
          const matchingEvidence = textEvidence.find(
            (evidence) => evidence.quote.trim() === highlightText
          );

          console.log("Matching evidence found:", matchingEvidence);

          if (matchingEvidence) {
            // Set the analysis text for tooltip
            const analysisText =
              matchingEvidence.analysis || "No analysis available";

            console.log("Setting data-analysis to:", analysisText);

            // Find this text in the editor and update the highlight mark
            const { state } = editor;
            const { doc } = state;

            doc.descendants((node, pos) => {
              if (node.isText && node.text === highlightText) {
                // Check if this text has a highlight mark
                const mark = node.marks.find(
                  (mark) => mark.type.name === "highlight"
                );
                if (mark) {
                  // Update the highlight mark with our custom attribute
                  const tr = state.tr.addMark(
                    pos,
                    pos + node.nodeSize,
                    mark.type.create({
                      ...mark.attrs,
                      dataAnalysis: analysisText
                    })
                  );
                  editor.view.dispatch(tr);
                  console.log(
                    "Updated highlight mark with data-analysis:",
                    analysisText
                  );
                }
                return false; // Stop after first match
              }
              return true;
            });

            // Also set DOM attributes as fallback
            element.setAttribute("data-analysis", analysisText);
            element.classList.add("evidence-highlight");

            console.log("Element after setting:", element.outerHTML);
          } else {
            console.log("No matching evidence for:", highlightText);
          }
        }
      }
    }, 200);

    // Clear selection
    editor.commands.blur();
  }, [editor, textEvidence]);

  return (
    <div className="size-full overflow-x-auto w-full font-[family-name:var(--font-satoshi) rounded-md print:p-0 print:bg-white print:overflow-visible">
      <div
        className={cx(
          "relative flex justify-center w-full print:py-0 print:w-full print:min-w-0 mx-auto",
          className
        )}
      >
        <div className="flex absolute right-8 top-2 z-10 mb-5 gap-2">
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
