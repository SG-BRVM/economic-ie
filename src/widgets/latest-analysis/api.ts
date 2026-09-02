import { useQuery } from "@tanstack/react-query";
import { mockDelay } from "@/shared/api/client";
import { mockAnalysis, type EconomicAnalysis } from "@/shared/api/mock/analysis";

export function useLatestAnalysis() {
  return useQuery<EconomicAnalysis>({
    queryKey: ["latest-analysis"],
    queryFn: () => mockDelay(mockAnalysis),
  });
}
