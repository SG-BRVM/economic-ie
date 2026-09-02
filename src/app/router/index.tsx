import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppLayout } from "@/app/layout";
import { DashboardPage } from "@/pages/dashboard/dashboard-page";
import { SourcesPage } from "@/pages/sources/sources-page";
import { IndicatorsPage } from "@/pages/indicators/indicators-page";
import { IndicatorDetailPage } from "@/pages/indicator-detail/indicator-detail-page";
import { EconomicAnalysisPage } from "@/pages/economic-analysis/economic-analysis-page";
import { ComingSoonPage } from "@/pages/placeholder/coming-soon-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "sources", element: <SourcesPage /> },
      { path: "indicators", element: <IndicatorsPage /> },
      { path: "indicators/:indicatorCode", element: <IndicatorDetailPage /> },
      { path: "analysis", element: <EconomicAnalysisPage /> },
      { path: "events", element: <ComingSoonPage messageKey="placeholder.eventsComingSoon" /> },
      { path: "reports", element: <ComingSoonPage messageKey="placeholder.reportsComingSoon" /> },
      { path: "settings", element: <ComingSoonPage messageKey="placeholder.settingsComingSoon" /> },
      { path: "*", element: <ComingSoonPage messageKey="placeholder.notFound" /> },
    ],
  },
]);
