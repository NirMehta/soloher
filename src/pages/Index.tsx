import { useState } from "react";
import TravelForm from "@/components/TravelForm";
import GuideResults, { GuideData } from "@/components/GuideResults";
import SavedGuides from "@/components/SavedGuides";
import { useSavedGuides } from "@/hooks/use-saved-guides";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Globe, ShieldCheck, Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [guide, setGuide] = useState<GuideData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { guides: savedGuides, saveGuide, removeGuide, isGuideSaved } = useSavedGuides();

  const handleSubmit = async (data: { city: string; place: string; time: string }) => {
    setIsLoading(true);
    setGuide(null);

    try {
      const { data: result, error } = await supabase.functions.invoke("travel-guide", {
        body: data,
      });

      if (error) throw error;
      if (result.error) throw new Error(result.error);

      setGuide(result as GuideData);
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Failed to generate guide. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveOffline = () => {
    if (!guide) return;
    saveGuide(guide);
    toast.success("Guide saved for offline access!");
  };

  const handleViewSaved = (g: GuideData) => {
    setGuide(g);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const alreadySaved = guide ? isGuideSaved(guide) : false;

  return (
    <div className="min-h-screen bg-background">
      {/* Compact Mobile Header */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-card/80 backdrop-blur-md">
        <div className="mx-auto max-w-4xl px-4 py-3 sm:px-6 sm:py-4 flex items-center gap-2.5">
          <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-gradient-hero">
            <Globe className="h-4 w-4 text-primary-foreground" />
          </div>
          <h1 className="font-display text-lg sm:text-xl text-foreground">SoloHer</h1>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-12">
        {/* Hero — compact on mobile */}
        <section className="mb-6 sm:mb-12 text-center">
          <div className="mb-3 sm:mb-4 inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent" />
            AI-Powered Travel Confidence
          </div>
          <h1 className="font-display text-3xl leading-tight text-foreground sm:text-5xl mb-2 sm:mb-4">
            Travel boldly.<br />
            <span className="text-gradient-hero">Travel informed.</span>
          </h1>
          <p className="mx-auto max-w-lg text-base sm:text-lg text-muted-foreground leading-relaxed">
            Safety insights & tips for solo female travelers.
          </p>
        </section>

        {/* Mobile: stacked. Desktop: side-by-side */}
        <div className="space-y-6 lg:grid lg:grid-cols-5 lg:gap-12 lg:space-y-0">
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-20 rounded-2xl border border-border/60 bg-card p-4 sm:p-6 shadow-card">
              <h2 className="font-display text-lg text-foreground mb-4 sm:mb-5">Plan Your Visit</h2>
              <TravelForm onSubmit={handleSubmit} isLoading={isLoading} />
            </div>
          </div>

          <div className="lg:col-span-3">
            {guide ? (
              <div className="space-y-4">
                <GuideResults guide={guide} />
                <Button
                  variant={alreadySaved ? "secondary" : "hero"}
                  className="w-full"
                  onClick={handleSaveOffline}
                  disabled={alreadySaved}
                >
                  {alreadySaved ? (
                    <>
                      <BookmarkCheck className="h-4 w-4 mr-2" />
                      Saved Offline
                    </>
                  ) : (
                    <>
                      <Bookmark className="h-4 w-4 mr-2" />
                      Save Offline Guide
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div className="flex min-h-[200px] sm:min-h-[400px] items-center justify-center rounded-2xl border border-dashed border-border/60 bg-card/30">
                <div className="text-center px-4">
                  <Globe className="mx-auto mb-3 h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground/30" />
                  <p className="text-sm sm:text-base text-muted-foreground font-medium">Your guide will appear here</p>
                  <p className="mt-1 text-xs sm:text-sm text-muted-foreground/60">Enter a destination to get started</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Saved Guides Section */}
        <SavedGuides
          guides={savedGuides}
          onView={handleViewSaved}
          onRemove={removeGuide}
        />
      </main>
    </div>
  );
};

export default Index;
