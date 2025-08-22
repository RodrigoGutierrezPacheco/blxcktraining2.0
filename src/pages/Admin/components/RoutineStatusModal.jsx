import { useState, useEffect } from "react";
import { Button } from "../../Components/Button";
import { CheckCircle, XCircle, FileText, Calendar, Clock, Target } from "lucide-react";
import { getUserRoutineByEmail } from "../../../services/routines";

export default function RoutineStatusModal({ isOpen, user, onClose }) {
  const [routineData, setRoutineData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen && user?.hasRoutine) {
      fetchRoutineData();
    }
  }, [isOpen, user]);

  const fetchRoutineData = async () => {
    try {
      setIsLoading(true);
      setError("");
      const response = await getUserRoutineByEmail(user?.email);
      if (!response.ok) {
        throw new Error("Error al cargar la rutina");
      }
      const data = await response.json();
      setRoutineData(data);
    } catch (err) {
      setError(err.message || "Error al cargar la rutina");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !user) return null;

  const hasRoutine = user.hasRoutine;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-medium text-gray-900">
            Estado de la Rutina
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
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">
            {user.fullName || "Usuario"}
          </h4>
          <p className="text-sm text-gray-600">
            {user.email || "Sin email"}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          {hasRoutine ? (
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-3 mb-6">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <div className="text-left">
                  <p className="text-lg font-medium text-green-700">
                    Con Rutina
                  </p>
                  <p className="text-sm text-green-600">
                    El usuario tiene una rutina asignada
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
              ) : routineData ? (
                <div className="bg-white rounded-lg p-6 border">
                  <h5 className="font-medium text-gray-900 mb-6 text-center text-lg">
                    Detalles de la Rutina
                  </h5>
                  
                  {/* Información básica de la rutina */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Nombre</p>
                        <p className="text-gray-900">{routineData.name || "Sin nombre"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Target className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Estado</p>
                        <p className={`text-sm px-2 py-1 rounded-full ${
                          routineData.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {routineData.isActive ? 'Activa' : 'Inactiva'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-purple-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Duración</p>
                        <p className="text-gray-900">{routineData.weeks?.length || 0} semanas</p>
                      </div>
                    </div>
                  </div>

                  {/* Descripción y comentarios */}
                  {(routineData.description || routineData.comments) && (
                    <div className="mb-6">
                      {routineData.description && (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-500 mb-2">Descripción</p>
                          <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{routineData.description}</p>
                        </div>
                      )}
                      {routineData.comments && (
                        <div>
                          <p className="text-sm font-medium text-gray-500 mb-2">Comentarios</p>
                          <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{routineData.comments}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Estructura de la rutina */}
                  {routineData.weeks && routineData.weeks.length > 0 && (
                    <div>
                      <h6 className="font-medium text-gray-900 mb-4">Estructura de la Rutina</h6>
                      <div className="space-y-4">
                        {routineData.weeks.map((week, weekIndex) => (
                          <div key={weekIndex} className="bg-gray-50 rounded-lg p-4">
                            <h7 className="font-medium text-blue-600 mb-3 block">
                              Semana {weekIndex + 1}
                            </h7>
                            {week.days && week.days.length > 0 && (
                              <div className="space-y-3">
                                {week.days.map((day, dayIndex) => (
                                  <div key={dayIndex} className="bg-white rounded-lg p-3 border">
                                    <h8 className="font-medium text-gray-700 mb-2 block">
                                      Día {dayIndex + 1}
                                    </h8>
                                    {day.exercises && day.exercises.length > 0 && (
                                      <div className="space-y-2">
                                        {day.exercises.map((exercise, exerciseIndex) => (
                                          <div key={exerciseIndex} className="flex items-center gap-3 text-sm">
                                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                            <span className="text-gray-800">{exercise.name}</span>
                                            {exercise.sets && (
                                              <span className="text-gray-600">({exercise.sets} series)</span>
                                            )}
                                            {exercise.reps && (
                                              <span className="text-gray-600">- {exercise.reps} repeticiones</span>
                                            )}
                                            {exercise.weight && (
                                              <span className="text-gray-600">- {exercise.weight}kg</span>
                                            )}
                                            {exercise.duration && (
                                              <span className="text-gray-600">- {exercise.duration}min</span>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          ) : (
            <div className="flex items-center justify-center gap-3">
              <XCircle className="h-8 w-8 text-red-500" />
              <div className="text-left">
                <p className="text-lg font-medium text-red-700">
                  Sin Rutina
                </p>
                <p className="text-sm text-red-600">
                  No tiene rutina asignada
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
