import { useEditorStore } from "@/lib/store/useEditorStore";
import { useChat, type Message } from "ai/react";
import { Input } from "@components/ui/input";
import { SendIcon } from "lucide-react";
import { Separator } from "@components/ui/separator";
import { useScrollToBottom } from "@/hooks/useScrollToBottom";
import PreviewMessage from "@/components/reflections/ask-ai/PreviewMessage";
import SuggestedPromptsList from "@/components/reflections/ask-ai/SuggestedPromptsList";
import ThinkingMessage from "@/components/reflections/ask-ai/ThinkingMessage";
import PremiumFeatureBadge from "@/components/PremiumFeatureBadge";
import UpgradeToProButton from "@/components/UpgradeToProButton";
import { Tooltip } from "@/components/ui/tooltip";
import useWorkspace from "@/lib/swr/use-workspace";
import useChatMessages from "@/lib/swr/use-chat-messages";
import { useMemo, useEffect, useCallback, useRef } from "react";
import type { AnalysisStatus } from "@prisma/client";
import { useParams } from "next/navigation";

interface AskAIProps {
  analysisStatus?: AnalysisStatus;
}

export default function AskAI({ analysisStatus }: AskAIProps) {
  const params = useParams<{ reflectionId: string }>();
  const reflectionId = params?.reflectionId;
  const { editor } = useEditorStore();
  const workspace = useWorkspace();
  const { plan, exceededAI } = workspace;
  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();
  const lastSavedMessagesRef = useRef<string>("");

  // Fetch existing chat history
  const {
    chatMessages,
    isLoading: isLoadingHistory,
    workspaceId,
  } = useChatMessages(reflectionId);

  // Build initial messages from chat history or default
  const initialMessages = useMemo((): Message[] => {
    const baseMessages: Message[] = [
      {
        id: "reflection",
        role: "assistant",
        content:
          "The following is the user's reflection that needs to be analyzed:",
      },
      {
        id: "reflection-content",
        role: "user",
        content: editor?.getText() || "",
      },
    ];

    if (chatMessages && chatMessages.length > 0) {
      const historyMessages: Message[] = chatMessages.map((m) => ({
        id: m.id,
        role: m.role as Message["role"],
        content: m.content,
      }));
      return [...baseMessages, ...historyMessages];
    }

    return baseMessages;
  }, [chatMessages, editor]);

  const { messages, isLoading, input, handleInputChange, handleSubmit } =
    useChat({
      maxSteps: 3,
      api: workspaceId ? `/api/chat?workspaceId=${workspaceId}` : "/api/chat",
      initialMessages,
    });

  // Save messages to database when they change
  const saveMessages = useCallback(async () => {
    if (!reflectionId || !workspaceId || messages.length <= 2) return;

    // Filter out the initial context messages
    const messagesToSave = messages.filter(
      (m) => !["reflection", "reflection-content"].includes(m.id)
    );

    if (messagesToSave.length === 0) return;

    // Create a simple hash of message IDs to check if we need to save
    const messagesHash = messagesToSave.map((m) => m.id).join(",");
    if (messagesHash === lastSavedMessagesRef.current) return;

    try {
      await fetch(`/api/chat/${reflectionId}?workspaceId=${workspaceId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: messagesToSave }),
      });
      lastSavedMessagesRef.current = messagesHash;
    } catch (error) {
      console.error("Failed to save chat messages:", error);
    }
  }, [messages, reflectionId, workspaceId]);

  // Save messages when they change and we're not loading
  useEffect(() => {
    if (!isLoading && messages.length > 2) {
      saveMessages();
    }
  }, [isLoading, messages.length, saveMessages]);

  const isAnalysisReady = analysisStatus === "COMPLETED";
  const isAnalysisInProgress = analysisStatus === "IN_PROGRESS";

  const tooltipContent = useMemo(() => {
    if (!isAnalysisReady) {
      if (isAnalysisInProgress) {
        return (
          <div className="flex flex-col items-center space-y-2 text-center max-w-xs px-4 py-3">
            <p className="text-sm text-muted-foreground">
              Analysis is in progress. Please wait for the analysis to complete
              before asking questions.
            </p>
          </div>
        );
      }
      return (
        <div className="flex flex-col items-center space-y-2 text-center max-w-xs px-4 py-3">
          <p className="text-sm text-muted-foreground">
            Please analyze this reflection first before asking questions.
          </p>
        </div>
      );
    }

    if (plan === "free") {
      return (
        <div className="flex flex-col items-center space-y-2 text-center max-w-xs px-4 py-3">
          <p className="text-sm text-muted-foreground">
            Your plan does not include this feature. To use this feature, you
            need to upgrade to Pro.
          </p>
          <UpgradeToProButton size="sm" className="w-full">
            Upgrade to Pro
          </UpgradeToProButton>
        </div>
      );
    }

    if (plan === "pro" && exceededAI) {
      return (
        <div className="flex flex-col items-center space-y-2 text-center max-w-xs px-4 py-3">
          <p className="text-sm text-muted-foreground">
            You have reached your monthly AI usage limit.
          </p>
        </div>
      );
    }

    return null;
  }, [plan, exceededAI, isAnalysisReady, isAnalysisInProgress]);

  // Show loading state while fetching history
  if (isLoadingHistory) {
    return (
      <div className="flex flex-col w-full p-2">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium">Ask AI</h3>
          <PremiumFeatureBadge feature="ask-ai" />
        </div>
        <div className="flex items-center justify-center py-8">
          <p className="text-sm text-muted-foreground">
            Loading chat history...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full p-2">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium">Ask AI</h3>
        <PremiumFeatureBadge feature="ask-ai" />
      </div>

      <div
        className="space-y-4 max-h-[70dvh] overflow-y-auto"
        ref={messagesContainerRef}
      >
        <>
          {messages
            // .filter((m) => !["reflection", "reflection-content"].includes(m.id))
            .map((m) => (
              <PreviewMessage key={m.id} message={m} />
            ))}

          {isLoading &&
            messages.length > 0 &&
            messages[messages.length - 1].role === "user" && (
              <ThinkingMessage />
            )}

          <div
            ref={messagesEndRef}
            className="shrink-0 min-w-[24px] min-h-[24px]"
          />
        </>
      </div>

      <form onSubmit={handleSubmit}>
        <Tooltip content={tooltipContent}>
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
              placeholder={
                !isAnalysisReady
                  ? isAnalysisInProgress
                    ? "Analysis in progress..."
                    : "Analyze reflection first..."
                  : "Ask anything..."
              }
              onChange={handleInputChange}
              disabled={
                isLoading || !isAnalysisReady || plan === "free" || exceededAI
              }
            />

            <SendIcon className="absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer size-5 text-slate-600" />
          </div>
        </Tooltip>
      </form>
    </div>
  );
}
