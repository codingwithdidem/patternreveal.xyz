import { useState, useMemo } from "react";

export interface PaginationState {
  page: number;
  limit: number;
  total: number;
}

export interface PaginationActions {
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setTotal: (total: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
  reset: () => void;
}

export interface PaginationInfo {
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  startIndex: number;
  endIndex: number;
  isFirstPage: boolean;
  isLastPage: boolean;
}

export interface UsePaginationOptions {
  initialPage?: number;
  initialLimit?: number;
  initialTotal?: number;
}

export function usePagination(
  options: UsePaginationOptions = {}
): [PaginationState, PaginationActions, PaginationInfo] {
  const { initialPage = 1, initialLimit = 10, initialTotal = 0 } = options;

  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [total, setTotal] = useState(initialTotal);

  const paginationInfo = useMemo((): PaginationInfo => {
    const totalPages = Math.ceil(total / limit);
    const currentPage = Math.min(page, totalPages || 1);
    const startIndex = (currentPage - 1) * limit;
    const endIndex = Math.min(startIndex + limit, total);

    return {
      totalPages,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
      startIndex,
      endIndex,
      isFirstPage: currentPage === 1,
      isLastPage: currentPage === totalPages
    };
  }, [page, limit, total]);

  const actions: PaginationActions = useMemo(
    () => ({
      setPage: (newPage: number) => {
        setPage(Math.max(1, newPage));
      },
      setLimit: (newLimit: number) => {
        setLimit(Math.max(1, newLimit));
        setPage(1); // Reset to first page when changing limit
      },
      setTotal: (newTotal: number) => {
        setTotal(Math.max(0, newTotal));
      },
      nextPage: () => {
        if (paginationInfo.hasNextPage) {
          setPage(page + 1);
        }
      },
      prevPage: () => {
        if (paginationInfo.hasPrevPage) {
          setPage(page - 1);
        }
      },
      goToPage: (targetPage: number) => {
        const validPage = Math.max(
          1,
          Math.min(targetPage, paginationInfo.totalPages)
        );
        setPage(validPage);
      },
      reset: () => {
        setPage(initialPage);
        setLimit(initialLimit);
        setTotal(initialTotal);
      }
    }),
    [page, paginationInfo, initialPage, initialLimit, initialTotal]
  );

  const state: PaginationState = {
    page,
    limit,
    total
  };

  return [state, actions, paginationInfo];
}
