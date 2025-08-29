import { parseAsArrayOf, parseAsStringEnum, useQueryStates } from "nuqs";
import { z } from "zod";

export default function useReflectionQueryParams() {
  const [filters, setFilters] = useQueryStates(
    {
      status: parseAsStringEnum(["has-ai-report", "no-ai-report"]),
      creators: parseAsArrayOf(z.string()).withDefault([]),
    },
    {
      clearOnDefault: true,
      urlKeys: {
        status: "status",
        creators: "creators",
      },
    }
  );

  return {
    filters,
    setFilters,
  };
}
