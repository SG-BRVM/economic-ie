import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { Skeleton } from "@/shared/ui/skeleton";
import { useEconomicEvents } from "./api";
import { useTranslation } from "@/shared/lib/i18n/use-translation";

export function EconomicCalendar() {
  const { data: events, isLoading } = useEconomicEvents();
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("calendar.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("calendar.source")}</TableHead>
              <TableHead>{t("calendar.event")}</TableHead>
              <TableHead>{t("calendar.date")}</TableHead>
              <TableHead className="text-right">{t("calendar.value")}</TableHead>
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
              events?.map((ev) => (
                <TableRow key={ev.id}>
                  <TableCell className="font-medium">{ev.sourceCode}</TableCell>
                  <TableCell>{ev.event}</TableCell>
                  <TableCell className="text-muted-foreground">{ev.date}</TableCell>
                  <TableCell className="tabular-data text-right">{ev.value ?? "-"}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
