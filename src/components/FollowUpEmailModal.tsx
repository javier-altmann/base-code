import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Mail, Copy, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface FollowUpEmailModalProps {
  children: React.ReactNode;
  meetingTitle: string;
  participantEmail?: string;
}

export default function FollowUpEmailModal({ children, meetingTitle, participantEmail }: FollowUpEmailModalProps) {
  const [template, setTemplate] = React.useState("user-personal");
  const [language, setLanguage] = React.useState("es");
  const [tone, setTone] = React.useState("profesional");
  const [emailLength, setEmailLength] = React.useState("corto");
  const [prompt, setPrompt] = React.useState("Escribe un email de seguimiento para la conversación que mencione los pain points del prospecto, cualquier objeción y los próximos pasos.");
  const [insertCallLink, setInsertCallLink] = React.useState(true);
  const [generatedEmail, setGeneratedEmail] = React.useState("");
  const [isGenerating, setIsGenerating] = React.useState(false);

  const mockEmail = `Hola Yamila,

Me encantó la charla de hoy, creo que salieron varias ideas para que Samu te ahorre todavía más tiempo en el día a día.

Para estar alineados, me quedó claro que hoy lo usás sobre todo como ayuda memoria después de las reuniones, y que te resulta clave para no perder detalles cuando pedís una demo a otro equipo o armás el follow up. Por eso creo que hay un par de cosas que pueden potenciar ese uso:

1. **Agenda de Samu**: acceder directo a tus próximas reuniones, sin buscar entre mails ni calendar, y abrir el detalle con un clic.
2. **Resumen detallado + búsqueda por palabra**: para encontrar rápido temas clave como competidores o compromisos sin ver toda la grabación.
3. **Email de seguimiento**: generar en segundos un borrador con lo hablado para copiarlo en tu correo y sumarle tu toque personal.

Si te parece, podemos probar juntos alguna de estas funciones en situaciones reales de tu semana y ver cuál te resuelve más rápido el trabajo.

Contá conmigo para lo que necesites.

Saludos,
Javier Altmann`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedEmail);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Email de Follow-up
              <Badge variant="secondary" className="bg-gradient-brand text-white">
                Samu
              </Badge>
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
          {/* Left Column - Configuration */}
          <div className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="template" className="text-xs">Template</Label>
              <Select value={template} onValueChange={setTemplate}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue placeholder="Seleccionar template" />
                </SelectTrigger>
                <SelectContent className="z-50">
                  <SelectGroup>
                    <SelectLabel className="text-xs font-medium text-muted-foreground px-2 py-1">Usuario</SelectLabel>
                    <SelectItem value="user-personal">Mi Template Personal</SelectItem>
                    <SelectItem value="user-sales">Mi Template de Ventas</SelectItem>
                  </SelectGroup>
                  
                  <SelectGroup>
                    <SelectLabel className="text-xs font-medium text-muted-foreground px-2 py-1">Equipo</SelectLabel>
                    <SelectItem value="team-sales">Template Equipo Ventas</SelectItem>
                    <SelectItem value="team-support">Template Equipo Soporte</SelectItem>
                    <SelectItem value="team-onboarding">Template Onboarding</SelectItem>
                  </SelectGroup>
                  
                  <SelectGroup>
                    <SelectLabel className="text-xs font-medium text-muted-foreground px-2 py-1">Cuenta</SelectLabel>
                    <SelectItem value="account-enterprise">Template Enterprise</SelectItem>
                    <SelectItem value="account-startup">Template Startup</SelectItem>
                  </SelectGroup>
                  
                  <SelectGroup>
                    <SelectLabel className="text-xs font-medium text-muted-foreground px-2 py-1">Default</SelectLabel>
                    <SelectItem value="default-discovery">Discovery Template</SelectItem>
                    <SelectItem value="default-followup">Follow-up Template</SelectItem>
                    <SelectItem value="default-closing">Closing Template</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="language" className="text-xs">Idioma de salida</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="z-50">
                  <SelectItem value="es">🇪🇸 Español</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="tone" className="text-xs">Elegir un tono</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="z-50">
                  <SelectItem value="profesional">💼 Profesional</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="length" className="text-xs">Longitud del email</Label>
              <Select value={emailLength} onValueChange={setEmailLength}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="z-50">
                  <SelectItem value="corto">📝 Corto</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="prompt" className="text-xs">Prompt</Label>
              <Textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe qué debería incluir el email..."
                className="min-h-[80px] resize-none text-xs"
              />
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg border bg-muted/20">
              <div className="space-y-0.5">
                <p className="text-xs font-medium">Insertar enlace de la llamada</p>
                <p className="text-xs text-muted-foreground">Incluye automáticamente un enlace</p>
              </div>
              <Switch
                checked={insertCallLink}
                onCheckedChange={setInsertCallLink}
              />
            </div>

          </div>

        {/* Right Column - Generated Email Preview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{meetingTitle}</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  <Copy className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      <Send className="h-4 w-4 mr-2" />
                      Enviar
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="z-50">
                    <DropdownMenuItem>
                      <span className="mr-2">📧</span>
                      Enviar por Gmail
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span className="mr-2">📩</span>
                      Enviar por Outlook
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted/20 p-3 border-b">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Para:</span>
                    <Input 
                      value={participantEmail || "cliente@empresa.com"} 
                      className="text-sm border-0 bg-transparent p-0 h-auto focus-visible:ring-0" 
                    />
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Asunto:</span>
                    <span className="text-muted-foreground">Seguimiento de nuestra reunión - {meetingTitle}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 max-h-96 overflow-y-auto">
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {mockEmail}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}