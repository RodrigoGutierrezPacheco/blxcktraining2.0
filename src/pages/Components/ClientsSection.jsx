import { Card, CardContent } from "./Card";
import { Button } from "./Button";
import { Users, Eye, BookOpen, Plus, UserMinus } from "lucide-react";
import { useState } from "react";
import { unassignUserFromTrainer } from "../../services/users";

export default function ClientsSection({ 
  usersData, 
  formatUserDate, 
  handleViewUser, 
  handleViewRoutine, 
  handleAssignRoutine, 
  loadingRoutine,
  onUserUnassigned // Callback para actualizar la lista después de desasignar
}) {
  const [unassigningUserId, setUnassigningUserId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [userToUnassign, setUserToUnassign] = useState(null);

  const handleUnassignClick = (user) => {
    setUserToUnassign(user);
    setShowConfirmModal(true);
  };

  const handleConfirmUnassign = async () => {
    if (!userToUnassign) return;

    try {
      setUnassigningUserId(userToUnassign.id);
      
      await unassignUserFromTrainer(userToUnassign.id);
      
      alert(`Usuario ${userToUnassign.fullName} desasignado exitosamente.`);
      
      // Llamar al callback para actualizar la lista
      if (onUserUnassigned) {
        onUserUnassigned(userToUnassign.id);
      }
      
    } catch (error) {
      console.error("Error al desasignar usuario:", error);
      alert(`Error al desasignar usuario: ${error.message}`);
    } finally {
      setUnassigningUserId(null);
      setShowConfirmModal(false);
      setUserToUnassign(null);
    }
  };

  const handleCancelUnassign = () => {
    setShowConfirmModal(false);
    setUserToUnassign(null);
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
                    {console.log(user)}
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
                    <Button
                      onClick={() => handleUnassignClick(user)}
                      disabled={unassigningUserId === user.id}
                      className="bg-red-600 text-white hover:bg-red-700 disabled:bg-red-400 text-sm px-3 py-2"
                    >
                      <UserMinus className="mr-1 h-4 w-4" />
                      {unassigningUserId === user.id ? "Desasignando..." : "Desasignar"}
                    </Button>
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
      
      {/* Modal de confirmación */}
      {showConfirmModal && userToUnassign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Confirmar desasignación
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              ¿Estás seguro de que quieres desasignar a <strong>{userToUnassign.fullName}</strong>? 
              Esta acción no se puede deshacer y el usuario perderá acceso a su rutina actual.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleCancelUnassign}
                disabled={unassigningUserId === userToUnassign.id}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmUnassign}
                disabled={unassigningUserId === userToUnassign.id}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg disabled:opacity-50"
              >
                {unassigningUserId === userToUnassign.id ? "Desasignando..." : "Desasignar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
