export interface EconomicEvent {
  id: string;
  sourceCode: string;
  event: string;
  date: string; // "Today" | "Tomorrow" | ISO date label
  value: string | null;
}

export const mockEvents: EconomicEvent[] = [
  { id: "ev-1", sourceCode: "BAM", event: "Inflation Release", date: "Today", value: "2.8%" },
  { id: "ev-2", sourceCode: "BCEAO", event: "Policy Decision", date: "Tomorrow", value: null },
  { id: "ev-3", sourceCode: "FED", event: "FOMC Meeting", date: "05 Sep", value: null },
  { id: "ev-4", sourceCode: "HCP", event: "GDP Growth (Q2)", date: "08 Sep", value: null },
  { id: "ev-5", sourceCode: "ECB", event: "Governing Council Meeting", date: "10 Sep", value: null },
];
