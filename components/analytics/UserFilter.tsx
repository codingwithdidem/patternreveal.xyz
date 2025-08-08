import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useSWR from "swr";
import { fetcher } from "@/lib/swr/fetcher";
import { useParams } from "next/navigation";
import useAnalyticsQueryParams from "@/hooks/nuqs/useAnalyticsQueryParams";

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: "OWNER" | "MEMBER";
}

export default function UserFilter() {
  const { slug } = useParams() as { slug: string };
  const { filters, setFilters } = useAnalyticsQueryParams();

  // Fetch workspace members for the user filter
  const { data: users = [] } = useSWR<User[]>(
    `/api/workspaces/${slug}/members`,
    fetcher
  );

  return (
    <Select
      value={filters.user || "all"}
      onValueChange={(value) => setFilters({ user: value })}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="All users" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All users</SelectItem>
        {users.map((user) => (
          <SelectItem key={user.id} value={user.id}>
            <div className="flex items-center gap-2">
              <Avatar className="w-4 h-4">
                <AvatarImage src={user.image} />
                <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <span>{user.name}</span>
              <Badge variant="outline" className="text-xs">
                {user.role === "OWNER" ? "Owner" : "Member"}
              </Badge>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
