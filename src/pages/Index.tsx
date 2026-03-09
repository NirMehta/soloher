import { useState } from "react";
import TravelForm from "@/components/TravelForm";
import GuideResults, { GuideData } from "@/components/GuideResults";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Globe, ShieldCheck } from "lucide-react";

const Index = () => {
  const [guide, setGuide] = useState<GuideData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: { city: string; place: string; time: string }) => {
    setIsLoading(true);
    setGuide(null);

    try {
      const { data: result, error } = await supabase.functions.invoke("travel-guide", {
        body: data,
      });

      if (error) throw error;
      if (result.error) throw new Error(result.error);

      setGuide(result as GuideData);
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Failed to generate guide. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <header className="border-b border-border/60 bg-card/50 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl px-6 py-5 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-hero">
            <Globe className="h-4 w-4 text-primary-foreground" />
          </div>
          <h1 className="font-display text-xl text-foreground">SoloHer</h1>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-accent" />
            AI-Powered Travel Confidence
          </div>
          <h1 className="font-display text-4xl leading-tight text-foreground sm:text-5xl mb-4">
            Travel boldly.<br />
            <span className="text-gradient-hero">Travel informed.</span>
          </h1>
          <p className="mx-auto max-w-lg text-lg text-muted-foreground leading-relaxed">
            Get personalized safety insights and practical tips for any destination — designed for women who explore the world solo.
          </p>
        </section>

        {/* Form + Results Layout */}
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="sticky top-8 rounded-2xl border border-border/60 bg-card p-6 shadow-card">
              <h2 className="font-display text-lg text-foreground mb-5">Plan Your Visit</h2>
              <TravelForm onSubmit={handleSubmit} isLoading={isLoading} />
            </div>
          </div>

          <div className="lg:col-span-3">
            {guide ? (
              <GuideResults guide={guide} />
            ) : (
              <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-dashed border-border/60 bg-card/30">
                <div className="text-center px-6">
                  <Globe className="mx-auto mb-4 h-12 w-12 text-muted-foreground/30" />
                  <p className="text-muted-foreground font-medium">Your Travel Confidence Guide will appear here</p>
                  <p className="mt-1 text-sm text-muted-foreground/60">Enter a destination to get started</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
