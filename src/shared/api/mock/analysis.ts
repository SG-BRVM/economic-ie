export interface MarketImplication {
  asset: "Rates" | "Equities" | "Currency" | "Commodities";
  stance: "Positive" | "Neutral" | "Negative" | "Moderate";
}

export interface RiskItem {
  label: string;
  direction: "up" | "down" | "flat";
}

export interface EconomicAnalysis {
  region: string;
  period: string;
  regime: string;
  confidence: number;
  keyDevelopments: string[];
  marketImplications: MarketImplication[];
  risks: RiskItem[];
  keyDriver: string;
  sources: string[];
  generatedAt: string;
}

export const mockAnalysis: EconomicAnalysis = {
  region: "Morocco",
  period: "Last 30 days",
  regime: "Disinflationary / Neutral",
  confidence: 82,
  keyDevelopments: [
    "Inflation declined for a third consecutive month, driven by lower food and energy prices.",
    "Monetary conditions remained accommodative, with the policy rate held steady at 3.50%.",
    "Growth momentum stayed resilient, supported by domestic demand and tourism receipts.",
  ],
  marketImplications: [
    { asset: "Rates", stance: "Neutral" },
    { asset: "Equities", stance: "Positive" },
    { asset: "Currency", stance: "Moderate" },
    { asset: "Commodities", stance: "Neutral" },
  ],
  risks: [
    { label: "Inflation", direction: "up" },
    { label: "Growth", direction: "down" },
    { label: "External Demand", direction: "flat" },
  ],
  keyDriver: "Lower inflation pressure",
  sources: ["BAM", "HCP", "World Bank"],
  generatedAt: "2026-09-02T07:00:00Z",
};
