import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Database,
  LineChart,
  BrainCircuit,
  CalendarClock,
  FileText,
  Settings,
} from "lucide-react";

export interface NavItem {
  labelKey: string;
  to: string;
  icon: LucideIcon;
}

export interface NavSection {
  titleKey: string | null;
  items: NavItem[];
}

export const NAV_SECTIONS: NavSection[] = [
  {
    titleKey: null,
    items: [{ labelKey: "sidebar.overview", to: "/dashboard", icon: LayoutDashboard }],
  },
  {
    titleKey: "sidebar.data",
    items: [
      { labelKey: "sidebar.sources", to: "/sources", icon: Database },
      { labelKey: "sidebar.indicators", to: "/indicators", icon: LineChart },
    ],
  },
  {
    titleKey: "sidebar.research",
    items: [
      { labelKey: "sidebar.analysis", to: "/analysis", icon: BrainCircuit },
      { labelKey: "sidebar.events", to: "/events", icon: CalendarClock },
      { labelKey: "sidebar.reports", to: "/reports", icon: FileText },
    ],
  },
  {
    titleKey: "sidebar.system",
    items: [{ labelKey: "sidebar.settings", to: "/settings", icon: Settings }],
  },
];
