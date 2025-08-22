import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Components/Button";
import { getAllRoutines } from "../../services/admin";
import { 
  TrendingUp, 
  ArrowLeft, 
  Search, 
  Eye, 
  Edit, 
  Trash2,
  Calendar,
  User,
  Clock,
  CheckCircle,
  XCircle,
  Dumbbell
} from "lucide-react";

export default function AllRoutines() {
  const navigate = useNavigate();
  const [routines, setRoutines] = useState([]);
  const [filteredRoutines, setFilteredRoutines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchRoutines();
  }, []);

  useEffect(() => {
    // Filtrar rutinas basado en el término de búsqueda
    if (searchTerm.trim() === "") {
      setFilteredRoutines(routines);
    } else {
      const filtered = routines.filter(routine =>
        routine.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        routine.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        routine.id?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRoutines(filtered);
    }
  }, [searchTerm, routines]);

  const fetchRoutines = async () => {
    try {
      setIsLoading(true);
      setError("");
      const data = await getAllRoutines();
      setRoutines(data);
      setFilteredRoutines(data);
    } catch (err) {
      setError(err.message || "Error al cargar las rutinas");
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

  const handleViewRoutine = (routineId) => {
    // TODO: Implementar vista detallada de la rutina
    console.log("Ver rutina:", routineId);
  };

  const handleEditRoutine = (routineId) => {
    // TODO: Implementar edición de la rutina
    console.log("Editar rutina:", routineId);
  };

  const handleDeleteRoutine = (routineId) => {
    // TODO: Implementar eliminación de la rutina
    console.log("Eliminar rutina:", routineId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
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
                <div className="bg-purple-100 p-2 rounded-full">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Todas las Rutinas</h1>
                  <p className="text-gray-600">Gestiona todas las rutinas de la plataforma</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total de rutinas</p>
              <p className="text-2xl font-bold text-purple-600">{routines.length}</p>
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
                  placeholder="Buscar rutinas por nombre, descripción o ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            <Button
              onClick={fetchRoutines}
              className="bg-purple-600 text-white hover:bg-purple-700 px-6 py-2"
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
                    Entrenador
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estructura
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
                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
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
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-900">
                            {routine.trainer_id ? `ID: ${routine.trainer_id}` : "Sin entrenador"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{routine.totalWeeks || 0} semanas</span>
                          </div>
                          {routine.weeks && (
                            <div className="text-xs text-gray-500">
                              {routine.weeks.length} semanas configuradas
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-900">
                            {formatDate(routine.createdAt)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <Button
                            onClick={() => handleViewRoutine(routine.id)}
                            className="bg-blue-100 text-blue-700 hover:bg-blue-200 p-2 rounded-lg"
                            title="Ver rutina"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => handleEditRoutine(routine.id)}
                            className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 p-2 rounded-lg"
                            title="Editar rutina"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => handleDeleteRoutine(routine.id)}
                            className="bg-red-100 text-red-700 hover:bg-red-200 p-2 rounded-lg"
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
      </main>
    </div>
  );
}
