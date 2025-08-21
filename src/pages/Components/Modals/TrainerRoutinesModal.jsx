import { useState } from "react";
import { Button } from "../Button";
import {
  X,
  Dumbbell,
  Calendar,
  Users,
  CheckCircle,
  Clock,
  ArrowLeft,
  Target,
  CheckCircle2,
  XCircle,
  Plus,
} from "lucide-react";
import { getRoutineById } from "../../../services/routines";
import CreateRoutineModal from "./CreateRoutineModal";

export default function TrainerRoutinesModal({
  isOpen,
  onClose,
  routinesData,
  onEditRoutine,
  onRoutineCreated,
}) {
  const [viewMode, setViewMode] = useState("list"); // 'list' o 'details'
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [isLoadingRoutine, setIsLoadingRoutine] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleViewDetails = async (routineId) => {
    try {
      setIsLoadingRoutine(true);
      const routineData = await getRoutineById(routineId);
      setSelectedRoutine(routineData);
      setViewMode("details");
    } catch (error) {
      console.error("Error al cargar la rutina:", error);
      // Aquí podrías mostrar un mensaje de error al usuario
    } finally {
      setIsLoadingRoutine(false);
    }
  };

  const handleBackToList = () => {
    setViewMode("list");
    setSelectedRoutine(null);
  };

  const handleCreateRoutine = () => {
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const handleRoutineCreated = () => {
    // Notificar que se creó una nueva rutina
    if (onRoutineCreated) {
      onRoutineCreated();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
        <div className="p-6">
          {/* Header con navegación */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              {viewMode === "details" && (
                <Button
                  onClick={handleBackToList}
                  className="bg-gray-500 text-white hover:bg-gray-600 p-2 rounded-full transition-all duration-200 hover:scale-105"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              )}
              <h3 className="text-2xl font-bold text-black flex items-center gap-2">
                <Dumbbell className="h-6 w-6" />
                {viewMode === "list"
                  ? "Mis Rutinas Creadas"
                  : "Detalles de la Rutina"}
              </h3>
            </div>
            <div className="flex items-center gap-3">
              {viewMode === "list" && (
                <Button
                  onClick={handleCreateRoutine}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 px-4 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Crear Rutina
                </Button>
              )}
              <Button
                onClick={onClose}
                className="bg-gray-500 text-white hover:bg-gray-600 p-2 rounded-full transition-all duration-200 hover:scale-105"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Contenido condicional según el modo de vista */}
          {viewMode === "list" ? (
            // Vista de lista de rutinas
            <>
              {routinesData && routinesData.length > 0 ? (
                <div className="grid gap-4">
                  {routinesData.map((routine) => (
                    <div
                      key={routine.id}
                      className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="text-lg font-semibold text-black mb-2">
                            {routine.name}
                          </h4>
                          <p className="text-gray-600 mb-3">
                            {routine.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {routine.isActive ? (
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium flex items-center gap-1">
                              <CheckCircle className="h-3 w-3" />
                              Activa
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                              Inactiva
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-600" />
                          <span>
                            <span className="font-medium">Duración:</span>{" "}
                            {routine.totalWeeks} semana
                            {routine.totalWeeks !== 1 ? "s" : ""}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-600" />
                          <span>
                            <span className="font-medium">Creada:</span>{" "}
                            {new Date(routine.createdAt).toLocaleDateString(
                              "es-ES"
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-600" />
                          <span>
                            <span className="font-medium">Asignada a:</span>{" "}
                            {routine.assignedUsers || 0} usuario
                            {routine.assignedUsers !== 1 ? "s" : ""}
                          </span>
                        </div>
                      </div>

                      {routine.comments && (
                        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
                          <p className="text-sm text-blue-700">
                            <span className="font-medium">Comentarios:</span>{" "}
                            {routine.comments}
                          </p>
                        </div>
                      )}

                      <div className="mt-4 flex gap-2">
                        <Button
                          onClick={() => handleViewDetails(routine.id)}
                          className="bg-blue-600 text-white hover:bg-blue-700 text-sm px-3 py-2"
                        >
                          <Dumbbell className="mr-1 h-4 w-4" />
                          Ver Detalles
                        </Button>
                        <Button
                          onClick={() => onEditRoutine(routine.id)}
                          className="bg-green-600 text-white hover:bg-green-700 text-sm px-3 py-2"
                        >
                          Editar
                        </Button>
                        <Button className="bg-purple-600 text-white hover:bg-purple-700 text-sm px-3 py-2">
                          Asignar a Cliente
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Dumbbell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg mb-2">
                    No tienes rutinas creadas aún
                  </p>
                  <p className="text-gray-500">
                    Crea tu primera rutina para comenzar a entrenar clientes
                  </p>
                </div>
              )}
            </>
          ) : (
            // Vista de detalles de la rutina
            <>
              {isLoadingRoutine ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600 text-lg">
                    Cargando detalles de la rutina...
                  </p>
                </div>
              ) : selectedRoutine ? (
                <div className="space-y-6">
                  {/* Header de la rutina */}
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="bg-white/20 p-3 rounded-full">
                        <Dumbbell className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold">
                          {selectedRoutine.name}
                        </h3>
                        <p className="text-blue-100 text-lg">
                          {selectedRoutine.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Información de la Rutina */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200 hover:shadow-lg transition-all duration-200 hover:scale-105">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-600 p-2 rounded-full">
                          <Calendar className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-blue-600 font-medium">
                            Duración
                          </p>
                          <p className="text-lg font-bold text-blue-800">
                            {selectedRoutine.totalWeeks} semana
                            {selectedRoutine.totalWeeks !== 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200 hover:shadow-lg transition-all duration-200 hover:scale-105">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-600 p-2 rounded-full">
                          <Target className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-green-600 font-medium">
                            Estado
                          </p>
                          <div className="flex items-center gap-2">
                            {selectedRoutine.isActive ? (
                              <>
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                                <span className="text-lg font-bold text-green-800">
                                  Activa
                                </span>
                              </>
                            ) : (
                              <>
                                <XCircle className="h-4 w-4 text-red-600" />
                                <span className="text-lg font-bold text-red-800">
                                  Inactiva
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200 hover:shadow-lg transition-all duration-200 hover:scale-105">
                      <div className="flex items-center gap-3">
                        <div className="bg-purple-600 p-2 rounded-full">
                          <Clock className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-purple-600 font-medium">
                            Creada
                          </p>
                          <p className="text-lg font-bold text-purple-800">
                            {new Date(
                              selectedRoutine.createdAt
                            ).toLocaleDateString("es-ES")}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200 hover:shadow-lg transition-all duration-200 hover:scale-105">
                      <div className="flex items-center gap-3">
                        <div className="bg-orange-600 p-2 rounded-full">
                          <Users className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-orange-600 font-medium">
                            Total Ejercicios
                          </p>
                          <p className="text-lg font-bold text-orange-800">
                            {selectedRoutine.weeks?.reduce(
                              (total, week) =>
                                total +
                                week.days?.reduce(
                                  (dayTotal, day) =>
                                    dayTotal + (day.exercises?.length || 0),
                                  0
                                ),
                              0
                            ) || 0}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Comentarios */}
                  {selectedRoutine.comments && (
                    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200">
                      <h4 className="text-lg font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Comentarios de la Rutina
                      </h4>
                      <p className="text-yellow-700 leading-relaxed">
                        {selectedRoutine.comments}
                      </p>
                    </div>
                  )}

                  {/* Resumen de la Rutina */}
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
                    <h4 className="text-lg font-semibold text-indigo-800 mb-4 flex items-center gap-2">
                      <Dumbbell className="h-5 w-5" />
                      Resumen de la Rutina
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="bg-indigo-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                          <span className="text-2xl font-bold">
                            {selectedRoutine.weeks?.length || 0}
                          </span>
                        </div>
                        <p className="text-sm text-indigo-600 font-medium">
                          Semanas
                        </p>
                        <p className="text-lg font-bold text-indigo-800">
                          Total
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="bg-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                          <span className="text-2xl font-bold">
                            {selectedRoutine.weeks?.reduce(
                              (total, week) => total + (week.days?.length || 0),
                              0
                            ) || 0}
                          </span>
                        </div>
                        <p className="text-sm text-purple-600 font-medium">
                          Días de Entrenamiento
                        </p>
                        <p className="text-lg font-bold text-purple-800">
                          Total
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                          <span className="text-2xl font-bold">
                            {selectedRoutine.weeks?.reduce(
                              (total, week) =>
                                total +
                                week.days?.reduce(
                                  (dayTotal, day) =>
                                    dayTotal + (day.exercises?.length || 0),
                                  0
                                ),
                              0
                            ) || 0}
                          </span>
                        </div>
                        <p className="text-sm text-green-600 font-medium">
                          Ejercicios
                        </p>
                        <p className="text-lg font-bold text-green-800">
                          Total
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Plan de Entrenamiento */}
                  <div className="space-y-6">
                    <h4 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-full">
                        <Calendar className="h-6 w-6 text-white" />
                      </div>
                      Plan de Entrenamiento
                    </h4>

                    {selectedRoutine.weeks?.map((week, weekIndex) => (
                      <div
                        key={week.id || weekIndex}
                        className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden"
                      >
                        {/* Header de la Semana */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-lg font-bold">
                                Semana {week.weekNumber}
                              </div>
                              <div>
                                <h5 className="text-xl font-bold text-gray-800">
                                  {week.name}
                                </h5>
                                {week.comments && (
                                  <p className="text-gray-600 mt-1 italic">
                                    "{week.comments}"
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-600">
                                Total de días
                              </p>
                              <p className="text-2xl font-bold text-blue-600">
                                {week.days?.length || 0}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Días */}
                        <div className="p-6 space-y-6">
                          {week.days?.map((day, dayIndex) => (
                            <div
                              key={day.id || dayIndex}
                              className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden"
                            >
                              {/* Header del Día */}
                              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-4">
                                    <div className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                                      Día {day.dayNumber}
                                    </div>
                                    <div>
                                      <h6 className="text-lg font-semibold text-gray-800">
                                        {day.name}
                                      </h6>
                                      {day.comments && (
                                        <p className="text-gray-600 mt-1 italic text-sm">
                                          "{day.comments}"
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm text-gray-600">
                                      Ejercicios
                                    </p>
                                    <p className="text-xl font-bold text-indigo-600">
                                      {day.exercises?.length || 0}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {/* Ejercicios */}
                              <div className="p-4">
                                <div className="space-y-4">
                                  {day.exercises?.map(
                                    (exercise, exerciseIndex) => (
                                      <div
                                        key={exercise.id || exerciseIndex}
                                        className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm"
                                      >
                                        <div className="flex items-center justify-between mb-3">
                                          <div className="flex items-center gap-3">
                                            <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                                              {exercise.order}
                                            </div>
                                            <h6 className="text-lg font-semibold text-gray-800">
                                              {exercise.name}
                                            </h6>
                                          </div>
                                          {exercise.comments && (
                                            <span className="text-sm text-gray-500 italic">
                                              💡 {exercise.comments}
                                            </span>
                                          )}
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                          <div className="text-center bg-purple-50 rounded-lg p-3 border border-purple-200">
                                            <p className="text-sm text-purple-600 font-medium">
                                              Series
                                            </p>
                                            <p className="text-2xl font-bold text-purple-700">
                                              {exercise.sets}
                                            </p>
                                          </div>
                                          <div className="text-center bg-blue-50 rounded-lg p-3 border border-blue-200">
                                            <p className="text-sm text-blue-600 font-medium">
                                              Repeticiones
                                            </p>
                                            <p className="text-2xl font-bold text-blue-700">
                                              {exercise.repetitions}
                                            </p>
                                          </div>
                                          <div className="text-center bg-green-50 rounded-lg p-3 border border-green-200">
                                            <p className="text-sm text-green-600 font-medium">
                                              Descanso entre series
                                            </p>
                                            <p className="text-lg font-bold text-green-700">
                                              {exercise.restBetweenSets}s
                                            </p>
                                          </div>
                                          <div className="text-center bg-orange-50 rounded-lg p-3 border border-orange-200">
                                            <p className="text-sm text-orange-600 font-medium">
                                              Descanso entre ejercicios
                                            </p>
                                            <p className="text-lg font-bold text-orange-700">
                                              {exercise.restBetweenExercises}s
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-red-600">
                    Error al cargar los detalles de la rutina
                  </p>
                </div>
              )}
            </>
          )}

          {/* Modal de Crear Rutina */}
          <CreateRoutineModal
            isOpen={showCreateModal}
            onClose={handleCloseCreateModal}
            onRoutineCreated={handleRoutineCreated}
          />
        </div>
      </div>
    </div>
  );
}
