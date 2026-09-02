import { describe, it, expect, beforeEach } from "vitest";
import { act } from "@testing-library/react";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test/test-utils";
import { ThemeProvider } from "@/app/providers/theme-provider";
import { Topbar } from "@/widgets/topbar/topbar";
import { useLangStore } from "@/shared/lib/i18n/store";

describe("Language switching", () => {
  beforeEach(() => {
    useLangStore.setState({ lang: "en" });
  });

  it("renders topbar text in English by default, then in French once the store language changes", () => {
    renderWithProviders(
      <ThemeProvider>
        <Topbar />
      </ThemeProvider>
    );

    expect(screen.getByText("Search economic data...")).toBeInTheDocument();

    act(() => {
      useLangStore.getState().setLang("fr");
    });

    expect(screen.getByText("Rechercher des données économiques...")).toBeInTheDocument();
    expect(screen.queryByText("Search economic data...")).not.toBeInTheDocument();
  });
});
