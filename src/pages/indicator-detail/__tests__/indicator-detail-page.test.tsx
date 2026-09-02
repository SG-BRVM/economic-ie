import { describe, it, expect } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render } from "@testing-library/react";
import { IndicatorDetailPage } from "../indicator-detail-page";

function renderAtIndicator(code: string) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={[`/indicators/${code}`]}>
        <Routes>
          <Route path="/indicators/:indicatorCode" element={<IndicatorDetailPage />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
}

describe("IndicatorDetailPage", () => {
  it("renders indicator details for a valid code", async () => {
    renderAtIndicator("MA-INFLATION");
    await waitFor(() => {
      expect(screen.getByText(/Inflation - Morocco/)).toBeInTheDocument();
    });
    expect(screen.getByText("Value")).toBeInTheDocument();
    expect(screen.getByText("Previous")).toBeInTheDocument();
  });

  it("shows an error state for an unknown code", async () => {
    renderAtIndicator("DOES-NOT-EXIST");
    await waitFor(() => {
      expect(screen.getByText("Indicator not found")).toBeInTheDocument();
    });
  });
});
