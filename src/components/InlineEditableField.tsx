import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Edit3, Check, X, ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface InlineEditableFieldProps {
  value: string;
  onSave: (value: string) => void;
  isCallType?: boolean;
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

export default function InlineEditableField({ value, onSave, isCallType = false }: InlineEditableFieldProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editValue, setEditValue] = React.useState(value);

  React.useEffect(() => {
    setEditValue(value);
  }, [value]);

  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isCallType && !isEditing) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" className="h-auto p-1 px-2 font-normal">
            {value}
            <ChevronDown className="ml-1 h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {callTypes.map(type => (
            <DropdownMenuItem key={type} onClick={() => onSave(type)}>
              {type}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <Input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="h-8 text-lg font-bold"
          autoFocus
        />
        <Button size="sm" variant="outline" onClick={handleSave}>
          <Check className="h-3 w-3" />
        </Button>
        <Button size="sm" variant="outline" onClick={handleCancel}>
          <X className="h-3 w-3" />
        </Button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsEditing(true)}
      className="flex items-center gap-2 hover:bg-muted/50 rounded px-2 py-1 -mx-2 -my-1 transition-colors group"
    >
      <span className={isCallType ? "text-base" : "text-2xl font-bold"}>{value}</span>
      <Edit3 className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}