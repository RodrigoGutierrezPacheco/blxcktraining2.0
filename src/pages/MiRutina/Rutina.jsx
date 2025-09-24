import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "../Components/Card";
import { Button } from "../Components/Button";
import {
  Dumbbell,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Zap,
  Layers,
  Loader2,
  AlertCircle,
  Play,
  Clock,
  Repeat,
  Eye,
} from "lucide-react";
import { useAuth } from "../../context/useAuth";
import { getUserRoutineByEmail } from "../../services/routines";
import RutinaInfo from "./RutinaInfo";
import ExerciseModal from "./ExerciseModal";

export default function Rutina() {
  const { user } = useAuth();
  const [expandedWeek, setExpandedWeek] = useState(1);
  const [routineData, setRoutineData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const weekRefs = useRef({});

  const toggleWeek = (weekNumber) => {
    setExpandedWeek(expandedWeek === weekNumber ? null : weekNumber);
  };

  const handleExerciseClick = (exercise) => {
    setSelectedExercise(exercise);
    setShowExerciseModal(true);
  };

  const closeExerciseModal = () => {
    setShowExerciseModal(false);
    setSelectedExercise(null);
  };

  useEffect(() => {
    if (expandedWeek && weekRefs.current[expandedWeek]) {
      weekRefs.current[expandedWeek].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [expandedWeek]);

  useEffect(() => {
    const fetchUserRoutine = async () => {
      if (!user?.email) {
        setIsLoading(false);
        setError("No se encontró información del usuario");
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        const routine = await getUserRoutineByEmail(user.email);
        console.log("routine", routine)
        if (routine) {
          setRoutineData(routine.routine);
          setStartDate(routine.startDate);
          setEndDate(routine.endDate);
        } else {
          setRoutineData(null);
        }
      } catch (err) {
        console.error("Error fetching routine:", err);
        setError(err.message || "Error desconocido al cargar la rutina");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserRoutine();
  }, [user?.email]);


  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-xl text-gray-700">
            Cargando tu rutina personalizada...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Error al cargar la rutina
          </h2>
          <p className="text-gray-600 mb-6">
            {error}
          </p>
          <Button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  if (!routineData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <Dumbbell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            No tienes rutina asignada
          </h2>
          <p className="text-gray-600 mb-6">
            Tu entrenador aún no te ha asignado una rutina personalizada. 
            Contacta con él para comenzar tu plan de entrenamiento.
          </p>
          <Button 
            onClick={() => window.location.reload()} 
            className="bg-gray-600 text-white hover:bg-gray-700"
          >
            Actualizar
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {routineData.name}
            </h1>
            <p className="text-gray-600 mb-4">
              {routineData.description || "Tu plan de entrenamiento personalizado"}
            </p>
            <div className="flex justify-center gap-6 text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1">
                <Layers className="h-4 w-4" />
                {routineData.totalWeeks || routineData.weeks?.length || 0} semanas
              </span>
              <span className="flex items-center gap-1">
                <Zap className="h-4 w-4" />
                {routineData.isActive ? "Activa" : "Inactiva"}
              </span>
            </div>
            
            {/* Routine Dates Info */}
            {(startDate || endDate) && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-blue-900 mb-2">
                      Fechas de la Rutina
                    </h4>
                    
                    {/* Start Date */}
                    {startDate && (
                      <div className="mb-2">
                        <p className="text-xs text-blue-600 font-medium">Inicio:</p>
                        <p className="text-sm text-blue-700">
                          {(() => {
                            try {
                              const start = new Date(startDate);
                              return start.toLocaleDateString('es-ES', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              });
                            } catch {
                              return "Fecha no disponible";
                            }
                          })()}
                        </p>
                      </div>
                    )}
                    
                    {/* End Date */}
                    {endDate && (
                      <div className="mb-2">
                        <p className="text-xs text-blue-600 font-medium">Vencimiento:</p>
                        <p className="text-sm text-blue-700">
                          {(() => {
                            try {
                              const end = new Date(endDate);
                              return end.toLocaleDateString('es-ES', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              });
                            } catch {
                              return "Fecha no disponible";
                            }
                          })()}
                        </p>
                        <p className="text-xs text-blue-600 mt-1">
                          {(() => {
                            try {
                              const end = new Date(endDate);
                              const today = new Date();
                              const diffTime = end - today;
                              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                              
                              if (diffDays > 0) {
                                return `${diffDays} día${diffDays !== 1 ? 's' : ''} restante${diffDays !== 1 ? 's' : ''}`;
                              } else if (diffDays === 0) {
                                return "Rutina vence hoy";
                              } else {
                                return "Rutina vencida";
                              }
                            } catch {
                              return "Fecha no válida";
                            }
                          })()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Routine Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {routineData.weeks?.map((week) => (
          <div key={week.id} className="mb-8">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {/* Week Header */}
              <div 
                className="p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleWeek(week.weekNumber)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {week.name}
                  </h3>
                  {expandedWeek === week.weekNumber ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </div>

              {/* Week Content */}
              {expandedWeek === week.weekNumber && (
                <div className="p-4">
                  {week.days?.map((day) => (
                    <div key={day.id} className="mb-6 last:mb-0">
                      <h4 className="text-md font-medium text-gray-800 mb-3">
                        {day.name}
                      </h4>
                      <div className="space-y-3">
                        {day.exercises?.map((exercise) => (
                          <div
                            key={exercise.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                            onClick={() => handleExerciseClick(exercise)}
                          >
                            <div className="flex-1">
                              <h5 className="font-medium text-gray-900">
                                {exercise.name}
                              </h5>
                              <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Repeat className="h-3 w-3" />
                                  {exercise.sets} series
                                </span>
                                <span className="flex items-center gap-1">
                                  <Dumbbell className="h-3 w-3" />
                                  {exercise.repetitions} repeticiones
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {exercise.restBetweenSets}s descanso
                                </span>
                              </div>
                            </div>
                            <Eye className="h-4 w-4 text-gray-400" />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Exercise Modal */}
      <ExerciseModal
        isOpen={showExerciseModal}
        onClose={closeExerciseModal}
        exercise={selectedExercise}
      />
    </div>
  );
}
