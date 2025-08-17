import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Plus, MoreHorizontal, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Link, useNavigate } from 'react-router-dom';

const Templates = () => {
  const navigate = useNavigate();

  const templates = [
    {
      id: 1,
      title: "Email Follow-up",
      author: "Jean Camphuis",
      status: "Published",
      lastEdited: "Aug 14",
      avatar: "JC"
    },
    {
      id: 2,
      title: "Follow up AM",
      author: "Olivier Pruleau",
      status: "Published",
      lastEdited: "Aug 21",
      avatar: "OP"
    },
    {
      id: 3,
      title: "Follow up meeting Olivier",
      author: "Olivier Pruleau",
      status: "Published",
      lastEdited: "Aug 21",
      avatar: "OP"
    },
    {
      id: 4,
      title: "Follow up Partners",
      author: "Paul Berloty",
      status: "Published",
      lastEdited: "Aug 7",
      avatar: "PB"
    },
    {
      id: 5,
      title: "Interview followup Anne",
      author: "Anne Mikielski",
      status: "Published",
      lastEdited: "Aug 12",
      avatar: "AM"
    },
    {
      id: 6,
      title: "Mail post onboarding team",
      author: "Olivier Pruleau",
      status: "Published",
      lastEdited: "Aug 21",
      avatar: "OP"
    }
  ];

  return (
    <main className="p-6">
      <Helmet>
        <title>Templates - Email Follow-up</title>
        <meta name="description" content="Gestiona y crea templates de Email Follow-up para automatizar tus comunicaciones." />
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Email Follow-up</h1>
          </div>
          <Button 
            onClick={() => navigate('/templates/create')}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nuevo template
          </Button>
        </div>

        {/* Info Card */}
        <Card className="bg-muted/30">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h3 className="font-medium text-foreground">¿Por qué usar Email Follow-Up?</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Ahorra tiempo automatizando la redacción de emails de seguimiento, permitiéndote enfocarte en tareas de alto valor. 
                  Crea un template y genera emails personalizados con un solo clic, gracias a la IA.
                </p>
                <Link to="#" className="text-primary text-sm font-medium hover:underline inline-flex items-center">
                  Saber más →
                </Link>
              </div>
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <Select defaultValue="all-authors">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-authors">Todos los autores</SelectItem>
              <SelectItem value="jean">Jean Camphuis</SelectItem>
              <SelectItem value="olivier">Olivier Pruleau</SelectItem>
              <SelectItem value="paul">Paul Berloty</SelectItem>
              <SelectItem value="anne">Anne Mikielski</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all-states">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-states">Todos los estados</SelectItem>
              <SelectItem value="published">Publicado</SelectItem>
              <SelectItem value="draft">Borrador</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Templates Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr className="text-left">
                    <th className="px-6 py-4 text-sm font-medium text-muted-foreground">
                      TÍTULO
                      <ChevronDown className="inline h-3 w-3 ml-1" />
                    </th>
                    <th className="px-6 py-4 text-sm font-medium text-muted-foreground">
                      AUTOR
                      <ChevronDown className="inline h-3 w-3 ml-1" />
                    </th>
                    <th className="px-6 py-4 text-sm font-medium text-muted-foreground">
                      ESTADO
                      <ChevronDown className="inline h-3 w-3 ml-1" />
                    </th>
                    <th className="px-6 py-4 text-sm font-medium text-muted-foreground">
                      ÚLTIMA EDICIÓN
                      <ChevronDown className="inline h-3 w-3 ml-1" />
                    </th>
                    <th className="px-6 py-4 w-12"></th>
                  </tr>
                </thead>
                <tbody>
                  {templates.map((template) => (
                    <tr key={template.id} className="border-b hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4">
                        <Link 
                          to={`/templates/${template.id}`} 
                          className="text-foreground hover:text-primary font-medium hover:underline"
                        >
                          {template.title}
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs bg-muted">
                              {template.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-muted-foreground">{template.author}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          {template.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {template.lastEdited}
                      </td>
                      <td className="px-6 py-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Editar</DropdownMenuItem>
                            <DropdownMenuItem>Duplicar</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Eliminar</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Templates;