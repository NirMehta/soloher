import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Sun, Bus, Lightbulb, MapPin, Clock, Car, CheckCircle2, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SafetyNetData {
  quickActions: string[];
  safePlaces: string[];
  returnSafely: string[];
}

export interface GuideData {
  city: string;
  place: string;
  confidenceLevel: "High" | "Moderate" | "Low";
  bestTimeShort: string;
  safetyNotes: string[];
  travelConvenience: "Very Easy" | "Easy" | "Moderate" | "Challenging";
  safety: string[] | string;
  bestTimes: string[] | string;
  transportation: string[] | string;
  tips: string[] | string;
  emergencyNumber?: string;
  safetyNet?: SafetyNetData;
}

const confidenceColors: Record<string, string> = {
  High: "bg-accent text-accent-foreground",
  Moderate: "bg-primary/80 text-primary-foreground",
  Low: "bg-destructive text-destructive-foreground",
};

const convenienceColors: Record<string, string> = {
  "Very Easy": "bg-accent text-accent-foreground",
  Easy: "bg-accent/80 text-accent-foreground",
  Moderate: "bg-primary/80 text-primary-foreground",
  Challenging: "bg-destructive text-destructive-foreground",
};

const sections = [
  { key: "safety" as const, title: "Safety Considerations", icon: Shield, color: "text-primary" },
  { key: "bestTimes" as const, title: "Best Visiting Times", icon: Sun, color: "text-accent" },
  { key: "transportation" as const, title: "Transportation & Logistics", icon: Bus, color: "text-primary" },
  { key: "tips" as const, title: "Practical Tips", icon: Lightbulb, color: "text-accent" },
];

function toBullets(value: string[] | string): string[] {
  if (Array.isArray(value)) return value;
  return value.split(/\n+/).filter(Boolean);
}

const CollapsibleSection = ({
  title,
  icon: Icon,
  color,
  bullets,
}: {
  title: string;
  icon: React.ElementType;
  color: string;
  bullets: string[];
}) => {
  const [open, setOpen] = useState(false);
  const preview = bullets[0] || "";

  return (
    <Card
      className="shadow-card border-border/60 bg-card cursor-pointer transition-shadow duration-300 hover:shadow-soft overflow-hidden"
      onClick={() => setOpen((v) => !v)}
      role="button"
      tabIndex={0}
      aria-expanded={open}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen((v) => !v); } }}
    >
      <CardHeader className="p-4 sm:p-5 pb-0 sm:pb-0">
        <h2 className="text-2xl font-semibold leading-none tracking-tight flex items-center justify-between text-sm sm:text-base font-body font-semibold">
          <span className="flex items-center gap-2 min-w-0">
            <Icon className={cn("h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0", color)} />
            <span className="truncate">{title}</span>
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform duration-200",
              open && "rotate-180"
            )}
          />
        </h2>
      </CardHeader>
      <CardContent className="p-4 pt-2 sm:p-5 sm:pt-2 overflow-hidden">
        {!open ? (
          <p className="text-sm text-muted-foreground truncate">{preview}</p>
        ) : (
          <ul className="space-y-2 min-w-0">
            {bullets.map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground min-w-0">
                <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-accent" />
                <span className="break-words overflow-wrap-anywhere" style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}>{point}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

const GuideResults = ({ guide }: { guide: GuideData }) => {
  return (
    <div className="space-y-4 sm:space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
      {/* Location Header */}
      <div className="flex items-center gap-3 pb-1">
        <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gradient-hero">
          <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-display text-xl sm:text-2xl text-foreground">{guide.place}</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">{guide.city}</p>
        </div>
      </div>

      {/* Safety Snapshot Card */}
      <Card className="shadow-card border-primary/20 bg-card overflow-hidden">
        <CardHeader className="p-4 pb-3 sm:p-6 sm:pb-4 bg-gradient-to-r from-primary/5 to-accent/5">
          <h2 className="text-2xl font-semibold leading-none tracking-tight flex items-center gap-2 text-sm sm:text-base font-body font-semibold">
            <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            Safety Snapshot
          </h2>
        </CardHeader>
        <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0 space-y-4">
          <div className="flex flex-wrap gap-2 pt-3">
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Confidence</p>
              <Badge className={`${confidenceColors[guide.confidenceLevel]} text-xs px-3 py-1`} role="status" aria-label={`Confidence level: ${guide.confidenceLevel}`}>
                {guide.confidenceLevel}
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Travel Ease</p>
              <Badge className={`${convenienceColors[guide.travelConvenience]} text-xs px-3 py-1`} role="status" aria-label={`Travel ease: ${guide.travelConvenience}`}>
                <Car className="h-3 w-3 mr-1" />
                {guide.travelConvenience}
              </Badge>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Clock className="h-4 w-4 mt-0.5 flex-shrink-0 text-accent" />
            <p className="text-sm text-muted-foreground">{guide.bestTimeShort}</p>
          </div>
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Key Safety Notes</p>
            <ul className="space-y-1.5">
              {(guide.safetyNotes || []).slice(0, 3).map((note, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-accent" />
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Collapsible detailed sections */}
      <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
        {sections.map(({ key, title, icon, color }) => (
          <CollapsibleSection
            key={key}
            title={title}
            icon={icon}
            color={color}
            bullets={toBullets(guide[key])}
          />
        ))}
      </div>
    </div>
  );
};

export default GuideResults;
