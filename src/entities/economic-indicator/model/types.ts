export type IndicatorCategory =
  | "inflation"
  | "growth"
  | "rates"
  | "employment"
  | "trade"
  | "monetary";

export type IndicatorFrequency = "daily" | "weekly" | "monthly" | "quarterly" | "annual";

export type TrendDirection = "up" | "down" | "flat";

export interface EconomicIndicator {
  code: string;
  name: string;
  category: IndicatorCategory;
  region: string;
  sourceCode: string;
  sourceName: string;
  unit: string;
  frequency: IndicatorFrequency;
  value: number;
  previousValue: number;
  change: number;
  trend: TrendDirection;
  updatedAt: string; // ISO date
}
