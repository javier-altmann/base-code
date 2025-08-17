import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckSquare } from "lucide-react";
import thumb1 from "@/assets/call-thumb-1.jpg";
import thumb2 from "@/assets/call-thumb-2.jpg";

export interface MeetingItem {
  id: string;
  title: string;
  host: string;
  client: string;
  datetime: string;
  duration: string;
  tag?: string;
  source?: string;
  thumbIndex?: 1 | 2;
  pendingTasks?: number;
}

export default function MeetingCard({ item }: { item: MeetingItem }) {
  const navigate = useNavigate();
  const img = item.thumbIndex === 2 ? thumb2 : thumb1;
  return (
    <Card
      className={`overflow-hidden hover-scale shadow-sm cursor-pointer ${item.pendingTasks && item.pendingTasks > 0 ? 'border-orange-200 bg-orange-50/50 dark:border-orange-800 dark:bg-orange-950/30' : ''}`}
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/meetings/${item.id}`)}
      onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/meetings/${item.id}`); }}
      aria-label={`Abrir detalle de reunión: ${item.title}`}
    >
      <CardContent className="p-0">
        <div className="flex">
          <div className="w-40 h-28 shrink-0 bg-muted/40 relative">
            <img src={img} alt="Miniatura de reunión Samu AI" className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute bottom-2 right-2 text-xs px-2 py-0.5 rounded bg-background/80 border">
              {item.duration}
            </div>
          </div>
          <div className="flex-1 p-4 space-y-2">
            <div className="flex items-start gap-2">
              {item.tag && (
                <Badge variant="secondary" className="mr-2">{item.tag}</Badge>
              )}
              {item.pendingTasks && item.pendingTasks > 0 && (
                <Badge variant="outline" className="flex items-center gap-1 text-orange-600 border-orange-200 bg-orange-50 dark:text-orange-400 dark:border-orange-800 dark:bg-orange-950">
                  <CheckSquare className="h-3 w-3" />
                  {item.pendingTasks}
                </Badge>
              )}
              <h3 className="font-semibold leading-tight truncate">{item.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground overflow-hidden text-ellipsis">
              {item.host} con <span className="font-medium text-foreground">{item.client}</span>
            </p>
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-muted-foreground">{item.datetime}</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={(e) => { e.stopPropagation(); }}
                >
                  Asociar a CRM
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
