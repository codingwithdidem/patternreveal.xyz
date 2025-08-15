import { Markdown } from "@/components/Markdown";
import { cn } from "@/lib/utils";
import type { Message } from "ai";
import { AnimatePresence, motion } from "framer-motion";
import { SparklesIcon } from "lucide-react";

type PreviewMessageProps = {
  message: Message;
};

export default function PreviewMessage({ message }: PreviewMessageProps) {
  return (
    <AnimatePresence>
      <motion.div
        className="w-full mx-auto max-w-3xl px-4 group/message max-h-[45dvh] overflow-y-auto"
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        data-role={message.role}
      >
        <div
          className={cn(
            "flex gap-4 w-full group-data-[role=user]/message:ml-auto group-data-[role=user]/message:max-w-2xl group-data-[role=user]/message:w-fit"
          )}
        >
          {message.role === "assistant" && (
            <div className="size-8 flex items-center rounded-full justify-center ring-1 shrink-0 ring-border bg-background">
              <div className="translate-y-px">
                <SparklesIcon size={14} />
              </div>
            </div>
          )}

          <div
            className={cn("flex flex-col gap-4", {
              "bg-primary text-primary-foreground px-3 py-2 rounded-xl":
                message.role === "user",
            })}
          >
            <Markdown>{message.content}</Markdown>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
