import { useState, useEffect, useCallback } from "react";
import { getUsersByTrainer, getUsersWithoutTrainer, assignTrainerToUser } from "../../../services/admin";
import { Button } from "../../Components/Button";
import {
  X,
  User,
  Mail,
  Calendar,
  CheckCircle,
  XCircle,
  Users,
  Loader2,
  UserPlus,
  UserMinus,
  Search,
} from "lucide-react";

export default function TrainerUsersModal({ 
  isOpen, 
  onClose, 
  trainer 
}) {
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [filteredAvailableUsers, setFilteredAvailableUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [activeTab, setActiveTab] = useState("assigned"); // "assigned" or "available"
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = useCallback(async () => {
    if (!trainer?.id) return;
    
    try {
      setIsLoading(true);
      setError("");
      setSuccessMessage("");
      
      // Cargar usuarios asignados y disponibles en paralelo
      const [assignedData, availableData] = await Promise.all([
        getUsersByTrainer(trainer.id),
        getUsersWithoutTrainer()
      ]);
      
      setAssignedUsers(assignedData);
      setAvailableUsers(availableData);
      setFilteredAvailableUsers(availableData);
    } catch (err) {
      setError(err.message || "Error al cargar los usuarios");
    } finally {
      setIsLoading(false);
    }
  }, [trainer?.id]);

  useEffect(() => {
    if (isOpen && trainer?.id) {
      fetchUsers();
    }
  }, [isOpen, trainer?.id, fetchUsers]);

  // Filtrar usuarios disponibles basado en el término de búsqueda
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredAvailableUsers(availableUsers);
    } else {
      const filtered = availableUsers.filter(
        (user) =>
          user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.id?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredAvailableUsers(filtered);
    }
  }, [searchTerm, availableUsers]);

  const handleAssignUser = async (userId) => {
    if (!trainer?.id) {
      setError("No se ha seleccionado un entrenador válido");
      return;
    }
    
    try {
      setIsLoading(true);
      setError("");
      await assignTrainerToUser(userId, trainer.id);
      setSuccessMessage("Usuario asignado exitosamente");
      setTimeout(() => setSuccessMessage(""), 3000);
      // Recargar datos
      await fetchUsers();
    } catch (err) {
      setError(err.message || "Error al asignar el usuario");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Usuarios Asignados
              </h2>
              <p className="text-gray-600">
                {trainer?.fullName || "Entrenador"}
              </p>
            </div>
          </div>
          <Button
            onClick={onClose}
            className="bg-gray-100 text-gray-700 hover:bg-gray-200 p-2 rounded-lg"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => {
                setActiveTab("assigned");
                setSearchTerm("");
              }}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "assigned"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Usuarios Asignados ({assignedUsers.length})
              </div>
            </button>
            <button
              onClick={() => {
                setActiveTab("available");
                setSearchTerm("");
              }}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "available"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                Usuarios Disponibles ({availableUsers.length})
              </div>
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-600 text-center">{successMessage}</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-600 text-center">{error}</p>
            </div>
          )}

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center gap-3">
                <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                <span className="text-gray-600">Cargando usuarios...</span>
              </div>
            </div>
          ) : (
            <>
              {activeTab === "assigned" ? (
                // Usuarios Asignados
                assignedUsers.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="bg-gray-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <User className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No hay usuarios asignados
                    </h3>
                    <p className="text-gray-600">
                      Este entrenador no tiene usuarios asignados actualmente.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-blue-600" />
                        <span className="text-blue-800 font-medium">
                          Total de usuarios asignados: {assignedUsers.length}
                        </span>
                      </div>
                    </div>

                    <div className="grid gap-4">
                      {assignedUsers.map((user) => (
                        <div
                          key={user.id}
                          className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0">
                                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                                  <User className="h-6 w-6 text-green-600" />
                                </div>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h3 className="text-lg font-medium text-gray-900">
                                    {user.fullName || "Sin nombre"}
                                  </h3>
                                  <div
                                    className={`h-2 w-2 rounded-full ${
                                      user.isActive ? "bg-green-400" : "bg-red-400"
                                    }`}
                                  ></div>
                                  <span
                                    className={`text-sm ${
                                      user.isActive
                                        ? "text-green-700"
                                        : "text-red-700"
                                    }`}
                                  >
                                    {user.isActive ? "Activo" : "Inactivo"}
                                  </span>
                                </div>
                                
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Mail className="h-4 w-4" />
                                    <span>{user.email || "Sin email"}</span>
                                  </div>
                                  
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Calendar className="h-4 w-4" />
                                    <span>Edad: {user.age || "No especificada"}</span>
                                  </div>
                                  
                                  <div className="flex items-center gap-2 text-sm">
                                    {user.hasRoutine ? (
                                      <>
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                        <span className="text-green-700">
                                          Tiene rutina asignada
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        <XCircle className="h-4 w-4 text-red-500" />
                                        <span className="text-red-700">
                                          Sin rutina asignada
                                        </span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex-shrink-0">
                              <div className="bg-white border border-gray-200 rounded-lg px-3 py-1">
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  {user.role || "user"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              ) : (
                // Usuarios Disponibles
                availableUsers.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="bg-gray-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <UserPlus className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No hay usuarios disponibles
                    </h3>
                    <p className="text-gray-600">
                      Todos los usuarios ya tienen un entrenador asignado.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                      <div className="flex items-center gap-2">
                        <UserPlus className="h-5 w-5 text-green-600" />
                        <span className="text-green-800 font-medium">
                          Usuarios disponibles para asignar: {availableUsers.length}
                        </span>
                      </div>
                    </div>

                    {/* Buscador */}
                    <div className="mb-6">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Buscar usuarios por nombre, email o ID..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4">
                      {filteredAvailableUsers.length === 0 && searchTerm ? (
                        <div className="text-center py-8">
                          <div className="bg-gray-100 p-4 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                            <Search className="h-6 w-6 text-gray-400" />
                          </div>
                          <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No se encontraron usuarios
                          </h3>
                          <p className="text-gray-600">
                            No hay usuarios que coincidan con "{searchTerm}"
                          </p>
                        </div>
                      ) : (
                        filteredAvailableUsers.map((user) => (
                        <div
                          key={user.id}
                          className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0">
                                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                                  <User className="h-6 w-6 text-blue-600" />
                                </div>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h3 className="text-lg font-medium text-gray-900">
                                    {user.fullName || "Sin nombre"}
                                  </h3>
                                  <div
                                    className={`h-2 w-2 rounded-full ${
                                      user.isActive ? "bg-green-400" : "bg-red-400"
                                    }`}
                                  ></div>
                                  <span
                                    className={`text-sm ${
                                      user.isActive
                                        ? "text-green-700"
                                        : "text-red-700"
                                    }`}
                                  >
                                    {user.isActive ? "Activo" : "Inactivo"}
                                  </span>
                                </div>
                                
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Mail className="h-4 w-4" />
                                    <span>{user.email || "Sin email"}</span>
                                  </div>
                                  
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Calendar className="h-4 w-4" />
                                    <span>Edad: {user.age || "No especificada"}</span>
                                  </div>
                                  
                                  <div className="flex items-center gap-2 text-sm">
                                    {user.hasRoutine ? (
                                      <>
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                        <span className="text-green-700">
                                          Tiene rutina asignada
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        <XCircle className="h-4 w-4 text-red-500" />
                                        <span className="text-red-700">
                                          Sin rutina asignada
                                        </span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex flex-col gap-2">
                              <div className="bg-white border border-gray-200 rounded-lg px-3 py-1">
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  {user.role || "user"}
                                </span>
                              </div>
                              <Button
                                onClick={() => handleAssignUser(user.id)}
                                className="bg-green-600 text-white hover:bg-green-700 px-3 py-1 text-sm flex items-center gap-1"
                                disabled={isLoading}
                              >
                                <UserPlus className="h-3 w-3" />
                                Asignar
                              </Button>
                            </div>
                          </div>
                        </div>
                        ))
                      )}
                    </div>
                  </div>
                )
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200">
          <Button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 hover:bg-gray-400 px-6 py-2 rounded-lg"
          >
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
}
