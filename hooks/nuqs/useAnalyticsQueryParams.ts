import { parseAsString, useQueryStates } from "nuqs";

export default function useAnalyticsQueryParams() {
  const [filters, setFilters] = useQueryStates(
    {
      days: parseAsString.withDefault("30"),
      user: parseAsString.withDefault("all"),
    },
    {
      clearOnDefault: true,
      urlKeys: {
        days: "days",
        user: "user",
      },
    }
  );

  return {
    filters,
    setFilters,
  };
}
