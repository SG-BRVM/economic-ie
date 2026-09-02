import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { Skeleton } from "@/shared/ui/skeleton";
import { useIndicators } from "@/entities/economic-indicator/api/queries";
import { TrendBadge } from "@/entities/economic-indicator/ui/trend-badge";
import { formatPercent } from "@/shared/lib/utils";
import { useTranslation } from "@/shared/lib/i18n/use-translation";

export function MarketOverview() {
  const { data: indicators, isLoading } = useIndicators();
  const rates = indicators?.filter((i) => i.category === "rates") ?? [];
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("marketOverview.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("marketOverview.region")}</TableHead>
              <TableHead>{t("marketOverview.source")}</TableHead>
              <TableHead className="text-right">{t("marketOverview.rate")}</TableHead>
              <TableHead className="text-right">{t("marketOverview.change")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading &&
              Array.from({ length: 4 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={4}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                </TableRow>
              ))}
            {!isLoading &&
              rates.map((rate) => (
                <TableRow key={rate.code}>
                  <TableCell className="font-medium">{rate.region}</TableCell>
                  <TableCell className="text-muted-foreground">{rate.sourceCode}</TableCell>
                  <TableCell className="tabular-data text-right">{formatPercent(rate.value)}</TableCell>
                  <TableCell className="text-right">
                    <TrendBadge trend={rate.trend} change={rate.change} unit="pp" invert className="justify-end" />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
