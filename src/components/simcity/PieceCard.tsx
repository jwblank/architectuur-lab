import { motion } from "motion/react";
import * as LucideIcons from "lucide-react";
import type { Piece } from "@/lib/simcity/pieces";
import { CATEGORY_META } from "@/lib/simcity/pieces";
import { cn } from "@/lib/utils";

interface Props {
  piece: Piece;
  onAdd?: (piece: Piece) => void;
  draggable?: boolean;
  compact?: boolean;
}

export function PieceCard({ piece, onAdd, draggable = true, compact = false }: Props) {
  const meta = CATEGORY_META[piece.category];
  const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[piece.icon] ?? LucideIcons.Box;

  return (
    <motion.button
      type="button"
      layout
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      draggable={draggable}
      onDragStart={(e) => {
        const ev = e as unknown as React.DragEvent;
        ev.dataTransfer?.setData("text/plain", piece.id);
        if (ev.dataTransfer) ev.dataTransfer.effectAllowed = "copy";
      }}
      onDoubleClick={() => onAdd?.(piece)}
      onClick={() => compact && onAdd?.(piece)}
      className={cn(
        "group relative w-full text-left rounded-2xl border border-border/60 bg-card/70 backdrop-blur-sm p-3",
        "hover:border-[color:var(--c)] hover:shadow-[0_0_24px_-8px_var(--c)] transition-colors cursor-grab active:cursor-grabbing",
      )}
      style={{ ["--c" as never]: meta.color }}
    >
      <div className="flex items-start gap-3">
        <div
          className="shrink-0 rounded-xl p-2 border border-border/60"
          style={{ background: `color-mix(in oklab, ${meta.color} 18%, transparent)` }}
        >
          <Icon className="h-5 w-5" style={{ color: meta.color }} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-display font-semibold text-sm text-foreground truncate">{piece.naam}</h3>
          </div>
          {!compact && (
            <p className="mt-1 text-xs text-muted-foreground leading-snug line-clamp-2">{piece.uitleg}</p>
          )}
        </div>
      </div>
    </motion.button>
  );
}
