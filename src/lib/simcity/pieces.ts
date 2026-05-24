export type Category = "intel" | "knowledge" | "data" | "ai" | "constraint";

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
];

export const PIECE_MAP: Record<string, Piece> = Object.fromEntries(
  PIECES.map((p) => [p.id, p]),
);

export const CATEGORY_META: Record<Category, { label: string; color: string }> = {
  intel: { label: "Intelligentie", color: "var(--cat-intel)" },
  knowledge: { label: "Kennis", color: "var(--cat-knowledge)" },
  data: { label: "Data", color: "var(--cat-data)" },
  ai: { label: "AI", color: "var(--cat-ai)" },
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
