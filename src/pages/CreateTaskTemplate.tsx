import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Sparkles, Play, Save, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Helmet } from "react-helmet-async";

export default function CreateTaskTemplate() {
  const navigate = useNavigate();
  const [templateName, setTemplateName] = useState("");
  const [outputLanguage, setOutputLanguage] = useState("");
  const [taskLength, setTaskLength] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState("");
  const [testResult, setTestResult] = useState("");

  // Mock data para reuniones
  const mockMeetings = [
    { id: "1", name: "Reunión de planificación Q4", date: "2024-01-15" },
    { id: "2", name: "Revisión de proyecto Alpha", date: "2024-01-12" },
    { id: "3", name: "Stand-up semanal", date: "2024-01-10" }
  ];

  const handleSave = () => {
    console.log("Guardando template de tarea...");
    navigate("/templates/tasks");
  };

  const handleSaveAndPublish = () => {
    console.log("Guardando y publicando template de tarea...");
    navigate("/templates/tasks");
  };

  const handleGeneratePrompt = () => {
    setPrompt("Basándote en el contenido de la reunión, crea una tarea específica y accionable que incluya:\n\n1. Un título claro y conciso\n2. Una descripción detallada de lo que debe realizarse\n3. Los entregables esperados\n4. La fecha límite sugerida\n5. Las personas responsables mencionadas en la reunión\n\nAsegúrate de que la tarea sea SMART (Específica, Medible, Alcanzable, Relevante y con Tiempo definido).");
  };

  const handleTestTemplate = () => {
    setIsTestModalOpen(true);
    setTestResult("");
    setSelectedMeeting("");
  };

  const handleRunTest = () => {
    if (!selectedMeeting) return;
    
    const selectedMeetingData = mockMeetings.find(m => m.id === selectedMeeting);
    setTestResult(`**Tarea Generada:**

**Título:** Finalizar análisis de métricas Q4 y preparar reporte ejecutivo

**Descripción:** 
Completar el análisis detallado de las métricas de rendimiento del cuarto trimestre, incluyendo comparativas con periodos anteriores y identificación de tendencias clave. Preparar un reporte ejecutivo de máximo 5 páginas con visualizaciones claras.

**Entregables:**
- Análisis completo de métricas Q4 (dashboard actualizado)
- Reporte ejecutivo en formato PDF
- Presentación de 10 minutos para el comité directivo

**Fecha límite:** 25 de enero de 2024

**Responsable:** María García (Analista de datos)
**Colaboradores:** Juan Pérez (Marketing), Ana López (Finanzas)

**Notas adicionales:**
- Incluir recomendaciones para Q1 2024
- Revisar con el equipo de finanzas antes de la entrega final
- Programar sesión de seguimiento para el 30 de enero

---
*Generado desde: ${selectedMeetingData?.name} (${selectedMeetingData?.date})*`);
  };

  return (
    <>
      <Helmet>
        <title>Crear Template de Tarea - Samu</title>
        <meta name="description" content="Crea un nuevo template de tarea para automatizar la generación de actividades basadas en reuniones." />
      </Helmet>

      <div className="flex-1 space-y-6 p-8 pt-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/templates/tasks")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Button>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Crear Template de Tarea</h2>
              <p className="text-muted-foreground">
                Configura un template para generar tareas automáticamente
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Guardar
            </Button>
            <Button onClick={handleSaveAndPublish} className="bg-primary hover:bg-primary/90">
              <Eye className="mr-2 h-4 w-4" />
              Guardar y Publicar
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Formulario Principal */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuración del Template</CardTitle>
                <CardDescription>
                  Define los parámetros básicos para tu template de tarea
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="template-name">Nombre del template</Label>
                  <Input
                    id="template-name"
                    placeholder="Ej: Template de seguimiento de reuniones"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="output-language">Idioma de salida</Label>
                  <Select value={outputLanguage} onValueChange={setOutputLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un idioma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spanish">Español</SelectItem>
                      <SelectItem value="english">Inglés</SelectItem>
                      <SelectItem value="portuguese">Portugués</SelectItem>
                      <SelectItem value="french">Francés</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="task-length">Longitud de la tarea (opcional) ⓘ</Label>
                  <Select value={taskLength} onValueChange={setTaskLength}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona la longitud" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">Corta</SelectItem>
                      <SelectItem value="medium">Media</SelectItem>
                      <SelectItem value="long">Larga</SelectItem>
                      <SelectItem value="detailed">Detallada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Prompt del template
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleGeneratePrompt}
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Crear con IA
                  </Button>
                </CardTitle>
                <CardDescription>
                  Define las instrucciones para generar la tarea
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Escribe las instrucciones para generar la tarea basada en el contenido de la reunión..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[200px]"
                />
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <Button 
                onClick={handleTestTemplate}
                className="bg-[#007BFF] hover:bg-[#0056B3] text-white"
              >
                <Play className="mr-2 h-4 w-4" />
                Probar mi template
              </Button>
            </div>
          </div>

          {/* Sidebar con consejos */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Consejos para crear templates efectivos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium mb-2">🎯 Sé específico</h4>
                  <p className="text-muted-foreground">
                    Define claramente qué tipo de tareas quieres generar y qué información debe incluir.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">📋 Estructura clara</h4>
                  <p className="text-muted-foreground">
                    Incluye elementos como título, descripción, responsables y fechas límite.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">⚡ Accionable</h4>
                  <p className="text-muted-foreground">
                    Asegúrate de que las tareas generadas sean específicas y ejecutables.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">🔄 Prueba y ajusta</h4>
                  <p className="text-muted-foreground">
                    Usa la función de prueba para verificar que el template funciona como esperas.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Modal de prueba */}
        <Dialog open={isTestModalOpen} onOpenChange={setIsTestModalOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Probar Template de Tarea</DialogTitle>
              <DialogDescription>
                Selecciona una reunión para probar cómo funciona tu template
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Selecciona una reunión</Label>
                <Select value={selectedMeeting} onValueChange={setSelectedMeeting}>
                  <SelectTrigger>
                    <SelectValue placeholder="Elige una reunión de tu cuenta" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockMeetings.map((meeting) => (
                      <SelectItem key={meeting.id} value={meeting.id}>
                        {meeting.name} - {meeting.date}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                onClick={handleRunTest} 
                disabled={!selectedMeeting}
                className="w-full bg-[#007BFF] hover:bg-[#0056B3] text-white"
              >
                <Play className="mr-2 h-4 w-4" />
                Ejecutar prueba
              </Button>

              {testResult && (
                <div className="mt-6">
                  <Label className="text-base font-medium">Resultado de la prueba:</Label>
                  <div className="mt-2 p-4 bg-muted rounded-lg">
                    <pre className="whitespace-pre-wrap text-sm">{testResult}</pre>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}