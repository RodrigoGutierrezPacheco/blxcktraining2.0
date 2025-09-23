import { Card, CardContent } from "./Card";
import { Button } from "./Button";
import { Clock, AlertTriangle, CheckCircle, Calendar } from "lucide-react";

export default function RoutineExpirationSection({ 
  usersData, 
  formatUserDate, 
  handleViewUser, 
  handleViewRoutine, 
  handleAssignRoutine, 
  loadingRoutine 
}) {
  // Función para determinar el color y estado según los días restantes
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

  // Filtrar usuarios que tienen rutina
  const usersWithRoutine = usersData.filter(user => user.hasRoutine && user.routineInfo);

  // Ordenar usuarios por días restantes (menor a mayor para mostrar los más urgentes primero)
  const sortedUsers = usersWithRoutine.sort((a, b) => 
    a.routineInfo.daysRemaining - b.routineInfo.daysRemaining
  );

  if (sortedUsers.length === 0) {
    return null; // No mostrar la sección si no hay usuarios con rutina
  }

  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-gray-600" />
            Estado de Rutinas
          </h2>
          <div className="text-sm font-medium text-gray-600">
            {sortedUsers.length} usuario{sortedUsers.length !== 1 ? "s" : ""} con rutina
          </div>
        </div>

        <div className="space-y-4">
          {sortedUsers.map((user) => {
            const status = getRoutineStatus(user.routineInfo.daysRemaining);
            const StatusIcon = status.icon;

            return (
              <div
                key={user.id}
                className={`p-4 rounded-lg border transition-colors ${status.bgColor} ${status.borderColor}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-full ${status.bgColor}`}>
                        <StatusIcon className={`h-4 w-4 ${status.color}`} />
                      </div>
                      <div>
                        <h3 className="text-base font-medium text-gray-900">
                          {user.fullName}
                        </h3>
                        <p className={`text-xs font-medium ${status.color} uppercase tracking-wide`}>
                          {status.status} - {status.description}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Email</span>
                        <span className="text-sm text-gray-900 mt-1">{user.email}</span>
                      </div>
                      
                      {user.phone && (
                        <div className="flex flex-col">
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Teléfono</span>
                          <span className="text-sm text-gray-900 mt-1">{user.phone}</span>
                        </div>
                      )}

                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Rutina termina</span>
                        <span className="text-sm text-gray-900 mt-1">{formatUserDate(user.routineInfo.routineEndDate)}</span>
                      </div>

                      <div className="flex flex-col">
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

                  <div className="flex flex-col gap-2 ml-4">
                    <Button
                      onClick={() => handleViewUser(user)}
                      className="bg-gray-600 text-white hover:bg-gray-700 text-sm px-3 py-2"
                    >
                      Ver Detalles
                    </Button>
                    
                    <Button
                      onClick={() => handleViewRoutine(user)}
                      disabled={loadingRoutine}
                      className="bg-gray-900 text-white hover:bg-gray-800 text-sm px-3 py-2"
                    >
                      {loadingRoutine ? "Cargando..." : "Ver Rutina"}
                    </Button>

                    {user.routineInfo.daysRemaining < 10 ? (
                      <Button
                        onClick={() => handleAssignRoutine(user)}
                        className="bg-red-600 text-white hover:bg-red-700 text-sm px-3 py-2"
                      >
                        Renovar Rutina
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleAssignRoutine(user)}
                        className="bg-blue-600 text-white hover:bg-blue-700 text-sm px-3 py-2"
                      >
                        Cambiar Rutina
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
