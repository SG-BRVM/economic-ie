export const LANGUAGES = ["en", "fr"] as const;
export type Lang = (typeof LANGUAGES)[number];

export const LANGUAGE_LABELS: Record<Lang, string> = {
  en: "English",
  fr: "Français",
};

/**
 * Flat dictionary of translation keys. Namespaced with dots
 * (e.g. "sidebar.overview") to keep things organized as the app grows.
 */
export const translations: Record<Lang, Record<string, string>> = {
  en: {
    // Sidebar
    "sidebar.appName": "Economic Intelligence",
    "sidebar.overview": "Overview",
    "sidebar.data": "Data",
    "sidebar.sources": "Sources",
    "sidebar.indicators": "Indicators",
    "sidebar.research": "Research",
    "sidebar.analysis": "Analysis",
    "sidebar.events": "Events",
    "sidebar.reports": "Reports",
    "sidebar.system": "System",
    "sidebar.settings": "Settings",

    // Topbar
    "topbar.searchPlaceholder": "Search economic data...",
    "topbar.searchShort": "Search...",
    "topbar.toggleTheme": "Toggle theme",
    "topbar.toggleThemeTo": "Toggle {mode} mode",
    "topbar.light": "light",
    "topbar.dark": "dark",
    "topbar.notifications": "Notifications",
    "topbar.profileMenu": "Profile menu",
    "topbar.researchDesk": "Research Desk",
    "topbar.settings": "Settings",
    "topbar.signOut": "Sign out",
    "topbar.language": "Language",

    // Command / global search
    "command.placeholder": "Search indicators, sources, events, analyses...",
    "command.empty": "No results found.",
    "command.groupIndicators": "Indicators",
    "command.groupSources": "Sources",

    // Dashboard
    "dashboard.title": "Economic Overview",
    "dashboard.subtitle": "Morocco - updated as of today",
    "dashboard.liquidity": "Liquidity",
    "dashboard.liquidityNormal": "Normal",
    "dashboard.liquidityDescription": "Money market conditions",

    // Economic calendar
    "calendar.title": "Economic Events",
    "calendar.source": "Source",
    "calendar.event": "Event",
    "calendar.date": "Date",
    "calendar.value": "Value",

    // Source status
    "sourceStatus.title": "Source Status",
    "sourceStatus.active": "Active",
    "sourceStatus.degraded": "Degraded",
    "sourceStatus.inactive": "Inactive",

    // Latest analysis
    "latestAnalysis.title": "Latest AI Analysis",
    "latestAnalysis.regime": "Economic Regime",
    "latestAnalysis.confidence": "Confidence",
    "latestAnalysis.keyDriver": "Key Driver",

    // Market overview
    "marketOverview.title": "Policy Rates - Global Overview",
    "marketOverview.region": "Region",
    "marketOverview.source": "Source",
    "marketOverview.rate": "Rate",
    "marketOverview.change": "Change",

    // Sources page
    "sourcesPage.title": "Sources",
    "sourcesPage.subtitle": "Economic data providers connected to the platform",
    "sourcesPage.searchPlaceholder": "Search sources...",
    "sourcesPage.allRegions": "All regions",
    "sourcesPage.allStatuses": "All statuses",
    "sourcesPage.status": "Status",
    "sourcesPage.name": "Name",
    "sourcesPage.type": "Type",
    "sourcesPage.indicators": "Indicators",
    "sourcesPage.lastSync": "Last Sync",
    "sourcesPage.noResults": "No sources match your filters.",
    "sourcesPage.errorTitle": "Unable to load sources",
    "sourcesPage.errorDescription": "Please retry in a moment.",
    "pagination.results": "{count} result(s) - page {page} of {totalPages}",

    // Indicators page
    "indicatorsPage.title": "Economic Indicators",
    "indicatorsPage.subtitle": "Browse and filter indicators across all sources",
    "indicatorsPage.searchPlaceholder": "Search indicators...",
    "indicatorsPage.indicator": "Indicator",
    "indicatorsPage.region": "Region",
    "indicatorsPage.source": "Source",
    "indicatorsPage.value": "Value",
    "indicatorsPage.change": "Change",
    "indicatorsPage.noResults": "No indicators match your filters.",
    "indicatorsPage.errorTitle": "Unable to load indicators",
    "indicatorsPage.errorDescription": "Please retry in a moment.",
    "category.all": "All",
    "category.inflation": "Inflation",
    "category.growth": "Growth",
    "category.rates": "Rates",
    "category.employment": "Employment",
    "category.trade": "Trade",
    "category.monetary": "Monetary",

    // Indicator detail
    "indicatorDetail.back": "Back to indicators",
    "indicatorDetail.notFoundTitle": "Indicator not found",
    "indicatorDetail.sourceLabel": "Source",
    "indicatorDetail.frequencyLabel": "Frequency",
    "indicatorDetail.value": "Value",
    "indicatorDetail.previous": "Previous",
    "indicatorDetail.change": "Change",
    "indicatorDetail.source": "Source",
    "indicatorDetail.historical": "Historical",
    "indicatorDetail.compareWith": "Compare With",
    "indicatorDetail.selectIndicator": "Select an indicator",

    // Generate analysis
    "generateAnalysis.region": "Region",
    "generateAnalysis.period": "Period",
    "generateAnalysis.generate": "Generate Analysis",

    // Economic analysis page
    "analysisPage.title": "Economic Analysis",
    "analysisPage.subtitle": "AI-generated economic regime analysis (mocked - will call the FastAPI + LLM backend)",
    "analysisPage.regimeTitle": "Economic Regime",
    "analysisPage.confidence": "{value}% confidence",
    "analysisPage.keyDevelopments": "Key Developments",
    "analysisPage.marketImplications": "Market Implications",
    "analysisPage.risks": "Risks",
    "analysisPage.sources": "Sources",
    "analysisPage.footnote": "\"Generate Analysis\" currently returns mocked data. It is wired as a self-contained feature (features/generate-analysis) so it can call the FastAPI hexagonal backend + LLM without further changes to this page.",

    // Misc placeholder pages
    "placeholder.eventsComingSoon": "Events calendar - coming soon.",
    "placeholder.reportsComingSoon": "Reports - coming soon.",
    "placeholder.settingsComingSoon": "Settings - coming soon.",
    "placeholder.notFound": "Page not found.",
  },
  fr: {
    // Sidebar
    "sidebar.appName": "Economic Intelligence",
    "sidebar.overview": "Vue d'ensemble",
    "sidebar.data": "Données",
    "sidebar.sources": "Sources",
    "sidebar.indicators": "Indicateurs",
    "sidebar.research": "Recherche",
    "sidebar.analysis": "Analyse",
    "sidebar.events": "Événements",
    "sidebar.reports": "Rapports",
    "sidebar.system": "Système",
    "sidebar.settings": "Paramètres",

    // Topbar
    "topbar.searchPlaceholder": "Rechercher des données économiques...",
    "topbar.searchShort": "Rechercher...",
    "topbar.toggleTheme": "Changer de thème",
    "topbar.toggleThemeTo": "Passer en mode {mode}",
    "topbar.light": "clair",
    "topbar.dark": "sombre",
    "topbar.notifications": "Notifications",
    "topbar.profileMenu": "Menu du profil",
    "topbar.researchDesk": "Pôle Recherche",
    "topbar.settings": "Paramètres",
    "topbar.signOut": "Déconnexion",
    "topbar.language": "Langue",

    // Command / global search
    "command.placeholder": "Rechercher indicateurs, sources, événements, analyses...",
    "command.empty": "Aucun résultat trouvé.",
    "command.groupIndicators": "Indicateurs",
    "command.groupSources": "Sources",

    // Dashboard
    "dashboard.title": "Vue d'ensemble économique",
    "dashboard.subtitle": "Maroc - mis à jour aujourd'hui",
    "dashboard.liquidity": "Liquidité",
    "dashboard.liquidityNormal": "Normale",
    "dashboard.liquidityDescription": "Conditions du marché monétaire",

    // Economic calendar
    "calendar.title": "Événements économiques",
    "calendar.source": "Source",
    "calendar.event": "Événement",
    "calendar.date": "Date",
    "calendar.value": "Valeur",

    // Source status
    "sourceStatus.title": "Statut des sources",
    "sourceStatus.active": "Active",
    "sourceStatus.degraded": "Dégradée",
    "sourceStatus.inactive": "Inactive",

    // Latest analysis
    "latestAnalysis.title": "Dernière analyse IA",
    "latestAnalysis.regime": "Régime économique",
    "latestAnalysis.confidence": "Confiance",
    "latestAnalysis.keyDriver": "Facteur clé",

    // Market overview
    "marketOverview.title": "Taux directeurs - vue mondiale",
    "marketOverview.region": "Région",
    "marketOverview.source": "Source",
    "marketOverview.rate": "Taux",
    "marketOverview.change": "Variation",

    // Sources page
    "sourcesPage.title": "Sources",
    "sourcesPage.subtitle": "Fournisseurs de données économiques connectés à la plateforme",
    "sourcesPage.searchPlaceholder": "Rechercher des sources...",
    "sourcesPage.allRegions": "Toutes les régions",
    "sourcesPage.allStatuses": "Tous les statuts",
    "sourcesPage.status": "Statut",
    "sourcesPage.name": "Nom",
    "sourcesPage.type": "Type",
    "sourcesPage.indicators": "Indicateurs",
    "sourcesPage.lastSync": "Dernière synchro",
    "sourcesPage.noResults": "Aucune source ne correspond à vos filtres.",
    "sourcesPage.errorTitle": "Impossible de charger les sources",
    "sourcesPage.errorDescription": "Veuillez réessayer dans un instant.",
    "pagination.results": "{count} résultat(s) - page {page} sur {totalPages}",

    // Indicators page
    "indicatorsPage.title": "Indicateurs économiques",
    "indicatorsPage.subtitle": "Parcourir et filtrer les indicateurs de toutes les sources",
    "indicatorsPage.searchPlaceholder": "Rechercher des indicateurs...",
    "indicatorsPage.indicator": "Indicateur",
    "indicatorsPage.region": "Région",
    "indicatorsPage.source": "Source",
    "indicatorsPage.value": "Valeur",
    "indicatorsPage.change": "Variation",
    "indicatorsPage.noResults": "Aucun indicateur ne correspond à vos filtres.",
    "indicatorsPage.errorTitle": "Impossible de charger les indicateurs",
    "indicatorsPage.errorDescription": "Veuillez réessayer dans un instant.",
    "category.all": "Tous",
    "category.inflation": "Inflation",
    "category.growth": "Croissance",
    "category.rates": "Taux",
    "category.employment": "Emploi",
    "category.trade": "Commerce",
    "category.monetary": "Monétaire",

    // Indicator detail
    "indicatorDetail.back": "Retour aux indicateurs",
    "indicatorDetail.notFoundTitle": "Indicateur introuvable",
    "indicatorDetail.sourceLabel": "Source",
    "indicatorDetail.frequencyLabel": "Fréquence",
    "indicatorDetail.value": "Valeur",
    "indicatorDetail.previous": "Précédent",
    "indicatorDetail.change": "Variation",
    "indicatorDetail.source": "Source",
    "indicatorDetail.historical": "Historique",
    "indicatorDetail.compareWith": "Comparer avec",
    "indicatorDetail.selectIndicator": "Sélectionner un indicateur",

    // Generate analysis
    "generateAnalysis.region": "Région",
    "generateAnalysis.period": "Période",
    "generateAnalysis.generate": "Générer l'analyse",

    // Economic analysis page
    "analysisPage.title": "Analyse économique",
    "analysisPage.subtitle": "Analyse de régime économique générée par IA (données simulées - appellera le backend FastAPI + LLM)",
    "analysisPage.regimeTitle": "Régime économique",
    "analysisPage.confidence": "Confiance de {value}%",
    "analysisPage.keyDevelopments": "Faits marquants",
    "analysisPage.marketImplications": "Implications de marché",
    "analysisPage.risks": "Risques",
    "analysisPage.sources": "Sources",
    "analysisPage.footnote": "« Générer l'analyse » renvoie actuellement des données simulées. C'est une feature autonome (features/generate-analysis) afin de pouvoir appeler le backend FastAPI hexagonal + LLM sans modifier cette page.",

    // Misc placeholder pages
    "placeholder.eventsComingSoon": "Calendrier des événements - bientôt disponible.",
    "placeholder.reportsComingSoon": "Rapports - bientôt disponibles.",
    "placeholder.settingsComingSoon": "Paramètres - bientôt disponibles.",
    "placeholder.notFound": "Page introuvable.",
  },
};
