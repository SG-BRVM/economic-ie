import type { SourceStatus } from "@/entities/economic-source/model/types";

export type SourceStatusFilter = SourceStatus | "all";

export interface SourceFilters {
  search: string;
  region: string | "all";
  status: SourceStatusFilter;
}

export const DEFAULT_SOURCE_FILTERS: SourceFilters = {
  search: "",
  region: "all",
  status: "all",
};

export type SourceSortKey = "name" | "region" | "status" | "indicatorsCount";
export type SortDirection = "asc" | "desc";
