import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GuideResults, { GuideData } from "@/components/GuideResults";
import SafetyNet from "@/components/SafetyNet";
import { useSavedGuides } from "@/hooks/use-saved-guides";
import { toast } from "sonner";
import { ArrowLeft, Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

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

      {guide.emergencyNumber && guide.safetyNet && (
        <div className="mt-4">
          <SafetyNet
            emergencyNumber={guide.emergencyNumber}
            safetyNet={guide.safetyNet}
            city={guide.city}
          />
        </div>
      )}

      <div className="mt-4 pb-20">
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
      </div>
    </div>
  );
};

export default GuideResultsPage;
