import { parseAsArrayOf, parseAsStringEnum, useQueryStates } from "nuqs";

export default function useReflectionQueryParams() {
  const [filters, setFilters] = useQueryStates(
    {
      status: parseAsArrayOf(
        parseAsStringEnum(["analyzed", "not-analyzed"])
      ).withDefault([]),
      content: parseAsArrayOf(
        parseAsStringEnum(["abusive", "not-abusive"])
      ).withDefault([])
    },
    {
      clearOnDefault: true,
      urlKeys: {
        status: "status",
        content: "content"
      }
    }
  );

  return {
    filters,
    setFilters
  };
}
