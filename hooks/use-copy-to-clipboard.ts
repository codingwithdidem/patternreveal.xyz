"use client";

import { useState } from "react";

interface UseCopyToClipboardOptions {
  timeout?: number;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

interface UseCopyToClipboardReturn {
  isCopied: boolean;
  copy: (text: string) => Promise<void>;
  reset: () => void;
}

export function useCopyToClipboard(
  options: UseCopyToClipboardOptions = {}
): UseCopyToClipboardReturn {
  const { timeout = 2000, onSuccess, onError } = options;
  const [isCopied, setIsCopied] = useState(false);

  const copy = async (text: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      onSuccess?.();

      if (timeout > 0) {
        setTimeout(() => {
          setIsCopied(false);
        }, timeout);
      }
    } catch (error) {
      onError?.(error as Error);
    }
  };

  const reset = () => {
    setIsCopied(false);
  };

  return {
    isCopied,
    copy,
    reset,
  };
}
