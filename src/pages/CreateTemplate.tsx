import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Sparkles, Play, Save, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';

const CreateTemplate = () => {
  const navigate = useNavigate();
  const [templateName, setTemplateName] = useState('');
  const [outputLanguage, setOutputLanguage] = useState('');
  const [emailTone, setEmailTone] = useState('');
  const [emailLength, setEmailLength] = useState('');
  const [prompt, setPrompt] = useState('');
  const [insertCallLink, setInsertCallLink] = useState(false);
  const [isGeneratingPrompt, setIsGeneratingPrompt] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState('');
  const [testResult, setTestResult] = useState('');

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving template...');
    navigate('/templates');
  };

  const handleSaveAndPublish = () => {
    // Handle save and publish logic here
    console.log('Saving and publishing template...');
    navigate('/templates');
  };

  const handleGeneratePrompt = async () => {
    setIsGeneratingPrompt(true);
    // Simulate AI prompt generation
    setTimeout(() => {
      const generatedPrompt = "Escribe un email de seguimiento profesional que resuma los puntos clave de la reunión, incluya los próximos pasos acordados y mantenga un tono cordial para fortalecer la relación comercial.";
      setPrompt(generatedPrompt);
      setIsGeneratingPrompt(false);
    }, 2000);
  };

  const handleTestTemplate = () => {
    setShowTestModal(true);
  };

  const handleRunTest = () => {
    if (!selectedMeeting) return;
    
    // Simulate template testing
    const mockResult = `
Asunto: Seguimiento de nuestra reunión - Próximos pasos

Hola [Nombre del contacto],

Espero que te encuentres bien. Quería agradecerte por el tiempo que dedicaste en nuestra reunión de hoy.

**Puntos clave discutidos:**
• Implementación de solución CRM
• Reducción de costos operativos en un 30%
• Automatización de procesos de ventas

**Próximos pasos:**
• Envío de propuesta técnica (viernes 20)
• Reunión con equipo técnico (próxima semana)
• Demo personalizada del sistema

Quedo atento a cualquier consulta que puedas tener.

Saludos cordiales,
[Tu nombre]
    `;
    setTestResult(mockResult);
  };

  return (
    <main className="p-6">
      <Helmet>
        <title>Crear Template - Email Follow-up</title>
        <meta name="description" content="Crea un nuevo template de Email Follow-up personalizado." />
      </Helmet>

        <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/templates")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Button>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Crear Template de Email</h2>
              <p className="text-muted-foreground">
                Configura un template para generar emails de seguimiento automáticamente
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
                  Define los parámetros básicos para tu template de email
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="template-name">Nombre del template</Label>
                  <Input
                    id="template-name"
                    placeholder="Ej: Follow-up Short"
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
                      <SelectItem value="french">Francés</SelectItem>
                      <SelectItem value="german">Alemán</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-tone">Tono del email (opcional) ⓘ</Label>
                    <Select value={emailTone} onValueChange={setEmailTone}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="formal">Formal</SelectItem>
                        <SelectItem value="informal">Informal</SelectItem>
                        <SelectItem value="friendly">Amigable</SelectItem>
                        <SelectItem value="professional">Profesional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email-length">Longitud del email (opcional) ⓘ</Label>
                    <Select value={emailLength} onValueChange={setEmailLength}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="short">Corto</SelectItem>
                        <SelectItem value="medium">Medio</SelectItem>
                        <SelectItem value="long">Largo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Switch
                    id="insert-call-link"
                    checked={insertCallLink}
                    onCheckedChange={setInsertCallLink}
                  />
                  <Label htmlFor="insert-call-link">Insertar link de la llamada en tu email ⓘ</Label>
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
                    disabled={isGeneratingPrompt}
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    {isGeneratingPrompt ? 'Generando...' : 'Crear con IA'}
                  </Button>
                </CardTitle>
                <CardDescription>
                  Define las instrucciones para generar el email de seguimiento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Escribe las instrucciones para generar el email basado en el contenido de la reunión..."
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
                  <h4 className="font-medium mb-2">📧 Sé específico</h4>
                  <p className="text-muted-foreground">
                    Define claramente el propósito del email y qué información debe incluir.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">💼 Tono profesional</h4>
                  <p className="text-muted-foreground">
                    Mantén un tono apropiado para el contexto empresarial y la relación con el destinatario.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">🎯 Próximos pasos claros</h4>
                  <p className="text-muted-foreground">
                    Incluye acciones específicas y fechas para mantener el momentum de la reunión.
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
      </div>

      {/* Test Modal */}
      <Dialog open={showTestModal} onOpenChange={setShowTestModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Probar Template de Email</DialogTitle>
            <DialogDescription>
              Selecciona una reunión para probar cómo funciona tu template
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Meeting Selection */}
            <div className="space-y-2">
              <Label>Selecciona una reunión</Label>
              <Select value={selectedMeeting} onValueChange={setSelectedMeeting}>
                <SelectTrigger>
                  <SelectValue placeholder="Elige una reunión de tu cuenta" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="meeting-1">Reunión con ABC Corp - 15 Ene 2024</SelectItem>
                  <SelectItem value="meeting-2">Demo XYZ Solutions - 12 Ene 2024</SelectItem>
                  <SelectItem value="meeting-3">Seguimiento DEF Ltd - 10 Ene 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Run Test Button */}
            <Button 
              onClick={handleRunTest}
              disabled={!selectedMeeting}
              className="w-full bg-[#007BFF] hover:bg-[#0056B3] text-white"
            >
              <Play className="mr-2 h-4 w-4" />
              Ejecutar prueba
            </Button>

            {/* Test Result */}
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
    </main>
  );
};

export default CreateTemplate;