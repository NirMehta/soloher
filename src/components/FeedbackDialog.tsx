import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2 } from "lucide-react";

interface FeedbackDialogProps {
  destination: string;
}

const confidenceOptions = ["Yes", "Somewhat", "No"] as const;
const intentOptions = ["Definitely", "Maybe", "Probably not"] as const;

const FeedbackDialog = ({ destination }: FeedbackDialogProps) => {
  const [open, setOpen] = useState(false);
  const [confidence, setConfidence] = useState<string | null>(null);
  const [missing, setMissing] = useState("");
  const [intent, setIntent] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const reset = () => {
    setConfidence(null);
    setMissing("");
    setIntent(null);
    setSubmitted(false);
    setSubmitting(false);
  };

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) setTimeout(reset, 200);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await supabase.from("feedback").insert({
        destination,
        confidence_response: confidence,
        missing_feature: missing || null,
        return_intent: intent,
      });
    } catch {
      // silent fallback
    }
    setSubmitted(true);
    setTimeout(() => handleOpenChange(false), 2000);
  };

  const Pill = ({
    label,
    selected,
    onClick,
  }: {
    label: string;
    selected: boolean;
    onClick: () => void;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex-1 rounded-full border px-3 py-2 text-sm transition-colors",
        selected
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background text-foreground hover:bg-muted"
      )}
    >
      {label}
    </button>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-4 w-full text-center text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        Help improve SoloHer →
      </button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:rounded-lg max-h-[90vh] overflow-y-auto">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
              <CheckCircle2 className="h-10 w-10 text-accent" />
              <p className="text-base font-body">Thank you — this genuinely helps.</p>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-xl">Quick feedback (2 mins)</DialogTitle>
                <DialogDescription>
                  Building this for solo female travelers — your honest take helps more than you know.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-5 pt-2">
                <div className="space-y-2">
                  <p className="text-sm font-medium">
                    Did this guide make you feel more confident about visiting this destination alone?
                  </p>
                  <div className="flex gap-2">
                    {confidenceOptions.map((opt) => (
                      <Pill
                        key={opt}
                        label={opt}
                        selected={confidence === opt}
                        onClick={() => setConfidence(opt)}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">
                    What's one thing missing that would have made this more useful?
                  </p>
                  <Textarea
                    value={missing}
                    onChange={(e) => setMissing(e.target.value)}
                    placeholder="Don't hold back — honest feedback only"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Would you use SoloHer before your next solo trip?</p>
                  <div className="flex gap-2">
                    {intentOptions.map((opt) => (
                      <Pill
                        key={opt}
                        label={opt}
                        selected={intent === opt}
                        onClick={() => setIntent(opt)}
                      />
                    ))}
                  </div>
                </div>

                <Button
                  variant="hero"
                  className="w-full"
                  onClick={handleSubmit}
                  disabled={submitting}
                >
                  {submitting ? "Sending..." : "Send feedback"}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FeedbackDialog;
