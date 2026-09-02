import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/widgets/app-sidebar/app-sidebar";
import { Topbar } from "@/widgets/topbar/topbar";

export function AppLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto">
          <div className="container max-w-none py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
