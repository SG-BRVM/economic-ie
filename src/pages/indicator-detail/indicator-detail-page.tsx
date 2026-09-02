import * as React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";
import { AlertCircle } from "lucide-react";
import { useIndicator, useIndicators } from "@/entities/economic-indicator/api/queries";
import { useObservations } from "@/entities/economic-observation/api/queries";
import { TrendBadge } from "@/entities/economic-indicator/ui/trend-badge";
import { IndicatorChart } from "@/widgets/indicator-chart/indicator-chart";
import { PeriodFilter } from "@/features/economic-period-filter/ui/period-filter";
import { IndicatorComparison } from "@/features/indicator-comparison/ui/indicator-comparison";
import { formatPercent } from "@/shared/lib/utils";
import { useTranslation } from "@/shared/lib/i18n/use-translation";
import type { ObservationPeriod } from "@/entities/economic-observation/model/types";

export function IndicatorDetailPage() {
  const { indicatorCode } = useParams<{ indicatorCode: string }>();
  const { data: indicator, isLoading, isError } = useIndicator(indicatorCode);
  const { data: allIndicators } = useIndicators();
  const [period, setPeriod] = React.useState<ObservationPeriod>("1Y");
  const { data: observations, isLoading: obsLoading } = useObservations(indicatorCode, period);
  const { t } = useTranslation();

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle />
        <AlertTitle>{t("indicatorDetail.notFoundTitle")}</AlertTitle>
        <AlertDescription>
          <Link to="/indicators" className="underline">
            {t("indicatorDetail.back")}
          </Link>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        to="/indicators"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> {t("indicatorDetail.back")}
      </Link>

      {isLoading || !indicator ? (
        <Skeleton className="h-40 w-full" />
      ) : (
        <>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              {indicator.name} - {indicator.region}
            </h1>
            <p className="text-sm text-muted-foreground">
              {t("indicatorDetail.sourceLabel")}: {indicator.sourceName} · {t("indicatorDetail.frequencyLabel")}: {indicator.frequency}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle>{t("indicatorDetail.value")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="tabular-data text-2xl font-semibold">
                  {indicator.unit === "%" ? formatPercent(indicator.value) : `${indicator.value} ${indicator.unit}`}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>{t("indicatorDetail.previous")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="tabular-data text-2xl font-semibold text-muted-foreground">
                  {indicator.unit === "%" ? formatPercent(indicator.previousValue) : `${indicator.previousValue} ${indicator.unit}`}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>{t("indicatorDetail.change")}</CardTitle>
              </CardHeader>
              <CardContent>
                <TrendBadge trend={indicator.trend} change={indicator.change} unit="pp" className="text-lg" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>{t("indicatorDetail.source")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">{indicator.sourceCode}</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end">
            <PeriodFilter value={period} onChange={setPeriod} />
          </div>

          <IndicatorChart
            title={`${indicator.name} - ${t("indicatorDetail.historical")}`}
            observations={observations}
            isLoading={obsLoading}
            unit={indicator.unit === "%" ? "%" : ""}
          />

          {allIndicators && <IndicatorComparison current={indicator} candidates={allIndicators} />}
        </>
      )}
    </div>
  );
}
