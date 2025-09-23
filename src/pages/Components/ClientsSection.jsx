import { Card, CardContent } from "./Card";
import { Button } from "./Button";
import { Users, Eye, BookOpen, Plus } from "lucide-react";

export default function ClientsSection({ 
  usersData, 
  formatUserDate, 
  handleViewUser, 
  handleViewRoutine, 
  handleAssignRoutine, 
  loadingRoutine
}) {
  // Función para determinar el color según los días restantes
  const getDaysRemainingColor = (daysRemaining) => {
    if (daysRemaining < 10) {
      return "text-red-600"; // Menos de 10 días - rojo
    } else if (daysRemaining <= 20) {
      return "text-yellow-600"; // 10-20 días - amarillo
    } else {
      return "text-green-600"; // Más de 20 días - verde
    }
  };

  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
            <Users className="h-5 w-5 text-gray-600" />
            Mis Clientes
          </h2>
          <div className="text-sm font-medium text-gray-600">
            Total: {usersData.length} usuario
            {usersData.length !== 1 ? "s" : ""}
          </div>
        </div>

        {usersData.length > 0 ? (
          <div className="space-y-4">
            {usersData.map((user) => (
              <div
                key={user.id}
                className="bg-white p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-base font-medium text-gray-900 mb-3">
                      {user.fullName}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Email</span>
                        <span className="text-sm text-gray-900 mt-1">{user.email}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Número telefónico</span>
                        <span className="text-sm text-gray-900 mt-1">{user.phone ?? "Sin información"}</span>
                      </div>
                      {user.age && (
                        <div className="flex flex-col">
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Edad</span>
                          <span className="text-sm text-gray-900 mt-1">{user.age} años</span>
                        </div>
                      )}
                      {user.weight && (
                        <div className="flex flex-col">
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Peso</span>
                          <span className="text-sm text-gray-900 mt-1">{user.weight} kg</span>
                        </div>
                      )}
                      {user.height && (
                        <div className="flex flex-col">
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Altura</span>
                          <span className="text-sm text-gray-900 mt-1">{user.height} cm</span>
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Registrado</span>
                        <span className="text-sm text-gray-900 mt-1">{formatUserDate(user.createdAt)}</span>
                      </div>
                      
                      {user.hasRoutine && user.routineInfo && (
                        <>
                          <div className="flex flex-col">
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Rutina termina</span>
                            <span className="text-sm text-gray-900 mt-1">{formatUserDate(user.routineInfo.routineEndDate)}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Días restantes</span>
                            <span className={`text-sm font-medium mt-1 ${getDaysRemainingColor(user.routineInfo.daysRemaining)}`}>
                              {user.routineInfo.daysRemaining} días
                            </span>
                          </div>
                        </>
                      )}
                    </div>

                    {(user.chronicDiseases || user.healthIssues) && (
                      <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                        {user.healthIssues && (
                          <div>
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Problemas de salud/Enfermedades crónicas/Limitaciones</span>
                            <p className="text-sm text-gray-900 mt-1">{user.healthIssues}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    <Button
                      onClick={() => handleViewUser(user)}
                      className="bg-gray-600 text-white hover:bg-gray-700 text-sm px-3 py-2"
                    >
                      <Eye className="mr-1 h-4 w-4" />
                      Ver Detalles
                    </Button>
                    {user.hasRoutine ? (
                      <Button
                        onClick={() => handleViewRoutine(user)}
                        disabled={loadingRoutine}
                        className="bg-gray-900 text-white hover:bg-gray-800 text-sm px-3 py-2"
                      >
                        <BookOpen className="mr-1 h-4 w-4" />
                        {loadingRoutine ? "Cargando..." : "Ver Rutina"}
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleAssignRoutine(user)}
                        className="bg-gray-700 text-white hover:bg-gray-600 text-sm px-3 py-2"
                      >
                        <Plus className="mr-1 h-4 w-4" />
                        Asignar Rutina
                      </Button>
                    )}
                    {/* <Button
                      onClick={() => handleUnassignClick(user)}
                      disabled={unassigningUserId === user.id}
                      className="bg-red-600 text-white hover:bg-red-700 disabled:bg-red-400 text-sm px-3 py-2"
                    >
                      <UserMinus className="mr-1 h-4 w-4" />
                      {unassigningUserId === user.id ? "Desasignando..." : "Desasignar"}
                    </Button> */}
                  </div>
                </div>
              </div>
            ))}
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
    </Card>
  );
}
