import type { IndicatorCategory } from "@/entities/economic-indicator/model/types";

export type IndicatorCategoryFilter = IndicatorCategory | "all";

export interface IndicatorFilters {
  search: string;
  region: string | "all";
  category: IndicatorCategoryFilter;
}

export const DEFAULT_INDICATOR_FILTERS: IndicatorFilters = {
  search: "",
  region: "all",
  category: "all",
};
