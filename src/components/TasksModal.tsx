import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, CheckSquare, Clock, RotateCcw } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format, addDays } from "date-fns";

interface Task {
  id: string;
  description: string;
  completed: boolean;
}

interface TasksModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
  tasks: Task[];
  onTaskToggle: (taskId: string) => void;
  onReschedule: (taskIds: string[], newDate: Date) => void;
}

export default function TasksModal({
  isOpen,
  onClose,
  eventTitle,
  tasks,
  onTaskToggle,
  onReschedule
}: TasksModalProps) {
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [rescheduleDate, setRescheduleDate] = useState<Date>();

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  const handleTaskSelection = (taskId: string, checked: boolean) => {
    if (checked) {
      setSelectedTasks(prev => [...prev, taskId]);
    } else {
      setSelectedTasks(prev => prev.filter(id => id !== taskId));
    }
  };

  const handleReschedule = () => {
    if (selectedTasks.length > 0 && rescheduleDate) {
      onReschedule(selectedTasks, rescheduleDate);
      setSelectedTasks([]);
      setRescheduleDate(undefined);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckSquare className="h-5 w-5" />
            Tareas de: {eventTitle}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {pendingTasks.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4 text-orange-500" />
                  Pendientes ({pendingTasks.length})
                </h3>
                {selectedTasks.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8">
                          <RotateCcw className="h-3 w-3 mr-1" />
                          Reprogramar ({selectedTasks.length})
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="end">
                        <div className="p-3 space-y-3">
                          <Calendar
                            mode="single"
                            selected={rescheduleDate}
                            onSelect={setRescheduleDate}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => setRescheduleDate(addDays(new Date(), 1))}
                              variant="outline"
                            >
                              Mañana
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => setRescheduleDate(addDays(new Date(), 7))}
                              variant="outline"
                            >
                              Próxima semana
                            </Button>
                          </div>
                          {rescheduleDate && (
                            <Button onClick={handleReschedule} className="w-full" size="sm">
                              Reprogramar para {format(rescheduleDate, "d 'de' LLLL")}
                            </Button>
                          )}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                {pendingTasks.map((task, index) => (
                  <div
                    key={task.id}
                    className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={selectedTasks.includes(task.id)}
                        onCheckedChange={(checked) => 
                          handleTaskSelection(task.id, checked as boolean)
                        }
                        className="mt-0.5"
                      />
                      <span className="text-sm font-medium text-muted-foreground">
                        {index + 1}.
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{task.description}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onTaskToggle(task.id)}
                      className="h-8 px-2 text-green-600 hover:text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-950"
                    >
                      <CheckSquare className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {completedTasks.length > 0 && (
            <div>
              <h3 className="text-sm font-medium flex items-center gap-2 mb-4">
                <CheckSquare className="h-4 w-4 text-green-500" />
                Completadas ({completedTasks.length})
              </h3>
              <div className="space-y-2">
                {completedTasks.map((task, index) => (
                  <div
                    key={task.id}
                    className="flex items-start gap-3 p-3 rounded-lg border bg-green-50/50 dark:bg-green-950/20"
                  >
                    <span className="text-sm font-medium text-muted-foreground">
                      {index + 1}.
                    </span>
                    <div className="flex-1">
                      <p className="text-sm line-through text-muted-foreground">
                        {task.description}
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-950">
                      <CheckSquare className="h-3 w-3 mr-1" />
                      Completada
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tasks.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <CheckSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No hay tareas para este evento</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}