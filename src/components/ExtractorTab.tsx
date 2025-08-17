import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ExtractorData {
  sugerenciasMejora: string[];
  interaccionChatIA: string[];
  usosEmailsAutomaticos: string[];
  confianzaDeteccionTareas: string[];
  painPointsPrincipales: string[];
  oportunidadesVenta: string[];
  siguientesPasos: string[];
  sentimientoGeneral: string;
}

const extractorData: ExtractorData = {
  sugerenciasMejora: [
    "Poder configurar las tareas para que estén más asociadas a cómo piensa el usuario",
    "Mejorar la integración automática cuando se une tarde a las reuniones",
    "Personalizar los tipos de insights según el rol del usuario"
  ],
  interaccionChatIA: [
    "Lo ha usado para buscar información sobre competidores en reuniones",
    "Consulta sobre mejores prácticas de seguimiento comercial",
    "Busca contexto histórico de clientes antes de reuniones importantes"
  ],
  usosEmailsAutomaticos: [
    "No lo había visto antes, pero le gustó la funcionalidad de generar emails de seguimiento",
    "Interés en templates personalizables según tipo de reunión",
    "Quiere probar la función de envío automático con revisión previa"
  ],
  confianzaDeteccionTareas: [
    "Le sirve como ayuda memoria, pero no le presta mucha atención a la puntuación",
    "Prefiere revisar manualmente las tareas antes de marcarlas como completas",
    "Encuentra útil la categorización automática de tareas por prioridad"
  ],
  painPointsPrincipales: [
    "A veces las reuniones no se suman automáticamente a Samu si se une tarde",
    "Dificultad para integrar con el CRM actual de la empresa",
    "Necesita más tiempo para acostumbrarse a confiar en las transcripciones automáticas"
  ],
  oportunidadesVenta: [
    "Alto interés en funcionalidades de email automático",
    "Necesidad clara de mejor gestión de minutas y seguimiento",
    "Potencial para upgrade a plan empresarial con más integraciones"
  ],
  siguientesPasos: [
    "Programar demo técnica con equipo de IT para evaluar integraciones",
    "Enviar caso de éxito de empresa similar en sector financiero",
    "Coordinar trial de 30 días con funcionalidades específicas"
  ],
  sentimientoGeneral: "Positivo - muestra interés genuino y ve valor claro en la solución"
};

export default function ExtractorTab() {
  const renderSection = (title: string, items: string[], variant: "default" | "secondary" | "outline" = "default") => (
    <div className="space-y-3">
      <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">{title}</h3>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
            <p className="text-sm leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Insights Extraídos</h2>
        <p className="text-sm text-muted-foreground">
          Análisis automático basado en la transcripción de la reunión
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Sentimiento General:</span>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              {extractorData.sentimientoGeneral}
            </Badge>
          </div>

          <Separator />

          {renderSection("Sugerencias de Mejora", extractorData.sugerenciasMejora)}

          <Separator />

          {renderSection("Interacción con Chat IA", extractorData.interaccionChatIA)}

          <Separator />

          {renderSection("Uso de Emails Automáticos", extractorData.usosEmailsAutomaticos)}

          <Separator />

          {renderSection("Confianza en Detección de Tareas", extractorData.confianzaDeteccionTareas)}

          <Separator />

          {renderSection("Pain Points Principales", extractorData.painPointsPrincipales)}

          <Separator />

          {renderSection("Oportunidades de Venta", extractorData.oportunidadesVenta)}

          <Separator />

          {renderSection("Siguientes Pasos", extractorData.siguientesPasos)}
        </CardContent>
      </Card>
    </div>
  );
}