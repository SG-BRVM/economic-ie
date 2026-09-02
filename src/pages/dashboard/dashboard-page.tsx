import { EconomicOverview } from "@/widgets/economic-overview/economic-overview";
import { IndicatorChart } from "@/widgets/indicator-chart/indicator-chart";
import { EconomicCalendar } from "@/widgets/economic-calendar/economic-calendar";
import { SourceStatus } from "@/widgets/source-status/source-status";
import { LatestAnalysis } from "@/widgets/latest-analysis/latest-analysis";
import { MarketOverview } from "@/widgets/market-overview/market-overview";
import { useIndicator } from "@/entities/economic-indicator/api/queries";
import { useObservations } from "@/entities/economic-observation/api/queries";
import { useTranslation } from "@/shared/lib/i18n/use-translation";

const CHARTS: { code: string; titleKey: string; unit: string; color: string }[] = [
  { code: "MA-INFLATION", titleKey: "category.inflation", unit: "%", color: "hsl(var(--primary))" },
  { code: "MA-POLICY-RATE", titleKey: "marketOverview.rate", unit: "%", color: "hsl(var(--positive))" },
  { code: "MA-GDP-GROWTH", titleKey: "category.growth", unit: "%", color: "hsl(var(--warning))" },
  { code: "MA-TRADE-BALANCE", titleKey: "category.trade", unit: "", color: "hsl(var(--negative))" },
];

function DashboardChart({ code, titleKey, unit, color }: (typeof CHARTS)[number]) {
  const { data: indicator } = useIndicator(code);
  const { data: observations, isLoading } = useObservations(code, "1Y");
  const { t } = useTranslation();
  const title = t(titleKey);
  return (
    <IndicatorChart
      title={indicator ? `${title} - ${indicator.region}` : title}
      observations={observations}
      isLoading={isLoading}
      unit={unit}
      color={color}
    />
  );
}

export function DashboardPage() {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">{t("dashboard.title")}</h1>
        <p className="text-sm text-muted-foreground">{t("dashboard.subtitle")}</p>
      </div>

      <EconomicOverview />

      <div className="grid gap-4 lg:grid-cols-2">
        {CHARTS.map((chart) => (
          <DashboardChart key={chart.code} {...chart} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <EconomicCalendar />
        </div>
        <SourceStatus />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <LatestAnalysis />
        <MarketOverview />
      </div>
    </div>
  );
}
