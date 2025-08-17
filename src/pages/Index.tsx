import * as React from "react";
import { Helmet } from "react-helmet-async";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import MeetingCard, { MeetingItem } from "@/components/MeetingCard";
import type { FiltersState } from "@/components/FiltersPanel";
import FiltersInline from "@/components/FiltersInline";
import RightSchedule from "@/components/RightSchedule";

const data: MeetingItem[] = [
  { id: "1", title: "Kickoff meeting", host: "Ejecutivo de cuentas", client: "Acme Corp", datetime: "Hoy, 15:30", duration: "54:00", tag: "Ventas • Baseline", thumbIndex: 1, pendingTasks: 2 },
  { id: "2", title: "Demostración + ROI", host: "Lina Acosta", client: "Monex", datetime: "Hoy, 16:00", duration: "29:59", tag: "Ventas • Baseline", thumbIndex: 2, pendingTasks: 0 },
  { id: "3", title: "Seguimos conversando", host: "Lina Acosta", client: "Compartamos Perú", datetime: "Ayer, 12:07", duration: "55:22", tag: "Ventas • Baseline", thumbIndex: 1, pendingTasks: 3 },
];

export default function Index() {
  const [filters, setFilters] = React.useState<FiltersState>({ host: "", client: "" });
  const [day, setDay] = React.useState<Date | undefined>(undefined);


  const parseDate = React.useCallback((s: string): Date | undefined => {
    // Expected formats: "Hoy, HH:mm", "Ayer, HH:mm" or "DD/MM/YYYY, HH:mm"
    const now = new Date();
    const [label, time] = s.split(", ").map((x) => x.trim());
    const [hh, mm] = (time ?? "").split(":").map(Number);
    if (!Number.isFinite(hh) || !Number.isFinite(mm)) return undefined;

    if (label?.toLowerCase() === "hoy") {
      const d = new Date(now);
      d.setHours(hh, mm, 0, 0);
      return d;
    }
    if (label?.toLowerCase() === "ayer") {
      const d = new Date(now);
      d.setDate(d.getDate() - 1);
      d.setHours(hh, mm, 0, 0);
      return d;
    }
    // Fallback: try DD/MM/YYYY
    const m = label?.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
    if (m) {
      const [, dd, MM, yyyy] = m;
      const d = new Date(Number(yyyy), Number(MM) - 1, Number(dd), hh, mm);
      return d;
    }
    return undefined;
  }, []);

  const filteredData = React.useMemo(() => {
    return data.filter((item) => {
      const byHost = filters.host ? item.host.toLowerCase().includes(filters.host.toLowerCase()) : true;
      const byClient = filters.client ? item.client.toLowerCase().includes(filters.client.toLowerCase()) : true;
      

      const itemDate = parseDate(item.datetime);
      const byDay =
        day && itemDate ? itemDate.toDateString() === day.toDateString() : true;

      return byHost && byClient && byDay;
    });
  }, [filters, day, parseDate]);

  const now = new Date();
  const upcoming = React.useMemo(
    () =>
      filteredData
        .filter((i) => {
          const d = parseDate(i.datetime);
          return d ? d.getTime() >= now.getTime() : false;
        })
        .sort((a, b) => {
          const da = parseDate(a.datetime)?.getTime() ?? 0;
          const db = parseDate(b.datetime)?.getTime() ?? 0;
          return da - db;
        }),
    [filteredData, parseDate]
  );

  const past = React.useMemo(
    () =>
      filteredData
        .filter((i) => {
          const d = parseDate(i.datetime);
          return d ? d.getTime() < now.getTime() : true;
        })
        .sort((a, b) => {
          const da = parseDate(a.datetime)?.getTime() ?? 0;
          const db = parseDate(b.datetime)?.getTime() ?? 0;
          return db - da;
        }),
    [filteredData, parseDate]
  );


  return (
    <main className="px-6 py-6 space-y-6">
      <Helmet>
        <title>Samu AI — Panel de Ventas</title>
        <meta name="description" content="Gestiona y analiza tus llamadas de ventas con Samu AI." />
        <link rel="canonical" href="/" />
      </Helmet>

      <h1 className="text-3xl font-bold">Bienvenido de nuevo 👋</h1>

      <section className="grid lg:grid-cols-[1fr_360px] gap-6">
        <div className="space-y-6">
          <FiltersInline value={filters} onChange={setFilters} />

          <Card className="bg-gradient-brand text-primary-foreground shadow-elegant">
            <CardContent className="p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm/6 opacity-90">Nueva función de análisis con IA</p>
                  <p className="text-lg font-medium">Selecciona múltiples reuniones y obtén respuestas de nuestra IA</p>
                </div>
                <button className="px-4 py-2 rounded-md bg-background text-foreground border hover:shadow-elegant">Seleccionar reuniones</button>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="mis-llamadas" className="space-y-4">
            <TabsList>
              <TabsTrigger value="mis-llamadas">Mis llamadas</TabsTrigger>
              <TabsTrigger value="equipo">Equipo</TabsTrigger>
              <TabsTrigger value="compania">Compañía</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Pendiente info CRM</span>
              <Switch />
              <div className="ml-auto" />
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="min-w-[180px] justify-start">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {day
                      ? day.toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" })
                      : "Seleccionar fecha"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={day}
                    onSelect={setDay}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Rango" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todo el tiempo</SelectItem>
                  <SelectItem value="week">Última semana</SelectItem>
                  <SelectItem value="month">Último mes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <TabsContent value="mis-llamadas" className="space-y-4 animate-enter">
              {upcoming.length > 0 && (
                <section aria-labelledby="upcoming-heading" className="space-y-3">
                  <h2 id="upcoming-heading" className="text-base font-medium">Próximas ({upcoming.length})</h2>
                  {upcoming.map((item) => (
                    <MeetingCard key={item.id} item={item} />
                  ))}
                </section>
              )}
              <section aria-labelledby="past-heading" className="space-y-3">
                <h2 id="past-heading" className="text-base font-medium">Ya ocurridas ({past.length})</h2>
                {past.map((item) => (
                  <MeetingCard key={item.id} item={item} />
                ))}
              </section>
            </TabsContent>
            <TabsContent value="equipo" className="text-sm text-muted-foreground">
              Próximamente: métricas de equipo
            </TabsContent>
            <TabsContent value="compania" className="text-sm text-muted-foreground">
              Próximamente: resumen de compañía
            </TabsContent>
          </Tabs>
        </div>
        <RightSchedule />
      </section>
    </main>
  );
}
