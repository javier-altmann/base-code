import { 
  Circle, 
  AreaChart, 
  Library, 
  Calendar, 
  AppWindow, 
  GraduationCap,
  FileText,
  Bell, 
  Search, 
  HelpCircle, 
  Settings,
  ChevronDown,
  Mail
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarProvider,
  useSidebar,
  SidebarFooter,
  SidebarHeader
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

const mainItems = [
  { title: "Reuniones", url: "/", icon: Circle },
  { title: "Analítica", url: "/analytics", icon: AreaChart },
  { title: "Librería", url: "/library", icon: Library },
  { title: "Agenda", url: "/agenda", icon: Calendar },
  { title: "Apps", url: "/apps", icon: AppWindow },
  { title: "Coaching", url: "/coaching", icon: GraduationCap },
];

const bottomItems = [
  { title: "Ayuda & Soporte", url: "/help", icon: HelpCircle },
  { title: "Configuraciones", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = (path: string) => currentPath === path || (path === "/" && currentPath.startsWith("/meetings"));
  const [templatesOpen, setTemplatesOpen] = useState(currentPath.startsWith('/templates'));
  
  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarHeader className="p-4">
        {!collapsed && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search" 
              className="pl-10 h-9 bg-muted/50"
            />
            <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              ⌘K
            </kbd>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className="flex flex-col justify-between">
        <div className="space-y-1">
          {/* Notifications */}
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <div className="flex items-center justify-between cursor-pointer">
                      <div className="flex items-center">
                        <Bell className="mr-3 h-4 w-4" />
                        {!collapsed && <span>Notifications</span>}
                      </div>
                      {!collapsed && <Badge variant="destructive" className="h-5 w-5 p-0 flex items-center justify-center text-xs">2</Badge>}
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Main Navigation */}
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {mainItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.url} 
                        end={item.url === "/"} 
                        className={({ isActive: routeActive }) =>
                          `flex items-center justify-between ${
                            routeActive || isActive(item.url) 
                              ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
                              : "hover:bg-sidebar-accent/60"
                          }`
                        }
                      >
                        <div className="flex items-center">
                          <item.icon className="mr-3 h-4 w-4" />
                          {!collapsed && <span>{item.title}</span>}
                        </div>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                
                {/* Templates with Submenu */}
                <SidebarMenuItem>
                  <Collapsible
                    open={templatesOpen}
                    onOpenChange={setTemplatesOpen}
                    className="w-full"
                  >
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton className={`w-full ${
                        currentPath.startsWith('/templates') 
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
                          : "hover:bg-sidebar-accent/60"
                      }`}>
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center">
                            <FileText className="mr-3 h-4 w-4" />
                            {!collapsed && <span>Templates</span>}
                          </div>
                          {!collapsed && (
                            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                              templatesOpen ? "rotate-180" : ""
                            }`} />
                          )}
                        </div>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    
                    {!collapsed && (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton asChild>
                              <NavLink 
                                to="/templates" 
                                className={({ isActive: routeActive }) =>
                                  `flex items-center ${
                                    routeActive 
                                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
                                      : "hover:bg-sidebar-accent/60"
                                  }`
                                }
                              >
                                <Mail className="mr-3 h-4 w-4" />
                                <span>Email Follow-up</span>
                              </NavLink>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton asChild>
                              <NavLink 
                                to="/templates/tasks" 
                                className={({ isActive: routeActive }) =>
                                  `flex items-center ${
                                    routeActive 
                                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
                                      : "hover:bg-sidebar-accent/60"
                                  }`
                                }
                              >
                                <FileText className="mr-3 h-4 w-4" />
                                <span>Tareas</span>
                              </NavLink>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    )}
                  </Collapsible>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        {/* Bottom Items */}
        <div className="mt-auto">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {bottomItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.url} 
                        className={({ isActive: routeActive }) =>
                          `flex items-center ${
                            routeActive 
                              ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
                              : "hover:bg-sidebar-accent/60"
                          }`
                        }
                      >
                        <item.icon className="mr-3 h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <div className="flex items-center cursor-pointer">
                <Avatar className="h-8 w-8 mr-3">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>Y</AvatarFallback>
                </Avatar>
                {!collapsed && (
                  <div className="flex-1">
                    <div className="text-sm font-medium">Javi</div>
                  </div>
                )}
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export { SidebarProvider };
