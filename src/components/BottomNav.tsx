import { useLocation, useNavigate } from "react-router-dom";
import { Search, BookmarkCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSavedGuides } from "@/hooks/use-saved-guides";

const tabs = [
  { path: "/", label: "Search", icon: Search },
  { path: "/saved", label: "Saved", icon: BookmarkCheck },
] as const;

const BottomNav = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { guides } = useSavedGuides();

  // Hide on guide results page (it has its own back button)
  if (pathname === "/guide") return null;

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 border-t border-border/60 bg-card/95 backdrop-blur-md safe-area-bottom">
      <div className="mx-auto max-w-lg flex">
        {tabs.map(({ path, label, icon: Icon }) => {
          const active = pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={cn(
                "flex-1 flex flex-col items-center gap-0.5 py-2.5 text-xs font-medium transition-colors",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              <div className="relative">
                <Icon className="h-5 w-5" />
                {path === "/saved" && guides.length > 0 && (
                  <span className="absolute -top-1 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground px-1">
                    {guides.length}
                  </span>
                )}
              </div>
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
