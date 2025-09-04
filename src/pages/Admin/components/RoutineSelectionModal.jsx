import { useState, useEffect } from "react";
import { getAllRoutines, reassignRoutine } from "../../../services/admin";
import { Button } from "../../Components/Button";
import {
  X,
  Dumbbell,
  Calendar,
  Clock,
  Target,
  CheckCircle,
  Loader2,
  Search,
  FileText,
} from "lucide-react";

export default function RoutineSelectionModal({ 
  isOpen, 
  onClose, 
  user,
  onRoutineAssigned 
}) {
  const [routines, setRoutines] = useState([]);
  const [filteredRoutines, setFilteredRoutines] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAssigning, setIsAssigning] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (isOpen) {
      fetchRoutines();
      // Set default dates
      const today = new Date();
      const threeMonthsLater = new Date(today);
      threeMonthsLater.setMonth(today.getMonth() + 3);
      
      setStartDate(today.toISOString().split('T')[0]);
      setEndDate(threeMonthsLater.toISOString().split('T')[0]);
    }
  }, [isOpen]);

  useEffect(() => {
    // Filter routines based on search term
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

  const handleAssignRoutine = async () => {
    if (!selectedRoutine || !user?.id) {
      setError("Por favor selecciona una rutina");
      return;
    }

    if (!startDate || !endDate) {
      setError("Por favor selecciona las fechas de inicio y fin");
      return;
    }

    try {
      setIsAssigning(true);
      setError("");
      
      const reassignData = {
        user_id: user.id,
        routine_id: selectedRoutine.id,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
        notes: notes || "Rutina reasignada por administrador"
      };

      await reassignRoutine(reassignData);
      setSuccessMessage("Rutina asignada exitosamente");
      setTimeout(() => {
        setSuccessMessage("");
        onRoutineAssigned?.();
        onClose();
      }, 2000);
    } catch (err) {
      setError(err.message || "Error al asignar la rutina");
    } finally {
      setIsAssigning(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-full">
              <Dumbbell className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Asignar Rutina
              </h2>
              <p className="text-gray-600">
                {user?.fullName || "Usuario"}
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

          {/* Date Selection */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Configuración de Fechas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de Inicio
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de Fin
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notas (Opcional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Agregar notas sobre la asignación de rutina..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                rows="3"
              />
            </div>
          </div>

          {/* Routine Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Seleccionar Rutina
            </h3>
            
            {/* Search */}
            <div className="mb-4">
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

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center gap-3">
                  <Loader2 className="h-6 w-6 animate-spin text-purple-600" />
                  <span className="text-gray-600">Cargando rutinas...</span>
                </div>
              </div>
            ) : (
              <div className="grid gap-4 max-h-96 overflow-y-auto">
                {filteredRoutines.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="bg-gray-100 p-4 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                      <Search className="h-6 w-6 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No se encontraron rutinas
                    </h3>
                    <p className="text-gray-600">
                      {searchTerm ? `No hay rutinas que coincidan con "${searchTerm}"` : "No hay rutinas disponibles"}
                    </p>
                  </div>
                ) : (
                  filteredRoutines.map((routine) => (
                    <div
                      key={routine.id}
                      onClick={() => setSelectedRoutine(routine)}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedRoutine?.id === routine.id
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                              selectedRoutine?.id === routine.id
                                ? "bg-purple-100"
                                : "bg-gray-100"
                            }`}>
                              <Dumbbell className={`h-6 w-6 ${
                                selectedRoutine?.id === routine.id
                                  ? "text-purple-600"
                                  : "text-gray-600"
                              }`} />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="text-lg font-medium text-gray-900">
                                {routine.name || "Sin nombre"}
                              </h4>
                              <div
                                className={`h-2 w-2 rounded-full ${
                                  routine.isActive ? "bg-green-400" : "bg-red-400"
                                }`}
                              ></div>
                              <span
                                className={`text-sm ${
                                  routine.isActive
                                    ? "text-green-700"
                                    : "text-red-700"
                                }`}
                              >
                                {routine.isActive ? "Activa" : "Inactiva"}
                              </span>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <FileText className="h-4 w-4" />
                                <span className="max-w-md truncate">
                                  {routine.description || "Sin descripción"}
                                </span>
                              </div>
                              
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Clock className="h-4 w-4" />
                                <span>{routine.weeks?.length || 0} semanas</span>
                              </div>
                              
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Target className="h-4 w-4" />
                                <span>ID: {routine.id}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex-shrink-0">
                          {selectedRoutine?.id === routine.id && (
                            <CheckCircle className="h-6 w-6 text-purple-600" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <Button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 hover:bg-gray-400 px-6 py-2 rounded-lg"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleAssignRoutine}
            className="bg-purple-600 text-white hover:bg-purple-700 px-6 py-2 rounded-lg flex items-center gap-2"
            disabled={!selectedRoutine || isAssigning}
          >
            {isAssigning ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Asignando...
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4" />
                Asignar Rutina
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
