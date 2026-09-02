import type { EconomicObservation, ObservationPeriod } from "@/entities/economic-observation/model/types";

const PERIOD_DAYS: Record<ObservationPeriod, number> = {
  "1M": 30,
  "3M": 90,
  "6M": 182,
  "1Y": 365,
  "5Y": 365 * 5,
  MAX: 365 * 10,
};

/**
 * Deterministically generates a monthly time series ending "today" that
 * converges toward `endValue`, for demo purposes. Mimics the shape of the
 * DTOs the FastAPI backend will eventually return.
 */
export function generateMockObservations(
  endValue: number,
  period: ObservationPeriod = "1Y"
): EconomicObservation[] {
  const days = PERIOD_DAYS[period];
  const points = Math.max(6, Math.min(60, Math.round(days / 30)));
  const now = new Date("2026-09-02T00:00:00Z");
  const series: EconomicObservation[] = [];
  let seed = Math.round(endValue * 1000);

  for (let i = points; i >= 0; i--) {
    const date = new Date(now);
    date.setMonth(date.getMonth() - i);
    seed = (seed * 9301 + 49297) % 233280;
    const noise = ((seed / 233280) - 0.5) * Math.max(0.4, Math.abs(endValue) * 0.12);
    const drift = (i / points) * Math.max(0.6, Math.abs(endValue) * 0.18);
    const value = Number((endValue + drift + noise).toFixed(2));
    series.push({ date: date.toISOString(), value });
  }

  series[series.length - 1] = { date: now.toISOString(), value: endValue };
  return series;
}
