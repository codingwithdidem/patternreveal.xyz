import DateFilter from "./DateFilter";
import UserFilter from "./UserFilter";

export default function Filters() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div className="flex gap-3 ml-auto">
        <DateFilter />
        <UserFilter />
      </div>
    </div>
  );
}
