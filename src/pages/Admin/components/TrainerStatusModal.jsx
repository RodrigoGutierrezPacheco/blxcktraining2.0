import { useState, useEffect } from "react";
import { Button } from "../../Components/Button";
import { CheckCircle, XCircle, User, Mail, Phone, Calendar } from "lucide-react";
import { getTrainerById } from "../../../services/admin";

export default function TrainerStatusModal({ isOpen, user, onClose }) {
  const [trainerData, setTrainerData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen && user?.trainerId) {
      fetchTrainerData();
    }
  }, [isOpen, user]);

  const fetchTrainerData = async () => {
    try {
      setIsLoading(true);
      setError("");
      const data = await getTrainerById(user.trainerId);
      setTrainerData(data);
    } catch (err) {
      setError(err.message || "Error al cargar los datos del entrenador");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !user) return null;

  const hasTrainer = user.trainerId;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-medium text-gray-900">
            Estado del Entrenador
          </h3>
          <Button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 hover:bg-gray-400 p-2 rounded-lg"
          >
            ✕
          </Button>
        </div>

        <div className="text-center mb-6">
          <div className="bg-blue-100 p-3 rounded-full inline-block mb-4">
            <User className="h-8 w-8 text-blue-600" />
          </div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">
            {user.fullName || "Usuario"}
          </h4>
          <p className="text-sm text-gray-600">
            {user.email || "Sin email"}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          {hasTrainer ? (
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-3 mb-6">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <div className="text-left">
                  <p className="text-lg font-medium text-green-700">
                    Con Entrenador
                  </p>
                  <p className="text-sm text-green-600">
                    ID del entrenador: {user.trainerId}
                  </p>
                </div>
              </div>

              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : error ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-600 text-center">{error}</p>
                </div>
              ) : trainerData ? (
                <div className="bg-white rounded-lg p-4 border">
                  <h5 className="font-medium text-gray-900 mb-4 text-center">
                    Información del Entrenador
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Nombre</p>
                        <p className="text-gray-900">{trainerData.fullName || "Sin nombre"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Email</p>
                        <p className="text-gray-900">{trainerData.email || "Sin email"}</p>
                      </div>
                    </div>
                    {trainerData.age && (
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Edad</p>
                          <p className="text-gray-900">{trainerData.age} años</p>
                        </div>
                      </div>
                    )}
                    {trainerData.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Teléfono</p>
                          <p className="text-gray-900">{trainerData.phone}</p>
                        </div>
                      </div>
                    )}
                    {trainerData.documents && (
                      <div className="md:col-span-2">
                        <p className="text-sm font-medium text-gray-500 mb-2">Documentos</p>
                        <p className="text-gray-900">{trainerData.documents}</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="flex items-center justify-center gap-3">
              <XCircle className="h-8 w-8 text-red-500" />
              <div className="text-left">
                <p className="text-lg font-medium text-red-700">
                  Sin Entrenador
                </p>
                <p className="text-sm text-red-600">
                  No tiene entrenador asignado
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-center mt-6">
          <Button
            onClick={onClose}
            className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-lg"
          >
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
}
