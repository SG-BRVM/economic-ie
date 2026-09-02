import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test/test-utils";
import { SidebarNav } from "../sidebar-nav";

describe("SidebarNav", () => {
  it("renders all navigation sections and items", () => {
    renderWithProviders(<SidebarNav />);
    expect(screen.getByText("Overview")).toBeInTheDocument();
    expect(screen.getByText("Sources")).toBeInTheDocument();
    expect(screen.getByText("Indicators")).toBeInTheDocument();
    expect(screen.getByText("Analysis")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("calls onNavigate when a nav link is clicked", async () => {
    let called = false;
    renderWithProviders(<SidebarNav onNavigate={() => (called = true)} />);
    screen.getByText("Sources").click();
    expect(called).toBe(true);
  });
});
