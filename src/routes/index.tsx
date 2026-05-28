import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useMemo, useState } from "react";
import { Sparkles, Wand2, ListChecks } from "lucide-react";
import { PieceLibrary } from "@/components/simcity/PieceLibrary";
import { Canvas, type PlacedPiece } from "@/components/simcity/Canvas";
import { ExplanationPanel } from "@/components/simcity/ExplanationPanel";
import { InspirationPanel } from "@/components/simcity/InspirationPanel";
import { analyze, PIECE_MAP, type Piece } from "@/lib/simcity/pieces";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: Index,
});

type Tab = "analyse" | "inspiratie";

function Index() {
  const [placed, setPlaced] = useState<PlacedPiece[]>([]);
  const [tab, setTab] = useState<Tab>("inspiratie");

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

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-6 lg:px-10 py-5 border-b border-border/60 backdrop-blur-sm bg-background/60 sticky top-0 z-20">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[0_0_24px_-4px_var(--primary)]">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-lg sm:text-xl font-semibold leading-tight">
                <span className="text-gradient">COP AI</span>{" "}
                <span className="text-foreground">Sim</span>
              </h1>
              <p className="text-xs text-muted-foreground">
                Ontdek spelenderwijs hoe AI-componenten samenwerken.
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[11px] text-muted-foreground">
            <kbd className="px-2 py-1 rounded-md border border-border bg-muted/40">Sleep</kbd>
            <span>of</span>
            <kbd className="px-2 py-1 rounded-md border border-border bg-muted/40">Dubbelklik</kbd>
            <span>om te bouwen</span>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 lg:px-6 py-4 lg:py-6">
        <div className="grid gap-4 lg:gap-6 h-[calc(100vh-7.5rem)] grid-cols-1 lg:grid-cols-[300px_1fr_380px]">
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
            <div className="grid grid-cols-2 gap-1 p-1.5 border-b border-border/60 bg-muted/20">
              <TabButton active={tab === "inspiratie"} onClick={() => setTab("inspiratie")} icon={Wand2}>
                Inspiratie
              </TabButton>
              <TabButton active={tab === "analyse"} onClick={() => setTab("analyse")} icon={ListChecks}>
                Analyse
              </TabButton>
            </div>
            <div className="flex-1 overflow-hidden">
              {tab === "inspiratie" ? (
                <InspirationPanel placedIds={placedIds} />
              ) : (
                <ExplanationPanel analysis={analysis} />
              )}
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
        "inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors",
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
