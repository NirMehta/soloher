import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useSavedGuides } from "@/hooks/use-saved-guides";
import type { GuideData } from "@/components/GuideResults";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Trash2, Eye, BookmarkCheck, Inbox } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const SavedGuidesPage = () => {
  const { guides, removeGuide } = useSavedGuides();
  const navigate = useNavigate();

  const handleView = (guide: GuideData) => {
    sessionStorage.setItem("soloher-current-guide", JSON.stringify(guide));
    navigate("/guide");
  };

  return (
    <>
      <Helmet>
        <title>Saved Guides — SoloHer</title>
        <meta name="description" content="Access your saved travel safety guides offline. Review confidence insights and emergency contacts anytime, anywhere." />
        <link rel="canonical" href="https://soloher.lovable.app/saved" />
        <meta property="og:title" content="Saved Guides — SoloHer" />
        <meta property="og:description" content="Access your saved travel safety guides offline. Review confidence insights and emergency contacts anytime, anywhere." />
        <meta property="og:url" content="https://soloher.lovable.app/saved" />
        <meta property="og:type" content="website" />
      </Helmet>
    <div className="px-4 py-6 sm:px-6 sm:py-8 max-w-lg mx-auto">
      <div className="flex items-center gap-2 mb-5">
        <BookmarkCheck className="h-5 w-5 text-accent" />
        <h1 className="font-display text-xl sm:text-2xl text-foreground">Saved Guides</h1>
        {guides.length > 0 && (
          <span className="text-xs text-muted-foreground">({guides.length})</span>
        )}
      </div>

      {guides.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Inbox className="h-12 w-12 text-muted-foreground/30 mb-3" />
          <p className="text-sm text-muted-foreground font-medium">No saved guides yet</p>
          <p className="text-xs text-muted-foreground mt-1">
            Save a guide before your next trip — it'll be available even without signal
          </p>
          <Button variant="hero" className="mt-5" onClick={() => navigate("/")}>
            Search a Destination
          </Button>
        </div>
      ) : (
        <div className="grid gap-3 pb-20">
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
                    onClick={() => handleView(guide)}
                    aria-label="View guide"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => removeGuide(guide.id)}
                    aria-label="Remove guide"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default SavedGuidesPage;
