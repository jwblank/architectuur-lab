import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const InputSchema = z.object({
  pieces: z
    .array(z.object({ id: z.string().max(64), naam: z.string().max(120), uitleg: z.string().max(400) }))
    .min(1)
    .max(20),
  vorige: z.array(z.string().max(200)).max(5).optional(),
});

export interface MarketingIdee {
  titel: string;
  pitch: string;
  doelgroep: string;
  kanaal: string;
  propositiehoek: string;
  waarom_deze_combinatie: string;
  wow_factor: string;
  eerste_experiment: string;
  benodigde_randvoorwaarde: string;
  gebruikte_bouwstenen: string[];
}

export const genereerInspiratie = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return { ok: false as const, error: "LOVABLE_API_KEY ontbreekt op de server." };
    }

    const stukkenLijst = data.pieces.map((p) => `- ${p.naam}: ${p.uitleg}`).join("\n");
    const namen = data.pieces.map((p) => p.naam);
    const vermijd = data.vorige?.length
      ? `\n\nVermijd dat je deze eerder gegeven ideeën herhaalt:\n- ${data.vorige.join("\n- ")}`
      : "";

    const systemPrompt = `Je bent een creatieve marketing- en propositiestrateeg bij een grote Nederlandse verzekeringsmaatschappij. Je bedenkt verrassende, concrete en uitvoerbare ideeën voor marketing, customer experience, preventie, schadebeleving of nieuwe proposities die juist mogelijk worden door de aangereikte AI-, data-, kanaal- en randvoorwaarde-bouwstenen. Antwoord ALTIJD in helder Nederlands. Wees concreet (geen vage AI-buzzwords), prikkelend, en denk verzekeringsspecifiek (polis, schade, levensgebeurtenissen, preventie, vertrouwen). Houd altijd rekening met privacy, consent en merkconsistentie als die als bouwsteen aanwezig zijn.`;

    const userPrompt = `De gebruiker heeft deze bouwstenen op het canvas geplaatst:\n${stukkenLijst}\n\nBedenk 3 verschillende, creatieve ideeën die deze combinatie mogelijk maakt voor een Nederlandse verzekeraar. Varieer in propositiehoek (acquisitie, retentie, preventie, schadebeleving, merk, service of loyaliteit). Wees concreet over doelgroep en kanaal. Geef bij elk idee ook één concreet experiment dat morgen al getest kan worden en benoem de belangrijkste randvoorwaarde (privacy, consent, merkgids, meting of data). Gebruik bij "gebruikte_bouwstenen" letterlijke namen uit deze lijst: ${namen.join(", ")}.${vermijd}`;

    try {
      const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "google/gemini-3.7-flash",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          tools: [
            {
              type: "function",
              function: {
                name: "presenteer_ideeen",
                description: "Lever 3 verzekerings-marketing/CX-ideeën in een gestructureerd formaat.",
                parameters: {
                  type: "object",
                  properties: {
                    ideeen: {
                      type: "array",
                      minItems: 3,
                      maxItems: 3,
                      items: {
                        type: "object",
                        properties: {
                          titel: { type: "string", description: "Pakkende Nederlandse titel, max 6 woorden." },
                          pitch: { type: "string", description: "2-3 zinnen die het idee uitleggen." },
                          doelgroep: { type: "string", description: "Concrete doelgroep van een verzekeraar." },
                          kanaal: { type: "string", description: "Primair kanaal of touchpoint." },
                          propositiehoek: {
                            type: "string",
                            description: "Eén van: acquisitie, retentie, preventie, schadebeleving, merk, service, loyaliteit.",
                          },
                          waarom_deze_combinatie: { type: "string", description: "Eén zin: waarom werkt dit juist met déze bouwstenen?" },
                          wow_factor: { type: "string", description: "Eén zin: wat maakt het verrassend of bijzonder?" },
                          eerste_experiment: { type: "string", description: "Eén concrete eerste stap die je morgen kunt doen." },
                          benodigde_randvoorwaarde: { type: "string", description: "Belangrijkste randvoorwaarde: privacy, consent, merkgids, meting, data, e.d." },
                          gebruikte_bouwstenen: {
                            type: "array",
                            items: { type: "string" },
                            description: "Namen van de bouwstenen die centraal staan in dit idee.",
                          },
                        },
                        required: [
                          "titel", "pitch", "doelgroep", "kanaal", "propositiehoek",
                          "waarom_deze_combinatie", "wow_factor",
                          "eerste_experiment", "benodigde_randvoorwaarde", "gebruikte_bouwstenen",
                        ],
                        additionalProperties: false,
                      },
                    },
                  },
                  required: ["ideeen"],
                  additionalProperties: false,
                },
              },
            },
          ],
          tool_choice: { type: "function", function: { name: "presenteer_ideeen" } },
        }),
      });

      if (resp.status === 429) {
        return { ok: false as const, error: "Even rustig aan — te veel verzoeken. Probeer het over een paar seconden opnieuw." };
      }
      if (resp.status === 402) {
        return { ok: false as const, error: "AI-credits zijn op. Voeg credits toe in Workspace > Usage." };
      }
      if (!resp.ok) {
        const txt = await resp.text();
        console.error("AI gateway error", resp.status, txt);
        return { ok: false as const, error: `AI-gateway gaf een fout (${resp.status}).` };
      }

      const json = await resp.json();
      const call = json?.choices?.[0]?.message?.tool_calls?.[0];
      const argsStr = call?.function?.arguments;
      if (!argsStr) {
        return { ok: false as const, error: "Geen gestructureerd antwoord ontvangen." };
      }
      const parsed = JSON.parse(argsStr) as { ideeen: Partial<MarketingIdee>[] };
      const ideeen: MarketingIdee[] = (parsed.ideeen ?? []).map((i) => ({
        titel: i.titel ?? "Onbenoemd idee",
        pitch: i.pitch ?? "",
        doelgroep: i.doelgroep ?? "Klanten",
        kanaal: i.kanaal ?? "—",
        propositiehoek: i.propositiehoek ?? "merk",
        waarom_deze_combinatie: i.waarom_deze_combinatie ?? "",
        wow_factor: i.wow_factor ?? "",
        eerste_experiment: i.eerste_experiment ?? "",
        benodigde_randvoorwaarde: i.benodigde_randvoorwaarde ?? "",
        gebruikte_bouwstenen: Array.isArray(i.gebruikte_bouwstenen) ? i.gebruikte_bouwstenen : [],
      }));
      return { ok: true as const, ideeen };
    } catch (err) {
      console.error("inspiration error", err);
      return { ok: false as const, error: "Er ging iets mis bij het genereren van ideeën." };
    }
  });
