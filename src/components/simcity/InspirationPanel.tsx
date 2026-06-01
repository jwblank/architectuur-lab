import { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useServerFn } from "@tanstack/react-start";
import {
  Sparkles, Wand2, RefreshCw, Loader2, AlertCircle, Target, Radio, Lightbulb,
  Megaphone, Star, FlaskConical, ShieldCheck, Compass,
} from "lucide-react";
import { genereerInspiratie, type MarketingIdee } from "@/lib/inspiration.functions";
import { PIECE_MAP } from "@/lib/simcity/pieces";
import { useFavorites } from "@/hooks/use-favorites";
import { cn } from "@/lib/utils";

interface Props {
  placedIds: string[];
}

export function InspirationPanel({ placedIds }: Props) {
  const fn = useServerFn(genereerInspiratie);
  const fav = useFavorites();
  const [ideeen, setIdeeen] = useState<MarketingIdee[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastClick = useRef(0);

  const tooFew = placedIds.length < 2;

  const genereer = useCallback(async () => {
    const now = Date.now();
    if (now - lastClick.current < 2000) return;
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
          <h3 className="font-display font-semibold text-foreground text-sm">Creatieve sparringpartner</h3>
        </div>
        <p className="text-xs text-muted-foreground leading-snug">
          {tooFew
            ? "Plaats minstens 2 bouwstenen — meer combinaties geven verrassendere ideeën."
            : "Laat AI bedenken welke verzekerings­proposities, campagnes of klantmomenten jouw combinatie mogelijk maakt."}
        </p>
        <button
          type="button"
          disabled={tooFew || loading}
          onClick={genereer}
          className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-[0_0_24px_-6px_var(--primary)] disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 transition"
        >
          {loading ? (
            <><Loader2 className="h-4 w-4 animate-spin" /> AI bedenkt ideeën…</>
          ) : ideeen.length === 0 ? (
            <><Sparkles className="h-4 w-4" /> Genereer 3 ideeën</>
          ) : (
            <><RefreshCw className="h-4 w-4" /> Nog 3 nieuwe ideeën</>
          )}
        </button>
        {!tooFew && !loading && (
          <p className="mt-2 text-[11px] text-muted-foreground/80 leading-snug">
            Tip: ster je beste ideeën zodat ze niet verloren gaan.
          </p>
        )}
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
              <Lightbulb className="h-4 w-4" /> Begin met puzzelen
            </div>
            <p className="leading-snug">
              Combineer bijvoorbeeld: <em>Eigen interne GPT + CRM-data + Levensgebeurtenissen + E-mail + Merkgids + Consent</em> en laat AI er een propositie van maken.
            </p>
          </div>
        )}

        <AnimatePresence initial={false}>
          {ideeen.map((idee, i) => (
            <IdeeCard
              key={`${idee.titel}-${i}`}
              idee={idee}
              isFavorite={fav.isFavorite(idee)}
              onToggleFavorite={() => fav.toggle(idee)}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function IdeeCard({
  idee,
  isFavorite,
  onToggleFavorite,
  onRemove,
  compact = false,
}: {
  idee: MarketingIdee;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onRemove?: () => void;
  compact?: boolean;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      className={cn(
        "rounded-2xl border p-4 shadow-[0_0_20px_-12px_var(--primary)]",
        isFavorite
          ? "border-[color:var(--warning)]/50 bg-gradient-to-br from-[color:var(--warning)]/10 via-card/60 to-accent/5"
          : "border-primary/30 bg-gradient-to-br from-primary/5 via-card/60 to-accent/5",
      )}
    >
      <div className="flex items-start gap-2">
        <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" />
        <h4 className="font-display font-semibold text-foreground text-sm leading-snug flex-1">
          {idee.titel}
        </h4>
        {onToggleFavorite && (
          <button
            type="button"
            onClick={onToggleFavorite}
            aria-label={isFavorite ? "Verwijder uit favorieten" : "Bewaar als favoriet"}
            className={cn(
              "shrink-0 rounded-full p-1.5 transition",
              isFavorite
                ? "text-[color:var(--warning)] bg-[color:var(--warning)]/15"
                : "text-muted-foreground hover:text-[color:var(--warning)] hover:bg-muted/40",
            )}
          >
            <Star className={cn("h-4 w-4", isFavorite && "fill-[color:var(--warning)]")} />
          </button>
        )}
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            aria-label="Verwijder favoriet"
            className="shrink-0 rounded-full p-1.5 text-muted-foreground hover:text-[color:var(--danger)] hover:bg-muted/40 transition text-[11px]"
          >
            ✕
          </button>
        )}
      </div>

      {isFavorite && (
        <span className="mt-1 inline-block text-[10px] uppercase tracking-[0.14em] font-semibold text-[color:var(--warning)]">
          Bewaard
        </span>
      )}

      <p className="mt-2 text-sm text-foreground/90 leading-snug">{idee.pitch}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <Badge icon={Compass} label={idee.propositiehoek} color="var(--primary)" />
        <Badge icon={Target} label={idee.doelgroep} color="var(--cat-knowledge)" />
        <Badge icon={Megaphone} label={idee.kanaal} color="var(--cat-channel)" />
      </div>

      {!compact && (
        <div className="mt-3 grid gap-2 text-xs">
          <Row icon={Radio} title="Waarom deze combinatie" body={idee.waarom_deze_combinatie} />
          <Row icon={Sparkles} title="Wow-factor" body={idee.wow_factor} />
          <Row icon={FlaskConical} title="Eerste experiment" body={idee.eerste_experiment} />
          <Row icon={ShieldCheck} title="Randvoorwaarde" body={idee.benodigde_randvoorwaarde} />
        </div>
      )}

      {idee.gebruikte_bouwstenen?.length > 0 && (
        <div className="mt-3">
          <div className="text-[10px] uppercase tracking-[0.14em] font-semibold text-muted-foreground mb-1.5">
            Bouwstenen
          </div>
          <div className="flex flex-wrap gap-1">
            {idee.gebruikte_bouwstenen.map((b, i) => (
              <span
                key={`${b}-${i}`}
                className="text-[10px] px-1.5 py-0.5 rounded-md border border-border/60 bg-muted/30 text-foreground/80"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.article>
  );
}

function Badge({ icon: Icon, label, color }: { icon: React.ComponentType<{ className?: string }>; label: string; color: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium capitalize"
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
  if (!body) return null;
  return (
    <div className="rounded-lg border border-border/50 bg-muted/20 p-2.5">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-muted-foreground font-semibold">
        <Icon className="h-3 w-3" /> {title}
      </div>
      <div className="text-foreground/90 mt-1 leading-snug">{body}</div>
    </div>
  );
}
