import * as React from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Download, Share2, Building2, Calendar as CalendarIcon, Send, Mail, MoreHorizontal, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import InlineEditableField from "@/components/InlineEditableField";
import ParticipantsPopover from "@/components/ParticipantsPopover";
import TranscriptionTab from "@/components/TranscriptionTab";
import ExtractorTab from "@/components/ExtractorTab";
import FollowUpEmailModal from "@/components/FollowUpEmailModal";
import CRMModal from "@/components/CRMModal";

export default function MeetingDetail() {
  const { id } = useParams<{ id: string }>();

  // Mock de datos para UI (fácil de reemplazar por datos reales)
  const [meeting, setMeeting] = React.useState(() => ({
    id: id ?? "-",
    title: "Yamila y Javier Entrevista Discovery",
    type: "Discovery",
    date: new Date(),
    durationMin: 32,
    seller: "Javier Altmann",
    participants: [
      { 
        id: "p1", 
        name: "Yamila Juri", 
        email: "yamila.juri@visma.com", 
        organization: "Visma", 
        type: "client" as const,
        speakPct: 52 
      },
      { 
        id: "p2", 
        name: "Javier Altmann", 
        email: "javier@samu.ia", 
        organization: "Samu.ia", 
        type: "host" as const,
        speakPct: 48 
      },
    ],
    actions: [
      { id: "a1", label: "Enviar caso de éxito de banca" },
      { id: "a2", label: "Coordinar POC la próxima semana" },
      { id: "a3", label: "Compartir documentación de API" },
    ],
    objections: [
      { 
        id: "o1", 
        text: "Yamila considera que Samu tiene demasiadas funcionalidades avanzadas para sus necesidades actuales.", 
        status: "handled" as const 
      },
      { 
        id: "o2", 
        text: "Preocupación por la integración con sistemas legacy existentes.", 
        status: "improvement" as const 
      },
      { 
        id: "o3", 
        text: "Dudas sobre el ROI a corto plazo de la implementación.", 
        status: "not-handled" as const 
      },
    ],
  }));

  const handleMeetingUpdate = (updatedInfo: any) => {
    setMeeting(prev => ({
      ...prev,
      ...updatedInfo
    }));
  };

  const pageTitle = `${meeting.title} — Detalle de reunión`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: meeting.title,
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    startDate: meeting.date.toISOString(),
    description: `Detalle y análisis de la reunión (${meeting.type}).`,
  };

  const [messages, setMessages] = React.useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: '¿En qué puedo ayudarte con esta reunión?' }
  ]);
  const [input, setInput] = React.useState('');
  const [isCRMModalOpen, setIsCRMModalOpen] = React.useState(false);
  const [isChatExpanded, setIsChatExpanded] = React.useState(false);

  return (
    <main className="px-6 py-6 space-y-6">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={`Resumen, capítulos, transcripción, métricas y acciones de la reunión (${meeting.type}).`} />
        <link rel="canonical" href={`/meetings/${meeting.id}`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Barra superior con acciones */}
      <header className="space-y-2">
        <nav className="text-sm text-muted-foreground">
          <Link to="/" className="hover:underline">Reuniones</Link> <span>/</span> <span>Detalle</span>
        </nav>
        <div className="flex flex-wrap items-start gap-3 justify-between">
          <div className="space-y-1">
            <InlineEditableField 
              value={meeting.title} 
              onSave={(newTitle) => setMeeting(prev => ({ ...prev, title: newTitle }))}
            />
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <CalendarIcon className="h-4 w-4" />
                {meeting.date.toLocaleString("es-ES", { day: "2-digit", month: "short", year: "numeric", hour: '2-digit', minute: '2-digit' })}
              </span>
              <ParticipantsPopover participants={meeting.participants} onParticipantUpdate={handleMeetingUpdate} />
              <Separator orientation="vertical" className="h-4" />
              <InlineEditableField 
                value={meeting.type} 
                onSave={(newType) => setMeeting(prev => ({ ...prev, type: newType }))}
                isCallType={true}
              />
              <Separator orientation="vertical" className="h-4" />
              <span>Duración: {meeting.durationMin} min</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FollowUpEmailModal 
              meetingTitle={meeting.title}
              participantEmail={meeting.participants.find(p => p.type === 'client')?.email}
            >
              <Button variant="outline"><Mail className="h-4 w-4 mr-2" /> Email de Follow-up</Button>
            </FollowUpEmailModal>
            <Button variant="secondary" onClick={() => setIsCRMModalOpen(true)}>
              <Building2 className="h-4 w-4 mr-2" /> Enviar a CRM
            </Button>
            <Button variant="outline"><Share2 className="h-4 w-4 mr-2" /> Compartir</Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Más opciones">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Download className="h-4 w-4 mr-2" />
                  Descargar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Layout principal como la referencia: izquierda contenido, derecha video + tabs */}
      <section className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
        {/* Columna izquierda */}
        <article className="space-y-4">
          <Tabs defaultValue="summary" className="w-full">
            <TabsList className="px-1">
              <TabsTrigger value="summary">Resumen</TabsTrigger>
              <TabsTrigger value="extractor">Extractor</TabsTrigger>
              <TabsTrigger value="transcript">Transcripción</TabsTrigger>
            </TabsList>

            <TabsContent value="summary" className="mt-3">
              <Card>
                <CardContent className="p-5 space-y-5">
                  <section className="space-y-2">
                    <h2 className="text-lg font-semibold">Resumen</h2>
                    <p className="text-sm text-muted-foreground">
La reunión entre Javier y Yamila se centró en explorar cómo Yamila utiliza la herramienta Samu en su trabajo diario. Javier, el entrevistador, hizo preguntas abiertas para entender el proceso de trabajo de Yamila, quien trabaja en el equipo comercial de Visma. Yamila explicó que utiliza Samu principalmente como ayuda memoria y para generar minutas detalladas de las reuniones, lo que le ahorra tiempo al no tener que repreguntar a los clientes. También mencionó que utiliza Google Calendar para agendar sus reuniones y que, aunque no usa mucho el CRM, encuentra útil la funcionalidad de Samu para gestionar compromisos y tareas. Javier le mostró algunas funcionalidades de Samu que podrían serle útiles, como el email de seguimiento automatizado. Yamila expresó interés en explorar más estas herramientas. La conversación fue exploratoria, con un enfoque en entender las necesidades y el flujo de trabajo de Yamila, sin ser una llamada de ventas directa.
                    </p>
                  </section>

                  <section className="space-y-3">
                    <h2 className="text-lg font-semibold">Tareas</h2>
                    <ul className="space-y-2">
                      {meeting.actions.map((a) => (
                        <li key={a.id} className="flex items-center gap-2 text-sm">
                          <Checkbox id={a.id} />
                          <label htmlFor={a.id} className="cursor-pointer">{a.label}</label>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="space-y-3">
                    <h2 className="text-lg font-semibold">Objeciones</h2>
                    <ul className="space-y-3">
                      {meeting.objections.map((objection) => {
                        const StatusIcon = objection.status === 'handled' ? CheckCircle : 
                                         objection.status === 'not-handled' ? XCircle : 
                                         AlertCircle;
                        const statusColor = objection.status === 'handled' ? 'text-green-600' : 
                                          objection.status === 'not-handled' ? 'text-red-600' : 
                                          'text-orange-600';
                        const statusText = objection.status === 'handled' ? 'Manejada correctamente' :
                                         objection.status === 'not-handled' ? 'No manejada correctamente' :
                                         'Oportunidad de mejora';
                        
                        return (
                          <li key={objection.id} className="flex gap-3 p-3 rounded-lg border bg-muted/20">
                            <StatusIcon className={`h-5 w-5 mt-0.5 shrink-0 ${statusColor}`} />
                            <div className="space-y-1 flex-1">
                              <p className="text-sm leading-relaxed">{objection.text}</p>
                              <p className={`text-xs font-medium ${statusColor}`}>{statusText}</p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="extractor" className="mt-3">
              <Card>
                <CardContent className="p-5">
                  <ExtractorTab />
                </CardContent>
              </Card>
            </TabsContent>


            <TabsContent value="transcript" className="mt-3">
              <Card>
                <CardContent className="p-5">
                  <TranscriptionTab />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </article>

        {/* Columna derecha */}
        <aside className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <AspectRatio ratio={16/9}>
                <div className="w-full h-full bg-muted/40 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Video de la reunión</p>
                    <Button variant="outline" className="mt-2">Reproducir</Button>
                  </div>
                </div>
              </AspectRatio>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              <Tabs defaultValue="timeline" className="w-full">
                <TabsList className="px-3">
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  <TabsTrigger value="metrics">Métricas</TabsTrigger>
                  <TabsTrigger value="score">Scorecard</TabsTrigger>
                </TabsList>

                {/* Timeline */}
                <TabsContent value="timeline" className="p-4 space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold mb-3">Timeline de Participación</h3>
                    <div className="space-y-3">
                      {meeting.participants.map((p, index) => (
                        <div key={p.id} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-blue-500' : 'bg-green-500'}`} />
                              <span className="font-medium">{p.name}</span>
                            </div>
                            <span className="text-muted-foreground font-medium">{p.speakPct}%</span>
                          </div>
                          <div className="flex gap-1">
                            {/* Simulate timeline segments */}
                            <div className={`h-2 rounded-sm ${index === 0 ? 'bg-blue-500' : 'bg-green-500'}`} style={{ width: '25%' }} />
                            <div className="h-2 w-1 bg-muted/30 rounded-sm" />
                            <div className={`h-2 rounded-sm ${index === 0 ? 'bg-blue-500' : 'bg-green-500'}`} style={{ width: '15%' }} />
                            <div className="h-2 w-1 bg-muted/30 rounded-sm" />
                            <div className={`h-2 rounded-sm ${index === 0 ? 'bg-blue-500' : 'bg-green-500'}`} style={{ width: '20%' }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Métricas */}
                <TabsContent value="metrics" className="p-4 space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold mb-1">Meeting Metrics</h3>
                    <p className="text-xs text-muted-foreground mb-4">Key performance indicators for this meeting</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <div className="w-3 h-3 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          </div>
                          Total Duration
                        </div>
                        <div className="text-lg font-bold">{meeting.durationMin} min</div>
                        <div className="text-xs text-green-600">+5 min vs avg</div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <div className="w-3 h-3 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          </div>
                          Participants
                        </div>
                        <div className="text-lg font-bold">{meeting.participants.length}</div>
                        <div className="text-xs text-muted-foreground">Optimal size</div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <div className="w-3 h-3 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          </div>
                          Questions Asked
                        </div>
                        <div className="text-lg font-bold">12</div>
                        <div className="text-xs text-green-600">+3 vs avg</div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <div className="w-3 h-3 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          </div>
                          Engagement Score
                        </div>
                        <div className="text-lg font-bold">85%</div>
                        <div className="text-xs text-green-600">+12% vs avg</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold mb-3">Speaking Time Distribution</h4>
                      <div className="space-y-3">
                        {meeting.participants.map((p, index) => (
                          <div key={p.id} className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span className="font-medium">{p.name}</span>
                              <span className="text-muted-foreground">{p.speakPct}% • {Math.round(meeting.durationMin * p.speakPct / 100)} min</span>
                            </div>
                            <div className="h-2 rounded bg-muted/30 overflow-hidden">
                              <div 
                                className={`h-full rounded ${index === 0 ? 'bg-blue-500' : 'bg-green-500'}`} 
                                style={{ width: `${p.speakPct}%` }} 
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Scorecard */}
                <TabsContent value="score" className="p-4 space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold mb-1">Meeting Metrics</h3>
                    <p className="text-xs text-muted-foreground mb-4">Key performance indicators for this meeting</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <div className="w-3 h-3 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          </div>
                          Total Duration
                        </div>
                        <div className="text-lg font-bold">{meeting.durationMin} min</div>
                        <div className="text-xs text-green-600">+5 min vs avg</div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <div className="w-3 h-3 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          </div>
                          Participants
                        </div>
                        <div className="text-lg font-bold">{meeting.participants.length}</div>
                        <div className="text-xs text-muted-foreground">Optimal size</div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <div className="w-3 h-3 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          </div>
                          Questions Asked
                        </div>
                        <div className="text-lg font-bold">12</div>
                        <div className="text-xs text-green-600">+3 vs avg</div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <div className="w-3 h-3 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          </div>
                          Engagement Score
                        </div>
                        <div className="text-lg font-bold">85%</div>
                        <div className="text-xs text-green-600">+12% vs avg</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold mb-3">Speaking Time Distribution</h4>
                      <div className="space-y-3">
                        {meeting.participants.map((p, index) => (
                          <div key={p.id} className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span className="font-medium">{p.name}</span>
                              <span className="text-muted-foreground">{p.speakPct}% • {Math.round(meeting.durationMin * p.speakPct / 100)} min</span>
                            </div>
                            <div className="h-2 rounded bg-muted/30 overflow-hidden">
                              <div 
                                className={`h-full rounded ${index === 0 ? 'bg-blue-500' : 'bg-green-500'}`} 
                                style={{ width: `${p.speakPct}%` }} 
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Chat IA */}
          {/* Chat AI */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className={`flex flex-col transition-all duration-300 ease-out ${isChatExpanded ? 'h-80' : 'h-20'}`}>
                {isChatExpanded && (
                  <ScrollArea className="flex-1 p-4 animate-fade-in">
                    <div className="space-y-3">
                      {messages.map((m, i) => (
                        <div
                          key={i}
                          className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${m.role === 'user' ? 'ml-auto bg-primary text-primary-foreground' : 'mr-auto bg-muted'}`}
                        >
                          {m.content}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!input.trim()) return;
                    if (!isChatExpanded) {
                      setIsChatExpanded(true);
                    }
                    setMessages((prev) => [
                      ...prev,
                      { role: 'user', content: input },
                      { role: 'assistant', content: 'Pronto podré responder usando la transcripción y el extractor.' },
                    ]);
                    setInput('');
                  }}
                  className={`border-t p-3 flex items-center gap-2 ${!isChatExpanded ? 'border-t-0' : ''}`}
                >
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onFocus={() => setIsChatExpanded(true)}
                    placeholder="Pregúntale a la IA sobre la reunión"
                    className="h-10"
                  />
                  <Button type="submit" size="icon" aria-label="Enviar" disabled={!input.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </aside>
      </section>
      
      <CRMModal 
        open={isCRMModalOpen} 
        onOpenChange={setIsCRMModalOpen} 
      />
    </main>
  );
}
