import { useMutation } from "@tanstack/react-query";
import { mockDelay } from "@/shared/api/client";
import { mockAnalysis, type EconomicAnalysis } from "@/shared/api/mock/analysis";
import type { GenerateAnalysisParams } from "../model/types";

/**
 * Mocked for now. Will later call the FastAPI backend, which orchestrates
 * the LLM-based economic regime analysis.
 */
async function generateAnalysis(params: GenerateAnalysisParams): Promise<EconomicAnalysis> {
  return mockDelay({ ...mockAnalysis, region: params.region, period: params.period }, 900);
}

export function useGenerateAnalysis() {
  return useMutation({ mutationFn: generateAnalysis });
}
