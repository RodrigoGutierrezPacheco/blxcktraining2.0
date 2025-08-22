import { useState, useEffect } from "react";
import { Button } from "../../Components/Button";
import { getUserById } from "../../../services/admin";

export default function ViewUserModal({ isOpen, user, onClose, onToggleStatus }) {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen && user) {
      fetchUserData();
    }
  }, [isOpen, user]);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      setError("");
      const data = await getUserById(user?.id);
      setUserData(data);
    } catch (err) {
      setError(err.message || "Error al cargar los datos del usuario");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Sin fecha";
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatUserValue = (value) => {
    if (value === null || value === undefined || value === "") {
      return "Sin información";
    }
    return value;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-medium text-gray-900">
            Detalles del Usuario
          </h3>
          <Button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 hover:bg-gray-400 p-2 rounded-lg"
          >
            ✕
          </Button>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 text-center">{error}</p>
          </div>
        ) : userData ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Información Personal */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 border-b pb-2">Información Personal</h4>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500">Nombre Completo:</span>
                  <p className="text-gray-900">{formatUserValue(userData.fullName)}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Email:</span>
                  <p className="text-gray-900">{formatUserValue(userData.email)}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Rol:</span>
                  <p className="text-gray-900">{formatUserValue(userData.role)}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Edad:</span>
                  <p className="text-gray-900">{formatUserValue(userData.age)}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Fecha de Nacimiento:</span>
                  <p className="text-gray-900">{formatUserValue(userData.dateOfBirth)}</p>
                </div>
              </div>
            </div>

            {/* Información Física */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 border-b pb-2">Información Física</h4>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500">Peso:</span>
                  <p className="text-gray-900">{formatUserValue(userData.weight)} kg</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Altura:</span>
                  <p className="text-gray-900">{formatUserValue(userData.height)} cm</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Problemas de Salud:</span>
                  <p className="text-gray-900">{formatUserValue(userData.healthIssues)}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Enfermedades Crónicas:</span>
                  <p className="text-gray-900">{formatUserValue(userData.chronicDiseases)}</p>
                </div>
              </div>
            </div>

            {/* Información del Sistema */}
            <div className="md:col-span-2 space-y-4">
              <h4 className="font-medium text-gray-900 border-b pb-2">Información del Sistema</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">ID del Usuario:</span>
                  <p className="text-gray-900 font-mono text-sm">{userData.id}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Entrenador Asignado:</span>
                  <p className="text-gray-900">{formatUserValue(userData.trainerId)}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Tiene Rutina:</span>
                  <p className="text-gray-900">{userData.hasRoutine ? "Sí" : "No"}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Estado:</span>
                  <div className="flex items-center gap-3 mt-1">
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      userData.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {userData.isActive ? 'Activo' : 'Inactivo'}
                    </span>
                    <Button
                      onClick={() => onToggleStatus(userData.id)}
                      className={`px-3 py-1 text-xs rounded-lg font-medium ${
                        userData.isActive 
                          ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                      title={userData.isActive ? 'Desactivar usuario' : 'Activar usuario'}
                    >
                      {userData.isActive ? 'Desactivar' : 'Activar'}
                    </Button>
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Fecha de Creación:</span>
                  <p className="text-gray-900">{formatDate(userData.createdAt)}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Última Actualización:</span>
                  <p className="text-gray-900">{formatDate(userData.updatedAt)}</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
