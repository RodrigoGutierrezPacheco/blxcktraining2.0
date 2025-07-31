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
} from "lucide-react";
import routineData from "./miRutina.json"; // Import the routine data from the JSON file
import RutinaInfo from "./RutinaInfo";

export default function Rutina() {
  const [expandedWeek, setExpandedWeek] = useState(1); // Start with the first week expanded
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

  // Function to determine the theme based on the index
  const getWeekTheme = (index) => {
    return index % 2 === 0 ? "light" : "dark";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      {/* Hero Section */}
      <section className="relative bg-black text-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10 mb-8 max-w-6xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          Mi Rutina: {routineData.name}
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Sigue tu plan de entrenamiento personalizado para alcanzar tus
          objetivos.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm sm:text-base">
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
            <Layers className="h-4 w-4 text-white" />
            <span>{routineData.phase}</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
            <Zap className="h-4 w-4 text-white" />
            <span>Carga: {routineData.load}</span>
          </div>
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
