import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Sun, Bus, Lightbulb, MapPin, Clock, Car, CheckCircle2 } from "lucide-react";

export interface GuideData {
  city: string;
  place: string;
  confidenceLevel: "High" | "Moderate" | "Low";
  bestTimeShort: string;
  safetyNotes: string[];
  travelConvenience: "Very Easy" | "Easy" | "Moderate" | "Challenging";
  safety: string;
  bestTimes: string;
  transportation: string;
  tips: string;
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

const GuideResults = ({ guide }: { guide: GuideData }) => {
  return (
    <div className="space-y-4 sm:space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
      {/* Location Header */}
      <div className="flex items-center gap-3 pb-1">
        <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gradient-hero">
          <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
        </div>
        <div>
          <h2 className="font-display text-xl sm:text-2xl text-foreground">{guide.place}</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">{guide.city}</p>
        </div>
      </div>

      {/* Safety Snapshot Card */}
      <Card className="shadow-card border-primary/20 bg-card overflow-hidden">
        <CardHeader className="p-4 pb-3 sm:p-6 sm:pb-4 bg-gradient-to-r from-primary/5 to-accent/5">
          <CardTitle className="flex items-center gap-2 text-sm sm:text-base font-body font-semibold">
            <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            Safety Snapshot
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0 space-y-4">
          {/* Badges row */}
          <div className="flex flex-wrap gap-2 pt-3">
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Confidence</p>
              <Badge className={`${confidenceColors[guide.confidenceLevel]} text-xs px-3 py-1`}>
                {guide.confidenceLevel}
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Travel Ease</p>
              <Badge className={`${convenienceColors[guide.travelConvenience]} text-xs px-3 py-1`}>
                <Car className="h-3 w-3 mr-1" />
                {guide.travelConvenience}
              </Badge>
            </div>
          </div>

          {/* Best time */}
          <div className="flex items-start gap-2">
            <Clock className="h-4 w-4 mt-0.5 flex-shrink-0 text-accent" />
            <p className="text-sm text-muted-foreground">{guide.bestTimeShort}</p>
          </div>

          {/* Safety notes */}
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

      {/* Detailed sections */}
      <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
        {sections.map(({ key, title, icon: Icon, color }) => (
          <Card key={key} className="shadow-card border-border/60 bg-card hover:shadow-soft transition-shadow duration-300">
            <CardHeader className="p-4 pb-2 sm:p-6 sm:pb-3">
              <CardTitle className="flex items-center gap-2 text-sm sm:text-base font-body font-semibold">
                <Icon className={`h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 ${color}`} />
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
              <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                {guide[key]}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GuideResults;
