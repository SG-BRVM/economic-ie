import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/shared/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandItem,
} from "@/shared/ui/command";
import { useIndicators } from "@/entities/economic-indicator/api/queries";
import { useSources } from "@/entities/economic-source/api/queries";
import { useTranslation } from "@/shared/lib/i18n/use-translation";

export function GlobalSearch() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const { data: indicators } = useIndicators();
  const { data: sources } = useSources();
  const { t } = useTranslation();

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="w-full max-w-sm justify-start gap-2 text-muted-foreground md:w-64"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">{t("topbar.searchPlaceholder")}</span>
        <span className="sm:hidden">{t("topbar.searchShort")}</span>
        <kbd className="ml-auto hidden rounded border border-border bg-secondary px-1.5 py-0.5 text-[10px] font-medium sm:inline-block">
          ⌘K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder={t("command.placeholder")} />
        <CommandList>
          <CommandEmpty>{t("command.empty")}</CommandEmpty>
          <CommandGroup heading={t("command.groupIndicators")}>
            {(indicators ?? []).slice(0, 6).map((ind) => (
              <CommandItem
                key={ind.code}
                onSelect={() => {
                  setOpen(false);
                  navigate(`/indicators/${ind.code}`);
                }}
              >
                {ind.name} - {ind.region}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading={t("command.groupSources")}>
            {(sources ?? []).slice(0, 6).map((src) => (
              <CommandItem
                key={src.id}
                onSelect={() => {
                  setOpen(false);
                  navigate("/sources");
                }}
              >
                {src.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
