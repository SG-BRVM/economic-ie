import { useQuery } from "@tanstack/react-query";
import { env } from "@/shared/config/env";
import { apiFetch, mockDelay } from "@/shared/api/client";
import { mockSources } from "@/shared/api/mock/sources";
import type { EconomicSource } from "@/entities/economic-source/model/types";

async function fetchSources(): Promise<EconomicSource[]> {
  if (env.mockApi) return mockDelay(mockSources);
  return apiFetch<EconomicSource[]>("/api/v1/sources");
}

export function useSources() {
  return useQuery({ queryKey: ["sources"], queryFn: fetchSources });
}
