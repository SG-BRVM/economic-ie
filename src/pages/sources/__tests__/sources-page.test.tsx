import { describe, it, expect } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "@/test/test-utils";
import { SourcesPage } from "../sources-page";

describe("SourcesPage", () => {
  it("renders the source table once data loads", async () => {
    renderWithProviders(<SourcesPage />);
    await waitFor(() => {
      expect(screen.getByText("Bank Al-Maghrib")).toBeInTheDocument();
    });
  });

  it("filters sources by search term", async () => {
    const user = userEvent.setup();
    renderWithProviders(<SourcesPage />);
    await waitFor(() => expect(screen.getByText("Bank Al-Maghrib")).toBeInTheDocument());

    const searchInput = screen.getByPlaceholderText("Search sources...");
    await user.type(searchInput, "BCEAO");

    await waitFor(() => {
      expect(screen.queryByText("Bank Al-Maghrib")).not.toBeInTheDocument();
    });
  });
});
