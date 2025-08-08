import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useAnalyticsQueryParams from "@/hooks/nuqs/useAnalyticsQueryParams";

export default function DateFilter() {
  const { filters, setFilters } = useAnalyticsQueryParams();

  return (
    <Select
      value={filters.days}
      onValueChange={(value) => setFilters({ days: value })}
    >
      <SelectTrigger className="w-[120px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="30">30 days</SelectItem>
        <SelectItem value="60">60 days</SelectItem>
        <SelectItem value="90">90 days</SelectItem>
      </SelectContent>
    </Select>
  );
}
