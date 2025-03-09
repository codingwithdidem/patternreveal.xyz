import { useEditorStore } from "@/lib/store/useEditorStore";
import { useChat } from "ai/react";
import { Input } from "@components/ui/input";
import { SendIcon } from "lucide-react";
import { Separator } from "@components/ui/separator";
import { useScrollToBottom } from "@/hooks/useScrollToBottom";
import PreviewMessage from "@/components/reflections/ask-ai/PreviewMessage";
import SuggestedPromptsList from "@/components/reflections/ask-ai/SuggestedPromptsList";
import ThinkingMessage from "@/components/reflections/ask-ai/ThinkingMessage";

export default function AskAI() {
  const { editor } = useEditorStore();
  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  const { messages, isLoading, input, handleInputChange, handleSubmit } =
    useChat({
      maxSteps: 3,
      initialMessages: [
        {
          id: "reflection",
          role: "assistant",
          content:
            "The following is the user's reflection that needs to be analyzed:"
        },
        {
          id: "reflection-content",
          role: "user",
          content: editor?.getText() || ""
        }
      ]
    });

  return (
    <div className="flex flex-col w-full p-2">
      <div
        className="space-y-4 max-h-[70dvh] overflow-y-auto"
        ref={messagesContainerRef}
      >
        {messages
          // .filter((m) => !["reflection", "reflection-content"].includes(m.id))
          .map((m) => (
            <PreviewMessage key={m.id} message={m} />
          ))}

        {isLoading &&
          messages.length > 0 &&
          messages[messages.length - 1].role === "user" && <ThinkingMessage />}

        <div
          ref={messagesEndRef}
          className="shrink-0 min-w-[24px] min-h-[24px]"
        />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <div className="flex h-5 space-x-2 items-center">
              <SuggestedPromptsList />
              <Separator orientation="vertical" />
            </div>
          </div>
          <Input
            className="rounded-full bg-white h-12 px-4 pl-14"
            value={input}
            placeholder="Ask anything..."
            onChange={handleInputChange}
            disabled={isLoading}
          />

          <SendIcon className="absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer size-5 text-slate-600" />
        </div>
      </form>
    </div>
  );
}
