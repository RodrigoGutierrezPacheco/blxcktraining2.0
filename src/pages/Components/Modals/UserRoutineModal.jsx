import { useState } from "react";
import { Button } from "../Button";
import { Card, CardContent } from "../Card";
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Check,
  Play,
  X,
  Dumbbell,
  Clock,
  Target,
  Image,
  Loader2,
} from "lucide-react";
import { exercisesService } from "../../../services/exercises";
import { useAuth } from "../../../context/useAuth";

export default function UserRoutineModal({
  isOpen,
  onClose,
  userRoutine,
  userName,
}) {
  const { token } = useAuth();
  const [expandedWeeks, setExpandedWeeks] = useState(new Set());
  
  // Estados para el modal de imagen del ejercicio
  const [showExerciseImageModal, setShowExerciseImageModal] = useState(false);
  const [exerciseImageData, setExerciseImageData] = useState(null);
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  const toggleWeek = (weekNumber) => {
    const newExpanded = new Set(expandedWeeks);
    if (newExpanded.has(weekNumber)) {
      newExpanded.delete(weekNumber);
    } else {
      newExpanded.add(weekNumber);
    }
    setExpandedWeeks(newExpanded);
  };

  // Función para manejar la visualización de imagen del ejercicio
  const handleViewExerciseImage = async (exerciseId) => {
    if (!exerciseId || !token) return;
    
    try {
      setIsLoadingImage(true);
      const response = await exercisesService.getExerciseImage(token, exerciseId);
      setExerciseImageData(response);
      setShowExerciseImageModal(true);
    } catch (error) {
      console.error("Error al cargar la imagen del ejercicio:", error);
    } finally {
      setIsLoadingImage(false);
    }
  };

  // Función para cerrar el modal de imagen
  const closeExerciseImageModal = () => {
    setShowExerciseImageModal(false);
    setExerciseImageData(null);
  };

  if (!isOpen || !userRoutine) return null;

  const routine = userRoutine.routine;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-2xl font-bold text-black mb-2">
                Rutina de {userName}
              </h3>
              <p className="text-gray-600">
                Plan de entrenamiento personalizado
              </p>
            </div>
            
            <Button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 bg-transparent hover:bg-gray-100 p-2 rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Routine Info Header */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 border border-blue-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <Dumbbell className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900">{routine.name}</h4>
                <p className="text-sm text-gray-600">{routine.description}</p>
              </div>
              <div className="text-center">
                <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900">Duración</h4>
                <p className="text-sm text-gray-600">
                  {routine.totalWeeks || routine.weeks?.length || 0} semanas
                </p>
              </div>
              <div className="text-center">
                <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900">Estado</h4>
                <p className="text-sm text-gray-600">
                  {routine.isActive ? "Activa" : "Inactiva"}
                </p>
              </div>
            </div>
            {routine.comments && (
              <div className="mt-4 p-3 bg-white/50 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-700 text-center">
                  <span className="font-medium">Imagen:</span>{" "}
                  {routine.comments}
                </p>
              </div>
            )}
          </div>

          {/* Update Routine Message */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                <span className="text-amber-600 font-bold text-sm">ℹ</span>
              </div>
              <div>
                <p className="text-sm text-amber-800 font-medium">
                  ¿Necesitas actualizar tu rutina?
                </p>
                <p className="text-sm text-amber-700">
                  Dirígete a la sección de <span className="font-semibold">Mis Rutinas</span> para modificar tu plan de entrenamiento.
                </p>
              </div>
            </div>
          </div>

          {/* Weeks */}
          <div className="space-y-4">
            {routine.weeks?.map((week) => {
              const isExpanded = expandedWeeks.has(week.weekNumber);

              return (
                <Card key={week.weekNumber} className="border border-gray-200">
                  <CardContent className="p-0">
                    <button
                      onClick={() => toggleWeek(week.weekNumber)}
                      className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-bold text-sm">
                              {week.weekNumber}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {week.name || `Semana ${week.weekNumber}`}
                            </h4>
                            {week.comments && (
                              <p className="text-sm text-gray-600">
                                {week.comments}
                              </p>
                            )}
                          </div>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-4 pb-4 border-t border-gray-100">
                        <div className="space-y-4 pt-4">
                          {week.days?.map((day) => (
                            <div
                              key={day.dayNumber}
                              className="bg-gray-50 rounded-lg p-4"
                            >
                              <div className="flex items-center gap-3 mb-3">
                                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                  <span className="text-green-600 font-bold text-xs">
                                    {day.dayNumber}
                                  </span>
                                </div>
                                <h5 className="font-medium text-gray-900">
                                  {day.name || `Día ${day.dayNumber}`}
                                </h5>
                              </div>

                              {day.comments && (
                                <p className="text-sm text-gray-600 mb-3 pl-9">
                                  {day.comments}
                                </p>
                              )}

                              {/* Exercises Table */}
                              <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                  <thead>
                                    <tr className="bg-gray-100">
                                      <th className="p-2 text-left font-medium text-gray-700">
                                        Ejercicio
                                      </th>
                                      <th className="p-2 text-center font-medium text-gray-700">
                                        Series
                                      </th>
                                      <th className="p-2 text-center font-medium text-gray-700">
                                        Reps
                                      </th>
                                      <th className="p-2 text-center font-medium text-gray-700">
                                        Descanso
                                      </th>
                                      <th className="p-2 text-center font-medium text-gray-700">
                                        Imagen
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {day.exercises?.map((exercise, exIndex) => (
                                      <tr
                                        key={exIndex}
                                        className="border-b border-gray-100 hover:bg-gray-50"
                                      >
                                        <td className="p-2 font-medium text-gray-900">
                                          {exercise.name}
                                        </td>
                                        <td className="p-2 text-center text-gray-700">
                                          {exercise.sets}
                                        </td>
                                        <td className="p-2 text-center text-gray-700">
                                          {exercise.repetitions}
                                        </td>
                                        <td className="p-2 text-center text-gray-700">
                                          {exercise.restBetweenSets}s
                                        </td>
                                        <td className="p-2 text-center text-gray-700">
                                          {exercise.exerciseId ? (
                                            <Button
                                              className="bg-blue-600 text-white hover:bg-blue-700 px-3 py-1 text-xs rounded"
                                              onClick={() => handleViewExerciseImage(exercise.exerciseId)}
                                            >
                                              Ver
                                            </Button>
                                          ) : (
                                            "-"
                                          )}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
            <Button
              onClick={onClose}
              className="bg-gray-500 text-white hover:bg-gray-600 px-6 py-3"
            >
              Cerrar
            </Button>
          </div>
        </div>
      </div>

      {/* Modal para mostrar imagen del ejercicio */}
      {showExerciseImageModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-70 flex items-center justify-center p-4 overflow-y-hidden">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200">
            {/* Header del modal */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {exerciseImageData?.exerciseName || 'Imagen del Ejercicio'}
                  </h3>
                </div>
                <Button
                  onClick={closeExerciseImageModal}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-lg transition-all duration-200"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Contenido del modal - Solo la imagen */}
            <div className="p-6 flex items-center justify-center min-h-[500px]">
              {isLoadingImage ? (
                <div className="text-center">
                  <Loader2 className="h-16 w-16 text-blue-600 animate-spin mx-auto mb-4" />
                  <p className="text-gray-600 mt-4">Cargando imagen del ejercicio...</p>
                </div>
              ) : exerciseImageData?.image?.url ? (
                <div className="text-center">
                  <img
                    src={exerciseImageData.image.url}
                    alt={exerciseImageData.exerciseName}
                    className="max-w-full h-auto max-h-[70vh] rounded-lg shadow-lg"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <div 
                    className="hidden bg-gray-100 rounded-lg p-12 text-center"
                    style={{ minHeight: '300px', display: 'none' }}
                  >
                    <Image className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No se pudo cargar la imagen</p>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <Image className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No hay imagen disponible para este ejercicio</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
