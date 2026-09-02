import * as React from "react";
import { ArrowDown, ArrowRight, ArrowUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Separator } from "@/shared/ui/separator";
import { GenerateAnalysisForm } from "@/features/generate-analysis/ui/generate-analysis-form";
import { useLatestAnalysis } from "@/widgets/latest-analysis/api";
import { useTranslation } from "@/shared/lib/i18n/use-translation";
import type { EconomicAnalysis } from "@/shared/api/mock/analysis";

const STANCE_VARIANT: Record<string, "positive" | "negative" | "warning" | "secondary"> = {
  Positive: "positive",
  Negative: "negative",
  Moderate: "warning",
  Neutral: "secondary",
};

const RISK_ICON = { up: ArrowUp, down: ArrowDown, flat: ArrowRight };

export function EconomicAnalysisPage() {
  const { data: latest } = useLatestAnalysis();
  const [analysis, setAnalysis] = React.useState<EconomicAnalysis | undefined>(undefined);
  const shown = analysis ?? latest;
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">{t("analysisPage.title")}</h1>
        <p className="text-sm text-muted-foreground">{t("analysisPage.subtitle")}</p>
      </div>

      <Card>
        <CardContent className="pt-4">
          <GenerateAnalysisForm onGenerated={setAnalysis} />
        </CardContent>
      </Card>

      {shown && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                {t("analysisPage.regimeTitle")} - {shown.region}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-4">
              <p className="text-2xl font-semibold">{shown.regime}</p>
              <Badge>{t("analysisPage.confidence", { value: shown.confidence })}</Badge>
              <span className="text-sm text-muted-foreground">{shown.period}</span>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("analysisPage.keyDevelopments")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {shown.keyDevelopments.map((point, i) => (
                <p key={i} className="text-sm leading-relaxed">
                  {point}
                </p>
              ))}
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{t("analysisPage.marketImplications")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {shown.marketImplications.map((item) => (
                  <div key={item.asset} className="flex items-center justify-between text-sm">
                    <span>{item.asset}</span>
                    <Badge variant={STANCE_VARIANT[item.stance] ?? "secondary"}>{item.stance}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("analysisPage.risks")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {shown.risks.map((risk) => {
                  const Icon = RISK_ICON[risk.direction];
                  return (
                    <div key={risk.label} className="flex items-center justify-between text-sm">
                      <span>{risk.label}</span>
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t("analysisPage.sources")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {shown.sources.map((source) => (
                  <Badge key={source} variant="outline">
                    {source}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Separator />
      <p className="text-xs text-muted-foreground">{t("analysisPage.footnote")}</p>
    </div>
  );
}
