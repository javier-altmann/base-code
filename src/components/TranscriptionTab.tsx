import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Download, RotateCcw, Search } from "lucide-react";

interface TranscriptionMessage {
  id: string;
  speaker: string;
  timestamp: string;
  content: string;
}

const mockTranscription: TranscriptionMessage[] = [
  {
    id: "1",
    speaker: "Javier Altmann",
    timestamp: "00:00",
    content: "Hola Yamila, ¿cómo estás? Gracias por tomarte el tiempo para esta reunión."
  },
  {
    id: "2",
    speaker: "Yamila Juri",
    timestamp: "00:03",
    content: "Hola Javier, muy bien gracias. No hay problema, tengo curiosidad por saber más sobre Samu."
  },
  {
    id: "3",
    speaker: "Javier Altmann",
    timestamp: "00:10",
    content: "Perfecto. Me gustaría conocer un poco más sobre cómo trabajas actualmente. ¿Podrías contarme sobre tu día a día en el equipo comercial de Visma?"
  },
  {
    id: "4",
    speaker: "Yamila Juri",
    timestamp: "00:18",
    content: "Claro. Trabajo principalmente con clientes potenciales, tengo muchas reuniones durante el día. Uso Google Calendar para organizarme y el CRM de la empresa, aunque no tanto como debería."
  },
  {
    id: "5",
    speaker: "Javier Altmann",
    timestamp: "00:32",
    content: "Interesante. ¿Y cómo haces el seguimiento de las reuniones? ¿Tomas notas, grabas las llamadas?"
  },
  {
    id: "6",
    speaker: "Yamila Juri",
    timestamp: "00:40",
    content: "Normalmente tomo notas manualmente, pero a veces se me olvidan detalles importantes. Me encantaría tener algo que me ayude con eso."
  },
  {
    id: "7",
    speaker: "Javier Altmann",
    timestamp: "00:52",
    content: "Exactamente para eso está Samu. Te permite grabar automáticamente las reuniones, generar transcripciones y extraer tareas automáticamente. ¿Has usado algo similar antes?"
  },
  {
    id: "8",
    speaker: "Yamila Juri",
    timestamp: "01:05",
    content: "No, nunca he usado algo así. Suena muy útil, especialmente para las minutas. Siempre me toma mucho tiempo escribirlas después de las reuniones."
  },
  {
    id: "9",
    speaker: "Javier Altmann",
    timestamp: "01:18",
    content: "Sí, esa es una de las principales ventajas. También puede generar emails de seguimiento automáticamente basados en lo que se habló en la reunión."
  },
  {
    id: "10",
    speaker: "Yamila Juri",
    timestamp: "01:28",
    content: "Eso sí que sería útil. ¿Y qué tan preciso es? A veces las herramientas automáticas no captan bien el contexto."
  },
  {
    id: "11",
    speaker: "Javier Altmann",
    timestamp: "01:38",
    content: "Es una buena pregunta. La precisión ha mejorado mucho, pero siempre recomendamos revisar el contenido antes de enviarlo. ¿Te gustaría que te muestre cómo funciona?"
  },
  {
    id: "12",
    speaker: "Yamila Juri",
    timestamp: "01:50",
    content: "Sí, me encantaría ver una demo. También me interesa saber sobre la integración con nuestros sistemas actuales."
  }
];

export default function TranscriptionTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTranscription, setFilteredTranscription] = useState(mockTranscription);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = mockTranscription.filter(message =>
        message.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.speaker.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTranscription(filtered);
    } else {
      setFilteredTranscription(mockTranscription);
    }
  }, [searchQuery]);

  const handleDownload = () => {
    const transcriptText = mockTranscription
      .map(msg => `[${msg.timestamp}] ${msg.speaker}: ${msg.content}`)
      .join('\n\n');
    
    const blob = new Blob([transcriptText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transcripcion-reunion.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleRetranscribe = () => {
    // Simular re-transcripción
    console.log("Iniciando re-transcripción...");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar en la transcripción..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="icon" onClick={handleDownload} title="Descargar transcripción">
          <Download className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={handleRetranscribe} title="Re-transcribir">
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="h-96 rounded-md border">
        <div className="p-4 space-y-4">
          {filteredTranscription.map((message) => (
            <div key={message.id} className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium">{message.speaker}</span>
                <span>•</span>
                <span>{message.timestamp}</span>
              </div>
              <p className="text-sm leading-relaxed">{message.content}</p>
            </div>
          ))}
          {filteredTranscription.length === 0 && (
            <p className="text-center text-muted-foreground">No se encontraron resultados para "{searchQuery}"</p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}