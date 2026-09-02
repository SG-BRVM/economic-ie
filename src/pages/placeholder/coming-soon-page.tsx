import { useTranslation } from "@/shared/lib/i18n/use-translation";

export function ComingSoonPage({ messageKey }: { messageKey: string }) {
  const { t } = useTranslation();
  return <div className="text-sm text-muted-foreground">{t(messageKey)}</div>;
}
