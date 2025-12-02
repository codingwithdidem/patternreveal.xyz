import useSWR from "swr";
import type { SWRConfiguration } from "swr";
import { fetcher } from "./fetcher";
import useWorkspace from "./use-workspace";

export interface ChatMessage {
  id: string;
  role: string;
  content: string;
  createdAt: string;
}

export default function useChatMessages(
  reflectionId: string | undefined,
  swrOpts: SWRConfiguration = {}
) {
  const workspace = useWorkspace();

  const {
    data: chatMessages,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR<ChatMessage[]>(
    reflectionId && workspace?.id
      ? `/api/chat/${reflectionId}?workspaceId=${workspace.id}`
      : null,
    fetcher,
    {
      dedupingInterval: 20000,
      revalidateOnFocus: false,
      keepPreviousData: true,
      ...swrOpts,
    }
  );

  return {
    chatMessages,
    error,
    isLoading,
    isValidating,
    mutate,
    workspaceId: workspace?.id,
  };
}
