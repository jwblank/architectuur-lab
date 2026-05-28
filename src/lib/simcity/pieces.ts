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
    uitleg: "Een generiek taalmodel dat tekst begrijpt en genereert.",
    voegtToe: ["tekst begrijpen", "tekst genereren", "redeneren"],
    heeftNodig: ["context of kennis voor specifieke domeinen"],
    sterkMet: ["vector_db", "documenten", "voice_ai", "klantgesprekken"],
  },
  {
    id: "achmeagpt",
    naam: "Eigen interne GPT",
    category: "intel",
    icon: "Sparkles",
    uitleg: "Intern taalmodel voor privacy waarborging.",
    voegtToe: ["interne AI assistent", "veilige tekstverwerking"],
    heeftNodig: ["bedrijfsdata om écht waarde toe te voegen"],
    sterkMet: ["schadedata", "vector_db", "klantgesprekken", "documenten"],
  },
  {
    id: "copilot",
    naam: "Microsoft Copilot",
    category: "intel",
    icon: "Bot",
    uitleg: "AI-assistent binnen Microsoft 365 voor productiviteit.",
    voegtToe: ["samenvatten", "mailhulp", "documentwerk"],
    heeftNodig: ["documenten of mails om mee te werken"],
    sterkMet: ["documenten", "klantgesprekken"],
  },

  // KENNIS
  {
    id: "vector_db",
    naam: "Vector Database",
    category: "knowledge",
    icon: "Database",
    uitleg: "Slaat informatie op op basis van betekenis in plaats van exacte woorden.",
    voegtToe: ["semantisch zoeken", "relevante context", "kennis ophalen"],
    heeftNodig: ["data of documenten om te indexeren"],
    sterkMet: ["llm", "achmeagpt", "documenten", "klantgesprekken"],
  },
  {
    id: "documenten",
    naam: "Documenten",
    category: "knowledge",
    icon: "FileText",
    uitleg: "Polissen, handleidingen, beleidsstukken — geschreven kennis.",
    voegtToe: ["bedrijfskennis", "onderbouwde antwoorden"],
    heeftNodig: ["een systeem dat ze kan ontsluiten"],
    sterkMet: ["vector_db", "copilot", "llm", "achmeagpt"],
  },
  {
    id: "klantgesprekken",
    naam: "Klantgesprekken",
    category: "knowledge",
    icon: "MessagesSquare",
    uitleg: "Transcripten en notities van interacties met klanten.",
    voegtToe: ["klantcontext", "historie", "intentieherkenning"],
    heeftNodig: ["opslag en verwerking met respect voor privacy"],
    sterkMet: ["vector_db", "voice_ai", "achmeagpt", "llm"],
  },

  // DATA
  {
    id: "iot",
    naam: "IoT Sensoren",
    category: "data",
    icon: "Radio",
    uitleg: "Slimme sensoren die realtime metingen leveren (water, beweging, rook).",
    voegtToe: ["realtime signalen", "preventie", "early warning"],
    heeftNodig: ["een model dat patronen herkent"],
    sterkMet: ["predictive_ai", "weerdata", "schadedata"],
  },
  {
    id: "schadedata",
    naam: "Schadedata",
    category: "data",
    icon: "FileWarning",
    uitleg: "Historische claims, oorzaken en uitkomsten van schades.",
    voegtToe: ["risico-inschatting", "fraudedetectie", "trendinzicht"],
    heeftNodig: ["model of analyse om bruikbaar te zijn"],
    sterkMet: ["predictive_ai", "achmeagpt", "vector_db"],
  },
  {
    id: "weerdata",
    naam: "Weerdata",
    category: "data",
    icon: "CloudRain",
    uitleg: "Realtime en historische weersomstandigheden.",
    voegtToe: ["risico-context", "voorspellende kracht bij storm/hagel"],
    heeftNodig: ["combinatie met schade- of sensordata"],
    sterkMet: ["predictive_ai", "iot", "schadedata"],
  },

  // AI
  {
    id: "voice_ai",
    naam: "Voice AI",
    category: "ai",
    icon: "Mic",
    uitleg: "Spraak naar tekst en tekst naar spraak.",
    voegtToe: ["spraakinteractie", "callcenter-automatisering"],
    heeftNodig: ["taalmodel om betekenis te geven"],
    sterkMet: ["llm", "klantgesprekken"],
  },
  {
    id: "predictive_ai",
    naam: "Predictive AI",
    category: "ai",
    icon: "TrendingUp",
    uitleg: "Modellen die patronen herkennen en uitkomsten voorspellen.",
    voegtToe: ["voorspellingen", "risicoscores", "anomaliedetectie"],
    heeftNodig: ["voldoende data om op te leren"],
    sterkMet: ["schadedata", "iot", "weerdata"],
  },

  // CONSTRAINTS
  {
    id: "privacy",
    naam: "Privacy",
    category: "constraint",
    icon: "ShieldCheck",
    uitleg: "AVG-randvoorwaarde: wat mag je verwerken en hoe?",
    voegtToe: ["vertrouwen", "compliance"],
    heeftNodig: ["bewuste keuzes over data en model"],
    sterkMet: ["achmeagpt"],
  },
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

  // EXTRA INTELLIGENTIE
  { id: "image_ai", naam: "Beeldgeneratie-AI", category: "intel", icon: "Image",
    uitleg: "Genereert visuals en illustraties op basis van een prompt.",
    voegtToe: ["visuals on-demand", "snelle creatieve concepten"], heeftNodig: ["merkrichtlijnen voor consistentie"],
    sterkMet: ["merkgids", "campagnedata", "email", "social_ads", "landingspagina"] },
  { id: "video_ai", naam: "Video-AI", category: "intel", icon: "Video",
    uitleg: "Maakt of personaliseert korte video's automatisch.",
    voegtToe: ["gepersonaliseerde video", "snelle ad-varianten"], heeftNodig: ["script of merkstijl"],
    sterkMet: ["merkgids", "social_ads", "campagnedata"] },
  { id: "agent_ai", naam: "Autonome AI-agent", category: "intel", icon: "Workflow",
    uitleg: "Voert meerstaps-taken zelfstandig uit met tools.",
    voegtToe: ["automatisering", "doelgerichte workflows"], heeftNodig: ["duidelijke doelen en guardrails"],
    sterkMet: ["crm", "email", "chatbot", "vector_db"] },
  { id: "sentiment_ai", naam: "Sentiment-AI", category: "intel", icon: "Smile",
    uitleg: "Herkent emotie en intentie in tekst of spraak.",
    voegtToe: ["emotie-inzicht", "tone matching"], heeftNodig: ["tekst of gesprekken"],
    sterkMet: ["klantgesprekken", "social_signals", "callcenter"] },
  { id: "translation_ai", naam: "Translation AI", category: "intel", icon: "Languages",
    uitleg: "Realtime vertaling tussen talen, met behoud van toon.",
    voegtToe: ["meertaligheid", "bredere doelgroep"], heeftNodig: ["bronteksten"],
    sterkMet: ["merkgids", "email", "chatbot"] },

  // EXTRA KENNIS
  { id: "polis_catalog", naam: "Productcatalogus polissen", category: "knowledge", icon: "BookOpen",
    uitleg: "Alle actuele polissen, dekkingen en premies op één plek.",
    voegtToe: ["upsell-mogelijkheden", "feitelijke productinfo"], heeftNodig: ["systeem dat aanbevelingen doet"],
    sterkMet: ["llm", "achmeagpt", "vector_db", "crm", "email"] },
  { id: "merkgids", naam: "Merkgids & tone-of-voice", category: "knowledge", icon: "Palette",
    uitleg: "Schrijfstijl, kleuren en richtlijnen die het merk herkenbaar maken.",
    voegtToe: ["consistente uitingen", "herkenbare campagnes"], heeftNodig: ["AI die er rekening mee houdt"],
    sterkMet: ["llm", "image_ai", "video_ai", "email", "landingspagina"] },
  { id: "marktonderzoek", naam: "Marktonderzoek", category: "knowledge", icon: "Microscope",
    uitleg: "Inzichten in trends, behoeften en pijnpunten van klanten.",
    voegtToe: ["onderbouwing", "doelgroep-empathie"], heeftNodig: ["model om patronen te vinden"],
    sterkMet: ["llm", "predictive_ai", "campagnedata"] },
  { id: "concurrent_intel", naam: "Concurrentie-intel", category: "knowledge", icon: "Crosshair",
    uitleg: "Wat de concurrentie aanbiedt, prijst en communiceert.",
    voegtToe: ["differentiatie", "scherpere positionering"], heeftNodig: ["analyse-laag"],
    sterkMet: ["llm", "marktonderzoek"] },
  { id: "faq_lib", naam: "FAQ-bibliotheek", category: "knowledge", icon: "HelpCircle",
    uitleg: "Veelgestelde vragen met goedgekeurde antwoorden.",
    voegtToe: ["self-service", "consistente antwoorden"], heeftNodig: ["ontsluiting via chat of zoek"],
    sterkMet: ["chatbot", "vector_db", "llm"] },

  // EXTRA DATA
  { id: "crm", naam: "CRM-data", category: "data", icon: "Users",
    uitleg: "Klantprofielen, polissen, contactgeschiedenis en segmenten.",
    voegtToe: ["personalisatie", "segmentatie"], heeftNodig: ["actie-laag om er iets mee te doen"],
    sterkMet: ["email", "push", "agent_ai", "predictive_ai", "polis_catalog"] },
  { id: "clickstream", naam: "Website-gedrag", category: "data", icon: "MousePointer2",
    uitleg: "Clicks, scrolls en bezoekpatronen op je site of app.",
    voegtToe: ["intentie-signalen", "moment van interesse"], heeftNodig: ["model dat het duidt"],
    sterkMet: ["predictive_ai", "landingspagina", "push", "email"] },
  { id: "social_signals", naam: "Social media signalen", category: "data", icon: "Hash",
    uitleg: "Mentions, sentiment en trends rond merk en thema's.",
    voegtToe: ["reputatie-inzicht", "trending topics"], heeftNodig: ["sentiment-analyse"],
    sterkMet: ["sentiment_ai", "social_ads", "llm"] },
  { id: "campagnedata", naam: "Campagne-resultaten", category: "data", icon: "BarChart3",
    uitleg: "Wat werkte in eerdere campagnes — opens, clicks, conversies.",
    voegtToe: ["leren van het verleden", "betere voorspellingen"], heeftNodig: ["model dat het benut"],
    sterkMet: ["predictive_ai", "ab_test", "email", "social_ads"] },
  { id: "demografie", naam: "Demografische data", category: "data", icon: "PieChart",
    uitleg: "Leeftijd, woonsituatie, gezinssamenstelling — geanonimiseerd.",
    voegtToe: ["doelgroepselectie", "relevantie"], heeftNodig: ["AVG-toets"],
    sterkMet: ["crm", "predictive_ai", "social_ads"] },
  { id: "locatie", naam: "Locatiedata", category: "data", icon: "MapPin",
    uitleg: "Regio, postcode of geo-context van de klant.",
    voegtToe: ["lokale relevantie", "risico per gebied"], heeftNodig: ["consent"],
    sterkMet: ["weerdata", "predictive_ai", "push"] },
  { id: "levensgebeurtenis", naam: "Levensgebeurtenissen", category: "data", icon: "Cake",
    uitleg: "Verhuizing, kind, nieuwe auto, pensioen — sterke koopmomenten.",
    voegtToe: ["perfecte timing", "natuurlijke aanleiding"], heeftNodig: ["consent en zorgvuldige toon"],
    sterkMet: ["crm", "email", "agent_ai", "polis_catalog"] },

  // KANALEN
  { id: "email", naam: "E-mail", category: "channel", icon: "Mail",
    uitleg: "Persoonlijk bereik in de inbox van de klant.",
    voegtToe: ["1-op-1 communicatie", "ruimte voor verhaal"], heeftNodig: ["relevante boodschap"],
    sterkMet: ["llm", "crm", "merkgids", "polis_catalog", "ab_test"] },
  { id: "push", naam: "Push notificaties", category: "channel", icon: "BellRing",
    uitleg: "Korte, directe meldingen via de mobiele app.",
    voegtToe: ["realtime attentie", "actiegerichtheid"], heeftNodig: ["opt-in en relevantie"],
    sterkMet: ["clickstream", "locatie", "agent_ai"] },
  { id: "social_ads", naam: "Social ads", category: "channel", icon: "Megaphone",
    uitleg: "Betaalde advertenties op social platforms.",
    voegtToe: ["bereik", "doelgroep-targeting"], heeftNodig: ["creatives en budget"],
    sterkMet: ["image_ai", "video_ai", "demografie", "campagnedata", "ab_test"] },
  { id: "landingspagina", naam: "Landingspagina", category: "channel", icon: "Layout",
    uitleg: "Doelgerichte pagina met één boodschap en conversiedoel.",
    voegtToe: ["focus", "meetbare conversie"], heeftNodig: ["sterk concept en CTA"],
    sterkMet: ["image_ai", "merkgids", "ab_test", "clickstream"] },
  { id: "chatbot", naam: "Chatbot", category: "channel", icon: "MessageCircle",
    uitleg: "Gesprek op de website of in de app, 24/7.",
    voegtToe: ["snelle hulp", "lead-kwalificatie"], heeftNodig: ["taalmodel met kennis"],
    sterkMet: ["llm", "achmeagpt", "faq_lib", "vector_db"] },
  { id: "callcenter", naam: "Callcenter", category: "channel", icon: "Headphones",
    uitleg: "Menselijke agents die klanten te woord staan.",
    voegtToe: ["empathie", "complexe afhandeling"], heeftNodig: ["AI-support voor schaal"],
    sterkMet: ["voice_ai", "sentiment_ai", "klantgesprekken"] },
  { id: "mobile_app", naam: "Mobiele app", category: "channel", icon: "Smartphone",
    uitleg: "Always-on touchpoint op de telefoon van de klant.",
    voegtToe: ["dagelijkse aanwezigheid", "context (locatie, tijd)"], heeftNodig: ["adoptie"],
    sterkMet: ["push", "clickstream", "locatie", "agent_ai"] },

  // EXTRA RANDVOORWAARDEN
  { id: "consent", naam: "Toestemming / opt-in", category: "constraint", icon: "BadgeCheck",
    uitleg: "Expliciete toestemming voor marketing en datagebruik.",
    voegtToe: ["legitieme basis", "klantvertrouwen"], heeftNodig: ["heldere flow"], sterkMet: [] },
  { id: "merkconsistentie", naam: "Merkconsistentie", category: "constraint", icon: "ShieldHalf",
    uitleg: "Bewaakt dat AI-output bij het merk past.",
    voegtToe: ["herkenbaarheid", "minder risico op missers"], heeftNodig: ["merkgids"], sterkMet: ["merkgids"] },
  { id: "budget", naam: "Budget", category: "constraint", icon: "Wallet",
    uitleg: "Beschikbare media- en productiekosten.",
    voegtToe: ["realisme", "prioritering"], heeftNodig: ["keuzes"], sterkMet: [] },
  { id: "ab_test", naam: "A/B-test framework", category: "constraint", icon: "FlaskConical",
    uitleg: "Mogelijkheid om varianten te toetsen voor opschaling.",
    voegtToe: ["bewezen effect", "leren bij elke campagne"], heeftNodig: ["voldoende volume"],
    sterkMet: ["email", "landingspagina", "social_ads", "campagnedata"] },
];

export const PIECE_MAP: Record<string, Piece> = Object.fromEntries(
  PIECES.map((p) => [p.id, p]),
);

export const CATEGORY_META: Record<Category, { label: string; color: string }> = {
  intel: { label: "Intelligentie", color: "var(--cat-intel)" },
  knowledge: { label: "Kennis", color: "var(--cat-knowledge)" },
  data: { label: "Data", color: "var(--cat-data)" },
  ai: { label: "AI", color: "var(--cat-ai)" },
  channel: { label: "Kanalen", color: "var(--cat-channel)" },
  constraint: { label: "Randvoorwaarden", color: "var(--cat-constraint)" },
};

export type Maturity = "vandaag" | "opkomend" | "experimenteel";

export interface Recipe {
  id: string;
  vereist: string[];
  titel: string;
  uitleg: string;
  capabilities: string[];
  maturity: Maturity;
}

export const RECIPES: Recipe[] = [
  {
    id: "rag",
    vereist: ["llm", "vector_db", "documenten"],
    titel: "Werkende RAG-oplossing",
    uitleg:
      "AI kan antwoorden geven op basis van aangeleverde documenten — een echte kennischatbot.",
    capabilities: ["Bedrijfskennis chatbot", "Slimme zoekfunctie", "Polis-assistent"],
    maturity: "vandaag",
  },
  {
    id: "copilot_docs",
    vereist: ["copilot", "documenten"],
    titel: "Documentintelligentie met Copilot",
    uitleg: "Copilot analyseert, vat samen en deelt documenten met collega's.",
    capabilities: ["Samenvatten", "Mailconcepten", "Beleidsstuk-Q&A"],
    maturity: "vandaag",
  },
  {
    id: "achmea_schade",
    vereist: ["achmeagpt", "schadedata"],
    titel: "Interne GPT schade-AI",
    uitleg: "Interne AI-oplossing met toegang tot schadecontext.",
    capabilities: ["Schadeduiding", "Interne assistent", "Beleidsadvies"],
    maturity: "vandaag",
  },
  {
    id: "achmea_klant",
    vereist: ["achmeagpt", "vector_db", "klantgesprekken"],
    titel: "Klant-bewuste assistent",
    uitleg:
      "Eigen interne GPT begrijpt eerdere klantinteracties en gebruikt realtime relevante kennis.",
    capabilities: ["Realtime klantcontext", "Persoonlijke service", "Snellere afhandeling"],
    maturity: "vandaag",
  },
  {
    id: "memory_ai",
    vereist: ["llm", "vector_db", "klantgesprekken"],
    titel: "AI met klantgeheugen",
    uitleg: "Een assistent die eerdere gesprekken onthoudt en context hergebruikt.",
    capabilities: ["Conversatiegeheugen", "Personalisatie"],
    maturity: "opkomend",
  },
  {
    id: "voice_assist",
    vereist: ["voice_ai", "llm"],
    titel: "Spraakassistent",
    uitleg: "Spraak in, spraak uit — met taalbegrip eronder.",
    capabilities: ["Telefonische zelfservice", "Hands-free interactie"],
    maturity: "vandaag",
  },
  {
    id: "call_realtime",
    vereist: ["voice_ai", "llm", "klantgesprekken"],
    titel: "Realtime call-assistent",
    uitleg: "Live ondersteuning voor agents tijdens klantgesprekken.",
    capabilities: ["Next best action", "Live samenvatting", "Coaching"],
    maturity: "opkomend",
  },
  {
    id: "claim_predict",
    vereist: ["predictive_ai", "schadedata"],
    titel: "Schadevoorspelling",
    uitleg: "Voorspel claimkans, kosten en doorlooptijd op basis van historie.",
    capabilities: ["Risicoscore", "Fraude-signaal", "Capaciteitsplanning"],
    maturity: "vandaag",
  },
  {
    id: "early_warning",
    vereist: ["predictive_ai", "weerdata", "iot"],
    titel: "Risico early warning",
    uitleg: "Combineer weer + sensoren om klanten te waarschuwen vóór schade ontstaat.",
    capabilities: ["Stormwaarschuwing", "Lekdetectie", "Preventief advies"],
    maturity: "opkomend",
  },
  {
    id: "prevent_iot",
    vereist: ["predictive_ai", "iot", "schadedata"],
    titel: "Preventieve schadedetectie",
    uitleg: "Sensorpatronen + claimhistorie voorspellen schades vóór ze gebeuren.",
    capabilities: ["Preventiecampagnes", "Slimme polissen"],
    maturity: "experimenteel",
  },
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

export interface Analysis {
  placedIds: string[];
  matchedRecipes: Recipe[];
  partialRecipes: { recipe: Recipe; missing: string[] }[];
  connections: Connection[];
  capabilities: string[];
  warnings: string[];
  status: "leeg" | "incompleet" | "werkend";
  maturity: Maturity | null;
  summary: string;
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

  // Connections: between any two placed pieces that are compatible
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

  // Capabilities
  const capabilities = Array.from(
    new Set(matched.flatMap((r) => r.capabilities)),
  );

  // Warnings
  const warnings: string[] = [];
  if (set.has("llm") && !set.has("vector_db") && !set.has("documenten") && !set.has("klantgesprekken") && matched.length === 0) {
    warnings.push("Het taalmodel kan tekst genereren, maar heeft geen toegang tot specifieke kennis.");
  }
  if (set.has("vector_db") && !set.has("documenten") && !set.has("klantgesprekken") && !set.has("schadedata")) {
    warnings.push("De vector database is leeg — voeg documenten, klantgesprekken of schadedata toe.");
  }
  if ((set.has("vector_db") || set.has("documenten")) && !set.has("llm") && !set.has("achmeagpt") && !set.has("copilot")) {
    warnings.push("Er is kennis aanwezig, maar nog geen taalmodel om er antwoorden uit te halen.");
  }
  if (set.has("predictive_ai") && !set.has("schadedata") && !set.has("iot") && !set.has("weerdata")) {
    warnings.push("Predictive AI zonder data heeft niets om op te leren.");
  }
  if (set.has("voice_ai") && !set.has("llm")) {
    warnings.push("Voice AI hoort woorden, maar zonder taalmodel begrijpt het de betekenis niet.");
  }
  if (set.has("iot") && !set.has("predictive_ai")) {
    warnings.push("IoT-signalen worden binnengehaald, maar er is geen model dat patronen herkent.");
  }
  if (set.has("weerdata") && !set.has("predictive_ai") && !set.has("iot") && !set.has("schadedata")) {
    warnings.push("Weerdata alleen is interessant, maar wordt pas waardevol in combinatie.");
  }
  if ((set.has("schadedata") || set.has("klantgesprekken")) && !set.has("privacy")) {
    warnings.push("Tip: voeg Privacy toe — je werkt met gevoelige klant- of schadedata.");
  }
  if (set.has("legacy_it") && matched.length > 0) {
    warnings.push("Legacy IT betekent: reken op extra integratie-werk voor productie.");
  }

  // Maturity (laagste van matched recipes)
  const order: Maturity[] = ["vandaag", "opkomend", "experimenteel"];
  let maturity: Maturity | null = null;
  for (const r of matched) {
    if (!maturity || order.indexOf(r.maturity) > order.indexOf(maturity)) {
      maturity = r.maturity;
    }
  }

  let status: Analysis["status"] = "leeg";
  let summary = "Sleep componenten naar het canvas om een AI-architectuur te bouwen.";
  if (placedIds.length > 0) {
    status = matched.length > 0 ? "werkend" : "incompleet";
    if (status === "werkend") {
      summary = `Je hebt ${matched.length} werkende AI-systeem${matched.length > 1 ? "en" : ""} gebouwd.`;
    } else {
      summary = "Je componenten passen nog niet samen tot een werkend systeem.";
    }
  }

  return {
    placedIds,
    matchedRecipes: matched,
    partialRecipes: partial.slice(0, 4),
    connections,
    capabilities,
    warnings,
    status,
    maturity,
    summary,
  };
}
