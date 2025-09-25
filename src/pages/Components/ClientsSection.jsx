import { Card, CardContent } from "./Card";
import { Button } from "./Button";
import { Users, Eye, BookOpen, Plus, Clock, AlertTriangle, CheckCircle, Calendar, Edit3, MessageCircle } from "lucide-react";
import ContactUserModal from "./Modals/ContactUserModal";
import { useState } from "react";

export default function ClientsSection({ 
  usersData, 
  formatUserDate, 
  handleViewUser, 
  handleViewRoutine, 
  handleAssignRoutine, 
  loadingRoutine,
  handleChangeDuration
}) {
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedUserForContact, setSelectedUserForContact] = useState(null);

  const handleContactUser = (user) => {
    setSelectedUserForContact(user);
    setShowContactModal(true);
  };

  const closeContactModal = () => {
    setShowContactModal(false);
    setSelectedUserForContact(null);
  };

  // Función para determinar el estado de la rutina
  const getRoutineStatus = (daysRemaining) => {
    if (daysRemaining < 10) {
      return {
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        icon: AlertTriangle,
        status: "Crítico",
        description: "Rutina expira pronto"
      };
    } else if (daysRemaining <= 20) {
      return {
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200",
        icon: Clock,
        status: "Atención",
        description: "Rutina expira en breve"
      };
    } else {
      return {
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        icon: CheckCircle,
        status: "Estable",
        description: "Rutina vigente"
      };
    }
  };

  // Separar usuarios con y sin rutina
  const usersWithRoutine = usersData.filter(user => user.hasRoutine && user.routineInfo);
  const usersWithoutRoutine = usersData.filter(user => !user.hasRoutine);
  
  // Ordenar usuarios con rutina por días restantes (más urgentes primero)
  const sortedUsersWithRoutine = usersWithRoutine.sort((a, b) => 
    a.routineInfo.daysRemaining - b.routineInfo.daysRemaining
  );

  return (
    <Card className="border ml-auto mr-auto border-gray-200 w-[345px] sm:w-[360px] md:w-full h-fit">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3">
          <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
            <Users className="h-5 w-5 text-gray-600" />
            Mis Clientes
          </h2>
          <div className="text-sm font-medium text-gray-600">
            Total: {usersData.length} usuario{usersData.length !== 1 ? "s" : ""}
            {usersWithRoutine.length > 0 && (
              <span className="ml-2 text-xs">
                ({usersWithRoutine.length} con rutina)
              </span>
            )}
          </div>
        </div>

        {usersData.length > 0 ? (
          <div className="space-y-6">
            {/* Usuarios con rutina - Prioridad por urgencia */}
            {sortedUsersWithRoutine.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="h-4 w-4 text-gray-600" />
                  <h3 className="text-base font-medium text-gray-900">
                    Clientes con Rutina ({sortedUsersWithRoutine.length})
                  </h3>
                </div>
                <div className="space-y-4">
                  {sortedUsersWithRoutine.map((user) => {
                    const status = getRoutineStatus(user.routineInfo.daysRemaining);
                    const StatusIcon = status.icon;

                    return (
                      <div
                        key={user.id}
                        className={`p-4 rounded-lg border transition-colors ${status.bgColor} ${status.borderColor}`}
                      >
                        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <div className={`p-2 rounded-full ${status.bgColor}`}>
                                <StatusIcon className={`h-4 w-4 ${status.color}`} />
                              </div>
                              <div>
                                <h4 className="text-base font-medium text-gray-900">
                                  {user.fullName}
                                </h4>
                                <p className={`text-xs font-medium ${status.color} uppercase tracking-wide`}>
                                  {status.status} - {status.description}
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 text-sm">
                              <div className="flex flex-col min-w-0">
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Email</span>
                                <span className="text-sm text-gray-900 mt-1 truncate" title={user.email}>{user.email}</span>
                              </div>
                              
                              {user.phone && (
                                <div className="flex flex-col min-w-0">
                                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Teléfono</span>
                                  <span className="text-sm text-gray-900 mt-1">{user.phone}</span>
                                </div>
                              )}

                              <div className="flex flex-col min-w-0">
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Rutina termina</span>
                                <span className="text-sm text-gray-900 mt-1">{formatUserDate(user.routineInfo.routineEndDate)}</span>
                              </div>

                              <div className="flex flex-col min-w-0">
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Días restantes</span>
                                <span className={`text-sm font-bold mt-1 ${status.color}`}>
                                  {user.routineInfo.daysRemaining} día{user.routineInfo.daysRemaining !== 1 ? "s" : ""}
                                </span>
                              </div>
                            </div>

                            {user.healthIssues && (
                              <div className="mt-3 p-2 bg-white/50 border border-gray-200 rounded-lg">
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Problemas de salud</span>
                                <p className="text-xs text-gray-700 mt-1">{user.healthIssues}</p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons - High Contrast */}
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                            {/* Ver Detalles */}
                            <Button
                              onClick={() => handleViewUser(user)}
                              className="bg-gray-600 text-white hover:bg-gray-700 text-xs px-2 py-2 flex items-center justify-center gap-1 transition-colors"
                            >
                              <Eye className="h-3 w-3" />
                              <span className="hidden sm:inline">Ver Detalles</span>
                              <span className="sm:hidden">Ver</span>
                            </Button>
                            
                            {/* Ver Rutina */}
                            <Button
                              onClick={() => handleViewRoutine(user)}
                              disabled={loadingRoutine}
                              className="bg-slate-600 text-white hover:bg-slate-700 text-xs px-2 py-2 flex items-center justify-center gap-1 transition-colors disabled:opacity-50"
                            >
                              <BookOpen className="h-3 w-3" />
                              <span className="hidden sm:inline">Ver Rutina</span>
                              <span className="sm:hidden">Rutina</span>
                            </Button>

                            {/* Contactar */}
                            <Button
                              onClick={() => handleContactUser(user)}
                              className="bg-blue-600 text-white hover:bg-blue-700 text-xs px-2 py-2 flex items-center justify-center gap-1 transition-colors"
                            >
                              <MessageCircle className="h-3 w-3" />
                              <span className="hidden sm:inline">Contactar</span>
                              <span className="sm:hidden">Contacto</span>
                            </Button>

                            {/* Cambiar Duración */}
                            <Button
                              onClick={() => handleChangeDuration(user)}
                              className="bg-amber-600 text-white hover:bg-amber-700 text-xs px-2 py-2 flex items-center justify-center gap-1 transition-colors"
                            >
                              <Edit3 className="h-3 w-3" />
                              <span className="hidden sm:inline">Duración</span>
                              <span className="sm:hidden">Duración</span>
                            </Button>

                            {/* Renovar/Cambiar */}
                            {user.routineInfo.daysRemaining < 10 ? (
                              <Button
                                onClick={() => handleAssignRoutine(user)}
                                className="bg-red-600 text-white hover:bg-red-700 text-xs px-2 py-2 flex items-center justify-center gap-1 transition-colors"
                              >
                                <Plus className="h-3 w-3" />
                                <span className="hidden sm:inline">Renovar</span>
                                <span className="sm:hidden">Renovar</span>
                              </Button>
                            ) : (
                              <Button
                                onClick={() => handleAssignRoutine(user)}
                                className="bg-indigo-600 text-white hover:bg-indigo-700 text-xs px-2 py-2 flex items-center justify-center gap-1 transition-colors"
                              >
                                <Plus className="h-3 w-3" />
                                <span className="hidden sm:inline">Cambiar</span>
                                <span className="sm:hidden">Cambiar</span>
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Usuarios sin rutina */}
            {usersWithoutRoutine.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Plus className="h-4 w-4 text-gray-600" />
                  <h3 className="text-base font-medium text-gray-900">
                    Clientes sin Rutina ({usersWithoutRoutine.length})
                  </h3>
                </div>
                <div className="space-y-4">
                  {usersWithoutRoutine.map((user) => (
                    <div
                      key={user.id}
                      className="bg-white p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                        <div className="flex-1">
                          <h4 className="text-base font-medium text-gray-900 mb-3">
                            {user.fullName}
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                            <div className="flex flex-col min-w-0">
                              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Email</span>
                              <span className="text-sm text-gray-900 mt-1 truncate" title={user.email}>{user.email}</span>
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Número telefónico</span>
                              <span className="text-sm text-gray-900 mt-1">{user.phone ?? "Sin información"}</span>
                            </div>
                            {user.age && (
                              <div className="flex flex-col min-w-0">
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Edad</span>
                                <span className="text-sm text-gray-900 mt-1">{user.age} años</span>
                              </div>
                            )}
                            {user.weight && (
                              <div className="flex flex-col min-w-0">
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Peso</span>
                                <span className="text-sm text-gray-900 mt-1">{user.weight} kg</span>
                              </div>
                            )}
                            {user.height && (
                              <div className="flex flex-col min-w-0">
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Altura</span>
                                <span className="text-sm text-gray-900 mt-1">{user.height} cm</span>
                              </div>
                            )}
                            <div className="flex flex-col min-w-0">
                              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Registrado</span>
                              <span className="text-sm text-gray-900 mt-1">{formatUserDate(user.createdAt)}</span>
                            </div>
                          </div>

                          {user.healthIssues && (
                            <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                              <div>
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Problemas de salud/Enfermedades crónicas/Limitaciones</span>
                                <p className="text-sm text-gray-900 mt-1">{user.healthIssues}</p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Action Buttons - High Contrast */}
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {/* Ver Detalles */}
                            <Button
                              onClick={() => handleViewUser(user)}
                              className="bg-gray-600 text-white hover:bg-gray-700 text-xs px-2 py-2 flex items-center justify-center gap-1 transition-colors"
                            >
                              <Eye className="h-3 w-3" />
                              <span className="hidden sm:inline">Ver Detalles</span>
                              <span className="sm:hidden">Ver</span>
                            </Button>

                            {/* Contactar */}
                            <Button
                              onClick={() => handleContactUser(user)}
                              className="bg-blue-600 text-white hover:bg-blue-700 text-xs px-2 py-2 flex items-center justify-center gap-1 transition-colors"
                            >
                              <MessageCircle className="h-3 w-3" />
                              <span className="hidden sm:inline">Contactar</span>
                              <span className="sm:hidden">Contacto</span>
                            </Button>
                            
                            {/* Asignar Rutina */}
                            <Button
                              onClick={() => handleAssignRoutine(user)}
                              className="bg-indigo-600 text-white hover:bg-indigo-700 text-xs px-2 py-2 flex items-center justify-center gap-1 col-span-2 sm:col-span-1 transition-colors"
                            >
                              <Plus className="h-3 w-3" />
                              <span className="hidden sm:inline">Asignar Rutina</span>
                              <span className="sm:hidden">Asignar</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
            <Users className="h-8 w-8 text-gray-400 mx-auto mb-3" />
            <p className="text-sm text-gray-600 mb-1">
              No tienes usuarios asignados aún
            </p>
            <p className="text-xs text-gray-500">
              Los usuarios que se registren con tu código aparecerán aquí
            </p>
          </div>
        )}
      </CardContent>

      {/* Contact User Modal */}
      <ContactUserModal
        isOpen={showContactModal}
        onClose={closeContactModal}
        userName={selectedUserForContact?.fullName || ""}
        userEmail={selectedUserForContact?.email || ""}
        userPhone={selectedUserForContact?.phone || ""}
      />
    </Card>
  );
}
