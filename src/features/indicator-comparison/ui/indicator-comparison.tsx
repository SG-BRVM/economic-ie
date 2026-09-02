import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { TrendBadge } from "@/entities/economic-indicator/ui/trend-badge";
import { formatPercent } from "@/shared/lib/utils";
import { useTranslation } from "@/shared/lib/i18n/use-translation";
import type { EconomicIndicator } from "@/entities/economic-indicator/model/types";

interface IndicatorComparisonProps {
  current: EconomicIndicator;
  candidates: EconomicIndicator[];
}

export function IndicatorComparison({ current, candidates }: IndicatorComparisonProps) {
  const { t } = useTranslation();
  const others = candidates.filter((i) => i.code !== current.code);
  const [compareCode, setCompareCode] = React.useState<string | undefined>(others[0]?.code);
  const compareIndicator = others.find((i) => i.code === compareCode);

  if (others.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("indicatorDetail.compareWith")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select value={compareCode} onValueChange={setCompareCode}>
          <SelectTrigger>
            <SelectValue placeholder={t("indicatorDetail.selectIndicator")} />
          </SelectTrigger>
          <SelectContent>
            {others.map((indicator) => (
              <SelectItem key={indicator.code} value={indicator.code}>
                {indicator.name} - {indicator.region}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {compareIndicator && (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">{current.name} ({current.region})</p>
              <p className="tabular-data text-xl font-semibold">{formatPercent(current.value)}</p>
              <TrendBadge trend={current.trend} change={current.change} unit="pp" className="mt-1" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">
                {compareIndicator.name} ({compareIndicator.region})
              </p>
              <p className="tabular-data text-xl font-semibold">{formatPercent(compareIndicator.value)}</p>
              <TrendBadge trend={compareIndicator.trend} change={compareIndicator.change} unit="pp" className="mt-1" />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
