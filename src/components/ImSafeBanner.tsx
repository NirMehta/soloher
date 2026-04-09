import { useEffect, useState } from "react";
import { getActiveSharedPlan, clearSharedPlan } from "@/hooks/use-shared-plan";
import { Heart, X } from "lucide-react";
import { toast } from "sonner";

const ImSafeBanner = () => {
  const [plan, setPlan] = useState<{ place: string; city: string } | null>(null);

  useEffect(() => {
    const active = getActiveSharedPlan();
    if (active) {
      setPlan({ place: active.place, city: active.city });
    }
  }, []);

  if (!plan) return null;

  const handleReassurance = async () => {
    const text = `Back safe from ${plan.place} in ${plan.city}! Felt confident the whole time — SoloHer's tips really helped. All good.`;

    let shared = false;

    if (navigator.share) {
      try {
        await navigator.share({ text });
        shared = true;
      } catch (e) {
        if ((e as DOMException)?.name === "AbortError") return;
      }
    }

    if (!shared) {
      try {
        await navigator.clipboard.writeText(text);
        toast.success("Reassurance copied to clipboard — paste it in your messaging app!");
      } catch {
        window.open(`mailto:?body=${encodeURIComponent(text)}`, "_blank");
        toast.success("Opening email to send reassurance!");
      }
    } else {
      toast.success("Reassurance sent!");
    }

    clearSharedPlan();
    setPlan(null);
  };

  const handleDismiss = () => {
    clearSharedPlan();
    setPlan(null);
  };

  return (
    <div className="mx-4 mt-3 sm:mx-auto sm:max-w-lg rounded-xl border border-accent/30 bg-accent/10 p-3 flex items-start gap-3 animate-in fade-in-0 slide-in-from-top-2 duration-300">
      <Heart className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground leading-snug">
          You shared your plan for <span className="font-semibold">{plan.place}</span>. Ready to let them know you're safe?
        </p>
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleReassurance}
            className="text-xs font-semibold text-accent hover:text-accent/80 transition-colors"
          >
            Send reassurance
          </button>
          <span className="text-muted-foreground/40">·</span>
          <button
            onClick={handleDismiss}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
      <button onClick={handleDismiss} className="text-muted-foreground/60 hover:text-foreground p-0.5" aria-label="Dismiss">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default ImSafeBanner;
