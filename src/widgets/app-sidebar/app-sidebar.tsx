import { SidebarNav } from "./sidebar-nav";

export function AppSidebar() {
  return (
    <aside className="hidden w-60 shrink-0 border-r border-border bg-card md:block">
      <SidebarNav />
    </aside>
  );
}
