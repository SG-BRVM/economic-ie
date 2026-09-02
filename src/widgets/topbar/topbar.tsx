import * as React from "react";
import { Menu, Bell, Sun, Moon, User, LogOut, Settings, Languages } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/shared/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/shared/ui/tooltip";
import { useTheme } from "@/app/providers/theme-provider";
import { useTranslation } from "@/shared/lib/i18n/use-translation";
import { LANGUAGES, LANGUAGE_LABELS } from "@/shared/lib/i18n/translations";
import { SidebarNav } from "@/widgets/app-sidebar/sidebar-nav";
import { GlobalSearch } from "@/features/economic-search/ui/global-search";

const REGIONS = ["Morocco", "WAEMU", "United States", "Euro Area", "Global"];

export function Topbar() {
  const { theme, toggleTheme } = useTheme();
  const { t, lang, setLang } = useTranslation();
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
  const [region, setRegion] = React.useState("Morocco");
  const [now] = React.useState(() =>
    new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date())
  );

  return (
    <TooltipProvider delayDuration={200}>
      <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/75">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileNavOpen(true)}
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
          <SheetContent side="left" className="w-64 p-0">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <SidebarNav onNavigate={() => setMobileNavOpen(false)} />
          </SheetContent>
        </Sheet>

        <GlobalSearch />

        <Select value={region} onValueChange={setRegion}>
          <SelectTrigger className="hidden w-40 sm:flex">
            <SelectValue placeholder="Region" />
          </SelectTrigger>
          <SelectContent>
            {REGIONS.map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <span className="tabular-data hidden text-xs text-muted-foreground lg:inline">{now}</span>

        <div className="ml-auto flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label={t("topbar.language")}>
                <Languages className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {LANGUAGES.map((code) => (
                <DropdownMenuItem
                  key={code}
                  onSelect={() => setLang(code)}
                  className={code === lang ? "font-medium text-primary" : undefined}
                >
                  {LANGUAGE_LABELS[code]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label={t("topbar.toggleTheme")}>
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {t("topbar.toggleThemeTo", { mode: theme === "dark" ? t("topbar.light") : t("topbar.dark") })}
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" aria-label={t("topbar.notifications")}>
                <Bell className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t("topbar.notifications")}</TooltipContent>
          </Tooltip>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label={t("topbar.profileMenu")}>
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t("topbar.researchDesk")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" /> {t("topbar.settings")}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" /> {t("topbar.signOut")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </TooltipProvider>
  );
}
