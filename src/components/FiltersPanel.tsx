import * as React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export interface FiltersState {
  // básicos
  nombre?: string;
  link?: string;
  origen?: string[];
  host: string;
  equipos?: string[];
  tipoLlamada?: string[];
  client: string;
  hubspot?: string;
  zoho?: string;
  score?: [number, number];
  librerias?: string[];
  
  topicos?: string[];
  participantes?: [number, number];
  duracion?: [number, number];
  vista?: string;
}


interface FiltersPanelProps {
  value: FiltersState;
  onChange: (next: FiltersState) => void;
}

export default function FiltersPanel({ value, onChange }: FiltersPanelProps) {
  const setField = (k: keyof FiltersState, v: any) => onChange({ ...value, [k]: v });

  return (
    <aside aria-label="Filtros" className="space-y-3">
      <Card>
        <CardContent className="p-3 space-y-3">
          <Input placeholder="Filtros guardados" className="h-9" />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="host">
              <AccordionTrigger className="px-3">Host</AccordionTrigger>
              <AccordionContent className="px-3 pb-3">
                <Label htmlFor="host" className="text-xs text-muted-foreground">Nombre</Label>
                <Input id="host" value={value.host} onChange={(e) => setField("host", e.target.value)} placeholder="Buscar host" className="mt-1" />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="client">
              <AccordionTrigger className="px-3">Cliente</AccordionTrigger>
              <AccordionContent className="px-3 pb-3">
                <Label htmlFor="client" className="text-xs text-muted-foreground">Nombre</Label>
                <Input id="client" value={value.client} onChange={(e) => setField("client", e.target.value)} placeholder="Buscar cliente" className="mt-1" />
              </AccordionContent>
            </AccordionItem>


            {/* Placeholders para otras categorías */}
            {["Nombre", "Link de llamada", "Origen", "Equipos", "Tipos de llamada", "HubSpot CRM", "Zoho CRM", "Score", "Librerías", "Tópicos", "Participantes"].map((k) => (
              <AccordionItem key={k} value={k}>
                <AccordionTrigger className="px-3">{k}</AccordionTrigger>
                <AccordionContent className="px-3 pb-3 text-sm text-muted-foreground">Próximamente</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </aside>
  );
}
