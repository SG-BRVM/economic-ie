import { Card, CardContent } from "@/shared/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";
import { AlertCircle } from "lucide-react";
import { useSources } from "@/entities/economic-source/api/queries";
import { useSourceTable } from "@/features/source-management/model/use-source-table";
import { SourceFilterBar } from "@/features/source-management/ui/source-filter-bar";
import { SourceTable } from "@/features/source-management/ui/source-table";
import { TablePagination } from "@/features/source-management/ui/table-pagination";
import { useTranslation } from "@/shared/lib/i18n/use-translation";

export function SourcesPage() {
  const { data: sources, isLoading, isError } = useSources();
  const table = useSourceTable(sources);
  const regions = Array.from(new Set((sources ?? []).map((s) => s.region))).sort();
  const { t } = useTranslation();

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle />
        <AlertTitle>{t("sourcesPage.errorTitle")}</AlertTitle>
        <AlertDescription>{t("sourcesPage.errorDescription")}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">{t("sourcesPage.title")}</h1>
        <p className="text-sm text-muted-foreground">{t("sourcesPage.subtitle")}</p>
      </div>

      <Card>
        <CardContent className="space-y-4 pt-4">
          <SourceFilterBar filters={table.filters} regions={regions} onChange={table.updateFilters} />
          <SourceTable
            rows={table.rows}
            isLoading={isLoading}
            sortKey={table.sortKey}
            sortDirection={table.sortDirection}
            onSort={table.toggleSort}
          />
          {!isLoading && (
            <TablePagination
              page={table.page}
              totalPages={table.totalPages}
              totalCount={table.totalCount}
              onPageChange={table.setPage}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
