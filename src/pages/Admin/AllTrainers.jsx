import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Components/Button";
import { getAllTrainers, deleteUser, toggleTrainerStatus, toggleTrainerVerification } from "../../services/admin";
import { updateTrainer, getTrainerById } from "../../services/trainers";
import ViewTrainerModal from "./components/ViewTrainerModal";
import EditTrainerModal from "./components/EditTrainerModal";
import CreateTrainerModal from "./components/CreateTrainerModal";
import {
  Dumbbell,
  ArrowLeft,
  Search,
  Eye,
  Edit,
  Trash2,
  User,
  Calendar,
  Mail,
  Phone,
  Star,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function AllTrainers() {
  const navigate = useNavigate();
  const [trainers, setTrainers] = useState([]);
  const [filteredTrainers, setFilteredTrainers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [trainerToDelete, setTrainerToDelete] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [isModalLoading, setIsModalLoading] = useState(false);

  useEffect(() => {
    fetchTrainers();
  }, []);

  useEffect(() => {
    // Filtrar entrenadores basado en el término de búsqueda
    if (searchTerm.trim() === "") {
      setFilteredTrainers(trainers);
    } else {
      const filtered = trainers.filter(
        (trainer) =>
          trainer.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          trainer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          trainer.id?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTrainers(filtered);
    }
  }, [searchTerm, trainers]);

  const fetchTrainers = async () => {
    try {
      setIsLoading(true);
      setError("");
      const data = await getAllTrainers();
      setTrainers(data);
      setFilteredTrainers(data);
    } catch (err) {
      setError(err.message || "Error al cargar los entrenadores");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Sin fecha";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleViewTrainer = async (trainer) => {
    try {
      setIsModalLoading(true);
      setError("");
      console.log("Obteniendo información del entrenador ID:", trainer.id);
      // Obtener información completa del entrenador por ID
      const trainerData = await getTrainerById(trainer.id);
      console.log("Datos obtenidos del entrenador:", trainerData);
      setSelectedTrainer(trainerData);
      setShowViewModal(true);
    } catch (err) {
      setError(err.message || "Error al obtener información del entrenador");
    } finally {
      setIsModalLoading(false);
    }
  };

  const handleEditTrainer = async (trainer) => {
    try {
      setIsModalLoading(true);
      setError("");
      console.log("Obteniendo información del entrenador ID:", trainer.id);
      // Obtener información completa del entrenador por ID
      const trainerData = await getTrainerById(trainer.id);
      console.log("Datos obtenidos del entrenador:", trainerData);
      setSelectedTrainer(trainerData);
      setShowEditModal(true);
    } catch (err) {
      setError(err.message || "Error al obtener información del entrenador");
    } finally {
      setIsModalLoading(false);
    }
  };

  const handleSaveTrainer = async (trainerId, trainerData) => {
    try {
      await updateTrainer(trainerId, trainerData);
      fetchTrainers(); // Recargar la lista
      setShowEditModal(false);
      setSelectedTrainer(null);
    } catch (err) {
      setError(err.message || "Error al actualizar el entrenador");
    }
  };

  const handleDeleteTrainer = (trainerId) => {
    setTrainerToDelete(trainerId);
    setShowDeleteModal(true);
  };

  const handleToggleTrainerStatus = async (trainerId) => {
    try {
      await toggleTrainerStatus(trainerId);
      fetchTrainers(); // Recargar la lista
      setError(""); // Limpiar errores previos
      setSuccessMessage("Status del entrenador cambiado exitosamente");
      setTimeout(() => setSuccessMessage(""), 3000); // Ocultar mensaje después de 3 segundos
    } catch (err) {
      setError(err.message || "Error al cambiar el status del entrenador");
    }
  };

  const handleToggleTrainerVerification = async (trainerId) => {
    try {
      await toggleTrainerVerification(trainerId);
      fetchTrainers(); // Recargar la lista
      setError(""); // Limpiar errores previos
      setSuccessMessage("Verificación del entrenador cambiada exitosamente");
      setTimeout(() => setSuccessMessage(""), 3000); // Ocultar mensaje después de 3 segundos
    } catch (err) {
      setError(err.message || "Error al cambiar la verificación del entrenador");
    }
  };

  const confirmDeleteTrainer = async () => {
    if (!trainerToDelete) return;

    try {
      await deleteUser(trainerToDelete);
      setShowDeleteModal(false);
      setTrainerToDelete(null);
      fetchTrainers(); // Recargar la lista
    } catch (err) {
      setError(err.message || "Error al eliminar el entrenador");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-3">
              <Button
                onClick={() => navigate("/admin/dashboard")}
                className="bg-gray-100 text-gray-700 hover:bg-gray-200 p-2 rounded-lg"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Dumbbell className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Todos los Entrenadores
                  </h1>
                  <p className="text-gray-600">
                    Gestiona todos los entrenadores de la plataforma
                  </p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total de entrenadores</p>
              <p className="text-2xl font-bold text-green-600">
                {trainers.length}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-10">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar entrenadores por nombre, email o ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            <Button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 flex items-center gap-2"
            >
              <User className="h-4 w-4" />
              Crear Entrenador
            </Button>
            <Button
              onClick={fetchTrainers}
              className="bg-green-600 text-white hover:bg-green-700 px-6 py-2"
            >
              Actualizar
            </Button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600 text-center">{error}</p>
          </div>
        )}

        {/* Success Display */}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-600 text-center">{successMessage}</p>
          </div>
        )}

        {/* Trainers Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Entrenador
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Información de Contacto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Verificación
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha de Registro
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usuarios asignados
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTrainers.length === 0 ? (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      {searchTerm
                        ? "No se encontraron entrenadores que coincidan con la búsqueda"
                        : "No hay entrenadores registrados"}
                    </td>
                  </tr>
                ) : (
                  filteredTrainers.map((trainer) => (
                    <tr key={trainer.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                              <Dumbbell className="h-5 w-5 text-green-600" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {trainer.fullName || "Sin nombre"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <div className="flex items-center gap-2 mb-1">
                            <Mail className="h-4 w-4 text-gray-400" />
                            {trainer.email || "Sin email"}
                          </div>
                          {trainer.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-gray-400" />
                              {trainer.phone}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div
                            className={`h-2 w-2 rounded-full mr-2 ${
                              trainer.isActive ? "bg-green-400" : "bg-red-400"
                            }`}
                          ></div>
                          <span
                            className={`text-sm ${
                              trainer.isActive
                                ? "text-green-800"
                                : "text-red-800"
                            }`}
                          >
                            {trainer.isActive ? "Activo" : "Inactivo"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {trainer.isVerified ? (
                            <>
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              <span className="text-sm text-green-700">
                                Verificado
                              </span>
                            </>
                          ) : (
                            <>
                              <XCircle className="h-4 w-4 text-red-500 mr-2" />
                              <span className="text-sm text-red-700">
                                Pendiente
                              </span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-900">
                            {formatDate(trainer.createdAt)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-900">
                            {trainer.assignedUsersCount}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <Button
                            onClick={() => handleViewTrainer(trainer)}
                            className="bg-blue-100 text-blue-700 hover:bg-blue-200 p-2 rounded-lg"
                            title="Ver entrenador"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => handleEditTrainer(trainer)}
                            className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 p-2 rounded-lg"
                            title="Editar entrenador"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => handleToggleTrainerVerification(trainer.id)}
                            className={`p-2 rounded-lg ${
                              trainer.isVerified 
                                ? "bg-orange-100 text-orange-700 hover:bg-orange-200" 
                                : "bg-green-100 text-green-700 hover:bg-green-200"
                            }`}
                            title={trainer.isVerified ? "Desverificar entrenador" : "Verificar entrenador"}
                          >
                            <Star className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => handleDeleteTrainer(trainer.id)}
                            className="bg-red-100 text-red-700 hover:bg-red-200 p-2 rounded-lg"
                            title="Acciones del entrenador"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Create Trainer Modal */}
      <CreateTrainerModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={() => {
          fetchTrainers(); // Recargar la lista después de crear
        }}
      />

      {/* View Trainer Modal */}
      <ViewTrainerModal
        trainer={selectedTrainer}
        isOpen={showViewModal}
        isLoading={isModalLoading}
        onClose={() => {
          setShowViewModal(false);
          setSelectedTrainer(null);
        }}
      />

      {/* Edit Trainer Modal */}
      <EditTrainerModal
        trainer={selectedTrainer}
        isOpen={showEditModal}
        isLoading={isModalLoading}
        onClose={() => {
          setShowEditModal(false);
          setSelectedTrainer(null);
        }}
        onSave={handleSaveTrainer}
      />

      {/* Trainer Actions Modal */}
      {showDeleteModal && trainerToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Acciones del Entrenador
            </h3>
            
            {/* Trainer Info */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-600 mb-2">Entrenador seleccionado:</p>
              <p className="font-medium text-gray-900">
                {trainers.find(t => t.id === trainerToDelete)?.fullName || "Entrenador"}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-6">
              <Button
                onClick={() => handleToggleTrainerStatus(trainerToDelete)}
                className="w-full bg-yellow-100 text-yellow-700 hover:bg-yellow-200 px-4 py-3 rounded-lg flex items-center justify-center gap-2"
              >
                <div className="h-4 w-4 rounded-full bg-yellow-400"></div>
                Cambiar Status (Activar/Desactivar)
              </Button>
              
              <Button
                onClick={() => handleToggleTrainerVerification(trainerToDelete)}
                className="w-full bg-blue-100 text-blue-700 hover:bg-blue-200 px-4 py-3 rounded-lg flex items-center justify-center gap-2"
              >
                <Star className="h-4 w-4" />
                Cambiar Verificación
              </Button>
              
              <Button
                onClick={confirmDeleteTrainer}
                className="w-full bg-red-100 text-red-700 hover:bg-red-200 px-4 py-3 rounded-lg flex items-center justify-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Eliminar Entrenador
              </Button>
            </div>

            {/* Warning */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
              <p className="text-red-600 text-sm">
                <strong>⚠️ Advertencia:</strong> La eliminación es permanente y no se puede deshacer.
              </p>
            </div>

            {/* Footer */}
            <div className="flex justify-end">
              <Button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-300 text-gray-700 hover:bg-gray-400 px-4 py-2 rounded-lg"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
