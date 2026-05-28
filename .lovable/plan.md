# Plan: COP AI Sim → Inspiratie-sandbox met AI

## Doel
Van een "ontdek vaste recepten"-app naar een **creatieve inspiratietool**: gebruikers combineren puzzelstukjes en een LLM bedenkt steeds nieuwe, concrete marketing-use-cases voor een verzekeringsmaatschappij.

## 1. Uitbreiding bouwstenen (van 13 naar ~30)

Nieuwe categorieën + stukjes, allemaal NL, gericht op marketing/verzekeren:

**Intelligentie (extra)**: Beeldgeneratie-AI, Video-AI, Agent / Autonome AI, Translation AI, Sentiment-AI
**Kennis (extra)**: Productcatalogus polissen, Merkrichtlijnen / Tone of voice, Marktonderzoek, Concurrentie-intel, FAQ-bibliotheek
**Data (extra)**: CRM-data, Website-gedrag / clickstream, Social media signalen, Campagne-resultaten, Demografische data, Locatiedata, Levensgebeurtenissen (verhuizen, kind, auto)
**Kanalen (nieuwe categorie)**: E-mail, Push notificaties, Social ads, Website / landingspagina, Chatbot, Callcenter, App
**Randvoorwaarden (extra)**: Toestemming / opt-in, Merkconsistentie, Budget, A/B test-framework

→ `src/lib/simcity/pieces.ts` krijgt uitgebreide `PIECES`-array en nieuwe categorie `channel` met eigen kleur in `styles.css` + `CATEGORY_META`.

## 2. Nieuwe "Inspiratie-modus" (kernfeature)

Naast de bestaande recept-analyse komt een **AI Inspiratie-paneel**:

- Knop **"Genereer marketing-idee"** in het ExplanationPanel (of als nieuwe tab "Inspiratie" vs "Analyse").
- Bij klik: stuur de geplaatste stukjes naar een server-functie die de Lovable AI Gateway aanroept (`google/gemini-3-flash-preview`).
- LLM krijgt:
  - Lijst geplaatste bouwstenen (naam + uitleg)
  - Context: "verzekeringsmaatschappij, marketing-afdeling, Nederlands"
  - Instructie: bedenk 2-3 concrete, creatieve campagne- of customer-experience-ideeën die juist deze combinatie mogelijk maakt
- Output via **tool calling / structured output** (geen losse JSON-parsing):
  ```
  { ideeen: [{ titel, pitch, doelgroep, kanaal, waarom_deze_combinatie, wow_factor }] }
  ```
- Streaming respons → ideeën verschijnen woord-voor-woord (voelt magisch).
- Elke combinatie geeft andere ideeën → herhaaldelijk klikken = nieuwe inspiratie.

## 3. UI-aanpassingen

- **ExplanationPanel** krijgt twee tabs: *Wat werkt er?* (bestaande analyse) en *Inspiratie* (AI-ideeën).
- Inspiratie-tab toont: prominent AI-glow, "Genereer idee" knop, gegenereerde kaartjes met titel/pitch/kanaal-badge, "Nog een idee" knop, geschiedenis van laatste 3 ideeën.
- PieceLibrary scrollt netjes met de extra stukjes; categorie-headers blijven sticky.
- Lichte hint "Combineer 3+ stukjes voor de beste ideeën" als er weinig op het canvas staat.

## 4. Technisch (voor de nieuwsgierigen)

- **Lovable Cloud** aanzetten (nodig voor Lovable AI Gateway + `LOVABLE_API_KEY`).
- Nieuwe server function `src/lib/inspiration.functions.ts` met `createServerFn` → roept gateway aan met `stream: true` en een `generate_marketing_ideas` tool-schema.
- Client gebruikt SSE-streaming zoals beschreven in de AI-gateway docs (line-by-line parser, geen buffering van hele events).
- Foutafhandeling: 429 → "Even rustig aan, probeer zo opnieuw"; 402 → "Credits op — voeg credits toe in workspace settings".
- Rate-limit per sessie: max 1 verzoek per 2 seconden (debounce knop).

## 5. Resultaat / gevoel

Gebruiker sleept bv. *Eigen interne GPT + CRM-data + Levensgebeurtenissen + E-mail + Merkrichtlijnen* → AI verzint:
> **"Levensmoment-mail"** — Detecteert in CRM dat een klant net een kind heeft gekregen, genereert een persoonlijke mail in jullie tone-of-voice met een gratis kinder-aanvulling op de inboedelpolis. *Wow-factor: voelt persoonlijk gemaakt door een mens.*

Elke nieuwe combinatie = nieuwe ideeën → de tool wordt verslavend om mee te experimenteren en prikkelt echt tot creatieve marketing-concepten.

## Open vragen
1. Akkoord om **Lovable Cloud** aan te zetten? (vereist voor de AI-aanroepen — gratis quota inbegrepen, daarna credit-based)
2. Voorkeur voor **één AI-tab naast Analyse**, of een **knop bovenin** die de hele rechterpaneel vervangt door inspiratie?
3. Moet ik de huidige recept-logica (RAG, Predictive AI, etc.) behouden naast de AI-inspiratie, of mag dat helemaal weg ten gunste van pure AI-inspiratie?