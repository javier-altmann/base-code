import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, User, DollarSign, Phone, ExternalLink, RefreshCw } from "lucide-react";

interface CRMModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CRMModal({ open, onOpenChange }: CRMModalProps) {
  // Mock CRM data
  const crmData = {
    account: {
      name: "Acme Corp",
      industry: "Technology",
      employees: "500-1000",
      revenue: "$50M-100M",
      status: "Active Customer"
    },
    contact: {
      name: "Sarah Johnson",
      title: "VP of Sales",
      email: "sarah.johnson@acmecorp.com",
      phone: "+1 (555) 123-4567",
      linkedinUrl: "linkedin.com/in/sarahjohnson"
    },
    deal: {
      name: "Enterprise Software License",
      amount: "$65,000",
      stage: "Discovery",
      probability: 75,
      closeDate: "2024-12-15",
      owner: "Javier Altmann"
    },
    leads: [
      {
        name: "Marketing Director Position",
        company: "Acme Corp",
        value: "$15,000",
        status: "Qualified"
      },
      {
        name: "Sales Team Training",
        company: "Acme Corp", 
        value: "$8,500",
        status: "New"
      }
    ]
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SF</span>
              </div>
              <div>
                <DialogTitle className="text-lg font-semibold">SALESFORCE CRM</DialogTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                    Conectado
                  </Badge>
                  <Button variant="ghost" size="sm" className="h-6 p-1">
                    <RefreshCw className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Account Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold">Cuenta:</h3>
              <span className="font-medium">{crmData.account.name}</span>
            </div>
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Industria:</span>
                    <p className="font-medium">{crmData.account.industry}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Empleados:</span>
                    <p className="font-medium">{crmData.account.employees}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Ingresos:</span>
                    <p className="font-medium">{crmData.account.revenue}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Estado:</span>
                    <p className="font-medium">{crmData.account.status}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <User className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold">Contacto:</h3>
              <span className="font-medium">{crmData.contact.name}</span>
            </div>
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Cargo:</span>
                    <p className="font-medium">{crmData.contact.title}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Email:</span>
                    <p className="font-medium">{crmData.contact.email}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Teléfono:</span>
                    <p className="font-medium">{crmData.contact.phone}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">LinkedIn:</span>
                    <p className="font-medium text-blue-600 cursor-pointer hover:underline">
                      {crmData.contact.linkedinUrl}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Deal Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold">Oportunidad:</h3>
              <span className="font-medium">{crmData.deal.amount}</span>
            </div>
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Nombre:</span>
                    <p className="font-medium">{crmData.deal.name}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Propietario:</span>
                    <p className="font-medium">{crmData.deal.owner}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Etapa:</span>
                    <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                      {crmData.deal.stage}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Probabilidad:</span>
                    <p className="font-medium">{crmData.deal.probability}%</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Fecha de cierre:</span>
                    <p className="font-medium">{new Date(crmData.deal.closeDate).toLocaleDateString('es-ES')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Leads Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Phone className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold">Leads:</h3>
            </div>
            <div className="space-y-3">
              {crmData.leads.map((lead, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-medium">{lead.name}</p>
                        <p className="text-sm text-muted-foreground">{lead.company}</p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="font-semibold">{lead.value}</p>
                        <Badge 
                          variant="outline" 
                          className={
                            lead.status === 'Qualified' 
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-blue-50 text-blue-700 border-blue-200"
                          }
                        >
                          {lead.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-center pt-4 border-t">
            <Button variant="outline" className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              Ver en Salesforce
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}