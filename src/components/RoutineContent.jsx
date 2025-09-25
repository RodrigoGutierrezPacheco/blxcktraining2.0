import { useState } from "react";
import {
  Dumbbell,
  ChevronDown,
  ChevronUp,
  Repeat,
  Clock,
  Eye,
  Check,
  CheckCircle,
} from "lucide-react";

const RoutineContent = ({ routineData, expandedWeek, onToggleWeek, onExerciseClick, onMarkCompleted }) => {
  const [expandedDay, setExpandedDay] = useState(null);

  if (!routineData?.weeks || routineData.weeks.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center text-gray-500">
          <p>No hay semanas disponibles para esta rutina.</p>
        </div>
      </div>
    );
  }

  // Array of gray shades for different weeks
  const weekColors = [
    'from-gray-400 to-gray-500',
    'from-gray-500 to-gray-600', 
    'from-gray-600 to-gray-700',
    'from-gray-700 to-gray-800',
    'from-gray-300 to-gray-400',
    'from-gray-400 to-gray-500',
    'from-gray-500 to-gray-600',
    'from-gray-600 to-gray-700'
  ];

  // Array of gray shades for different days
  const dayColors = [
    'bg-gray-50 border-gray-200 text-gray-800',
    'bg-gray-100 border-gray-300 text-gray-800',
    'bg-gray-50 border-gray-200 text-gray-800',
    'bg-gray-100 border-gray-300 text-gray-800',
    'bg-gray-50 border-gray-200 text-gray-800',
    'bg-gray-100 border-gray-300 text-gray-800',
    'bg-gray-50 border-gray-200 text-gray-800',
    'bg-gray-100 border-gray-300 text-gray-800'
  ];

  const toggleDay = (dayId) => {
    setExpandedDay(expandedDay === dayId ? null : dayId);
  };

  const handleMarkCompleted = (type, id, currentStatus, event) => {
    event.stopPropagation(); // Prevent triggering parent click events
    if (onMarkCompleted) {
      onMarkCompleted(type, id, currentStatus);
    }
  };

  const getCompletionPercentage = (items) => {
    if (!items || items.length === 0) return 0;
    const completed = items.filter(item => item.isCompleted).length;
    return Math.round((completed / items.length) * 100);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {routineData.weeks?.map((week, weekIndex) => {
        const weekColor = weekColors[weekIndex % weekColors.length];
        const weekCompletionPercentage = getCompletionPercentage(week.days);
        
        return (
          <div key={week.id} className="relative">
            {/* Week Card */}
            <div className={`bg-white rounded-xl border overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
              week.isCompleted ? 'border-green-300 bg-green-50' : 'border-gray-200'
            }`}>
              {/* Week Header */}
              <div 
                className="relative p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => onToggleWeek(week.weekNumber)}
              >
                {/* Gradient accent bar */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${weekColor}`}></div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Week number badge with completion check */}
                    <div className="relative">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${weekColor} flex items-center justify-center text-white font-bold text-lg shadow-md ${
                        week.isCompleted ? 'ring-2 ring-green-400' : ''
                      }`}>
                        {week.isCompleted ? (
                          <CheckCircle className="h-6 w-6 text-white" />
                        ) : (
                          week.weekNumber
                        )}
                      </div>
                      <button
                        onClick={(e) => handleMarkCompleted('week', week.id, week.isCompleted, e)}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-green-100 hover:border-green-400 transition-colors"
                        title={week.isCompleted ? "Desmarcar semana como completada" : "Marcar semana como completada"}
                      >
                        <Check className="h-3 w-3 text-gray-400 hover:text-green-600" />
                      </button>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className={`text-xl font-bold ${week.isCompleted ? 'text-green-800 line-through' : 'text-gray-900'}`}>
                          {week.name}
                        </h3>
                        {week.isCompleted && (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        )}
                      </div>
                      <div className="flex items-center gap-4 mt-1">
                        <p className="text-sm text-gray-500">
                          {week.days?.length || 0} días de entrenamiento
                        </p>
                        {weekCompletionPercentage > 0 && (
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-green-500 transition-all duration-300"
                                style={{ width: `${weekCompletionPercentage}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-500">{weekCompletionPercentage}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {expandedWeek === week.weekNumber ? (
                    <ChevronUp className="h-6 w-6 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-6 w-6 text-gray-400" />
                  )}
                </div>
              </div>

              {/* Week Content */}
              {expandedWeek === week.weekNumber && (
                <div className="p-6 bg-gray-50">
                  <div className="space-y-4">
                    {week.days?.map((day, dayIndex) => {
                      const dayColor = dayColors[dayIndex % dayColors.length];
                      const isDayExpanded = expandedDay === day.id;
                      const dayCompletionPercentage = getCompletionPercentage(day.exercises);
                      
                      return (
                        <div key={day.id} className={`bg-white rounded-lg border overflow-hidden shadow-sm ${
                          day.isCompleted ? 'border-green-300 bg-green-50' : 'border-gray-200'
                        }`}>
                          {/* Day Header - Clickable */}
                          <div 
                            className={`px-4 py-3 border-l-4 ${dayColor.split(' ')[1]} bg-gradient-to-r ${dayColor.split(' ')[0]} to-white cursor-pointer hover:bg-gray-100 transition-colors`}
                            onClick={() => toggleDay(day.id)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3 flex-1">
                                {/* Day completion check */}
                                <button
                                  onClick={(e) => handleMarkCompleted('day', day.id, day.isCompleted, e)}
                                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                                    day.isCompleted 
                                      ? 'bg-green-500 border-green-500 text-white' 
                                      : 'border-gray-300 hover:border-green-400 hover:bg-green-100'
                                  }`}
                                  title={day.isCompleted ? "Desmarcar día como completado" : "Marcar día como completado"}
                                >
                                  {day.isCompleted && <Check className="h-4 w-4" />}
                                </button>
                                
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <h4 className={`font-semibold text-lg ${day.isCompleted ? 'text-green-800 line-through' : ''}`}>
                                      {day.name}
                                    </h4>
                                    {day.isCompleted && (
                                      <CheckCircle className="h-4 w-4 text-green-600" />
                                    )}
                                  </div>
                                  <div className="flex items-center gap-4 mt-1">
                                    <p className="text-sm opacity-75">
                                      {day.exercises?.length || 0} ejercicios
                                    </p>
                                    {dayCompletionPercentage > 0 && (
                                      <div className="flex items-center gap-2">
                                        <div className="w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                          <div 
                                            className="h-full bg-green-500 transition-all duration-300"
                                            style={{ width: `${dayCompletionPercentage}%` }}
                                          ></div>
                                        </div>
                                        <span className="text-xs text-gray-500">{dayCompletionPercentage}%</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              
                              {isDayExpanded ? (
                                <ChevronUp className="h-5 w-5 text-gray-400" />
                              ) : (
                                <ChevronDown className="h-5 w-5 text-gray-400" />
                              )}
                            </div>
                          </div>
                          
                          {/* Exercises - Only show if day is expanded */}
                          {isDayExpanded && (
                            <div className="p-4">
                              <div className="grid gap-3">
                                {day.exercises?.map((exercise, exerciseIndex) => (
                                  <div
                                    key={exercise.id}
                                    className={`group relative flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white border rounded-lg hover:shadow-md transition-all duration-200 cursor-pointer ${
                                      exercise.isCompleted 
                                        ? 'border-green-300 bg-green-50' 
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                    onClick={() => onExerciseClick(exercise)}
                                  >
                                    {/* Exercise number indicator */}
                                    <div className={`absolute left-2 top-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                                      exercise.isCompleted 
                                        ? 'bg-green-200 text-green-700' 
                                        : 'bg-gray-200 text-gray-600 group-hover:bg-gray-300'
                                    }`}>
                                      {exerciseIndex + 1}
                                    </div>
                                    
                                    <div className="flex-1 ml-8">
                                      <div className="flex items-center gap-2">
                                        <h5 className={`font-semibold transition-colors ${
                                          exercise.isCompleted 
                                            ? 'text-green-800 line-through' 
                                            : 'text-gray-900 group-hover:text-gray-600'
                                        }`}>
                                          {exercise.name}
                                        </h5>
                                        {exercise.isCompleted && (
                                          <CheckCircle className="h-4 w-4 text-green-600" />
                                        )}
                                      </div>
                                      <div className="flex items-center gap-6 mt-2 text-sm text-gray-500">
                                        <span className={`flex items-center gap-1 px-2 py-1 rounded-full ${
                                          exercise.isCompleted ? 'bg-green-100' : 'bg-gray-100'
                                        }`}>
                                          <Repeat className="h-3 w-3" />
                                          {exercise.sets} series
                                        </span>
                                        <span className={`flex items-center gap-1 px-2 py-1 rounded-full ${
                                          exercise.isCompleted ? 'bg-green-100' : 'bg-gray-100'
                                        }`}>
                                          <Dumbbell className="h-3 w-3" />
                                          {exercise.repetitions} reps
                                        </span>
                                        <span className={`flex items-center gap-1 px-2 py-1 rounded-full ${
                                          exercise.isCompleted ? 'bg-green-100' : 'bg-gray-100'
                                        }`}>
                                          <Clock className="h-3 w-3" />
                                          {exercise.restBetweenSets}s
                                        </span>
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-3">
                                      {/* Exercise completion check */}
                                      <button
                                        onClick={(e) => handleMarkCompleted('exercise', exercise.id, exercise.isCompleted, e)}
                                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                                          exercise.isCompleted 
                                            ? 'bg-green-500 border-green-500 text-white' 
                                            : 'border-gray-300 hover:border-green-400 hover:bg-green-100'
                                        }`}
                                        title={exercise.isCompleted ? "Desmarcar ejercicio como completado" : "Marcar ejercicio como completado"}
                                      >
                                        {exercise.isCompleted && <Check className="h-4 w-4" />}
                                      </button>
                                      
                                      <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${
                                          exercise.isCompleted ? 'bg-green-400' : 'bg-gray-400'
                                        }`}></div>
                                        <Eye className={`h-5 w-5 transition-colors ${
                                          exercise.isCompleted 
                                            ? 'text-green-400 group-hover:text-green-600' 
                                            : 'text-gray-400 group-hover:text-gray-600'
                                        }`} />
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RoutineContent;
