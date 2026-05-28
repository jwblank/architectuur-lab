import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, AlertTriangle, Sparkles, Info, Zap, Lock, ListChecks } from "lucide-react";
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

export function ExplanationPanel({ analysis }: { analysis: Analysis }) {
  const { status, matchedRecipes, partialRecipes, warnings, capabilities, maturity, summary } = analysis;

  const statusBadge =
    status === "werkend"
      ? { label: "Werkende architectuur", color: "var(--success)", Icon: CheckCircle2 }
      : status === "incompleet"
      ? { label: "Onvolledige architectuur", color: "var(--warning)", Icon: AlertTriangle }
      : { label: "Leeg canvas", color: "var(--muted-foreground)", Icon: Info };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="px-5 py-4 border-b border-border/60">
        <div className="flex items-center gap-2">
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
        </div>
        <p className="mt-3 text-sm text-foreground/90 leading-snug">{summary}</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
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

        {/* Partial recipes — what's missing */}
        {partialRecipes.length > 0 && (
          <section>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-2">
              Bijna een werkend systeem
            </h3>
            <div className="space-y-2">
              {partialRecipes.map(({ recipe, missing }) => (
                <div
                  key={recipe.id}
                  className="rounded-xl border border-[color:var(--warning)]/30 bg-[color:var(--warning)]/5 p-3"
                >
                  <div className="text-sm font-medium text-foreground">{recipe.titel}</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    Mist nog:{" "}
                    {missing.map((id, i) => (
                      <span key={id}>
                        <span className="text-[color:var(--warning)] font-medium">
                          {PIECE_MAP[id]?.naam ?? id}
                        </span>
                        {i < missing.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
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
                <li
                  key={i}
                  className="flex gap-2 text-sm text-foreground/90 rounded-xl border border-border/60 bg-muted/30 p-3"
                >
                  <AlertTriangle className="h-4 w-4 text-[color:var(--warning)] shrink-0 mt-0.5" />
                  <span className="leading-snug">{w}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Capability summary */}
        {capabilities.length > 0 && (
          <section>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-2">
              Wat je vandaag kunt aanbieden
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

        {status === "leeg" && (
          <section className="rounded-2xl border border-dashed border-border p-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2 text-foreground font-medium mb-2">
              <Lock className="h-4 w-4" /> Probeer eens
            </div>
            <ul className="space-y-1.5 list-disc list-inside marker:text-primary">
              <li>Taalmodel + Vector Database + Documenten</li>
              <li>Eigen interne GPT + Schadedata</li>
              <li>Predictive AI + Weerdata + IoT Sensoren</li>
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
