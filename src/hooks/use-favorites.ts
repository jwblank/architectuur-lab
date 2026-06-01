import { useCallback, useEffect, useState } from "react";
import type { MarketingIdee } from "@/lib/inspiration.functions";

export interface SavedIdee extends MarketingIdee {
  id: string;
  bewaardOp: number;
}

const KEY = "ai-propositie-lab:favorieten:v1";

function read(): SavedIdee[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as SavedIdee[]) : [];
  } catch {
    return [];
  }
}

function write(items: SavedIdee[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    /* ignore quota */
  }
}

function ideeKey(i: MarketingIdee): string {
  return i.titel.trim().toLowerCase().slice(0, 80);
}

export function useFavorites() {
  const [items, setItems] = useState<SavedIdee[]>([]);

  useEffect(() => {
    setItems(read());
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setItems(read());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const isFavorite = useCallback(
    (i: MarketingIdee) => items.some((s) => ideeKey(s) === ideeKey(i)),
    [items],
  );

  const toggle = useCallback((i: MarketingIdee) => {
    setItems((prev) => {
      const key = ideeKey(i);
      const exists = prev.find((s) => ideeKey(s) === key);
      const next = exists
        ? prev.filter((s) => ideeKey(s) !== key)
        : [{ ...i, id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, bewaardOp: Date.now() }, ...prev];
      write(next);
      return next;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => {
      const next = prev.filter((s) => s.id !== id);
      write(next);
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setItems([]);
    write([]);
  }, []);

  return { items, isFavorite, toggle, remove, clear };
}
