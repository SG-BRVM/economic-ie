import * as React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/shared/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Skeleton } from "@/shared/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";
import { AlertCircle } from "lucide-react";
import { useIndicators } from "@/entities/economic-indicator/api/queries";
import { TrendBadge } from "@/entities/economic-indicator/ui/trend-badge";
import { IndicatorFilterBar } from "@/features/indicator-filter/ui/indicator-filter-bar";
import { DEFAULT_INDICATOR_FILTERS } from "@/features/indicator-filter/model/types";
import type { IndicatorCategoryFilter } from "@/features/indicator-filter/model/types";
import { formatPercent } from "@/shared/lib/utils";
import { useTranslation } from "@/shared/lib/i18n/use-translation";

const CATEGORY_TABS: { value: IndicatorCategoryFilter; labelKey: string }[] = [
  { value: "all", labelKey: "category.all" },
  { value: "inflation", labelKey: "category.inflation" },
  { value: "growth", labelKey: "category.growth" },
  { value: "rates", labelKey: "category.rates" },
  { value: "employment", labelKey: "category.employment" },
  { value: "trade", labelKey: "category.trade" },
  { value: "monetary", labelKey: "category.monetary" },
];

export function IndicatorsPage() {
  const { data: indicators, isLoading, isError } = useIndicators();
  const [filters, setFilters] = React.useState(DEFAULT_INDICATOR_FILTERS);
  const { t } = useTranslation();

  const regions = Array.from(new Set((indicators ?? []).map((i) => i.region))).sort();

  const filtered = (indicators ?? []).filter((indicator) => {
    const matchesSearch = indicator.name.toLowerCase().includes(filters.search.toLowerCase());
    const matchesRegion = filters.region === "all" || indicator.region === filters.region;
    const matchesCategory = filters.category === "all" || indicator.category === filters.category;
    return matchesSearch && matchesRegion && matchesCategory;
  });

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle />
        <AlertTitle>{t("indicatorsPage.errorTitle")}</AlertTitle>
        <AlertDescription>{t("indicatorsPage.errorDescription")}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">{t("indicatorsPage.title")}</h1>
        <p className="text-sm text-muted-foreground">{t("indicatorsPage.subtitle")}</p>
      </div>

      <IndicatorFilterBar filters={filters} regions={regions} onChange={setFilters} />

      <Tabs
        value={filters.category}
        onValueChange={(value) => setFilters({ ...filters, category: value as IndicatorCategoryFilter })}
      >
        <TabsList className="flex-wrap">
          {CATEGORY_TABS.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {t(tab.labelKey)}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <Card>
        <CardContent className="pt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("indicatorsPage.indicator")}</TableHead>
                <TableHead>{t("indicatorsPage.region")}</TableHead>
                <TableHead>{t("indicatorsPage.source")}</TableHead>
                <TableHead className="text-right">{t("indicatorsPage.value")}</TableHead>
                <TableHead className="text-right">{t("indicatorsPage.change")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading &&
                Array.from({ length: 6 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={5}>
                      <Skeleton className="h-5 w-full" />
                    </TableCell>
                  </TableRow>
                ))}
              {!isLoading && filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                    {t("indicatorsPage.noResults")}
                  </TableCell>
                </TableRow>
              )}
              {!isLoading &&
                filtered.map((indicator) => (
                  <TableRow key={indicator.code}>
                    <TableCell>
                      <Link to={`/indicators/${indicator.code}`} className="font-medium hover:text-primary hover:underline">
                        {indicator.name}
                      </Link>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{indicator.region}</TableCell>
                    <TableCell className="text-muted-foreground">{indicator.sourceCode}</TableCell>
                    <TableCell className="tabular-data text-right">
                      {indicator.unit === "%" ? formatPercent(indicator.value) : `${indicator.value} ${indicator.unit}`}
                    </TableCell>
                    <TableCell className="text-right">
                      <TrendBadge trend={indicator.trend} change={indicator.change} unit="pp" className="justify-end" />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
