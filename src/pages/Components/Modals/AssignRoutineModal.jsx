import { useState, useEffect, useCallback } from "react";
import { Button } from "../Button";
import {
  X,
  Dumbbell,
  Calendar,
  Clock,
  Target,
  Users,
  CheckCircle,
  XCircle,
  Plus,
  Search,
  Filter,
} from "lucide-react";
import {
  getTrainerUnassignedRoutines,
  assignRoutineToUser,
} from "../../../services/routines";
import CreateRoutineModal from "./CreateRoutineModal";

export default function AssignRoutineModal({
  isOpen,
  onClose,
  userName,
  userId,
  trainerId,
  onRoutineAssigned,
}) {
  const [routines, setRoutines] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [isAssigning, setIsAssigning] = useState(false);
  const [showAssignmentForm, setShowAssignmentForm] = useState(false);
  const [showCreateRoutineModal, setShowCreateRoutineModal] = useState(false);
  const [isDirectAssignment, setIsDirectAssignment] = useState(false);
  const [assignmentData, setAssignmentData] = useState({
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    notes: "",
  });

  const fetchTrainerRoutines = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const routinesData = await getTrainerUnassignedRoutines(trainerId);
      setRoutines(routinesData);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [trainerId]);

  useEffect(() => {
    if (isOpen && trainerId) {
      fetchTrainerRoutines();
    }
  }, [isOpen, trainerId, fetchTrainerRoutines]);

  const handleAssignRoutine = async () => {
    if (!selectedRoutine) return;

    try {
      setIsAssigning(true);
      setError(null);

      const startDate = new Date(assignmentData.startDate).toISOString();
      const endDate = new Date(assignmentData.endDate).toISOString();

      await assignRoutineToUser(
        selectedRoutine.id,
        userId,
        startDate,
        endDate,
        assignmentData.notes
      );

      // Notificar que se asignó la rutina
      if (onRoutineAssigned) {
        onRoutineAssigned();
      }

      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsAssigning(false);
    }
  };

  const filteredRoutines = routines.filter(
    (routine) =>
      routine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      routine.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRoutineSelect = (routine) => {
    setSelectedRoutine(routine);
    setShowAssignmentForm(true);
  };

  const handleBackToRoutines = () => {
    setShowAssignmentForm(false);
    setSelectedRoutine(null);
    setAssignmentData({
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      notes: "",
    });
  };

  const handleRoutineCreated = async (createdRoutine) => {
    try {
      // Si se creó una rutina directamente asignada al usuario
      if (createdRoutine && isDirectAssignment) {
        // La rutina ya fue creada y asignada automáticamente por el endpoint
        console.log("Rutina creada y asignada exitosamente:", createdRoutine);

        // Notificar que se asignó la rutina para hacer refetch de usuarios
        if (onRoutineAssigned) {
          onRoutineAssigned();
        }

        // Cerrar el modal principal
        onClose();
      } else if (createdRoutine && userId && trainerId) {
        // Si se creó una rutina normal, asignarla manualmente
        const startDate = new Date(assignmentData.startDate).toISOString();
        const endDate = new Date(assignmentData.endDate).toISOString();

        await assignRoutineToUser(
          createdRoutine.id,
          userId,
          startDate,
          endDate,
          assignmentData.notes || "Rutina creada y asignada automáticamente"
        );

        // Notificar que se asignó la rutina
        if (onRoutineAssigned) {
          onRoutineAssigned();
        }

        // Cerrar el modal principal
        onClose();
      } else {
        // Si no hay datos para asignar, solo refrescar la lista
        fetchTrainerRoutines();
      }

      setShowCreateRoutineModal(false);
      setIsDirectAssignment(false);
    } catch (error) {
      console.error("Error al asignar rutina creada:", error);
      setError("Error al asignar la rutina creada al usuario");
      // Refrescar la lista de todas formas
      fetchTrainerRoutines();
      setShowCreateRoutineModal(false);
      setIsDirectAssignment(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-lg border border-gray-200">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              {showAssignmentForm && (
                <button
                  onClick={handleBackToRoutines}
                  className="text-gray-500 hover:text-gray-700 p-1"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
              <h3 className="text-lg font-semibold text-gray-900">
                {showAssignmentForm
                  ? "Asignar Rutina"
                  : `Asignar Rutina a ${userName}`}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-1"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded p-3 mb-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {!showAssignmentForm ? (
            // Vista de selección de rutina
            <>
              {/* Barra de búsqueda y botón crear */}
              <div className="mb-4 flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar rutinas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                  />
                </div>
                {/* <Button
                  onClick={() => {
                    setIsDirectAssignment(true);
                    setShowCreateRoutineModal(true);
                  }}
                  className="bg-green-600 text-white hover:bg-green-700 px-4 py-2 text-sm rounded flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Crear Rutina
                </Button> */}
              </div>

              {/* Instrucción */}
              {!isLoading && filteredRoutines.length > 0 && (
                <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded">
                  <p className="text-xs text-blue-700 text-center">
                    💡 Selecciona una rutina sin asignar haciendo clic en ella
                    para asignarla a {userName}
                  </p>
                </div>
              )}

              {/* Mensaje informativo */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-3">
                <div className="flex items-center gap-3 mb-2">
                  <Dumbbell className="h-5 w-5 text-blue-600" />
                  <p className="text-sm text-blue-800 font-medium">
                    💡 ¿Necesitas crear una nueva rutina para {userName}?
                  </p>
                </div>
                <p className="text-sm text-blue-600">
                  Ve a la sección <strong>"Mis Rutinas"</strong> en tu perfil
                  para crear una rutina personalizada y luego regresa aquí para
                  asignarla.
                </p>
              </div>

              {/* Lista de rutinas */}
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400 mx-auto mb-3"></div>
                  <p className="text-gray-600">Cargando rutinas...</p>
                </div>
              ) : filteredRoutines.length > 0 ? (
                <div className="space-y-3">
                  {filteredRoutines.map((routine) => (
                    <div
                      key={routine.id}
                      className="bg-white p-4 border border-gray-200 rounded hover:bg-gray-50 hover:border-gray-300 cursor-pointer transition-colors"
                      onClick={() => handleRoutineSelect(routine)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-base font-medium text-gray-900 mb-1">
                            {routine.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {routine.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {routine.isActive ? (
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                              Activa
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                              Inactiva
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-4 text-xs text-gray-500">
                        <span>
                          {routine.totalWeeks} semana
                          {routine.totalWeeks !== 1 ? "s" : ""}
                        </span>
                        <span>
                          {routine.weeks?.reduce(
                            (total, week) =>
                              total +
                              week.days?.reduce(
                                (dayTotal, day) =>
                                  dayTotal + (day.exercises?.length || 0),
                                0
                              ),
                            0
                          ) || 0}{" "}
                          ejercicios
                        </span>
                      </div>

                      {routine.comments && (
                        <div className="mt-2 p-2 bg-gray-50 rounded">
                          <p className="text-xs text-gray-600">
                            {routine.comments}
                          </p>
                        </div>
                      )}

                      <div className="mt-3 pt-2 border-t border-gray-100">
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <span>👆</span>
                          Rutina disponible - Haz clic para asignar a {userName}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-4">
                    <div className="flex items-center justify-center mb-3">
                      <Dumbbell className="h-8 w-8 text-blue-600" />
                    </div>
                    <h4 className="text-lg font-medium text-blue-900 mb-2">
                      {searchTerm
                        ? "No se encontraron rutinas sin asignar"
                        : "No tienes rutinas sin asignar"}
                    </h4>
                    <p className="text-blue-700 mb-3">
                      {searchTerm
                        ? "Intenta con otros términos de búsqueda"
                        : "Todas tus rutinas ya están asignadas a usuarios"}
                    </p>
                    <div className="bg-white border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-800 font-medium mb-1">
                        💡 ¿Necesitas crear una nueva rutina para {userName}?
                      </p>
                      <p className="text-sm text-blue-600">
                        Ve a la sección <strong>"Mis Rutinas"</strong> en tu
                        perfil para crear una rutina personalizada y luego
                        regresa aquí para asignarla.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            // Vista de formulario de asignación
            <div className="space-y-4">
              {/* Información de la rutina seleccionada */}
              <div className="bg-gray-50 p-4 rounded border">
                <h4 className="text-base font-medium text-gray-900 mb-2">
                  {selectedRoutine.name}
                </h4>
                <div className="flex gap-4 text-sm text-gray-600">
                  <span>
                    {selectedRoutine.totalWeeks} semana
                    {selectedRoutine.totalWeeks !== 1 ? "s" : ""}
                  </span>
                  <span>
                    {selectedRoutine.weeks?.reduce(
                      (total, week) =>
                        total +
                        week.days?.reduce(
                          (dayTotal, day) =>
                            dayTotal + (day.exercises?.length || 0),
                          0
                        ),
                      0
                    ) || 0}{" "}
                    ejercicios
                  </span>
                </div>
              </div>

              {/* Formulario de asignación */}
              <div className="bg-white p-4 border border-gray-200 rounded">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fecha de Inicio
                    </label>
                    <input
                      type="date"
                      value={assignmentData.startDate}
                      onChange={(e) =>
                        setAssignmentData((prev) => ({
                          ...prev,
                          startDate: e.target.value,
                        }))
                      }
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fecha de Fin
                    </label>
                    <input
                      type="date"
                      value={assignmentData.endDate}
                      onChange={(e) =>
                        setAssignmentData((prev) => ({
                          ...prev,
                          endDate: e.target.value,
                        }))
                      }
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notas (opcional)
                  </label>
                  <textarea
                    value={assignmentData.notes}
                    onChange={(e) =>
                      setAssignmentData((prev) => ({
                        ...prev,
                        notes: e.target.value,
                      }))
                    }
                    rows={2}
                    placeholder="Instrucciones o consideraciones especiales..."
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                  />
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleBackToRoutines}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAssignRoutine}
                  disabled={isAssigning}
                  className="px-4 py-2 text-sm text-white bg-gray-900 hover:bg-gray-800 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAssigning ? "Asignando..." : "Asignar Rutina"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal para crear nueva rutina */}
      <CreateRoutineModal
        isOpen={showCreateRoutineModal}
        onClose={() => setShowCreateRoutineModal(false)}
        onRoutineCreated={handleRoutineCreated}
        trainerId={trainerId}
        userId={userId}
        startDate={assignmentData.startDate}
        endDate={assignmentData.endDate}
        notes={assignmentData.notes}
        isDirectAssignment={true}
      />
    </div>
  );
}
