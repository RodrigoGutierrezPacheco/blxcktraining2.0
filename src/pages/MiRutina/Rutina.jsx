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
} from "lucide-react";
import { useAuth } from "../../context/useAuth";
import { getUserRoutineByEmail } from "../../services/routines";
import RutinaInfo from "./RutinaInfo";

export default function Rutina() {
  const { user } = useAuth();
  const [expandedWeek, setExpandedWeek] = useState(1);
  const [routineData, setRoutineData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const weekRefs = useRef({});

  const toggleWeek = (weekNumber) => {
    setExpandedWeek(expandedWeek === weekNumber ? null : weekNumber);
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

  const getWeekTheme = (index) => {
    return index % 2 === 0 ? "light" : "dark";
  };

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
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <section className="relative bg-black text-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10 mb-8 max-w-6xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          Mi Rutina: {routineData.name}
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          {routineData.description || "Sigue tu plan de entrenamiento personalizado para alcanzar tus objetivos."}
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm sm:text-base">
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
            <Layers className="h-4 w-4 text-white" />
            <span>{routineData.totalWeeks || routineData.weeks?.length || 0} Semanas</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
            <Zap className="h-4 w-4 text-white" />
            <span>Estado: {routineData.isActive ? "Activa" : "Inactiva"}</span>
          </div>
          {routineData.comments && (
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <Dumbbell className="h-4 w-4 text-white" />
              <span>{routineData.comments}</span>
            </div>
          )}
        </div>
      </section>

      <RutinaInfo
        expandedWeek={expandedWeek}
        getWeekTheme={getWeekTheme}
        routineData={routineData}
        toggleWeek={toggleWeek}
        weekRefs={weekRefs}
      />
    </div>
  );
}
