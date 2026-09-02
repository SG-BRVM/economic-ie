import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { ThemeProvider } from "@/app/providers/theme-provider";
import { QueryProvider } from "@/app/providers/query-provider";
import { router } from "@/app/router";
import { useLangStore } from "@/shared/lib/i18n/store";

function App() {
  const lang = useLangStore((state) => state.lang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <ThemeProvider>
      <QueryProvider>
        <RouterProvider router={router} />
      </QueryProvider>
    </ThemeProvider>
  );
}

export default App;
