import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Building2, Clock, Compass } from "lucide-react";

interface TravelFormProps {
  onSubmit: (data: { city: string; place: string; time: string }) => void;
  isLoading: boolean;
}

const TravelForm = ({ onSubmit, isLoading }: TravelFormProps) => {
  const [city, setCity] = useState("");
  const [place, setPlace] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim() && place.trim()) {
      onSubmit({ city: city.trim(), place: place.trim(), time: time.trim() });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <div className="space-y-1.5">
        <Label htmlFor="city" className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <MapPin className="h-4 w-4 text-primary" />
          City
        </Label>
        <Input
          id="city"
          placeholder="Tokyo, Lisbon, Marrakech…"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          className="h-12 sm:h-12 bg-background border-border text-base placeholder:text-muted-foreground focus:ring-primary"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="place" className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Building2 className="h-4 w-4 text-primary" />
          Place
        </Label>
        <Input
          id="place"
          placeholder="Shibuya Crossing, Alfama…"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          required
          className="h-12 sm:h-12 bg-background border-border text-base placeholder:text-muted-foreground focus:ring-primary"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="time" className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Clock className="h-4 w-4 text-accent" />
          When
          <span className="text-muted-foreground font-normal text-xs">(optional)</span>
        </Label>
        <Input
          id="time"
          placeholder="Evening, Summer 2025…"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="h-12 sm:h-12 bg-background border-border text-base placeholder:text-muted-foreground focus:ring-primary"
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading || !city.trim() || !place.trim()}
        variant="hero"
        size="lg"
        className="w-full h-14 text-base font-semibold rounded-xl"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
            Generating…
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Compass className="h-5 w-5" />
            Get My Guide
          </span>
        )}
      </Button>
    </form>
  );
};

export default TravelForm;
