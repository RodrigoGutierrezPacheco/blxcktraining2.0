import { useState, useEffect, useCallback } from "react";
import { getRoutinesByTrainer } from "../../../services/admin";
import { Button } from "../../Components/Button";
import {
  X,
  Dumbbell,
  Calendar,
  Clock,
  Target,
  CheckCircle,
  XCircle,
  Loader2,
  Search,
  FileText,
  User,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";

export default function TrainerRoutinesModal({ 
  isOpen, 
  onClose, 
  trainer 
}) {
  const [routines, setRoutines] = useState([]);
  const [filteredRoutines, setFilteredRoutines] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchRoutines = useCallback(async () => {
    if (!trainer?.id) return;
    
    try {
      setIsLoading(true);
      setError("");
      const data = await getRoutinesByTrainer(trainer.id);
      setRoutines(data);
      setFilteredRoutines(data);
    } catch (err) {
      setError(err.message || "Error al cargar las rutinas");
    } finally {
      setIsLoading(false);
    }
  }, [trainer?.id]);

  useEffect(() => {
    if (isOpen && trainer?.id) {
      fetchRoutines();
    }
  }, [isOpen, trainer?.id, fetchRoutines]);

  // Filtrar rutinas basado en el término de búsqueda
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredRoutines(routines);
    } else {
      const filtered = routines.filter(
        (routine) =>
          routine.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          routine.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          routine.id?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRoutines(filtered);
    }
  }, [searchTerm, routines]);

  const formatDate = (dateString) => {
    if (!dateString) return "Sin fecha";
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleViewRoutine = (routineId) => {
    // TODO: Implementar vista detallada de rutina
    console.log("Ver rutina:", routineId);
  };

  const handleEditRoutine = (routineId) => {
    // TODO: Implementar edición de rutina
    console.log("Editar rutina:", routineId);
  };

  const handleDeleteRoutine = (routineId) => {
    // TODO: Implementar eliminación de rutina
    console.log("Eliminar rutina:", routineId);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-6xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-full">
              <Dumbbell className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Rutinas del Entrenador
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

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-600 text-center">{error}</p>
            </div>
          )}

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center gap-3">
                <Loader2 className="h-6 w-6 animate-spin text-purple-600" />
                <span className="text-gray-600">Cargando rutinas...</span>
              </div>
            </div>
          ) : (
            <>
              {routines.length === 0 ? (
                <div className="text-center py-12">
                  <div className="bg-gray-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Dumbbell className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No hay rutinas creadas
                  </h3>
                  <p className="text-gray-600">
                    Este entrenador no ha creado ninguna rutina aún.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Dumbbell className="h-5 w-5 text-purple-600" />
                      <span className="text-purple-800 font-medium">
                        Total de rutinas creadas: {routines.length}
                      </span>
                    </div>
                  </div>

                  {/* Buscador */}
                  <div className="mb-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Buscar rutinas por nombre, descripción o ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Routines Table */}
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Rutina
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Descripción
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Estado
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Duración
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Fecha de Creación
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Acciones
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {filteredRoutines.length === 0 ? (
                            <tr>
                              <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                {searchTerm ? "No se encontraron rutinas que coincidan con la búsqueda" : "No hay rutinas registradas"}
                              </td>
                            </tr>
                          ) : (
                            filteredRoutines.map((routine) => (
                              <tr key={routine.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10">
                                      <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                                        <Dumbbell className="h-5 w-5 text-purple-600" />
                                      </div>
                                    </div>
                                    <div className="ml-4">
                                      <div className="text-sm font-medium text-gray-900">
                                        {routine.name || "Sin nombre"}
                                      </div>
                                      <div className="text-sm text-gray-500">
                                        ID: {routine.id}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="text-sm text-gray-900 max-w-xs truncate">
                                    {routine.description || "Sin descripción"}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className={`h-2 w-2 rounded-full mr-2 ${
                                      routine.isActive ? 'bg-green-400' : 'bg-red-400'
                                    }`}></div>
                                    <span className={`text-sm ${
                                      routine.isActive ? 'text-green-800' : 'text-red-800'
                                    }`}>
                                      {routine.isActive ? 'Activa' : 'Inactiva'}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">
                                    <div className="flex items-center gap-2 mb-1">
                                      <Clock className="h-4 w-4 text-gray-400" />
                                      <span className="font-medium">{routine.weeks?.length || 0} semanas</span>
                                    </div>
                                    {routine.weeks && (
                                      <div className="text-xs text-gray-500">
                                        {routine.weeks.length} semanas configuradas
                                      </div>
                                    )}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">
                                    <div className="flex items-center gap-2">
                                      <Calendar className="h-4 w-4 text-gray-400" />
                                      <span>{formatDate(routine.createdAt)}</span>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  <div className="flex items-center gap-2">
                                    <Button
                                      onClick={() => handleViewRoutine(routine.id)}
                                      className="bg-blue-600 text-white hover:bg-blue-700 p-2 rounded-lg"
                                      title="Ver rutina"
                                    >
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      onClick={() => handleEditRoutine(routine.id)}
                                      className="bg-yellow-600 text-white hover:bg-yellow-700 p-2 rounded-lg"
                                      title="Editar rutina"
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      onClick={() => handleDeleteRoutine(routine.id)}
                                      className="bg-red-600 text-white hover:bg-red-700 p-2 rounded-lg"
                                      title="Eliminar rutina"
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
                </div>
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
