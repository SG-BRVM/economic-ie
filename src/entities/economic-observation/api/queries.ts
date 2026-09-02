import { useQuery } from "@tanstack/react-query";
import { env } from "@/shared/config/env";
import { apiFetch, mockDelay } from "@/shared/api/client";
import { generateMockObservations } from "@/shared/api/mock/observations";
import type { EconomicObservation, ObservationPeriod } from "@/entities/economic-observation/model/types";
import { useIndicator } from "@/entities/economic-indicator/api/queries";

async function fetchObservations(
  indicatorCode: string,
  endValue: number,
  period: ObservationPeriod
): Promise<EconomicObservation[]> {
  if (env.mockApi) return mockDelay(generateMockObservations(endValue, period));
  return apiFetch<EconomicObservation[]>(
    `/api/v1/indicators/${indicatorCode}/observations?period=${period}`
  );
}

export function useObservations(indicatorCode: string | undefined, period: ObservationPeriod) {
  const { data: indicator } = useIndicator(indicatorCode);
  return useQuery({
    queryKey: ["observations", indicatorCode, period, indicator?.value],
    queryFn: () => fetchObservations(indicatorCode as string, indicator?.value ?? 0, period),
    enabled: Boolean(indicatorCode) && indicator !== undefined,
  });
}
