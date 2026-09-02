import { useQuery } from "@tanstack/react-query";
import { mockDelay } from "@/shared/api/client";
import { mockEvents, type EconomicEvent } from "@/shared/api/mock/events";

export function useEconomicEvents() {
  return useQuery<EconomicEvent[]>({
    queryKey: ["economic-events"],
    queryFn: () => mockDelay(mockEvents),
  });
}
