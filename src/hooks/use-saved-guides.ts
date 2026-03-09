import { useState, useEffect, useCallback } from "react";
import type { GuideData } from "@/components/GuideResults";

export interface SavedGuide extends GuideData {
  savedAt: string;
  id: string;
}

const STORAGE_KEY = "soloher-saved-guides";

function loadGuides(): SavedGuide[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function useSavedGuides() {
  const [guides, setGuides] = useState<SavedGuide[]>(loadGuides);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(guides));
  }, [guides]);

  const saveGuide = useCallback((guide: GuideData) => {
    setGuides((prev) => {
      const exists = prev.some((g) => g.city === guide.city && g.place === guide.place);
      if (exists) return prev;
      const saved: SavedGuide = {
        ...guide,
        id: `${Date.now()}`,
        savedAt: new Date().toISOString(),
      };
      return [saved, ...prev];
    });
  }, []);

  const removeGuide = useCallback((id: string) => {
    setGuides((prev) => prev.filter((g) => g.id !== id));
  }, []);

  const isGuideSaved = useCallback(
    (guide: GuideData) => guides.some((g) => g.city === guide.city && g.place === guide.place),
    [guides]
  );

  return { guides, saveGuide, removeGuide, isGuideSaved };
}
