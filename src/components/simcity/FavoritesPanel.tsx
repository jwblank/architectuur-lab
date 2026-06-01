import { Star, Trash2, Inbox } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { IdeeCard } from "./InspirationPanel";
import { useFavorites } from "@/hooks/use-favorites";

export function FavoritesPanel() {
  const fav = useFavorites();
  return (
    <div className="flex flex-col h-full">
      <div className="px-5 py-4 border-b border-border/60 flex items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-[color:var(--warning)] fill-[color:var(--warning)]" />
            <h3 className="font-display font-semibold text-foreground text-sm">Bewaarde ideeën</h3>
            <span className="text-[11px] text-muted-foreground">({fav.items.length})</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1 leading-snug">
            Je favorieten blijven bewaard, ook na het genereren van nieuwe ideeën.
          </p>
        </div>
        {fav.items.length > 0 && (
          <button
            type="button"
            onClick={fav.clear}
            className="shrink-0 inline-flex items-center gap-1 rounded-md border border-border/60 px-2 py-1 text-[11px] text-muted-foreground hover:text-[color:var(--danger)] transition"
            title="Verwijder alle favorieten"
          >
            <Trash2 className="h-3 w-3" /> Alles wissen
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        {fav.items.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border p-5 text-center text-sm text-muted-foreground">
            <Inbox className="h-6 w-6 mx-auto mb-2 text-muted-foreground/70" />
            <p className="leading-snug">
              Nog geen favorieten. Ster ideeën in het inspiratiepaneel om ze hier te bewaren.
            </p>
          </div>
        )}
        <AnimatePresence initial={false}>
          {fav.items.map((idee) => (
            <IdeeCard
              key={idee.id}
              idee={idee}
              isFavorite
              onToggleFavorite={() => fav.toggle(idee)}
              onRemove={() => fav.remove(idee.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
