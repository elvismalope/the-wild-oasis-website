"use client";

import { useSearchParams } from "next/navigation";
import useClientSearchParams from "../_hooks/useClientSearchParams";

const filters = [
  { name: "All Cabins", value: "all" },
  { name: "1-3 Guests", value: "small" },
  { name: "4-7 Guests", value: "medium" },
  { name: "8-12 Guests", value: "large" },
];

function Filter() {
  const searchParams = useSearchParams();
  const setParams = useClientSearchParams(searchParams);
  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter) {
    setParams({ capacity: filter }, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex">
      {filters.map((f) => (
        <FilterButton
          key={f.value}
          filter={f.value}
          onFilter={handleFilter}
          isActive={activeFilter === f.value}
        >
          {f.name}
        </FilterButton>
      ))}
    </div>
  );
}

function FilterButton({ children, filter, onFilter, isActive }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${isActive ? "bg-primary-700 text-primary-50" : ""}`}
      onClick={() => onFilter(filter)}
    >
      {children}
    </button>
  );
}

export default Filter;
