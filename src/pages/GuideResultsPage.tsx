import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import GuideResults, { GuideData } from "@/components/GuideResults";
import SafetyNetFab from "@/components/SafetyNetFab";
import { useSavedGuides } from "@/hooks/use-saved-guides";
import { toast } from "sonner";
import { ArrowLeft, Bookmark, BookmarkCheck, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { saveSharedPlan } from "@/hooks/use-shared-plan";
import ShareConfirmBanner from "@/components/ShareConfirmBanner";
import FeedbackDialog from "@/components/FeedbackDialog";


const GuideResultsPage = () => {
  const [guide, setGuide] = useState<GuideData | null>(null);
  const [shareBanner, setShareBanner] = useState<{ text: string } | null>(null);
  const navigate = useNavigate();
  const { saveGuide, isGuideSaved } = useSavedGuides();

  useEffect(() => {
    const raw = sessionStorage.getItem("soloher-current-guide");
    if (raw) {
      try {
        setGuide(JSON.parse(raw));
      } catch {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleSave = () => {
    if (!guide) return;
    saveGuide(guide);
    toast.success("Guide saved for offline access!");
  };

  const handleShare = async () => {
    if (!guide) return;
    const firstNote = guide.safetyNotes?.[0] || "Stay aware of your surroundings.";
    const emergency = guide.emergencyNumber || "local emergency services";
    const text = `Hey, heading to ${guide.place} in ${guide.city} today. SoloHer rates it ${guide.confidenceLevel} confidence. Key tip: ${firstNote} Local emergency number: ${emergency}. I'll message when I'm back.`;

    let shared = false;

    // Try native share sheet first
    if (navigator.share) {
      try {
        await navigator.share({ text });
        shared = true;
      } catch (e) {
        if ((e as DOMException)?.name === "AbortError") return;
        // Fall through to clipboard fallback
      }
    }

    // Fallback: copy to clipboard
    if (!shared) {
      try {
        await navigator.clipboard.writeText(text);
        setShareBanner({ text });
      } catch {
        // Last resort: mailto
        window.open(`mailto:?subject=${encodeURIComponent(`My plan: ${guide.place}`)}&body=${encodeURIComponent(text)}`, "_blank");
        toast.success("Opening email to share your plan!");
      }
    } else {
      toast.success("Plan shared!");
    }

    saveSharedPlan(guide.place, guide.city);
  };

  if (!guide) return null;

  const alreadySaved = isGuideSaved(guide);
  const pageTitle = guide.place
    ? `${guide.place}, ${guide.city} — SoloHer Guide`
    : "Your Travel Guide — SoloHer";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content="Personalized safety tips, local emergency numbers, and confidence insights for your solo travel destination." />
        <link rel="canonical" href="https://soloher.lovable.app/guide" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content="Personalized safety tips, local emergency numbers, and confidence insights for your solo travel destination." />
        <meta property="og:url" content="https://soloher.lovable.app/guide" />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": pageTitle,
          "description": "Personalized safety tips, local emergency numbers, and confidence insights for your solo travel destination.",
          "about": `${guide.place}, ${guide.city}`,
          "publisher": {
            "@type": "Organization",
            "name": "SoloHer",
            "url": "https://soloher.lovable.app"
          }
        })}</script>
      </Helmet>
    <div className="px-4 py-4 sm:px-6 sm:py-8 max-w-2xl mx-auto">
      {shareBanner && (
        <ShareConfirmBanner
          shareText={shareBanner.text}
          onDismiss={() => setShareBanner(null)}
        />
      )}
      <Button
        variant="ghost"
        size="sm"
        className="mb-4 -ml-2"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back
      </Button>

      <GuideResults guide={guide} />

      <div className="mt-4 pb-20 space-y-3">
        <Button
          variant={alreadySaved ? "secondary" : "hero"}
          className="w-full"
          onClick={handleSave}
          disabled={alreadySaved}
          aria-label="Save guide for offline access"
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
        <Button
          variant="outline"
          className="w-full"
          onClick={handleShare}
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share My Plan
        </Button>
        <FeedbackDialog destination={`${guide.place}, ${guide.city}`} />

      </div>

      {guide.emergencyNumber && guide.safetyNet && (
        <SafetyNetFab
          emergencyNumber={guide.emergencyNumber}
          safetyNet={guide.safetyNet}
          city={guide.city}
        />
      )}
    </div>
    </>
  );
};

export default GuideResultsPage;
