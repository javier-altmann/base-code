import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Search } from "lucide-react";

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-20 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="h-14 flex items-center gap-3 px-4">
        <SidebarTrigger className="" />
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md bg-gradient-brand shadow-elegant" />
          <span className="font-semibold">Samu.ai</span>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md border bg-background">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Buscar"
              className="bg-transparent outline-none placeholder:text-muted-foreground text-sm"
            />
          </div>
          <button aria-label="Notificaciones" className="p-2 rounded-md hover:bg-muted">
            <Bell className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
