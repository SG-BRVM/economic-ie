export type SourceStatus = "active" | "degraded" | "inactive";
export type SourceRegion = "Morocco" | "WAEMU" | "United States" | "Euro Area" | "Global";

export interface EconomicSource {
  id: string;
  code: string;
  name: string;
  region: SourceRegion;
  type: "central-bank" | "statistics-office" | "international-institution";
  status: SourceStatus;
  lastSync: string; // ISO date
  indicatorsCount: number;
}
