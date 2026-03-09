import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Sun, Bus, Lightbulb, MapPin } from "lucide-react";

export interface GuideData {
  city: string;
  place: string;
  safety: string;
  bestTimes: string;
  transportation: string;
  tips: string;
}

const sections = [
  { key: "safety" as const, title: "Safety Considerations", icon: Shield, color: "text-primary" },
  { key: "bestTimes" as const, title: "Best Visiting Times", icon: Sun, color: "text-accent" },
  { key: "transportation" as const, title: "Transportation & Logistics", icon: Bus, color: "text-primary" },
  { key: "tips" as const, title: "Practical Tips", icon: Lightbulb, color: "text-accent" },
];

const GuideResults = ({ guide }: { guide: GuideData }) => {
  return (
    <div className="space-y-4 sm:space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 pb-1">
        <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gradient-hero">
          <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
        </div>
        <div>
          <h2 className="font-display text-xl sm:text-2xl text-foreground">{guide.place}</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">{guide.city}</p>
        </div>
      </div>

      {/* Single column on mobile, 2-col on sm+ */}
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
