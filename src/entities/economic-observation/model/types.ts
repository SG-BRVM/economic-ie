export interface EconomicObservation {
  date: string; // ISO date
  value: number;
}

export type ObservationPeriod = "1M" | "3M" | "6M" | "1Y" | "5Y" | "MAX";
