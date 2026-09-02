import { useQuery } from "@tanstack/react-query";
import { env } from "@/shared/config/env";
import { apiFetch, mockDelay } from "@/shared/api/client";
import { mockIndicators } from "@/shared/api/mock/indicators";
import type { EconomicIndicator } from "@/entities/economic-indicator/model/types";

async function fetchIndicators(): Promise<EconomicIndicator[]> {
  if (env.mockApi) return mockDelay(mockIndicators);
  return apiFetch<EconomicIndicator[]>("/api/v1/indicators");
}

export function useIndicators() {
  return useQuery({ queryKey: ["indicators"], queryFn: fetchIndicators });
}

export function useIndicator(code: string | undefined) {
  return useQuery({
    queryKey: ["indicators", code],
    queryFn: async () => {
      const all = await fetchIndicators();
      const found = all.find((i) => i.code === code);
      if (!found) throw new Error(`Indicator ${code} not found`);
      return found;
    },
    enabled: Boolean(code),
  });
}
