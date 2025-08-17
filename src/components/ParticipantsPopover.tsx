import { useState } from "react";
import { Users, Plus, Search, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Participant {
  id: string;
  name: string;
  email: string;
  organization: string;
  type: 'host' | 'client';
  speakPct: number;
}

interface ParticipantsPopoverProps {
  participants: Participant[];
  onParticipantUpdate?: (participants: Participant[]) => void;
}

export default function ParticipantsPopover({ participants, onParticipantUpdate }: ParticipantsPopoverProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const hostParticipants = participants.filter(p => p.type === 'host');
  const clientParticipants = participants.filter(p => p.type === 'client');
  const otherParticipants = participants.filter(p => p.type !== 'host' && p.type !== 'client');

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const ParticipantItem = ({ participant }: { participant: Participant }) => (
    <div className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-md">
      <Avatar className="h-8 w-8">
        <AvatarImage src="" />
        <AvatarFallback className="bg-primary/10 text-primary font-medium text-xs">
          {getInitials(participant.name)}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm leading-none">{participant.name}</p>
        <p className="text-xs text-muted-foreground truncate">{participant.email}</p>
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>{participant.speakPct}%</span>
        {participant.type === 'host' && (
          <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
            Organizador
          </span>
        )}
      </div>
    </div>
  );

  const ParticipantSection = ({ title, participants, color = "text-foreground" }: { 
    title: string; 
    participants: Participant[]; 
    color?: string;
  }) => (
    <div className="space-y-2">
      <h4 className={`text-xs font-semibold uppercase tracking-wider ${color}`}>
        {title}
      </h4>
      <div className="space-y-1">
        {participants.map(participant => (
          <ParticipantItem key={participant.id} participant={participant} />
        ))}
      </div>
    </div>
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Users className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-sm mb-3">Participantes de la reunión</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar contactos"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
        </div>
        
        <ScrollArea className="h-64 p-4">
          <div className="space-y-4">
            {hostParticipants.length > 0 && (
              <ParticipantSection 
                title="ORGANIZACIÓN"
                participants={hostParticipants}
                color="text-primary"
              />
            )}
            
            {clientParticipants.length > 0 && (
              <>
                {hostParticipants.length > 0 && <Separator />}
                <ParticipantSection 
                  title="CLIENTES"
                  participants={clientParticipants}
                  color="text-blue-600"
                />
              </>
            )}
            
            {otherParticipants.length > 0 && (
              <>
                {(hostParticipants.length > 0 || clientParticipants.length > 0) && <Separator />}
                <ParticipantSection 
                  title="OTROS"
                  participants={otherParticipants}
                  color="text-muted-foreground"
                />
              </>
            )}
          </div>
        </ScrollArea>
        
        <div className="border-t p-4 space-y-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-start h-9"
          >
            <Plus className="h-4 w-4 mr-2" />
            Agregar Participante
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-start h-9"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Crear nuevo contacto
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}