import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import TravelForm from "@/components/TravelForm";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Globe, ShieldCheck } from "lucide-react";
import type { GuideData } from "@/components/GuideResults";
import ImSafeBanner from "@/components/ImSafeBanner";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: { city: string; place: string; time: string }) => {
    setIsLoading(true);
    try {
      const { data: result, error } = await supabase.functions.invoke("travel-guide", {
        body: data,
      });
      if (error) throw error;
      if (result.error) throw new Error(result.error);

      // Store result in sessionStorage and navigate
      sessionStorage.setItem("soloher-current-guide", JSON.stringify(result));
      navigate("/guide");
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Failed to generate guide. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>SoloHer — Travel Confidence for Solo Female Travelers</title>
        <meta name="description" content="AI-powered safety insights and practical tips for women traveling solo. Enter any destination and get a personalized travel confidence guide." />
        <link rel="canonical" href="https://soloher.lovable.app/" />
      </Helmet>
    <div className="max-w-lg mx-auto">
      <ImSafeBanner />
      <div className="px-4 py-6 sm:px-6 sm:py-12">
      {/* Hero */}
      <section className="mb-6 sm:mb-10 text-center">
        <div className="mb-3 sm:mb-4 inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent" />
          AI-Powered Travel Confidence
        </div>
        <h1 className="font-display text-3xl leading-tight text-foreground sm:text-5xl mb-2 sm:mb-4">
          Travel boldly.<br />
          <span className="text-gradient-hero">Travel informed.</span>
        </h1>
        <p className="mx-auto max-w-lg text-base sm:text-lg text-muted-foreground leading-relaxed">
          Safety insights & tips for solo female travelers.
        </p>
      </section>

      {/* Form */}
      <div className="rounded-2xl border border-border/60 bg-card p-4 sm:p-6 shadow-card">
        <h2 className="font-display text-lg text-foreground mb-4 sm:mb-5">Plan Your Visit</h2>
        <TravelForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
      </div>
    </div>
    </>
  );
};

export default Home;
