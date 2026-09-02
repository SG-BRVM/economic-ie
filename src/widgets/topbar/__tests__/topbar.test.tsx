import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test/test-utils";
import { ThemeProvider } from "@/app/providers/theme-provider";
import { Topbar } from "../topbar";

describe("Topbar", () => {
  it("renders the global search trigger and theme toggle", () => {
    renderWithProviders(
      <ThemeProvider>
        <Topbar />
      </ThemeProvider>
    );
    expect(screen.getByRole("button", { name: /toggle theme/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /notifications/i })).toBeInTheDocument();
  });
});
