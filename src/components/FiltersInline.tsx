import * as React from "react";
import { X, SlidersHorizontal, User, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import type { FiltersState } from "./FiltersPanel";

interface FiltersInlineProps {
  value: FiltersState;
  onChange: (next: FiltersState) => void;
}

export default function FiltersInline({ value, onChange }: FiltersInlineProps) {
  const setField = (k: keyof FiltersState, v: any) => onChange({ ...value, [k]: v });
  const clearAll = () => onChange({
    host: "",
    client: "",
    nombre: "",
    link: "",
    origen: [],
    equipos: [],
    tipoLlamada: [],
    hubspot: "",
    zoho: "",
    score: [0, 100],
    librerias: [],
    
    topicos: [],
    participantes: [0, 50],
    duracion: [0, 120],
    vista: "",
  });
  

  return (
    <Card className="border bg-card">
      <CardContent className="p-4">
        {/* Primera fila: inputs rápidos */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="flex-1 flex items-center gap-2">
            <div className="relative w-full max-w-xs">
              <Input
                value={value.nombre ?? ""}
                onChange={(e) => setField("nombre", e.target.value)}
                placeholder="Buscar por nombre"
              />
            </div>
            <div className="relative w-full">
              <User className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={value.host}
                onChange={(e) => setField("host", e.target.value)}
                placeholder="Filtrar por host"
                className="pl-8"
              />
            </div>
            <div className="relative w-full">
              <Users className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={value.client}
                onChange={(e) => setField("client", e.target.value)}
                placeholder="Filtrar por cliente"
                className="pl-8"
              />
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="secondary" className="whitespace-nowrap">
                  <SlidersHorizontal className="h-4 w-4 mr-2" /> Más filtros
                </Button>
              </PopoverTrigger>
          <PopoverContent align="start" className="w-[720px] p-4 z-50 bg-popover">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-muted-foreground">Link de llamada</Label>
                  <Input value={value.link ?? ""} onChange={(e) => setField("link", e.target.value)} placeholder="https://…" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Origen</p>
                  <div className="space-y-2">
                    {(["Inbound","Outbound","Referido"] as const).map((opt) => (
                      <label key={opt} className="flex items-center gap-2 text-sm">
                        <Checkbox
                          checked={value.origen?.includes(opt) ?? false}
                          onCheckedChange={(c) => {
                            const arr = value.origen ?? [];
                            setField("origen", c ? [...arr, opt] : arr.filter((x) => x !== opt));
                          }}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Equipos</p>
                  <div className="space-y-2">
                    {(["Ventas","Éxito","Soporte"]).map((opt) => (
                      <label key={opt} className="flex items-center gap-2 text-sm">
                        <Checkbox
                          checked={value.equipos?.includes(opt) ?? false}
                          onCheckedChange={(c) => {
                            const arr = value.equipos ?? [];
                            setField("equipos", c ? [...arr, opt] : arr.filter((x) => x !== opt));
                          }}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Tipo de llamada</p>
                  <div className="space-y-2">
                    {(["Demo","Descubrimiento","Seguimiento","Soporte"]).map((opt) => (
                      <label key={opt} className="flex items-center gap-2 text-sm">
                        <Checkbox
                          checked={value.tipoLlamada?.includes(opt) ?? false}
                          onCheckedChange={(c) => {
                            const arr = value.tipoLlamada ?? [];
                            setField("tipoLlamada", c ? [...arr, opt] : arr.filter((x) => x !== opt));
                          }}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs text-muted-foreground">HubSpot CRM</Label>
                    <Select value={value.hubspot ?? "all"} onValueChange={(v) => setField("hubspot", v)}>
                      <SelectTrigger><SelectValue placeholder="Estado" /></SelectTrigger>
                      <SelectContent className="z-50 bg-popover">
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="asociado">Asociado</SelectItem>
                        <SelectItem value="no-asociado">No asociado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Zoho CRM</Label>
                    <Select value={value.zoho ?? "all"} onValueChange={(v) => setField("zoho", v)}>
                      <SelectTrigger><SelectValue placeholder="Estado" /></SelectTrigger>
                      <SelectContent className="z-50 bg-popover">
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="asociado">Asociado</SelectItem>
                        <SelectItem value="no-asociado">No asociado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground">Score</Label>
                  <div className="px-1 py-3">
                    <Slider value={value.score ?? [0,100]} onValueChange={(v) => setField("score", v as [number,number])} max={100} step={1} />
                    <div className="mt-1 text-xs text-muted-foreground">{(value.score ?? [0,100]).join(" – ")}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs text-muted-foreground">Participantes</Label>
                    <div className="mt-2 flex items-center gap-2">
                      <Input type="number" value={(value.participantes?.[0] ?? 0).toString()} onChange={(e) => {
                        const max = value.participantes?.[1] ?? 50;
                        setField("participantes", [Number(e.target.value), max]);
                      }} className="h-9" />
                      <span className="text-xs text-muted-foreground">a</span>
                      <Input type="number" value={(value.participantes?.[1] ?? 50).toString()} onChange={(e) => {
                        const min = value.participantes?.[0] ?? 0;
                        setField("participantes", [min, Number(e.target.value)]);
                      }} className="h-9" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Duración (min)</Label>
                    <div className="px-1 py-3">
                      <Slider value={value.duracion ?? [0,120]} onValueChange={(v) => setField("duracion", v as [number,number])} max={180} step={5} />
                      <div className="mt-1 text-xs text-muted-foreground">{(value.duracion ?? [0,120]).join(" – ")}</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs text-muted-foreground">Librerías</Label>
                    <Input value={(value.librerias ?? []).join(", ")} onChange={(e) => setField("librerias", e.target.value.split(",").map(s=>s.trim()).filter(Boolean))} placeholder="ej: pricing, objection handling" />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Tópicos</Label>
                    <Input value={(value.topicos ?? []).join(", ")} onChange={(e) => setField("topicos", e.target.value.split(",").map(s=>s.trim()).filter(Boolean))} placeholder="ej: onboarding, ROI" />
                  </div>
                </div>


                <div>
                  <Label className="text-xs text-muted-foreground">Vista</Label>
                  <Select value={value.vista ?? "default"} onValueChange={(v) => setField("vista", v)}>
                    <SelectTrigger><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                    <SelectContent className="z-50 bg-popover">
                      <SelectItem value="default">Predeterminada</SelectItem>
                      <SelectItem value="lista">Lista</SelectItem>
                      <SelectItem value="tabla">Tabla</SelectItem>
                      <SelectItem value="tarjetas">Tarjetas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </PopoverContent>
            </Popover>

            <Button variant="ghost" onClick={clearAll} className="ml-auto">Limpiar</Button>
          </div>
        </div>

        {/* Segunda fila: chips seleccionados */}
        {(value.host || value.client || value.nombre) && (
          <div className="mt-3 flex flex-wrap gap-2">
            {value.nombre && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Nombre: {value.nombre}
                <button aria-label="Quitar nombre" onClick={() => setField("nombre", "")} className="ml-1">
                  <X className="h-3.5 w-3.5" />
                </button>
              </Badge>
            )}
            {value.host && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Host: {value.host}
                <button aria-label="Quitar host" onClick={() => setField("host", "")} className="ml-1">
                  <X className="h-3.5 w-3.5" />
                </button>
              </Badge>
            )}
            {value.client && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Cliente: {value.client}
                <button aria-label="Quitar cliente" onClick={() => setField("client", "")} className="ml-1">
                  <X className="h-3.5 w-3.5" />
                </button>
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
