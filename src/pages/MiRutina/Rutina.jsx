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
import { getUserRoutineByEmail, toggleExerciseCompleted, toggleDayCompleted, toggleWeekCompleted } from "../../services/routines";
import { getTrainerById } from "../../services/users";
import RutinaInfo from "./RutinaInfo";
import ExerciseModal from "./ExerciseModal";
import RoutineDatesInfo from "../../components/RoutineDatesInfo";
import RoutineContent from "../../components/RoutineContent";
import FloatingContactButton from "../../components/FloatingContactButton";

export default function Rutina() {
  const { user } = useAuth();
  const [expandedWeek, setExpandedWeek] = useState(null);
  const [autoOpenDayId, setAutoOpenDayId] = useState(null);
  const [routineData, setRoutineData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [trainerData, setTrainerData] = useState(null);
  const weekRefs = useRef({});

  const toggleWeek = (weekNumber) => {
    setExpandedWeek(expandedWeek === weekNumber ? null : weekNumber);
  };

  // Function to find the first incomplete week and day
  const findFirstIncompleteWeekAndDay = (routineData) => {
    if (!routineData?.weeks) return { weekNumber: null, dayId: null };

    for (const week of routineData.weeks) {
      // If week is not completed, open it
      if (!week.isCompleted) {
        // Look for first incomplete day in this week
        if (week.days) {
          for (const day of week.days) {
            if (!day.isCompleted) {
              return { weekNumber: week.weekNumber, dayId: day.id };
            }
          }
        }
        // If no incomplete day found, just open the week
        return { weekNumber: week.weekNumber, dayId: null };
      }
    }
    
    // If all weeks are completed, don't open any week
    return { weekNumber: null, dayId: null };
  };

  const handleExerciseClick = (exercise) => {
    setSelectedExercise(exercise);
    setShowExerciseModal(true);
  };

  const closeExerciseModal = () => {
    setShowExerciseModal(false);
    setSelectedExercise(null);
  };

  const handleMarkCompleted = async (type, id, currentStatus) => {
    try {
      let result;
      switch (type) {
        case 'exercise':
          result = await toggleExerciseCompleted(id, currentStatus);
          break;
        case 'day':
          result = await toggleDayCompleted(id, currentStatus);
          break;
        case 'week':
          result = await toggleWeekCompleted(id, currentStatus);
          break;
        default:
          throw new Error('Tipo de elemento no válido');
      }

      // Refresh routine data to get updated completion status
      const updatedRoutine = await getUserRoutineByEmail(user.email);
      if (updatedRoutine) {
        setRoutineData(updatedRoutine.routine);
      }

      console.log(`${type} completion toggled:`, result);
    } catch (error) {
      console.error(`Error toggling ${type} completion:`, error);
      // You could add a toast notification here
    }
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
          
          // Auto-open first incomplete week and day
          const { weekNumber, dayId } = findFirstIncompleteWeekAndDay(routine.routine);
          if (weekNumber) {
            setExpandedWeek(weekNumber);
            setAutoOpenDayId(dayId);
            console.log(`Auto-opening week ${weekNumber}${dayId ? ` and day ${dayId}` : ''}`);
          }
          
          // Fetch trainer data if trainerId is available
          console.log("trainerId from routine:", routine.routine);
          if (routine.routine.trainer_id) {
            try {
              const trainerInfo = await getTrainerById(routine.routine.trainer_id);
              console.log("trainer info:", trainerInfo);
              setTrainerData(trainerInfo);
            } catch (trainerError) {
              console.error("Error fetching trainer data:", trainerError);
              // Don't set error state for trainer data, just log it
            }
          } else {
            console.log("No trainer_id found in routine data");
          }
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
            <RoutineDatesInfo startDate={startDate} endDate={endDate} />
          </div>
        </div>
      </div>

      {/* Routine Content */}
      <RoutineContent 
        routineData={routineData}
        expandedWeek={expandedWeek}
        autoOpenDayId={autoOpenDayId}
        onToggleWeek={toggleWeek}
        onExerciseClick={handleExerciseClick}
        onMarkCompleted={handleMarkCompleted}
      />

      {/* Exercise Modal */}
      <ExerciseModal
        isOpen={showExerciseModal}
        onClose={closeExerciseModal}
        exercise={selectedExercise}
      />

      {/* Floating Contact Button */}
      <FloatingContactButton trainerData={trainerData} />
    </div>
  );
}
