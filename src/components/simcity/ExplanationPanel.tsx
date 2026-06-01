import { motion, AnimatePresence } from "motion/react";
import {
  CheckCircle2, AlertTriangle, Sparkles, Info, Zap, ListChecks, Plus,
  TrendingUp, Compass, Lightbulb,
} from "lucide-react";
import type { Analysis } from "@/lib/simcity/pieces";
import { PIECE_MAP } from "@/lib/simcity/pieces";

const MATURITY_LABEL = {
  vandaag: "Vandaag mogelijk",
  opkomend: "Opkomend",
  experimenteel: "Experimenteel",
} as const;

const MATURITY_COLOR = {
  vandaag: "var(--success)",
  opkomend: "var(--primary)",
  experimenteel: "var(--accent)",
} as const;

export function ExplanationPanel({
  analysis,
  onAddPiece,
}: {
  analysis: Analysis;
  onAddPiece?: (id: string) => void;
}) {
  const {
    status, matchedRecipes, partialRecipes, warnings, nudges, capabilities,
    maturity, summary, scores, propositiehoeken, whyItWorks, nextBest,
  } = analysis;

  const statusBadge =
    status === "werkend"
      ? { label: "Sterke combinatie", color: "var(--success)", Icon: CheckCircle2 }
      : status === "incompleet"
      ? { label: "Bijna een concept", color: "var(--warning)", Icon: AlertTriangle }
      : { label: "Leeg canvas", color: "var(--muted-foreground)", Icon: Info };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="px-5 py-4 border-b border-border/60">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium"
            style={{
              color: statusBadge.color,
              background: `color-mix(in oklab, ${statusBadge.color} 14%, transparent)`,
              border: `1px solid color-mix(in oklab, ${statusBadge.color} 40%, transparent)`,
            }}
          >
            <statusBadge.Icon className="h-3 w-3" />
            {statusBadge.label}
          </span>
          {maturity && (
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium"
              style={{
                color: MATURITY_COLOR[maturity],
                background: `color-mix(in oklab, ${MATURITY_COLOR[maturity]} 14%, transparent)`,
                border: `1px solid color-mix(in oklab, ${MATURITY_COLOR[maturity]} 40%, transparent)`,
              }}
            >
              <Zap className="h-3 w-3" />
              {MATURITY_LABEL[maturity]}
            </span>
          )}
          {propositiehoeken.map((h) => (
            <span
              key={h}
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium capitalize"
              style={{
                color: "var(--primary)",
                background: "color-mix(in oklab, var(--primary) 12%, transparent)",
                border: "1px solid color-mix(in oklab, var(--primary) 36%, transparent)",
              }}
            >
              <Compass className="h-3 w-3" />
              {h}
            </span>
          ))}
        </div>
        <p className="mt-3 text-sm text-foreground/90 leading-snug">{summary}</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
        {/* Scores */}
        {analysis.placedIds.length > 0 && (
          <section className="grid grid-cols-2 gap-2">
            <Score label="Creatieve potentie" value={scores.creatief} color="var(--accent)" />
            <Score label="Marketingwaarde" value={scores.marketing} color="var(--primary)" />
            <Score label="Uitvoerbaarheid" value={scores.uitvoerbaar} color="var(--success)" />
            <Score label="Risico / aandacht" value={scores.risico} color="var(--warning)" invert />
          </section>
        )}

        {/* Why it works */}
        {whyItWorks && (
          <section className="rounded-2xl border border-primary/20 bg-primary/5 p-3">
            <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-muted-foreground font-semibold">
              <Lightbulb className="h-3 w-3" /> Waarom dit werkt
            </div>
            <p className="mt-1.5 text-sm text-foreground/90 leading-snug">{whyItWorks}</p>
          </section>
        )}

        {/* Next best piece */}
        {nextBest.length > 0 && (
          <section>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-2 flex items-center gap-1.5">
              <TrendingUp className="h-3 w-3" /> Volgende beste bouwsteen
            </h3>
            <div className="grid gap-2">
              {nextBest.map((nb) => {
                const p = PIECE_MAP[nb.id];
                if (!p) return null;
                return (
                  <button
                    key={nb.id}
                    type="button"
                    onClick={() => onAddPiece?.(nb.id)}
                    className="group text-left rounded-xl border border-border/60 bg-card/60 hover:border-primary/50 hover:shadow-[0_0_18px_-8px_var(--primary)] transition p-3 flex items-start gap-2.5"
                  >
                    <div className="shrink-0 h-7 w-7 rounded-md bg-primary/15 text-primary flex items-center justify-center">
                      <Plus className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-foreground">{p.naam}</div>
                      <div className="text-xs text-muted-foreground leading-snug">{nb.reden}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* Working systems */}
        <AnimatePresence mode="popLayout">
          {matchedRecipes.map((r) => (
            <motion.section
              key={r.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="rounded-2xl border border-[color:var(--success)]/30 bg-[color:var(--success)]/5 p-4"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[color:var(--success)]" />
                <h3 className="font-display font-semibold text-foreground text-sm">{r.titel}</h3>
              </div>
              <p className="mt-1.5 text-sm text-muted-foreground leading-snug">{r.uitleg}</p>
              <div className="mt-3">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <ListChecks className="h-3 w-3" /> Ontgrendelde mogelijkheden
                </div>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {r.capabilities.map((c) => (
                    <li
                      key={c}
                      className="text-[11px] px-2 py-1 rounded-full border border-[color:var(--success)]/40 bg-[color:var(--success)]/10 text-foreground"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.section>
          ))}
        </AnimatePresence>

        {/* Partial */}
        {partialRecipes.length > 0 && (
          <section>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-2">
              Bijna een concept
            </h3>
            <div className="space-y-2">
              {partialRecipes.map(({ recipe, missing }) => (
                <div
                  key={recipe.id}
                  className="rounded-xl border border-[color:var(--warning)]/30 bg-[color:var(--warning)]/5 p-3"
                >
                  <div className="text-sm font-medium text-foreground">{recipe.titel}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{recipe.uitleg}</div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    Mist nog:{" "}
                    {missing.map((id, i) => (
                      <span key={id}>
                        <button
                          type="button"
                          onClick={() => onAddPiece?.(id)}
                          className="text-[color:var(--warning)] font-medium hover:underline"
                        >
                          {PIECE_MAP[id]?.naam ?? id}
                        </button>
                        {i < missing.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Nudges */}
        {nudges.length > 0 && (
          <section>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-2">
              Tips
            </h3>
            <ul className="space-y-1.5">
              {nudges.map((n, i) => (
                <li key={i} className="text-xs text-foreground/90 flex gap-2 items-start">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  {n}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Warnings */}
        {warnings.length > 0 && (
          <section>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-2">
              Signalen
            </h3>
            <ul className="space-y-2">
              {warnings.map((w, i) => (
                <li key={i} className="flex gap-2 text-sm text-foreground/90 rounded-xl border border-border/60 bg-muted/30 p-3">
                  <AlertTriangle className="h-4 w-4 text-[color:var(--warning)] shrink-0 mt-0.5" />
                  <span className="leading-snug">{w}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {capabilities.length > 0 && (
          <section>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-2">
              Wat je hiermee kunt
            </h3>
            <ul className="grid gap-1.5">
              {capabilities.map((c) => (
                <li key={c} className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle2 className="h-4 w-4 text-[color:var(--success)]" />
                  {c}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}

function Score({ label, value, color, invert = false }: { label: string; value: number; color: string; invert?: boolean }) {
  const tone = invert
    ? value > 60 ? "var(--danger)" : value > 30 ? "var(--warning)" : "var(--success)"
    : color;
  return (
    <div className="rounded-xl border border-border/60 bg-card/50 p-2.5">
      <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground font-semibold">{label}</div>
      <div className="mt-1 flex items-center gap-2">
        <div className="flex-1 h-1.5 rounded-full bg-muted/50 overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${Math.max(4, Math.min(100, value))}%`, background: tone }}
          />
        </div>
        <span className="text-xs font-semibold text-foreground tabular-nums">{value}</span>
      </div>
    </div>
  );
}
