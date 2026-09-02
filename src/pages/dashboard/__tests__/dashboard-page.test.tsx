import { describe, it, expect } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "@/test/test-utils";
import { DashboardPage } from "../dashboard-page";

describe("DashboardPage", () => {
  it("shows loading skeletons then renders overview indicators", async () => {
    renderWithProviders(<DashboardPage />);
    expect(screen.getByText("Economic Overview")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Liquidity")).toBeInTheDocument();
    });
    expect(screen.getByText("GDP Growth")).toBeInTheDocument();
    expect(screen.getAllByText("Inflation").length).toBeGreaterThan(0);
  });
});
