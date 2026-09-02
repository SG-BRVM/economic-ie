import { useCallback } from "react";
import { useLangStore } from "./store";
import { translations } from "./translations";

type Vars = Record<string, string | number>;

function interpolate(template: string, vars?: Vars): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, key) => (key in vars ? String(vars[key]) : match));
}

export function useTranslation() {
  const lang = useLangStore((state) => state.lang);
  const setLang = useLangStore((state) => state.setLang);

  const t = useCallback(
    (key: string, vars?: Vars) => {
      const dict = translations[lang];
      const template = dict[key] ?? translations.en[key] ?? key;
      return interpolate(template, vars);
    },
    [lang]
  );

  return { t, lang, setLang };
}
