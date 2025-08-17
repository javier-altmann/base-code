import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { SidebarProvider } from "@/components/AppSidebar";
import { AppSidebar } from "@/components/AppSidebar";
import AppHeader from "@/components/layout/AppHeader";
import Index from "./pages/Index";
import MeetingDetail from "./pages/MeetingDetail";
import Templates from "./pages/Templates";
import CreateTemplate from "./pages/CreateTemplate";
import TaskTemplates from "./pages/TaskTemplates";
import CreateTaskTemplate from "./pages/CreateTaskTemplate";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HelmetProvider>
        <BrowserRouter>
          <SidebarProvider>
            <div className="min-h-screen flex w-full">
              <AppSidebar />
              <div className="flex-1 flex flex-col">
                <AppHeader />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/meetings/:id" element={<MeetingDetail />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/templates/create" element={<CreateTemplate />} />
          <Route path="/templates/tasks" element={<TaskTemplates />} />
          <Route path="/templates/tasks/create" element={<CreateTaskTemplate />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </HelmetProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
