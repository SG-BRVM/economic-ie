import * as React from "react";
import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@/shared/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Label } from "@/shared/ui/label";
import { useGenerateAnalysis } from "../api/mutation";
import { useTranslation } from "@/shared/lib/i18n/use-translation";
import type { EconomicAnalysis } from "@/shared/api/mock/analysis";

const REGIONS = ["Morocco", "WAEMU", "United States", "Euro Area", "Global"];
const PERIODS = ["Last 7 days", "Last 30 days", "Last quarter", "Last 12 months"];

interface GenerateAnalysisFormProps {
  onGenerated: (analysis: EconomicAnalysis) => void;
}

export function GenerateAnalysisForm({ onGenerated }: GenerateAnalysisFormProps) {
  const [region, setRegion] = React.useState(REGIONS[0]);
  const [period, setPeriod] = React.useState(PERIODS[1]);
  const mutation = useGenerateAnalysis();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
      <div className="flex-1 space-y-1.5">
        <Label>{t("generateAnalysis.region")}</Label>
        <Select value={region} onValueChange={setRegion}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {REGIONS.map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 space-y-1.5">
        <Label>{t("generateAnalysis.period")}</Label>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PERIODS.map((p) => (
              <SelectItem key={p} value={p}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        onClick={() => mutation.mutate({ region, period }, { onSuccess: onGenerated })}
        disabled={mutation.isPending}
        className="sm:w-48"
      >
        {mutation.isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Sparkles className="h-4 w-4" />
        )}
        {t("generateAnalysis.generate")}
      </Button>
    </div>
  );
}
