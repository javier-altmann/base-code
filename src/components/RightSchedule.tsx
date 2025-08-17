import * as React from "react";
import { format, isSameDay } from "date-fns";
import { Calendar as CalendarIcon, Clock, MapPin, CheckSquare } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import TasksModal from "./TasksModal";

interface Task {
  id: string;
  description: string;
  completed: boolean;
}

interface ScheduleEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  tag?: string;
  location?: string;
  pendingTasks?: number;
  tasks?: Task[];
}

const seed = new Date();
const todayAt = (h: number, m: number) => new Date(seed.getFullYear(), seed.getMonth(), seed.getDate(), h, m);

const EVENTS: ScheduleEvent[] = [
  { id: "1", title: "Home", start: todayAt(8, 0), end: todayAt(20, 0), tag: "Personal", location: "" },
  { id: "2", title: "Workout", start: todayAt(6, 0), end: todayAt(8, 0), tag: "Salud", location: "🏋️" },
  { 
    id: "3", 
    title: "To-do's", 
    start: todayAt(8, 0), 
    end: todayAt(9, 0), 
    tag: "Foco", 
    pendingTasks: 4,
    tasks: [
      { id: "t1", description: "Revisar emails pendientes de respuesta", completed: false },
      { id: "t2", description: "Completar reporte mensual de ventas", completed: false },
      { id: "t3", description: "Organizar documentos del proyecto Alpha", completed: true },
      { id: "t4", description: "Programar reunión con equipo de marketing", completed: false },
      { id: "t5", description: "Actualizar base de datos de clientes", completed: false }
    ]
  },
  { 
    id: "4", 
    title: "Pipeline Management", 
    start: todayAt(9, 0), 
    end: todayAt(10, 0), 
    tag: "Ventas", 
    pendingTasks: 1,
    tasks: [
      { id: "t6", description: "Hacer seguimiento con leads de la semana pasada", completed: false },
      { id: "t7", description: "Actualizar forecast trimestral", completed: true }
    ]
  },
  { 
    id: "5", 
    title: "Demo con Accivalores + Atom…", 
    start: todayAt(12, 0), 
    end: todayAt(12, 15), 
    tag: "Reunión", 
    location: "Google Meet", 
    pendingTasks: 2,
    tasks: [
      { id: "t8", description: "Enviar email de seguimiento", completed: false },
      { id: "t9", description: "Investigar sobre la posibilidad de integrar un bot en WhatsApp para automatizar la carga de datos", completed: false },
      { id: "t10", description: "Averiguar si Samu puede integrarse con Sheets para completar campos automáticamente", completed: false }
    ]
  },
  { id: "6", title: "Lunch", start: todayAt(13, 0), end: todayAt(14, 0), tag: "Break" },
];

export default function RightSchedule() {
  const [date, setDate] = React.useState<Date>(seed);
  const [events, setEvents] = React.useState<ScheduleEvent[]>(EVENTS);
  const [selectedEvent, setSelectedEvent] = React.useState<ScheduleEvent | null>(null);
  const [isTasksModalOpen, setIsTasksModalOpen] = React.useState(false);
  
  const dayEvents = React.useMemo(() => events.filter((e) => isSameDay(e.start, date)), [events, date]);

  const now = new Date();
  const selectedStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const isFutureDay = selectedStart.getTime() > todayStart.getTime();
  const isPastDay = selectedStart.getTime() < todayStart.getTime();

  const upcoming = React.useMemo(() => {
    if (isFutureDay) return dayEvents;
    if (isPastDay) return [];
    return dayEvents.filter((e) => e.end.getTime() >= now.getTime());
  }, [dayEvents, isFutureDay, isPastDay, now]);

  const past = React.useMemo(() => {
    if (isFutureDay) return [];
    if (isPastDay) return dayEvents;
    return dayEvents.filter((e) => e.end.getTime() < now.getTime());
  }, [dayEvents, isFutureDay, isPastDay, now]);

  const handleEventClick = (event: ScheduleEvent) => {
    if (event.tasks && event.tasks.length > 0) {
      setSelectedEvent(event);
      setIsTasksModalOpen(true);
    }
  };

  const handleTaskToggle = (taskId: string) => {
    if (!selectedEvent) return;
    
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === selectedEvent.id
          ? {
              ...event,
              tasks: event.tasks?.map(task =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
              ),
              pendingTasks: event.tasks?.filter(task => task.id !== taskId ? !task.completed : task.completed).length
            }
          : event
      )
    );
    
    setSelectedEvent(prev => prev ? {
      ...prev,
      tasks: prev.tasks?.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ),
      pendingTasks: prev.tasks?.filter(task => task.id !== taskId ? !task.completed : task.completed).length
    } : null);
  };

  const handleReschedule = (taskIds: string[], newDate: Date) => {
    // For now, just remove the tasks from the current event
    // In a real app, you'd create a new event or add to existing one on the new date
    if (!selectedEvent) return;
    
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === selectedEvent.id
          ? {
              ...event,
              tasks: event.tasks?.filter(task => !taskIds.includes(task.id)),
              pendingTasks: event.tasks?.filter(task => !taskIds.includes(task.id) && !task.completed).length
            }
          : event
      )
    );
  };

  return (
    <aside aria-label="Agenda diaria" className="space-y-3">
      <Card>
        <CardContent className="p-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                <CalendarIcon className="h-4 w-4 mr-2" />
                {format(date, "EEEE, d LLLL")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 z-50 bg-popover" align="end">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(d) => d && setDate(d)}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-3 space-y-3">
          {upcoming.length > 0 && (
            <section aria-labelledby="upcoming-events">
              <h3 id="upcoming-events" className="text-sm font-medium">Próximos ({upcoming.length})</h3>
              <div className="mt-2 space-y-2">
                {upcoming.map((ev) => (
                  <div 
                    key={ev.id} 
                    className={`rounded-md border p-2 bg-card hover-scale transition-colors ${
                      ev.pendingTasks && ev.pendingTasks > 0 
                        ? 'border-orange-200 bg-orange-50/50 dark:border-orange-800 dark:bg-orange-950/30 cursor-pointer hover:bg-orange-100/50 dark:hover:bg-orange-950/50' 
                        : ''
                    }`}
                    onClick={() => handleEventClick(ev)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{ev.title}</span>
                      <div className="flex items-center gap-1">
                        {ev.pendingTasks && ev.pendingTasks > 0 && (
                          <Badge variant="outline" className="flex items-center gap-1 text-orange-600 border-orange-200 bg-orange-50 dark:text-orange-400 dark:border-orange-800 dark:bg-orange-950">
                            <CheckSquare className="h-3 w-3" />
                            {ev.pendingTasks}
                          </Badge>
                        )}
                        {ev.tag && <Badge variant="secondary">{ev.tag}</Badge>}
                      </div>
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      <span>
                        {format(ev.start, "p")} - {format(ev.end, "p")}
                      </span>
                      {ev.location && (
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" /> {ev.location}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section aria-labelledby="past-events">
            <h3 id="past-events" className="text-sm font-medium">Ya ocurridos ({past.length})</h3>
            {past.length === 0 ? (
              <p className="mt-2 text-sm text-muted-foreground">No hay eventos en esta sección.</p>
            ) : (
              <div className="mt-2 space-y-2">
                {past.map((ev) => (
                  <div 
                    key={ev.id} 
                    className={`rounded-md border p-2 bg-card hover-scale transition-colors ${
                      ev.pendingTasks && ev.pendingTasks > 0 
                        ? 'border-orange-200 bg-orange-50/50 dark:border-orange-800 dark:bg-orange-950/30 cursor-pointer hover:bg-orange-100/50 dark:hover:bg-orange-950/50' 
                        : ''
                    }`}
                    onClick={() => handleEventClick(ev)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{ev.title}</span>
                      <div className="flex items-center gap-1">
                        {ev.pendingTasks && ev.pendingTasks > 0 && (
                          <Badge variant="outline" className="flex items-center gap-1 text-orange-600 border-orange-200 bg-orange-50 dark:text-orange-400 dark:border-orange-800 dark:bg-orange-950">
                            <CheckSquare className="h-3 w-3" />
                            {ev.pendingTasks}
                          </Badge>
                        )}
                        {ev.tag && <Badge variant="secondary">{ev.tag}</Badge>}
                      </div>
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      <span>
                        {format(ev.start, "p")} - {format(ev.end, "p")}
                      </span>
                      {ev.location && (
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" /> {ev.location}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </CardContent>
      </Card>

      {selectedEvent && (
        <TasksModal
          isOpen={isTasksModalOpen}
          onClose={() => setIsTasksModalOpen(false)}
          eventTitle={selectedEvent.title}
          tasks={selectedEvent.tasks || []}
          onTaskToggle={handleTaskToggle}
          onReschedule={handleReschedule}
        />
      )}
    </aside>
  );
}