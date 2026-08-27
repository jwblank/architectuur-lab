import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useMemo, useState } from "react";
import { Sparkles, Wand2, ListChecks, Star, Trophy } from "lucide-react";
import { PieceLibrary } from "@/components/simcity/PieceLibrary";
import { Canvas, type PlacedPiece } from "@/components/simcity/Canvas";
import { ExplanationPanel } from "@/components/simcity/ExplanationPanel";
import { InspirationPanel, type GeneratedIdee } from "@/components/simcity/InspirationPanel";
import { FavoritesPanel } from "@/components/simcity/FavoritesPanel";
import { analyze, CHALLENGES, PIECE_MAP, type Piece } from "@/lib/simcity/pieces";
import { useFavorites } from "@/hooks/use-favorites";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: Index,
});

type Tab = "analyse" | "inspiratie" | "favorieten";

function Index() {
  const [placed, setPlaced] = useState<PlacedPiece[]>([]);
  const [tab, setTab] = useState<Tab>("inspiratie");
  const [activeChallenge, setActiveChallenge] = useState<string | null>(null);
  const [ideeen, setIdeeen] = useState<GeneratedIdee[]>([]);
  const fav = useFavorites();

  const addPiece = useCallback((piece: Piece, x = 50, y = 50) => {
    setPlaced((prev) => {
      if (prev.some((p) => p.pieceId === piece.id)) return prev;
      const offset = prev.length * 2;
      return [
        ...prev,
        {
          uid: `${piece.id}-${Date.now()}`,
          pieceId: piece.id,
          x: Math.max(8, Math.min(92, x + offset)),
          y: Math.max(10, Math.min(90, y + offset)),
        },
      ];
    });
  }, []);

  const addById = useCallback(
    (id: string) => {
      const p = PIECE_MAP[id];
      if (p) addPiece(p);
    },
    [addPiece],
  );

  const addFromDrop = useCallback(
    (pieceId: string, x: number, y: number) => {
      const piece = PIECE_MAP[pieceId];
      if (piece) addPiece(piece, x, y);
    },
    [addPiece],
  );

  const move = useCallback((uid: string, x: number, y: number) => {
    setPlaced((prev) => prev.map((p) => (p.uid === uid ? { ...p, x, y } : p)));
  }, []);

  const remove = useCallback((uid: string) => {
    setPlaced((prev) => prev.filter((p) => p.uid !== uid));
  }, []);

  const clear = useCallback(() => setPlaced([]), []);

  const placedIds = useMemo(() => placed.map((p) => p.pieceId), [placed]);
  const analysis = useMemo(() => analyze(placedIds), [placedIds]);

  const startChallenge = useCallback(
    (id: string) => {
      const c = CHALLENGES.find((x) => x.id === id);
      if (!c) return;
      setActiveChallenge(id);
      clear();
      // place hint pieces sequentially so the user sees the starting layout
      c.hint.forEach((pid, i) => {
        const p = PIECE_MAP[pid];
        if (!p) return;
        setTimeout(() => addPiece(p, 25 + (i % 4) * 18, 25 + Math.floor(i / 4) * 25), i * 60);
      });
      setTab("analyse");
    },
    [addPiece, clear],
  );

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-6 lg:px-10 py-4 border-b border-border/60 backdrop-blur-sm bg-background/60 sticky top-0 z-20">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-primary via-accent to-[color:var(--warning)] flex items-center justify-center shadow-[0_0_24px_-4px_var(--primary)]">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-lg sm:text-xl font-semibold leading-tight">
                <span className="text-gradient">AI Propositie</span>{" "}
                <span className="text-foreground">Lab</span>
              </h1>
              <p className="text-xs text-muted-foreground max-w-xl">
                Combineer AI, data, kanalen en randvoorwaarden. Ontdek welke marketing- en propositie-ideeën ontstaan voor verzekeren.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <span className="hidden md:inline">{placed.length} bouwstenen op canvas</span>
            <span className="inline-flex items-center gap-1 rounded-full border border-border/60 px-2 py-1">
              <Star className="h-3 w-3 text-[color:var(--warning)]" /> {fav.items.length} bewaard
            </span>
          </div>
        </div>

        {/* Challenges */}
        <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1">
          <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground font-semibold shrink-0">
            <Trophy className="h-3 w-3" /> Challenges
          </span>
          {CHALLENGES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => startChallenge(c.id)}
              className={cn(
                "shrink-0 inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs transition",
                activeChallenge === c.id
                  ? "bg-primary/15 border-primary/50 text-foreground"
                  : "border-border/60 bg-card/40 text-muted-foreground hover:text-foreground hover:border-primary/40",
              )}
              title={c.uitleg}
            >
              {c.titel}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 px-4 lg:px-6 py-4 lg:py-6">
        <div className="grid gap-4 lg:gap-6 h-[calc(100vh-9.5rem)] grid-cols-1 lg:grid-cols-[300px_1fr_400px]">
          <div className="rounded-3xl border border-border/60 bg-card/40 backdrop-blur-sm p-4 overflow-hidden">
            <PieceLibrary onAdd={(p) => addPiece(p)} />
          </div>
          <Canvas
            placed={placed}
            connections={analysis.connections}
            onAdd={addFromDrop}
            onMove={move}
            onRemove={remove}
            onClear={clear}
          />
          <aside className="flex flex-col h-full rounded-3xl border border-border/60 bg-card/40 backdrop-blur-sm overflow-hidden">
            <div className="grid grid-cols-3 gap-1 p-1.5 border-b border-border/60 bg-muted/20">
              <TabButton active={tab === "inspiratie"} onClick={() => setTab("inspiratie")} icon={Wand2}>
                Inspiratie
              </TabButton>
              <TabButton active={tab === "analyse"} onClick={() => setTab("analyse")} icon={ListChecks}>
                Analyse
              </TabButton>
              <TabButton active={tab === "favorieten"} onClick={() => setTab("favorieten")} icon={Star}>
                Favorieten {fav.items.length > 0 && <span className="text-[10px]">({fav.items.length})</span>}
              </TabButton>
            </div>
            <div className="flex-1 overflow-hidden">
              {tab === "inspiratie" && (
                <InspirationPanel placedIds={placedIds} ideeen={ideeen} onIdeeenChange={setIdeeen} />
              )}
              {tab === "analyse" && <ExplanationPanel analysis={analysis} onAddPiece={addById} />}
              {tab === "favorieten" && <FavoritesPanel />}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon: Icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-xs font-medium transition-colors",
        active
          ? "bg-card text-foreground shadow-sm border border-border/60"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {children}
    </button>
  );
}
