export type Category = "intel" | "knowledge" | "data" | "ai" | "channel" | "constraint";

export interface Piece {
  id: string;
  naam: string;
  category: Category;
  icon: string; // lucide name
  uitleg: string;
  voegtToe: string[];
  heeftNodig: string[];
  sterkMet: string[]; // piece ids
}

export const PIECES: Piece[] = [
  // INTELLIGENTIE
  {
    id: "llm",
    naam: "Taalmodel (LLM)",
    category: "intel",
    icon: "Brain",
    uitleg: "Een generiek taalmodel dat tekst begrijpt, schrijft en samenvat.",
    voegtToe: ["personalisatie", "snelle contentcreatie", "klantgesprekken begrijpen"],
    heeftNodig: ["context, data of een merkgids"],
    sterkMet: ["vector_db", "documenten", "merkgids", "crm", "klantgesprekken", "email", "chatbot"],
  },
  {
    id: "achmeagpt",
    naam: "Eigen interne GPT",
    category: "intel",
    icon: "Sparkles",
    uitleg: "Intern taalmodel waarmee je klant- en bedrijfsdata veilig kunt gebruiken.",
    voegtToe: ["vertrouwen", "veilige personalisatie", "interne assistent"],
    heeftNodig: ["bedrijfsdata en duidelijke privacykaders"],
    sterkMet: ["schadedata", "vector_db", "klantgesprekken", "documenten", "polis_catalog", "merkgids", "privacy"],
  },
  {
    id: "copilot",
    naam: "Microsoft Copilot",
    category: "intel",
    icon: "Bot",
    uitleg: "AI-assistent binnen Microsoft 365 die helpt met mails, documenten en notities.",
    voegtToe: ["snellere service", "tijd voor het echte klantgesprek"],
    heeftNodig: ["documenten of mails om mee te werken"],
    sterkMet: ["documenten", "klantgesprekken"],
  },
  { id: "image_ai", naam: "Beeldgeneratie-AI", category: "intel", icon: "Image",
    uitleg: "Genereert visuals, campagnebeelden en illustraties op basis van een prompt.",
    voegtToe: ["snelle creatieve concepten", "visuele variatie voor campagnes"],
    heeftNodig: ["een merkgids om herkenbaar te blijven"],
    sterkMet: ["merkgids", "campagnedata", "email", "social_ads", "landingspagina", "ab_test"] },
  { id: "video_ai", naam: "Video-AI", category: "intel", icon: "Video",
    uitleg: "Maakt of personaliseert korte video's, bijvoorbeeld per klantgroep.",
    voegtToe: ["gepersonaliseerde uitleg", "snelle ad-varianten"],
    heeftNodig: ["script, merkstijl en kanaal"],
    sterkMet: ["merkgids", "social_ads", "campagnedata", "landingspagina"] },
  { id: "agent_ai", naam: "Autonome AI-agent", category: "intel", icon: "Workflow",
    uitleg: "Voert meerstaps-taken zelfstandig uit, bijv. een hele klantreis afhandelen.",
    voegtToe: ["automatisering van service", "next-best-action in realtime"],
    heeftNodig: ["duidelijke doelen, data en guardrails"],
    sterkMet: ["crm", "email", "chatbot", "vector_db", "next_best_action", "polis_catalog"] },
  { id: "sentiment_ai", naam: "Sentiment-AI", category: "intel", icon: "Smile",
    uitleg: "Herkent emotie en intentie in tekst of spraak.",
    voegtToe: ["empathischere service", "vroege signalen van ontevredenheid"],
    heeftNodig: ["tekst, mails of gesprekken om te analyseren"],
    sterkMet: ["klantgesprekken", "social_signals", "callcenter", "chatbot"] },
  { id: "translation_ai", naam: "Translation AI", category: "intel", icon: "Languages",
    uitleg: "Realtime vertaling tussen talen, met behoud van toon.",
    voegtToe: ["bredere doelgroep", "inclusievere service"],
    heeftNodig: ["bronteksten en merkgids"],
    sterkMet: ["merkgids", "email", "chatbot", "callcenter"] },

  // KENNIS
  {
    id: "vector_db",
    naam: "Vector Database",
    category: "knowledge",
    icon: "Database",
    uitleg: "Slaat informatie op op basis van betekenis, niet op exacte woorden.",
    voegtToe: ["AI met geheugen", "relevante context bij elk antwoord"],
    heeftNodig: ["documenten, gesprekken of polisinfo om te indexeren"],
    sterkMet: ["llm", "achmeagpt", "documenten", "klantgesprekken", "polis_catalog", "faq_lib"],
  },
  {
    id: "documenten",
    naam: "Documenten",
    category: "knowledge",
    icon: "FileText",
    uitleg: "Polissen, voorwaarden, handleidingen en beleidsstukken — geschreven kennis.",
    voegtToe: ["onderbouwde antwoorden", "consistente uitleg"],
    heeftNodig: ["een systeem dat ze kan doorzoeken"],
    sterkMet: ["vector_db", "copilot", "llm", "achmeagpt"],
  },
  {
    id: "klantgesprekken",
    naam: "Klantgesprekken",
    category: "knowledge",
    icon: "MessagesSquare",
    uitleg: "Transcripten, mailcontact en notities van interacties met klanten.",
    voegtToe: ["klantcontext", "intentieherkenning", "betere coaching"],
    heeftNodig: ["opslag met respect voor privacy"],
    sterkMet: ["vector_db", "voice_ai", "achmeagpt", "llm", "sentiment_ai", "privacy"],
  },
  { id: "polis_catalog", naam: "Productcatalogus polissen", category: "knowledge", icon: "BookOpen",
    uitleg: "Alle actuele polissen, dekkingen, premies en uitsluitingen op één plek.",
    voegtToe: ["relevant aanbod", "feitelijke productinfo in AI-antwoorden"],
    heeftNodig: ["een AI of regel die kiest wat past"],
    sterkMet: ["llm", "achmeagpt", "vector_db", "crm", "email", "next_best_action"] },
  { id: "merkgids", naam: "Merkgids & tone-of-voice", category: "knowledge", icon: "Palette",
    uitleg: "Schrijfstijl, kleuren en richtlijnen die het merk herkenbaar maken.",
    voegtToe: ["consistente uitingen", "merkconforme AI-output"],
    heeftNodig: ["AI die deze actief volgt"],
    sterkMet: ["llm", "achmeagpt", "image_ai", "video_ai", "email", "landingspagina", "chatbot"] },
  { id: "marktonderzoek", naam: "Marktonderzoek", category: "knowledge", icon: "Microscope",
    uitleg: "Inzichten in trends, behoeften en pijnpunten van klanten.",
    voegtToe: ["onderbouwing", "doelgroep-empathie"],
    heeftNodig: ["model of mens om patronen te vertalen naar proposities"],
    sterkMet: ["llm", "predictive_ai", "campagnedata", "propositiecanvas"] },
  { id: "concurrent_intel", naam: "Concurrentie-intel", category: "knowledge", icon: "Crosshair",
    uitleg: "Wat de concurrentie aanbiedt, prijst en communiceert.",
    voegtToe: ["scherpere positionering", "differentiatie"],
    heeftNodig: ["analyse-laag"],
    sterkMet: ["llm", "marktonderzoek", "propositiecanvas"] },
  { id: "faq_lib", naam: "FAQ-bibliotheek", category: "knowledge", icon: "HelpCircle",
    uitleg: "Veelgestelde vragen met goedgekeurde antwoorden.",
    voegtToe: ["self-service", "consistente antwoorden"],
    heeftNodig: ["ontsluiting via chat of zoek"],
    sterkMet: ["chatbot", "vector_db", "llm", "achmeagpt"] },
  { id: "propositiecanvas", naam: "Propositie-canvas", category: "knowledge", icon: "LayoutTemplate",
    uitleg: "Structuur om klantbehoefte, waarde en bewijs aan elkaar te koppelen.",
    voegtToe: ["scherpe proposities", "duidelijke waardepropositie per doelgroep"],
    heeftNodig: ["input vanuit data, onderzoek of campagnes"],
    sterkMet: ["marktonderzoek", "concurrent_intel", "crm", "campagnedata", "llm"] },

  // DATA
  {
    id: "iot",
    naam: "IoT Sensoren",
    category: "data",
    icon: "Radio",
    uitleg: "Slimme sensoren die realtime signalen geven (water, beweging, rook).",
    voegtToe: ["preventie", "vroege waarschuwing vóór schade"],
    heeftNodig: ["een model dat patronen herkent"],
    sterkMet: ["predictive_ai", "weerdata", "schadedata", "push", "mobile_app"],
  },
  {
    id: "schadedata",
    naam: "Schadedata",
    category: "data",
    icon: "FileWarning",
    uitleg: "Historische claims, oorzaken en uitkomsten van schades.",
    voegtToe: ["betere risico-inschatting", "fraudesignalen", "trendinzicht"],
    heeftNodig: ["model of analyse om er waarde uit te halen"],
    sterkMet: ["predictive_ai", "achmeagpt", "vector_db", "weerdata", "iot"],
  },
  {
    id: "weerdata",
    naam: "Weerdata",
    category: "data",
    icon: "CloudRain",
    uitleg: "Realtime en historische weersomstandigheden per regio.",
    voegtToe: ["voorspellende kracht bij storm/hagel", "preventieve communicatie"],
    heeftNodig: ["combinatie met schade- of sensordata"],
    sterkMet: ["predictive_ai", "iot", "schadedata", "locatie", "push"],
  },
  { id: "crm", naam: "CRM-data", category: "data", icon: "Users",
    uitleg: "Klantprofielen, voorkeuren, contactgeschiedenis en segmenten.",
    voegtToe: ["personalisatie", "segmentatie", "relevante timing"],
    heeftNodig: ["een actie-laag (kanaal of agent)"],
    sterkMet: ["email", "push", "agent_ai", "predictive_ai", "polis_catalog", "next_best_action", "segmentatie"] },
  { id: "polisdata", naam: "Polisdata", category: "data", icon: "FileCheck2",
    uitleg: "Welke producten en dekkingen de klant nu heeft, sinds wanneer, met welke premie.",
    voegtToe: ["upsell-kansen", "preventief contact bij hiaten"],
    heeftNodig: ["consent en een aanbod-logica"],
    sterkMet: ["crm", "polis_catalog", "next_best_action", "email", "agent_ai"] },
  { id: "clickstream", naam: "Website-gedrag", category: "data", icon: "MousePointer2",
    uitleg: "Clicks, scrolls en bezoekpatronen op je site of app.",
    voegtToe: ["intentie-signalen", "moment van interesse"],
    heeftNodig: ["model dat het duidt"],
    sterkMet: ["predictive_ai", "landingspagina", "push", "email", "segmentatie"] },
  { id: "social_signals", naam: "Social media signalen", category: "data", icon: "Hash",
    uitleg: "Mentions, sentiment en trends rond merk en thema's.",
    voegtToe: ["reputatie-inzicht", "trending topics voor content"],
    heeftNodig: ["sentiment-analyse"],
    sterkMet: ["sentiment_ai", "social_ads", "llm"] },
  { id: "campagnedata", naam: "Campagne-resultaten", category: "data", icon: "BarChart3",
    uitleg: "Wat werkte in eerdere campagnes — opens, clicks, conversies.",
    voegtToe: ["leren van het verleden", "betere voorspellingen"],
    heeftNodig: ["model of A/B-test dat het benut"],
    sterkMet: ["predictive_ai", "ab_test", "email", "social_ads", "propositiecanvas"] },
  { id: "demografie", naam: "Demografische data", category: "data", icon: "PieChart",
    uitleg: "Leeftijd, woonsituatie, gezinssamenstelling — geanonimiseerd.",
    voegtToe: ["doelgroepselectie", "relevantie"],
    heeftNodig: ["AVG-toets"],
    sterkMet: ["crm", "predictive_ai", "social_ads", "segmentatie"] },
  { id: "locatie", naam: "Locatiedata", category: "data", icon: "MapPin",
    uitleg: "Regio, postcode of geo-context van de klant.",
    voegtToe: ["lokale relevantie", "risico per gebied"],
    heeftNodig: ["consent"],
    sterkMet: ["weerdata", "predictive_ai", "push", "mobile_app"] },
  { id: "levensgebeurtenis", naam: "Levensgebeurtenissen", category: "data", icon: "Cake",
    uitleg: "Verhuizing, kind, nieuwe auto, pensioen — sterke koopmomenten.",
    voegtToe: ["perfecte timing", "natuurlijke aanleiding voor contact"],
    heeftNodig: ["consent en zorgvuldige toon"],
    sterkMet: ["crm", "polisdata", "email", "agent_ai", "polis_catalog", "next_best_action"] },

  // AI / MODELLEN
  {
    id: "voice_ai",
    naam: "Voice AI",
    category: "ai",
    icon: "Mic",
    uitleg: "Spraak naar tekst en tekst naar spraak voor telefonie en apps.",
    voegtToe: ["spraakinteractie", "callcenter-ondersteuning"],
    heeftNodig: ["taalmodel om betekenis te geven"],
    sterkMet: ["llm", "klantgesprekken", "callcenter", "sentiment_ai"],
  },
  {
    id: "predictive_ai",
    naam: "Predictive AI",
    category: "ai",
    icon: "TrendingUp",
    uitleg: "Modellen die patronen herkennen en uitkomsten voorspellen.",
    voegtToe: ["risicoscores", "kans op opzegging", "claimvoorspelling"],
    heeftNodig: ["voldoende data om op te leren"],
    sterkMet: ["schadedata", "iot", "weerdata", "crm", "clickstream", "next_best_action"],
  },
  { id: "segmentatie", naam: "Segmentatiemodel", category: "ai", icon: "Group",
    uitleg: "Verdeelt klanten in groepen op gedrag, behoefte of waarde.",
    voegtToe: ["scherpere targeting", "passender aanbod per groep"],
    heeftNodig: ["data en een kanaal om er iets mee te doen"],
    sterkMet: ["crm", "clickstream", "demografie", "email", "social_ads", "landingspagina"] },
  { id: "next_best_action", naam: "Next-best-action", category: "ai", icon: "Target",
    uitleg: "Bepaalt op elk moment de meest relevante volgende stap voor een klant.",
    voegtToe: ["retentie", "minder ruis, meer relevantie"],
    heeftNodig: ["data, regels en een kanaal"],
    sterkMet: ["crm", "polisdata", "predictive_ai", "agent_ai", "email", "push"] },

  // KANALEN
  { id: "email", naam: "E-mail", category: "channel", icon: "Mail",
    uitleg: "Persoonlijk bereik in de inbox van de klant.",
    voegtToe: ["1-op-1 communicatie", "ruimte voor verhaal"],
    heeftNodig: ["relevante boodschap en consent"],
    sterkMet: ["llm", "crm", "polisdata", "merkgids", "polis_catalog", "ab_test", "consent", "next_best_action"] },
  { id: "push", naam: "Push notificaties", category: "channel", icon: "BellRing",
    uitleg: "Korte, directe meldingen via de mobiele app.",
    voegtToe: ["realtime attentie", "actiegerichtheid"],
    heeftNodig: ["opt-in en relevantie"],
    sterkMet: ["mobile_app", "clickstream", "locatie", "agent_ai", "weerdata", "consent"] },
  { id: "social_ads", naam: "Social ads", category: "channel", icon: "Megaphone",
    uitleg: "Betaalde advertenties op social platforms.",
    voegtToe: ["bereik", "doelgroep-targeting"],
    heeftNodig: ["creatives, budget en meting"],
    sterkMet: ["image_ai", "video_ai", "demografie", "campagnedata", "ab_test", "merkgids", "budget"] },
  { id: "landingspagina", naam: "Landingspagina", category: "channel", icon: "Layout",
    uitleg: "Doelgerichte pagina met één boodschap en conversiedoel.",
    voegtToe: ["focus", "meetbare conversie"],
    heeftNodig: ["sterk concept en CTA"],
    sterkMet: ["image_ai", "merkgids", "ab_test", "clickstream", "segmentatie"] },
  { id: "chatbot", naam: "Chatbot", category: "channel", icon: "MessageCircle",
    uitleg: "Gesprek op de website of in de app, 24/7.",
    voegtToe: ["snelle hulp", "lead-kwalificatie", "lagere wachttijd"],
    heeftNodig: ["taalmodel met kennis"],
    sterkMet: ["llm", "achmeagpt", "faq_lib", "vector_db", "merkgids"] },
  { id: "callcenter", naam: "Callcenter", category: "channel", icon: "Headphones",
    uitleg: "Menselijke agents die klanten te woord staan.",
    voegtToe: ["empathie", "complexe afhandeling"],
    heeftNodig: ["AI-support voor schaal"],
    sterkMet: ["voice_ai", "sentiment_ai", "klantgesprekken", "achmeagpt"] },
  { id: "mobile_app", naam: "Mobiele app", category: "channel", icon: "Smartphone",
    uitleg: "Always-on touchpoint op de telefoon van de klant.",
    voegtToe: ["dagelijkse aanwezigheid", "context (locatie, tijd)"],
    heeftNodig: ["adoptie en goede content"],
    sterkMet: ["push", "clickstream", "locatie", "agent_ai", "iot"] },

  // RANDVOORWAARDEN
  {
    id: "privacy",
    naam: "Privacy",
    category: "constraint",
    icon: "ShieldCheck",
    uitleg: "AVG-randvoorwaarde: wat mag je verwerken, hoe leg je het uit?",
    voegtToe: ["klantvertrouwen", "compliance"],
    heeftNodig: ["bewuste keuzes over data en model"],
    sterkMet: ["achmeagpt", "klantgesprekken", "schadedata", "polisdata"],
  },
  { id: "consent", naam: "Toestemming / opt-in", category: "constraint", icon: "BadgeCheck",
    uitleg: "Expliciete toestemming voor marketing en datagebruik.",
    voegtToe: ["legitieme basis", "campagne-klaar maken"],
    heeftNodig: ["heldere flow en uitlegbaar doel"],
    sterkMet: ["email", "push", "social_ads", "levensgebeurtenis", "locatie"] },
  { id: "merkconsistentie", naam: "Merkconsistentie", category: "constraint", icon: "ShieldHalf",
    uitleg: "Bewaakt dat AI-output past bij merk en toon.",
    voegtToe: ["herkenbaarheid", "minder reputatierisico"],
    heeftNodig: ["een merkgids"],
    sterkMet: ["merkgids", "llm", "image_ai", "video_ai"] },
  { id: "budget", naam: "Budget", category: "constraint", icon: "Wallet",
    uitleg: "Beschikbare media- en productiekosten.",
    voegtToe: ["realisme", "scherpe prioriteiten"],
    heeftNodig: ["keuzes"], sterkMet: ["social_ads", "campagnedata"] },
  { id: "ab_test", naam: "A/B-test framework", category: "constraint", icon: "FlaskConical",
    uitleg: "Mogelijkheid om varianten te toetsen vóór opschaling.",
    voegtToe: ["bewezen effect", "leren bij elke campagne"],
    heeftNodig: ["voldoende volume"],
    sterkMet: ["email", "landingspagina", "social_ads", "campagnedata"] },
  {
    id: "legacy_it",
    naam: "Legacy IT",
    category: "constraint",
    icon: "Server",
    uitleg: "Bestaande, oudere systemen waar nieuwe AI mee moet praten.",
    voegtToe: ["realisme", "integratie-uitdaging"],
    heeftNodig: ["koppelvlakken en geduld"],
    sterkMet: [],
  },
];

export const PIECE_MAP: Record<string, Piece> = Object.fromEntries(
  PIECES.map((p) => [p.id, p]),
);

export const CATEGORY_META: Record<Category, { label: string; color: string }> = {
  intel: { label: "Intelligentie", color: "var(--cat-intel)" },
  knowledge: { label: "Kennis", color: "var(--cat-knowledge)" },
  data: { label: "Data", color: "var(--cat-data)" },
  ai: { label: "Modellen", color: "var(--cat-ai)" },
  channel: { label: "Kanalen", color: "var(--cat-channel)" },
  constraint: { label: "Randvoorwaarden", color: "var(--cat-constraint)" },
};

export type Maturity = "vandaag" | "opkomend" | "experimenteel";
export type PropositieHoek =
  | "acquisitie"
  | "retentie"
  | "preventie"
  | "schadebeleving"
  | "merk"
  | "service"
  | "loyaliteit";

export interface Recipe {
  id: string;
  vereist: string[];
  optioneel?: string[];
  titel: string;
  uitleg: string;
  capabilities: string[];
  maturity: Maturity;
  hoek: PropositieHoek;
  waarde?: 1 | 2 | 3; // 1 laag - 3 hoog
  haalbaarheid?: 1 | 2 | 3;
  risico?: 1 | 2 | 3;
}

export const RECIPES: Recipe[] = [
  {
    id: "hyperpersoonlijke_mail",
    vereist: ["crm", "polisdata", "email", "consent"],
    optioneel: ["llm", "achmeagpt", "merkgids"],
    titel: "Hyperpersoonlijke e-mailcampagne",
    uitleg: "Mails die de klant écht herkennen — op basis van profiel, polis en toestemming, in jullie eigen toon.",
    capabilities: ["1-op-1 personalisatie", "Hogere open rates", "Merkconforme copy"],
    maturity: "vandaag", hoek: "retentie", waarde: 3, haalbaarheid: 3, risico: 1,
  },
  {
    id: "nba_behoud",
    vereist: ["next_best_action", "crm", "polisdata"],
    optioneel: ["predictive_ai", "email", "push", "agent_ai"],
    titel: "Next-best-action voor klantbehoud",
    uitleg: "Bepaal op het juiste moment het juiste aanbod of advies en zet het uit op het beste kanaal.",
    capabilities: ["Lagere churn", "Relevante timing", "Meer cross-sell"],
    maturity: "vandaag", hoek: "retentie", waarde: 3, haalbaarheid: 2, risico: 1,
  },
  {
    id: "preventieve_schade",
    vereist: ["predictive_ai", "weerdata", "push"],
    optioneel: ["iot", "schadedata", "mobile_app", "consent", "locatie"],
    titel: "Preventieve schadecampagne",
    uitleg: "Waarschuw klanten vóór de storm — minder schade, hogere waardering.",
    capabilities: ["Schade voorkomen", "Klanten echt helpen", "Sterk merkmoment"],
    maturity: "opkomend", hoek: "preventie", waarde: 3, haalbaarheid: 2, risico: 2,
  },
  {
    id: "levensgebeurtenis_prop",
    vereist: ["levensgebeurtenis", "crm", "email"],
    optioneel: ["polisdata", "llm", "achmeagpt", "consent", "polis_catalog"],
    titel: "Propositie op basis van levensgebeurtenis",
    uitleg: "Relevant aanbod precies op het juiste moment: verhuizen, kind, nieuwe auto of pensioen.",
    capabilities: ["Perfecte timing", "Natuurlijke aanleiding", "Hoge conversie"],
    maturity: "vandaag", hoek: "acquisitie", waarde: 3, haalbaarheid: 3, risico: 1,
  },
  {
    id: "creatieve_campagne",
    vereist: ["image_ai", "llm", "merkgids"],
    optioneel: ["video_ai", "campagnedata", "social_ads", "landingspagina", "ab_test"],
    titel: "Creatieve campagnegenerator",
    uitleg: "Snel meerdere campagnevarianten ontwerpen, testen en opschalen — binnen je merk.",
    capabilities: ["Snellere productie", "Meer varianten", "Bewezen winnaars"],
    maturity: "vandaag", hoek: "merk", waarde: 2, haalbaarheid: 3, risico: 1,
  },
  {
    id: "slimme_schadebeleving",
    vereist: ["achmeagpt", "schadedata", "privacy"],
    optioneel: ["chatbot", "callcenter", "klantgesprekken", "sentiment_ai"],
    titel: "Slimme schadebeleving",
    uitleg: "Empathische, snelle communicatie tijdens een claim — met respect voor privacy.",
    capabilities: ["Kortere doorlooptijd", "Hogere NPS na schade", "Minder herhaalvragen"],
    maturity: "vandaag", hoek: "schadebeleving", waarde: 3, haalbaarheid: 2, risico: 2,
  },
  {
    id: "website_personalisatie",
    vereist: ["clickstream", "landingspagina", "crm"],
    optioneel: ["segmentatie", "predictive_ai", "consent", "ab_test"],
    titel: "Websitepersonalisatie",
    uitleg: "Toon iedere bezoeker de proposities die voor hém of haar relevant zijn.",
    capabilities: ["Hogere conversie", "Lagere bouncerate", "Inzicht in interesse"],
    maturity: "vandaag", hoek: "acquisitie", waarde: 2, haalbaarheid: 3, risico: 1,
  },
  {
    id: "ai_adviseur",
    vereist: ["achmeagpt", "documenten", "polis_catalog", "privacy"],
    optioneel: ["klantgesprekken", "merkgids", "vector_db"],
    titel: "Vertrouwde AI-assistent voor adviseurs",
    uitleg: "Adviseurs krijgen direct het juiste, merkconforme antwoord — onderbouwd door interne kennis.",
    capabilities: ["Consistente antwoorden", "Snellere service", "Lagere foutkans"],
    maturity: "vandaag", hoek: "service", waarde: 3, haalbaarheid: 3, risico: 1,
  },
  {
    id: "rag",
    vereist: ["llm", "vector_db", "documenten"],
    titel: "Werkende RAG-oplossing",
    uitleg: "AI die antwoorden geeft op basis van jullie eigen documenten — een echte kennischatbot.",
    capabilities: ["Bedrijfskennis chatbot", "Slimme zoekfunctie", "Polis-assistent"],
    maturity: "vandaag", hoek: "service", waarde: 2, haalbaarheid: 3, risico: 1,
  },
  {
    id: "copilot_docs",
    vereist: ["copilot", "documenten"],
    titel: "Documentintelligentie met Copilot",
    uitleg: "Copilot vat samen, beantwoordt en deelt documenten met collega's.",
    capabilities: ["Samenvatten", "Mailconcepten", "Beleidsstuk-Q&A"],
    maturity: "vandaag", hoek: "service", waarde: 2, haalbaarheid: 3, risico: 1,
  },
  {
    id: "claim_predict",
    vereist: ["predictive_ai", "schadedata"],
    titel: "Schadevoorspelling",
    uitleg: "Voorspel claimkans, kosten en doorlooptijd op basis van historie.",
    capabilities: ["Risicoscore", "Fraude-signaal", "Capaciteitsplanning"],
    maturity: "vandaag", hoek: "preventie", waarde: 2, haalbaarheid: 2, risico: 2,
  },
  {
    id: "early_warning",
    vereist: ["predictive_ai", "weerdata", "iot"],
    titel: "Risico early warning",
    uitleg: "Combineer weer + sensoren om klanten te waarschuwen vóór schade ontstaat.",
    capabilities: ["Stormwaarschuwing", "Lekdetectie", "Preventief advies"],
    maturity: "opkomend", hoek: "preventie", waarde: 3, haalbaarheid: 2, risico: 2,
  },
  {
    id: "voice_assist",
    vereist: ["voice_ai", "llm"],
    titel: "Spraakassistent",
    uitleg: "Spraak in, spraak uit — met taalbegrip eronder.",
    capabilities: ["Telefonische zelfservice", "Hands-free interactie"],
    maturity: "vandaag", hoek: "service", waarde: 2, haalbaarheid: 2, risico: 1,
  },
  {
    id: "memory_ai",
    vereist: ["llm", "vector_db", "klantgesprekken"],
    titel: "AI met klantgeheugen",
    uitleg: "Een assistent die eerdere gesprekken onthoudt en context hergebruikt.",
    capabilities: ["Conversatiegeheugen", "Personalisatie"],
    maturity: "opkomend", hoek: "service", waarde: 2, haalbaarheid: 2, risico: 2,
  },
];

// CHALLENGES — speelse opdrachten
export interface Challenge {
  id: string;
  titel: string;
  uitleg: string;
  hint: string[];
}

export const CHALLENGES: Challenge[] = [
  { id: "c1", titel: "Bouw een retentiecampagne", uitleg: "Houd klanten vast op het juiste moment.",
    hint: ["crm", "polisdata", "next_best_action", "email", "consent"] },
  { id: "c2", titel: "Voorkom schade vóórdat het gebeurt", uitleg: "Combineer signalen om vooruit te zien.",
    hint: ["predictive_ai", "weerdata", "iot", "push"] },
  { id: "c3", titel: "Maak een persoonlijk én verantwoord bericht", uitleg: "Personaliseer mét privacy en merkgids.",
    hint: ["achmeagpt", "crm", "merkgids", "email", "privacy"] },
  { id: "c4", titel: "Ontwerp een campagne in jullie merk", uitleg: "Snel meer varianten — bewezen winnaar.",
    hint: ["image_ai", "llm", "merkgids", "social_ads", "ab_test"] },
  { id: "c5", titel: "Maak een claim minder pijn", uitleg: "Empathie en snelheid bij schade.",
    hint: ["achmeagpt", "schadedata", "chatbot", "sentiment_ai", "privacy"] },
];

// Compatibility map (undirected)
const COMPAT = new Set<string>();
for (const p of PIECES) {
  for (const o of p.sterkMet) {
    COMPAT.add(key(p.id, o));
    COMPAT.add(key(o, p.id));
  }
}
function key(a: string, b: string) {
  return a < b ? `${a}|${b}` : `${b}|${a}`;
}
export function areCompatible(a: string, b: string): boolean {
  return COMPAT.has(key(a, b));
}

export interface Connection {
  a: string;
  b: string;
  status: "active" | "partial";
}

export interface Scores {
  creatief: number; // 0-100
  marketing: number;
  uitvoerbaar: number;
  risico: number; // hoger = meer risico
}

export interface NextBest {
  id: string;
  reden: string;
}

export interface Analysis {
  placedIds: string[];
  matchedRecipes: Recipe[];
  partialRecipes: { recipe: Recipe; missing: string[] }[];
  connections: Connection[];
  capabilities: string[];
  warnings: string[];
  nudges: string[];
  status: "leeg" | "incompleet" | "werkend";
  maturity: Maturity | null;
  summary: string;
  scores: Scores;
  propositiehoeken: PropositieHoek[];
  whyItWorks: string | null;
  nextBest: NextBest[];
}

const PIECE_TO_RECIPES: Map<string, Recipe[]> = new Map();
for (const r of RECIPES) {
  for (const id of [...r.vereist, ...(r.optioneel ?? [])]) {
    if (!PIECE_TO_RECIPES.has(id)) PIECE_TO_RECIPES.set(id, []);
    PIECE_TO_RECIPES.get(id)!.push(r);
  }
}

function pieceScore(set: Set<string>): { creatief: number; marketing: number; uitvoerbaar: number; risico: number } {
  // creatief: variatie in categorieën
  const cats = new Set<Category>();
  set.forEach((id) => {
    const p = PIECE_MAP[id];
    if (p) cats.add(p.category);
  });
  const creatief = Math.min(100, cats.size * 18 + set.size * 4);

  // marketing: aanwezigheid van data + kanaal + intel
  const hasData = [...set].some((id) => PIECE_MAP[id]?.category === "data");
  const hasChannel = [...set].some((id) => PIECE_MAP[id]?.category === "channel");
  const hasIntel = [...set].some((id) => PIECE_MAP[id]?.category === "intel" || PIECE_MAP[id]?.category === "ai");
  const hasKnowledge = [...set].some((id) => PIECE_MAP[id]?.category === "knowledge");
  let marketing = 0;
  if (hasData) marketing += 25;
  if (hasChannel) marketing += 30;
  if (hasIntel) marketing += 25;
  if (hasKnowledge) marketing += 20;

  // uitvoerbaar: meer randvoorwaarden + minder experimenteel
  const constraints = [...set].filter((id) => PIECE_MAP[id]?.category === "constraint").length;
  let uitvoerbaar = 40 + constraints * 12;
  if (set.has("consent")) uitvoerbaar += 5;
  if (set.has("merkgids")) uitvoerbaar += 5;
  if (set.has("legacy_it")) uitvoerbaar -= 10;
  uitvoerbaar = Math.max(10, Math.min(100, uitvoerbaar));

  // risico
  let risico = 20;
  if (set.has("schadedata") && !set.has("privacy")) risico += 30;
  if (set.has("klantgesprekken") && !set.has("privacy")) risico += 20;
  if (set.has("levensgebeurtenis") && !set.has("consent")) risico += 20;
  if ((set.has("email") || set.has("push") || set.has("social_ads")) && !set.has("consent")) risico += 15;
  if (set.has("image_ai") && !set.has("merkgids")) risico += 10;
  if (set.has("legacy_it")) risico += 5;
  risico = Math.max(0, Math.min(100, risico));

  return { creatief: Math.round(creatief), marketing, uitvoerbaar: Math.round(uitvoerbaar), risico };
}

function computeNextBest(set: Set<string>, partial: { recipe: Recipe; missing: string[] }[]): NextBest[] {
  const counts = new Map<string, { count: number; reden: Set<string> }>();
  // 1) ontbrekende stukken uit partial recipes
  for (const { recipe, missing } of partial) {
    for (const m of missing) {
      const entry = counts.get(m) ?? { count: 0, reden: new Set() };
      entry.count += 3;
      entry.reden.add(`maakt "${recipe.titel}" compleet`);
      counts.set(m, entry);
    }
  }
  // 2) sterk-met suggesties op basis van geplaatste stukken
  for (const id of set) {
    const p = PIECE_MAP[id];
    if (!p) continue;
    for (const s of p.sterkMet) {
      if (set.has(s)) continue;
      const entry = counts.get(s) ?? { count: 0, reden: new Set() };
      entry.count += 1;
      entry.reden.add(`versterkt ${p.naam}`);
      counts.set(s, entry);
    }
  }
  // 3) zachte hints — randvoorwaarden bij gevoelige data
  if ((set.has("levensgebeurtenis") || set.has("email") || set.has("push")) && !set.has("consent")) {
    const e = counts.get("consent") ?? { count: 0, reden: new Set() };
    e.count += 2; e.reden.add("maakt het campagneklaar en verantwoord");
    counts.set("consent", e);
  }
  if ((set.has("image_ai") || set.has("llm")) && !set.has("merkgids")) {
    const e = counts.get("merkgids") ?? { count: 0, reden: new Set() };
    e.count += 2; e.reden.add("houdt AI-output binnen je merk");
    counts.set("merkgids", e);
  }
  if ((set.has("schadedata") || set.has("klantgesprekken")) && !set.has("privacy")) {
    const e = counts.get("privacy") ?? { count: 0, reden: new Set() };
    e.count += 2; e.reden.add("nodig bij gevoelige klantdata");
    counts.set("privacy", e);
  }

  return [...counts.entries()]
    .filter(([id]) => PIECE_MAP[id])
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 3)
    .map(([id, v]) => ({ id, reden: [...v.reden][0] }));
}

function computeNudges(set: Set<string>, matched: Recipe[]): string[] {
  const out: string[] = [];
  if (set.size === 1) out.push("Voeg een tweede bouwsteen toe om combinaties te ontdekken.");
  if (set.size >= 2 && set.size < 4) out.push("Probeer nog één databron of kanaal toe te voegen.");
  if (matched.length > 0) out.push("Sterke combinatie! Ster je beste idee zodat het niet verloren gaat.");
  if (![...set].some((id) => PIECE_MAP[id]?.category === "channel"))
    out.push("Voeg een kanaal toe om dit campagneklaar te maken.");
  if (![...set].some((id) => PIECE_MAP[id]?.category === "constraint"))
    out.push("Voeg een randvoorwaarde toe (bv. consent of merkgids) om het verantwoord te maken.");
  return out.slice(0, 3);
}

export function analyze(placedIds: string[]): Analysis {
  const set = new Set(placedIds);
  const matched: Recipe[] = [];
  const partial: { recipe: Recipe; missing: string[] }[] = [];

  for (const r of RECIPES) {
    const missing = r.vereist.filter((id) => !set.has(id));
    if (missing.length === 0) matched.push(r);
    else if (missing.length < r.vereist.length) partial.push({ recipe: r, missing });
  }

  const connections: Connection[] = [];
  const activePieces = new Set<string>();
  matched.forEach((r) => r.vereist.forEach((id) => activePieces.add(id)));
  for (let i = 0; i < placedIds.length; i++) {
    for (let j = i + 1; j < placedIds.length; j++) {
      const a = placedIds[i];
      const b = placedIds[j];
      if (areCompatible(a, b)) {
        const isActive = activePieces.has(a) && activePieces.has(b);
        connections.push({ a, b, status: isActive ? "active" : "partial" });
      }
    }
  }

  const capabilities = Array.from(new Set(matched.flatMap((r) => r.capabilities)));

  const warnings: string[] = [];
  if (set.has("llm") && !set.has("vector_db") && !set.has("documenten") && !set.has("klantgesprekken") && matched.length === 0) {
    warnings.push("Het taalmodel kan tekst genereren, maar heeft nog geen toegang tot specifieke kennis.");
  }
  if (set.has("predictive_ai") && !set.has("schadedata") && !set.has("iot") && !set.has("weerdata") && !set.has("crm")) {
    warnings.push("Predictive AI heeft data nodig om op te leren.");
  }
  if (set.has("voice_ai") && !set.has("llm")) {
    warnings.push("Voice AI hoort woorden, maar zonder taalmodel begrijpt het de betekenis niet.");
  }
  if (set.has("legacy_it") && matched.length > 0) {
    warnings.push("Legacy IT erbij betekent: reken op extra integratie-werk voor productie.");
  }

  const order: Maturity[] = ["vandaag", "opkomend", "experimenteel"];
  let maturity: Maturity | null = null;
  for (const r of matched) {
    if (!maturity || order.indexOf(r.maturity) > order.indexOf(maturity)) maturity = r.maturity;
  }

  const scores = pieceScore(set);
  const nextBest = computeNextBest(set, partial);
  const partialTrim = partial
    .sort((a, b) => a.missing.length - b.missing.length)
    .slice(0, 4);

  const propositiehoeken: PropositieHoek[] = [...new Set(matched.map((r) => r.hoek))];
  let whyItWorks: string | null = null;
  if (matched.length > 0) {
    const r = matched[0];
    whyItWorks = `${r.titel} ontstaat doordat ${r.vereist
      .map((id) => PIECE_MAP[id]?.naam ?? id)
      .join(" + ")} elkaar versterken.`;
  } else if (placedIds.length >= 2) {
    const cats = new Set<Category>();
    set.forEach((id) => PIECE_MAP[id] && cats.add(PIECE_MAP[id].category));
    whyItWorks =
      cats.size >= 3
        ? "Mooie mix van categorieën — voeg nog één bouwsteen toe en je raakt een werkend concept."
        : "Combineer verschillende categorieën (intelligentie + data + kanaal) voor sterkere ideeën.";
  }

  let status: Analysis["status"] = "leeg";
  let summary = "Sleep je eerste bouwsteen hierheen en begin met puzzelen.";
  if (placedIds.length > 0) {
    status = matched.length > 0 ? "werkend" : "incompleet";
    summary =
      status === "werkend"
        ? `Sterke combinatie! Je hebt ${matched.length} herkenbaar propositie-concept${matched.length > 1 ? "en" : ""} ontdekt.`
        : "Lekker bezig — voeg nog een bouwsteen toe om een herkenbaar concept te vormen.";
  }
  const nudges = computeNudges(set, matched);

  return {
    placedIds,
    matchedRecipes: matched,
    partialRecipes: partialTrim,
    connections,
    capabilities,
    warnings,
    nudges,
    status,
    maturity,
    summary,
    scores,
    propositiehoeken,
    whyItWorks,
    nextBest,
  };
}
