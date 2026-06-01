import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import * as LucideIcons from "lucide-react";
import { X, MousePointerClick } from "lucide-react";
import { PIECE_MAP, CATEGORY_META, type Piece } from "@/lib/simcity/pieces";
import type { Connection } from "@/lib/simcity/pieces";
import { cn } from "@/lib/utils";

export interface PlacedPiece {
  uid: string;
  pieceId: string;
  x: number; // percent of canvas width
  y: number;
}

interface Props {
  placed: PlacedPiece[];
  connections: Connection[];
  onAdd: (pieceId: string, x: number, y: number) => void;
  onMove: (uid: string, x: number, y: number) => void;
  onRemove: (uid: string) => void;
  onClear: () => void;
}

export function Canvas({ placed, connections, onAdd, onMove, onRemove, onClear }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [dragOver, setDragOver] = useState(false);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const cr = entry.contentRect;
      setSize({ w: cr.width, h: cr.height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const pieceId = e.dataTransfer.getData("text/plain");
      if (!pieceId || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      onAdd(pieceId, x, y);
    },
    [onAdd],
  );

  // Build id -> placed position map (first instance) for connections
  const byPieceId = new Map<string, PlacedPiece>();
  placed.forEach((p) => {
    if (!byPieceId.has(p.pieceId)) byPieceId.set(p.pieceId, p);
  });

  return (
    <div className="relative h-full flex flex-col rounded-3xl border border-border/60 bg-card/40 backdrop-blur-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-border/60">
        <div>
          <h2 className="font-display font-semibold text-foreground">Architectuur-canvas</h2>
          <p className="text-xs text-muted-foreground">Combineer blokken en zie wat er ontstaat.</p>
        </div>
        <button
          type="button"
          onClick={onClear}
          disabled={placed.length === 0}
          className="text-xs px-3 py-1.5 rounded-full border border-border/60 text-muted-foreground hover:text-foreground hover:border-foreground/40 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Canvas leegmaken
        </button>
      </div>

      <div
        ref={ref}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={cn(
          "relative flex-1 grid-bg transition-colors",
          dragOver && "bg-primary/5",
        )}
      >
        {/* SVG connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" width={size.w} height={size.h}>
          {connections.map((c, idx) => {
            const a = byPieceId.get(c.a);
            const b = byPieceId.get(c.b);
            if (!a || !b) return null;
            const x1 = (a.x / 100) * size.w;
            const y1 = (a.y / 100) * size.h;
            const x2 = (b.x / 100) * size.w;
            const y2 = (b.y / 100) * size.h;
            const color = c.status === "active" ? "var(--success)" : "var(--warning)";
            return (
              <g key={`${c.a}-${c.b}-${idx}`}>
                <line
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={color}
                  strokeWidth={c.status === "active" ? 2 : 1.5}
                  strokeOpacity={c.status === "active" ? 0.9 : 0.6}
                  className={c.status === "partial" ? "dash-anim" : undefined}
                  style={{ filter: c.status === "active" ? `drop-shadow(0 0 6px ${color})` : undefined }}
                />
                {c.status === "active" && (
                  <circle r={3} fill={color}>
                    <animateMotion dur="2.4s" repeatCount="indefinite" path={`M ${x1} ${y1} L ${x2} ${y2}`} />
                  </circle>
                )}
              </g>
            );
          })}
        </svg>

        {/* Empty state */}
        {placed.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center max-w-sm">
              <div className="mx-auto h-14 w-14 rounded-2xl border border-dashed border-border flex items-center justify-center mb-4">
                <MousePointerClick className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-display text-foreground font-semibold">Sleep je eerste bouwsteen hierheen en begin met puzzelen.</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Probeer eens: <span className="text-foreground">CRM-data</span> +{" "}
                <span className="text-foreground">Levensgebeurtenissen</span> +{" "}
                <span className="text-foreground">E-mail</span>. Of kies bovenaan een challenge.
              </p>
            </div>
          </div>
        )}

        {/* Placed pieces */}
        <AnimatePresence>
          {placed.map((p) => (
            <PlacedNode
              key={p.uid}
              placed={p}
              piece={PIECE_MAP[p.pieceId]}
              container={size}
              onMove={onMove}
              onRemove={onRemove}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function PlacedNode({
  placed,
  piece,
  container,
  onMove,
  onRemove,
}: {
  placed: PlacedPiece;
  piece: Piece;
  container: { w: number; h: number };
  onMove: (uid: string, x: number, y: number) => void;
  onRemove: (uid: string) => void;
}) {
  const meta = CATEGORY_META[piece.category];
  const Icon =
    (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>>)[
      piece.icon
    ] ?? LucideIcons.Box;

  return (
    <motion.div
      layout
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.6, opacity: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      drag
      dragMomentum={false}
      onDrag={(_, info) => {
        if (!container.w) return;
        const px = (placed.x / 100) * container.w + info.delta.x;
        const py = (placed.y / 100) * container.h + info.delta.y;
        const nx = Math.max(4, Math.min(96, (px / container.w) * 100));
        const ny = Math.max(6, Math.min(94, (py / container.h) * 100));
        onMove(placed.uid, nx, ny);
      }}
      style={{
        left: `${placed.x}%`,
        top: `${placed.y}%`,
        ["--c" as never]: meta.color,
      }}
      className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-grab active:cursor-grabbing"
    >
      <div className="relative rounded-2xl border border-[color:var(--c)]/60 bg-card/90 backdrop-blur px-3 py-2 shadow-lg shadow-black/40 hover:shadow-[0_0_24px_-4px_var(--c)] transition-shadow">
        <div className="flex items-center gap-2 pr-5">
          <div
            className="rounded-lg p-1.5"
            style={{ background: `color-mix(in oklab, ${meta.color} 22%, transparent)` }}
          >
            <Icon className="h-4 w-4" style={{ color: meta.color }} />
          </div>
          <span className="font-display font-semibold text-xs text-foreground whitespace-nowrap">
            {piece.naam}
          </span>
        </div>
        <button
          type="button"
          onClick={() => onRemove(placed.uid)}
          className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-card border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-destructive-foreground"
          aria-label="Verwijder"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    </motion.div>
  );
}
