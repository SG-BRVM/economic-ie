import { ArrowUpDown } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";
import { SourceStatusBadge } from "@/entities/economic-source/ui/source-status-badge";
import { useTranslation } from "@/shared/lib/i18n/use-translation";
import { formatDate } from "@/shared/lib/utils";
import type { EconomicSource } from "@/entities/economic-source/model/types";
import type { SourceSortKey, SortDirection } from "../model/types";

interface SourceTableProps {
  rows: EconomicSource[];
  isLoading: boolean;
  sortKey: SourceSortKey;
  sortDirection: SortDirection;
  onSort: (key: SourceSortKey) => void;
}

function SortableHead({
  label,
  sortKey,
  activeKey,
  direction,
  onSort,
}: {
  label: string;
  sortKey: SourceSortKey;
  activeKey: SourceSortKey;
  direction: SortDirection;
  onSort: (key: SourceSortKey) => void;
}) {
  return (
    <TableHead>
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-7 gap-1 text-xs font-medium uppercase tracking-wide text-muted-foreground hover:text-foreground"
        onClick={() => onSort(sortKey)}
      >
        {label}
        <ArrowUpDown className="h-3 w-3" />
        {activeKey === sortKey && <span className="sr-only">({direction})</span>}
      </Button>
    </TableHead>
  );
}

export function SourceTable({ rows, isLoading, sortKey, sortDirection, onSort }: SourceTableProps) {
  const { t } = useTranslation();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <SortableHead label={t("sourcesPage.name")} sortKey="name" activeKey={sortKey} direction={sortDirection} onSort={onSort} />
          <SortableHead label={t("indicatorsPage.region")} sortKey="region" activeKey={sortKey} direction={sortDirection} onSort={onSort} />
          <TableHead>{t("sourcesPage.type")}</TableHead>
          <SortableHead label={t("sourcesPage.status")} sortKey="status" activeKey={sortKey} direction={sortDirection} onSort={onSort} />
          <SortableHead
            label={t("sourcesPage.indicators")}
            sortKey="indicatorsCount"
            activeKey={sortKey}
            direction={sortDirection}
            onSort={onSort}
          />
          <TableHead>{t("sourcesPage.lastSync")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading &&
          Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell colSpan={6}>
                <Skeleton className="h-5 w-full" />
              </TableCell>
            </TableRow>
          ))}
        {!isLoading && rows.length === 0 && (
          <TableRow>
            <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
              {t("sourcesPage.noResults")}
            </TableCell>
          </TableRow>
        )}
        {!isLoading &&
          rows.map((source) => (
            <TableRow key={source.id}>
              <TableCell className="font-medium">
                {source.name}
                <span className="ml-2 text-xs text-muted-foreground">{source.code}</span>
              </TableCell>
              <TableCell>{source.region}</TableCell>
              <TableCell className="capitalize text-muted-foreground">{source.type.replace("-", " ")}</TableCell>
              <TableCell>
                <SourceStatusBadge status={source.status} />
              </TableCell>
              <TableCell className="tabular-data">{source.indicatorsCount}</TableCell>
              <TableCell className="text-muted-foreground">{formatDate(source.lastSync)}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
