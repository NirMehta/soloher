import { useState, useEffect } from "react";
import { CheckCircle, X } from "lucide-react";

interface ShareConfirmBannerProps {
  shareText: string;
  onDismiss: () => void;
}

const ShareConfirmBanner = ({ shareText, onDismiss }: ShareConfirmBannerProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onDismiss();
    }, 10000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  if (!visible) return null;

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

  return (
    <div
      onClick={() => { setVisible(false); onDismiss(); }}
      className="fixed top-4 left-4 right-4 z-50 mx-auto max-w-md rounded-xl border border-primary/20 bg-background p-4 shadow-card animate-in fade-in-0 slide-in-from-top-3 duration-300 cursor-pointer"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground">Plan copied — ready to share</p>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            Open WhatsApp, iMessage, or any messaging app and paste. Your contact will know exactly where you are and how to reach help.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-block mt-2 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            Open WhatsApp →
          </a>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); setVisible(false); onDismiss(); }}
          className="text-muted-foreground/60 hover:text-foreground p-0.5"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default ShareConfirmBanner;
