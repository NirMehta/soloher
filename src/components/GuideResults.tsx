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
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 pb-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-hero">
          <MapPin className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h2 className="font-display text-2xl text-foreground">{guide.place}</h2>
          <p className="text-sm text-muted-foreground">{guide.city}</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {sections.map(({ key, title, icon: Icon, color }) => (
          <Card key={key} className="shadow-card border-border/60 bg-card hover:shadow-soft transition-shadow duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base font-body font-semibold">
                <Icon className={`h-5 w-5 ${color}`} />
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>
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
