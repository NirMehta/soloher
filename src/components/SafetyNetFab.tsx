import { useState } from "react";
import { ShieldAlert, Phone, CheckSquare, MapPin, Navigation, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle as AlertTitle,
} from "@/components/ui/alert-dialog";
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
  const [confirmCall, setConfirmCall] = useState(false);

  const handleConfirmCall = () => {
    setConfirmCall(false);
    window.location.href = `tel:${emergencyNumber}`;
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-lg active:scale-95 transition-transform"
        aria-label="Open Safety Net emergency assistance"
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
            {/* Emergency call banner */}
            <button
              type="button"
              onClick={() => setConfirmCall(true)}
              className="flex w-full items-center gap-4 p-4 rounded-xl bg-destructive/10 border-2 border-destructive/30 active:bg-destructive/20 transition-colors text-left"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive text-destructive-foreground flex-shrink-0">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">
                  Call Emergency Services
                </p>
                <p className="text-sm text-muted-foreground">Opens your phone dialer with the local emergency number</p>
              </div>
            </button>

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

            <p className="text-[11px] text-muted-foreground/60 leading-relaxed pt-2">
              Safety insights are AI-generated and intended for guidance only. Always rely on local authorities and personal judgment in emergency situations.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation dialog */}
      <AlertDialog open={confirmCall} onOpenChange={setConfirmCall}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertTitle>Call emergency services?</AlertTitle>
            <AlertDialogDescription>
              SoloHer will open your phone dialer with the local emergency number for this location.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmCall}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Call now
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SafetyNetFab;
