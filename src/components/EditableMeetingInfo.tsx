import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit3, Check, X, Plus, Trash2, Building, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface Participant {
  id: string;
  name: string;
  email: string;
  organization: string;
  type: 'host' | 'client';
}

interface MeetingInfo {
  title: string;
  type: string;
  seller: string;
  participants: Participant[];
}

interface EditableMeetingInfoProps {
  meeting: MeetingInfo;
  onUpdate: (meeting: MeetingInfo) => void;
}

const callTypes = [
  "Discovery",
  "Demo", 
  "Seguimiento",
  "Negociación",
  "Cierre",
  "Onboarding",
  "Check-in"
];

export default function EditableMeetingInfo({ meeting, onUpdate }: EditableMeetingInfoProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editData, setEditData] = React.useState(meeting);

  const handleSave = () => {
    onUpdate(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(meeting);
    setIsEditing(false);
  };

  const addParticipant = (type: 'host' | 'client') => {
    const newParticipant: Participant = {
      id: `${type}-${Date.now()}`,
      name: '',
      email: '',
      organization: type === 'host' ? editData.seller : '',
      type
    };
    setEditData({
      ...editData,
      participants: [...editData.participants, newParticipant]
    });
  };

  const updateParticipant = (id: string, updates: Partial<Participant>) => {
    setEditData({
      ...editData,
      participants: editData.participants.map(p => 
        p.id === id ? { ...p, ...updates } : p
      )
    });
  };

  const removeParticipant = (id: string) => {
    setEditData({
      ...editData,
      participants: editData.participants.filter(p => p.id !== id)
    });
  };

  const hostParticipants = editData.participants.filter(p => p.type === 'host');
  const clientParticipants = editData.participants.filter(p => p.type === 'client');

  if (!isEditing) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg">Información de la reunión</CardTitle>
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
            <Edit3 className="h-4 w-4 mr-2" />
            Editar
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Tipo de llamada</Label>
              <div className="mt-1">
                <Badge variant="secondary">{meeting.type}</Badge>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Vendedor</Label>
              <p className="mt-1 text-sm">{meeting.seller}</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <div>
              <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Building className="h-4 w-4" />
                Participantes (Organización)
              </Label>
              <div className="mt-2 space-y-2">
                {hostParticipants.map(participant => (
                  <div key={participant.id} className="flex items-center gap-2 text-sm">
                    <span className="font-medium">{participant.name}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{participant.email}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{participant.organization}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <User className="h-4 w-4" />
                Participantes (Cliente)
              </Label>
              <div className="mt-2 space-y-2">
                {clientParticipants.map(participant => (
                  <div key={participant.id} className="flex items-center gap-2 text-sm">
                    <span className="font-medium">{participant.name}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{participant.email}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{participant.organization}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg">Editar información de la reunión</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleCancel}>
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
          <Button size="sm" onClick={handleSave}>
            <Check className="h-4 w-4 mr-2" />
            Guardar
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Nombre de la reunión</Label>
          <Input
            id="title"
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="type">Tipo de llamada</Label>
            <Select value={editData.type} onValueChange={(value) => setEditData({ ...editData, type: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {callTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="seller">Vendedor</Label>
            <Input
              id="seller"
              value={editData.seller}
              onChange={(e) => setEditData({ ...editData, seller: e.target.value })}
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Building className="h-4 w-4" />
                Participantes (Organización)
              </Label>
              <Button variant="outline" size="sm" onClick={() => addParticipant('host')}>
                <Plus className="h-4 w-4 mr-2" />
                Agregar
              </Button>
            </div>
            <div className="space-y-3">
              {hostParticipants.map(participant => (
                <div key={participant.id} className="grid grid-cols-12 gap-2 items-center">
                  <Input
                    className="col-span-3"
                    placeholder="Nombre"
                    value={participant.name}
                    onChange={(e) => updateParticipant(participant.id, { name: e.target.value })}
                  />
                  <Input
                    className="col-span-4"
                    placeholder="Email"
                    value={participant.email}
                    onChange={(e) => updateParticipant(participant.id, { email: e.target.value })}
                  />
                  <Input
                    className="col-span-4"
                    placeholder="Organización"
                    value={participant.organization}
                    onChange={(e) => updateParticipant(participant.id, { organization: e.target.value })}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="col-span-1"
                    onClick={() => removeParticipant(participant.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-sm font-medium flex items-center gap-2">
                <User className="h-4 w-4" />
                Participantes (Cliente)
              </Label>
              <Button variant="outline" size="sm" onClick={() => addParticipant('client')}>
                <Plus className="h-4 w-4 mr-2" />
                Agregar
              </Button>
            </div>
            <div className="space-y-3">
              {clientParticipants.map(participant => (
                <div key={participant.id} className="grid grid-cols-12 gap-2 items-center">
                  <Input
                    className="col-span-3"
                    placeholder="Nombre"
                    value={participant.name}
                    onChange={(e) => updateParticipant(participant.id, { name: e.target.value })}
                  />
                  <Input
                    className="col-span-4"
                    placeholder="Email"
                    value={participant.email}
                    onChange={(e) => updateParticipant(participant.id, { email: e.target.value })}
                  />
                  <Input
                    className="col-span-4"
                    placeholder="Organización del cliente"
                    value={participant.organization}
                    onChange={(e) => updateParticipant(participant.id, { organization: e.target.value })}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="col-span-1"
                    onClick={() => removeParticipant(participant.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}