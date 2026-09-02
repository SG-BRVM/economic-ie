import * as React from "react";
import type { EconomicSource } from "@/entities/economic-source/model/types";
import { DEFAULT_SOURCE_FILTERS, type SourceFilters, type SourceSortKey, type SortDirection } from "./types";

const PAGE_SIZE = 5;

export function useSourceTable(sources: EconomicSource[] | undefined) {
  const [filters, setFilters] = React.useState<SourceFilters>(DEFAULT_SOURCE_FILTERS);
  const [sortKey, setSortKey] = React.useState<SourceSortKey>("name");
  const [sortDirection, setSortDirection] = React.useState<SortDirection>("asc");
  const [page, setPage] = React.useState(1);

  const filtered = React.useMemo(() => {
    if (!sources) return [];
    return sources.filter((source) => {
      const matchesSearch = source.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        source.code.toLowerCase().includes(filters.search.toLowerCase());
      const matchesRegion = filters.region === "all" || source.region === filters.region;
      const matchesStatus = filters.status === "all" || source.status === filters.status;
      return matchesSearch && matchesRegion && matchesStatus;
    });
  }, [sources, filters]);

  const sorted = React.useMemo(() => {
    const copy = [...filtered];
    copy.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      const result = typeof aVal === "number" && typeof bVal === "number"
        ? aVal - bVal
        : String(aVal).localeCompare(String(bVal));
      return sortDirection === "asc" ? result : -result;
    });
    return copy;
  }, [filtered, sortKey, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = sorted.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function toggleSort(key: SourceSortKey) {
    if (key === sortKey) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  }

  function updateFilters(next: SourceFilters) {
    setFilters(next);
    setPage(1);
  }

  return {
    filters,
    updateFilters,
    sortKey,
    sortDirection,
    toggleSort,
    page: currentPage,
    totalPages,
    setPage,
    rows: paginated,
    totalCount: sorted.length,
  };
}
