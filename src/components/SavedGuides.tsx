import type { SavedGuide } from "@/hooks/use-saved-guides";
import type { GuideData } from "@/components/GuideResults";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Trash2, Eye, BookmarkCheck } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface SavedGuidesProps {
  guides: SavedGuide[];
  onView: (guide: GuideData) => void;
  onRemove: (id: string) => void;
}

const SavedGuides = ({ guides, onView, onRemove }: SavedGuidesProps) => {
  if (guides.length === 0) return null;

  return (
    <section className="mt-8 sm:mt-12">
      <div className="flex items-center gap-2 mb-4">
        <BookmarkCheck className="h-5 w-5 text-accent" />
        <h2 className="font-display text-lg sm:text-xl text-foreground">Saved Guides</h2>
        <span className="text-xs text-muted-foreground">({guides.length})</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {guides.map((guide) => (
          <Card
            key={guide.id}
            className="shadow-card border-border/60 bg-card overflow-hidden"
          >
            <CardContent className="p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-hero flex-shrink-0">
                  <MapPin className="h-3.5 w-3.5 text-primary-foreground" />
                </div>
                <div className="min-w-0">
                  <p className="font-display text-sm text-foreground truncate">{guide.place}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {guide.city} · {formatDistanceToNow(new Date(guide.savedAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onView(guide)}
                  aria-label="View guide"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive"
                  onClick={() => onRemove(guide.id)}
                  aria-label="Delete saved guide"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default SavedGuides;
