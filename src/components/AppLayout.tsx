import { Outlet } from "react-router-dom";
import { Globe } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const AppLayout = () => (
  <div className="min-h-screen bg-background pb-16">
    {/* Header */}
    <header className="sticky top-0 z-40 border-b border-border/60 bg-card/80 backdrop-blur-md">
      <div className="mx-auto max-w-2xl px-4 py-3 sm:px-6 sm:py-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-gradient-hero">
          <Globe className="h-4 w-4 text-primary-foreground" />
        </div>
        <h1 className="font-display text-lg sm:text-xl text-foreground">SoloHer</h1>
      </div>
    </header>

    <Outlet />
    <BottomNav />
  </div>
);

export default AppLayout;
