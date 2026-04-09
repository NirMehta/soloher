import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GuideResults, { GuideData } from "@/components/GuideResults";
import SafetyNetFab from "@/components/SafetyNetFab";
import { useSavedGuides } from "@/hooks/use-saved-guides";
import { toast } from "sonner";
import { ArrowLeft, Bookmark, BookmarkCheck, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { saveSharedPlan } from "@/hooks/use-shared-plan";

const GuideResultsPage = () => {
  const [guide, setGuide] = useState<GuideData | null>(null);
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

    try {
      if (navigator.share) {
        await navigator.share({ text });
      } else {
        window.location.href = `mailto:?subject=${encodeURIComponent(`My plan: ${guide.place}`)}&body=${encodeURIComponent(text)}`;
      }
      saveSharedPlan(guide.place, guide.city);
      toast.success("Plan shared!");
    } catch (e) {
      if ((e as DOMException)?.name === "AbortError") return;
      toast.error("Could not share plan.");
    }
  };

  if (!guide) return null;

  const alreadySaved = isGuideSaved(guide);

  return (
    <div className="px-4 py-4 sm:px-6 sm:py-8 max-w-2xl mx-auto">
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
      </div>

      {guide.emergencyNumber && guide.safetyNet && (
        <SafetyNetFab
          emergencyNumber={guide.emergencyNumber}
          safetyNet={guide.safetyNet}
          city={guide.city}
        />
      )}
    </div>
  );
};

export default GuideResultsPage;
