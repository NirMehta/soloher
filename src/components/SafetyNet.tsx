import { Phone, ShieldAlert, MapPin, Navigation, CheckSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SafetyNetData {
  quickActions: string[];
  safePlaces: string[];
  returnSafely: string[];
}

interface SafetyNetProps {
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
    <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground">
      <Icon className={cn("h-4 w-4 flex-shrink-0", iconColor)} />
      {title}
    </h4>
    <ol className="space-y-1.5 pl-6">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-2 text-sm text-muted-foreground min-w-0"
        >
          <span className="flex-shrink-0 font-semibold text-accent">{i + 1}.</span>
          <span className="break-words" style={{ overflowWrap: "anywhere" }}>
            {item}
          </span>
        </li>
      ))}
    </ol>
  </div>
);

const SafetyNet = ({ emergencyNumber, safetyNet, city }: SafetyNetProps) => {
  return (
    <Card className="shadow-card border-destructive/30 bg-card overflow-hidden">
      <CardHeader className="p-4 pb-3 sm:p-6 sm:pb-4 bg-gradient-to-r from-destructive/10 to-primary/5">
        <CardTitle className="flex items-center gap-2 text-sm sm:text-base font-body font-semibold">
          <ShieldAlert className="h-4 w-4 sm:h-5 sm:w-5 text-destructive" />
          Safety Net
        </CardTitle>
        <p className="text-xs text-muted-foreground mt-1">
          Quick reference if you feel unsafe in {city}
        </p>
      </CardHeader>
      <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0 space-y-5 overflow-hidden">
        {/* Emergency Number */}
        <a
          href={`tel:${emergencyNumber}`}
          className="flex items-center gap-3 mt-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20 active:bg-destructive/20 transition-colors"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive text-destructive-foreground flex-shrink-0">
            <Phone className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">
              Emergency: {emergencyNumber}
            </p>
            <p className="text-xs text-muted-foreground">Tap to call</p>
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
      </CardContent>
    </Card>
  );
};

export default SafetyNet;
