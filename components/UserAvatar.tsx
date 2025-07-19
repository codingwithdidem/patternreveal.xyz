import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";

type UserAvatarProps = {
  user?: {
    id?: string | null;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
  className?: string;
};

const getUserAvatarOrFallbackUrl = (
  user?: {
    id?: string | null;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null
) => {
  if (user?.image) return user.image;

  if (!user?.id) return "https://api.dicebear.com/9.x/miniavs/svg";

  const dicebearUrl = `https://api.dicebear.com/9.x/miniavs/svg?seed=${encodeURIComponent(user.id)}`;

  return dicebearUrl;
};

export default function UserAvatar({ user, className }: UserAvatarProps) {
  const avatarUrl = getUserAvatarOrFallbackUrl(user);

  if (!user)
    return (
      <div
        className={cn(
          "animate-pulse w-8 h-8 bg-gray-100 rounded-full",
          className
        )}
      />
    );

  return (
    <Avatar className={cn("w-8 h-8", className)}>
      <AvatarImage 
        src={avatarUrl} 
        alt={user?.name || "User"} 
        onError={(e) => {
          // If image fails to load, hide it to show fallback
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
        }}
      />
      <AvatarFallback>
        {user?.name
          ? user.name
              .split(" ")
              .map((name) => name[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)
          : "U"}
      </AvatarFallback>
    </Avatar>
  );
}
