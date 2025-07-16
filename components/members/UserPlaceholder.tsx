interface UserPlaceholderProps {
  showAction?: boolean;
  className?: string;
}

export default function UserPlaceholder({
  showAction = true,
  className = ""
}: UserPlaceholderProps) {
  return (
    <div
      className={`flex items-center space-x-4 p-4 rounded-lg bg-gray-50 animate-pulse ${className}`}
    >
      <div className="w-10 h-10 bg-gray-200 rounded-full" />
      <div className="flex-1">
        <div className="w-32 h-4 bg-gray-200 rounded mb-2" />
        <div className="w-48 h-3 bg-gray-200 rounded" />
      </div>
      {showAction && <div className="w-20 h-6 bg-gray-200 rounded" />}
    </div>
  );
}
