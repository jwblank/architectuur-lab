import { useMemo } from "react";
import { PIECES, CATEGORY_META, type Piece, type Category } from "@/lib/simcity/pieces";
import { PieceCard } from "./PieceCard";

interface Props {
  onAdd: (piece: Piece) => void;
}

const ORDER: Category[] = ["intel", "knowledge", "data", "ai", "constraint"];

export function PieceLibrary({ onAdd }: Props) {
  const grouped = useMemo(() => {
    const g: Record<Category, Piece[]> = {
      intel: [], knowledge: [], data: [], ai: [], constraint: [],
    };
    PIECES.forEach((p) => g[p.category].push(p));
    return g;
  }, []);

  return (
    <aside className="flex flex-col gap-4 h-full overflow-hidden">
      <div>
        <h2 className="font-display text-lg font-semibold text-foreground">Bouwstenen</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Sleep een blok naar het canvas — of dubbelklik.</p>
      </div>
      <div className="overflow-y-auto pr-1 -mr-1 flex-1 space-y-5">
        {ORDER.map((cat) => {
          const meta = CATEGORY_META[cat];
          const items = grouped[cat];
          return (
            <section key={cat}>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: meta.color, boxShadow: `0 0 10px ${meta.color}` }}
                />
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {meta.label}
                </h3>
              </div>
              <div className="grid gap-2">
                {items.map((p) => (
                  <PieceCard key={p.id} piece={p} onAdd={onAdd} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </aside>
  );
}
