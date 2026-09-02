import { Search } from "lucide-react";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { useTranslation } from "@/shared/lib/i18n/use-translation";
import type { IndicatorFilters } from "../model/types";

interface IndicatorFilterBarProps {
  filters: IndicatorFilters;
  regions: string[];
  onChange: (filters: IndicatorFilters) => void;
}

export function IndicatorFilterBar({ filters, regions, onChange }: IndicatorFilterBarProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={t("indicatorsPage.searchPlaceholder")}
          className="pl-8"
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
        />
      </div>

      <Select
        value={filters.region}
        onValueChange={(region) => onChange({ ...filters, region })}
      >
        <SelectTrigger className="sm:w-44">
          <SelectValue placeholder={t("sourcesPage.allRegions")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t("sourcesPage.allRegions")}</SelectItem>
          {regions.map((region) => (
            <SelectItem key={region} value={region}>
              {region}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
