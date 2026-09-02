import { describe, it, expect } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "@/test/test-utils";
import { IndicatorsPage } from "../indicators-page";

describe("IndicatorsPage", () => {
  it("renders indicators once loaded and links to their detail page", async () => {
    renderWithProviders(<IndicatorsPage />);
    await waitFor(() => {
      const links = screen.getAllByRole("link", { name: "Inflation" });
      expect(links.some((link) => link.getAttribute("href") === "/indicators/MA-INFLATION")).toBe(
        true
      );
    });
  });
});
