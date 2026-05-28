import { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useServerFn } from "@tanstack/react-start";
import { Sparkles, Wand2, RefreshCw, Loader2, AlertCircle, Target, Radio, Lightbulb, Megaphone } from "lucide-react";
import { genereerInspiratie, type MarketingIdee } from "@/lib/inspiration.functions";
import { PIECE_MAP } from "@/lib/simcity/pieces";

interface Props {
  placedIds: string[];
}

export function InspirationPanel({ placedIds }: Props) {
  const fn = useServerFn(genereerInspiratie);
  const [ideeen, setIdeeen] = useState<MarketingIdee[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastClick = useRef(0);

  const tooFew = placedIds.length < 2;

  const genereer = useCallback(async () => {
    const now = Date.now();
    if (now - lastClick.current < 2000) return; // debounce
    lastClick.current = now;

    setLoading(true);
    setError(null);
    try {
      const pieces = placedIds
        .map((id) => PIECE_MAP[id])
        .filter(Boolean)
        .map((p) => ({ id: p.id, naam: p.naam, uitleg: p.uitleg }));
      const vorige = ideeen.slice(0, 3).map((i) => i.titel);
      const res = await fn({ data: { pieces, vorige } });
      if (res.ok) {
        setIdeeen([...res.ideeen, ...ideeen].slice(0, 9));
      } else {
        setError(res.error);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Onbekende fout");
    } finally {
      setLoading(false);
    }
  }, [fn, placedIds, ideeen]);

  return (
    <div className="flex flex-col h-full">
      <div className="px-5 py-4 border-b border-border/60">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[0_0_18px_-3px_var(--primary)]">
            <Wand2 className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
          <h3 className="font-display font-semibold text-foreground text-sm">AI-inspiratie</h3>
        </div>
        <p className="text-xs text-muted-foreground leading-snug">
          {tooFew
            ? "Plaats minstens 2 bouwstenen — meer combinaties geven prikkelendere ideeën."
            : "Laat AI bedenken welke marketing- of customer-experience-ideeën jouw combinatie mogelijk maakt."}
        </p>
        <button
          type="button"
          disabled={tooFew || loading}
          onClick={genereer}
          className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-[0_0_24px_-6px_var(--primary)] disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 transition"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> AI denkt na…
            </>
          ) : ideeen.length === 0 ? (
            <>
              <Sparkles className="h-4 w-4" /> Genereer ideeën
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4" /> Nog 3 nieuwe ideeën
            </>
          )}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        {error && (
          <div className="flex gap-2 rounded-xl border border-[color:var(--danger)]/40 bg-[color:var(--danger)]/10 p-3 text-sm text-foreground">
            <AlertCircle className="h-4 w-4 text-[color:var(--danger)] shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {ideeen.length === 0 && !loading && !error && (
          <div className="rounded-2xl border border-dashed border-border p-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2 text-foreground font-medium mb-2">
              <Lightbulb className="h-4 w-4" /> Inspiratiemodus
            </div>
            <p className="leading-snug">
              Combineer bijvoorbeeld: <em>Eigen interne GPT + CRM-data + Levensgebeurtenissen + E-mail + Merkgids</em> en zie wat de AI verzint.
            </p>
          </div>
        )}

        <AnimatePresence initial={false}>
          {ideeen.map((idee, i) => (
            <motion.article
              key={`${idee.titel}-${i}`}
              layout
              initial={{ opacity: 0, y: 10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 via-card/60 to-accent/5 p-4 shadow-[0_0_20px_-12px_var(--primary)]"
            >
              <div className="flex items-start gap-2">
                <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <h4 className="font-display font-semibold text-foreground text-sm leading-snug">
                  {idee.titel}
                </h4>
              </div>
              <p className="mt-2 text-sm text-foreground/90 leading-snug">{idee.pitch}</p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                <Badge icon={Target} label={idee.doelgroep} color="var(--cat-knowledge)" />
                <Badge icon={Megaphone} label={idee.kanaal} color="var(--cat-channel)" />
              </div>

              <div className="mt-3 grid gap-2 text-xs">
                <Row icon={Radio} title="Waarom deze combinatie" body={idee.waarom_deze_combinatie} />
                <Row icon={Sparkles} title="Wow-factor" body={idee.wow_factor} />
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Badge({ icon: Icon, label, color }: { icon: React.ComponentType<{ className?: string }>; label: string; color: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium"
      style={{
        color,
        background: `color-mix(in oklab, ${color} 14%, transparent)`,
        border: `1px solid color-mix(in oklab, ${color} 38%, transparent)`,
      }}
    >
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
}

function Row({ icon: Icon, title, body }: { icon: React.ComponentType<{ className?: string }>; title: string; body: string }) {
  return (
    <div className="rounded-lg border border-border/50 bg-muted/20 p-2.5">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-muted-foreground font-semibold">
        <Icon className="h-3 w-3" /> {title}
      </div>
      <div className="text-foreground/90 mt-1 leading-snug">{body}</div>
    </div>
  );
}
