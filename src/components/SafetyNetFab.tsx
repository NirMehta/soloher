import { useState } from "react";
import { ShieldAlert, Phone, CheckSquare, MapPin, Navigation, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SafetyNetData {
  quickActions: string[];
  safePlaces: string[];
  returnSafely: string[];
}

interface SafetyNetFabProps {
  emergencyNumber: string;
  safetyNet: SafetyNetData;
  city: string;
}

const Section = ({
  icon: Icon,
  title,
  items,
  iconColor,
}: {
  icon: React.ElementType;
  title: string;
  items: string[];
  iconColor: string;
}) => (
  <div className="space-y-2">
    <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
      <Icon className={cn("h-5 w-5 flex-shrink-0", iconColor)} />
      {title}
    </h3>
    <ol className="space-y-2 pl-7">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
          <span className="flex-shrink-0 font-bold text-accent">{i + 1}.</span>
          <span className="break-words" style={{ overflowWrap: "anywhere" }}>{item}</span>
        </li>
      ))}
    </ol>
  </div>
);

const SafetyNetFab = ({ emergencyNumber, safetyNet, city }: SafetyNetFabProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-lg active:scale-95 transition-transform"
        aria-label="Open Safety Net"
      >
        <ShieldAlert className="h-6 w-6" />
      </button>

      {/* Full-screen modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg w-full h-[100dvh] sm:h-auto sm:max-h-[90vh] p-0 gap-0 border-none sm:rounded-xl overflow-hidden">
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between bg-destructive px-4 py-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-destructive-foreground" />
              <DialogTitle className="text-base font-bold text-destructive-foreground">
                Safety Net — {city}
              </DialogTitle>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-full p-1 text-destructive-foreground/80 hover:text-destructive-foreground"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Scrollable content */}
          <div className="overflow-y-auto flex-1 px-4 py-5 space-y-6">
            {/* Emergency call button */}
            <a
              href={`tel:${emergencyNumber}`}
              className="flex items-center gap-4 p-4 rounded-xl bg-destructive/10 border-2 border-destructive/30 active:bg-destructive/20 transition-colors"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive text-destructive-foreground flex-shrink-0">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">
                  Call {emergencyNumber}
                </p>
                <p className="text-sm text-muted-foreground">Tap to call emergency services</p>
              </div>
            </a>

            <Section
              icon={CheckSquare}
              title="If You Feel Unsafe"
              items={safetyNet.quickActions}
              iconColor="text-destructive"
            />

            <Section
              icon={MapPin}
              title="Nearest Safe Places"
              items={safetyNet.safePlaces}
              iconColor="text-primary"
            />

            <Section
              icon={Navigation}
              title="Return Safely"
              items={safetyNet.returnSafely}
              iconColor="text-accent"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SafetyNetFab;
