import { useState } from "react";
import { Card, CardContent } from "../Components/Card";
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Dumbbell,
  CheckCircle,
  Check,
  Play,
} from "lucide-react";
import { Button } from "../Components/Button";
import EjercicioModal from "../Components/Modals/EjercicioModal";

export default function RutinaInfo({
  routineData,
  weekRefs,
  toggleWeek,
  getWeekTheme,
  expandedWeek,
}) {
  const [completedExercises, setCompletedExercises] = useState({});
  const [completedDays, setCompletedDays] = useState({});
  const [completedWeeks, setCompletedWeeks] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const toggleExercise = (weekNum, dayNum, exIndex) => {
    const key = `${weekNum}-${dayNum}-${exIndex}`;
    setCompletedExercises((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleDay = (weekNum, dayNum, exercises) => {
    const dayKey = `${weekNum}-${dayNum}`;
    const isDayCompleted =
      completedDays[dayKey] !== undefined
        ? !completedDays[dayKey]
        : !exercises.every((_, exIndex) => {
            const exKey = `${weekNum}-${dayNum}-${exIndex}`;
            return completedExercises[exKey];
          });

    // Update day completion
    setCompletedDays((prev) => ({
      ...prev,
      [dayKey]: isDayCompleted,
    }));

    // Update all exercises for this day
    const newExercises = {};
    exercises.forEach((_, exIndex) => {
      const exKey = `${weekNum}-${dayNum}-${exIndex}`;
      newExercises[exKey] = isDayCompleted;
    });

    setCompletedExercises((prev) => ({
      ...prev,
      ...newExercises,
    }));
  };

  const toggleWeekCompletion = (weekNum, days) => {
    const weekKey = weekNum;
    const isWeekCompleted =
      completedWeeks[weekKey] !== undefined
        ? !completedWeeks[weekKey]
        : !days.every((day) =>
            isDayCompleted(weekNum, day.dayNumber, day.exercises)
          );

    // Update week completion
    setCompletedWeeks((prev) => ({
      ...prev,
      [weekKey]: isWeekCompleted,
    }));

    // Update all days and exercises for this week
    const newDays = {};
    const newExercises = {};

    days.forEach((day) => {
      const dayKey = `${weekNum}-${day.dayNumber}`;
      newDays[dayKey] = isWeekCompleted;

      day.exercises.forEach((_, exIndex) => {
        const exKey = `${weekNum}-${day.dayNumber}-${exIndex}`;
        newExercises[exKey] = isWeekCompleted;
      });
    });

    setCompletedDays((prev) => ({
      ...prev,
      ...newDays,
    }));

    setCompletedExercises((prev) => ({
      ...prev,
      ...newExercises,
    }));
  };

  const isDayCompleted = (weekNum, dayNum, exercises) => {
    const dayKey = `${weekNum}-${dayNum}`;
    if (completedDays[dayKey] !== undefined) return completedDays[dayKey];

    return exercises.every((_, exIndex) => {
      const exKey = `${weekNum}-${dayNum}-${exIndex}`;
      return completedExercises[exKey];
    });
  };

  const isWeekCompleted = (weekNum, days) => {
    if (completedWeeks[weekNum] !== undefined) return completedWeeks[weekNum];

    return days.every((day) =>
      isDayCompleted(weekNum, day.dayNumber, day.exercises)
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 px-2 sm:px-4">
      {routineData.weeks.map((week, index) => {
        const theme = getWeekTheme(index);
        const isDark = theme === "dark";
        const isExpanded = expandedWeek === week.weekNumber;
        const weekCompleted = isWeekCompleted(week.weekNumber, week.days);

        const cardBaseClass = isDark
          ? "bg-gray-800 text-gray-100 border-gray-700"
          : "bg-white text-gray-900 border-gray-200";

        const expandedContentClass = isDark
          ? "bg-gray-800 text-gray-100"
          : "bg-white text-gray-900";

        const headerTextColorClass = isDark ? "text-gray-100" : "text-gray-900";
        const headerIconColorClass = isDark ? "text-blue-300" : "text-blue-600";
        const hoverBgClass = isDark ? "hover:bg-gray-700" : "hover:bg-gray-50";
        const borderColorClass = isDark ? "border-gray-700" : "border-gray-200";
        const tableHeadBgClass = isDark ? "bg-gray-700" : "bg-gray-100";
        const tableHeadTextClass = isDark ? "text-gray-100" : "text-gray-700";
        const tableRowHoverClass = isDark
          ? "hover:bg-gray-700"
          : "hover:bg-gray-50";
        const secondaryTextClass = isDark ? "text-gray-300" : "text-gray-600";
        const buttonClass = isDark
          ? "border-blue-300 text-blue-300 hover:bg-gray-700"
          : "border-blue-500 text-blue-600 hover:bg-blue-50";

        return (
          <Card
            key={week.weekNumber}
            className={`border rounded-lg overflow-hidden shadow-sm ${cardBaseClass} ${
              weekCompleted
                ? isDark
                  ? "ring-2 ring-green-500"
                  : "ring-2 ring-green-500"
                : ""
            }`}
            ref={(el) => (weekRefs.current[week.weekNumber] = el)}
          >
            <div className="flex items-start">
              <button
                onClick={() => {
                  toggleWeek(week.weekNumber);
                }}
                className={`w-full text-left transition-colors duration-200 ${hoverBgClass}`}
              >
                <CardContent className="p-3 sm:p-4 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex items-center justify-center h-6 w-6 rounded-full ${
                        weekCompleted
                          ? "bg-green-500"
                          : isDark
                          ? "bg-gray-700"
                          : "bg-gray-200"
                      }`}
                    >
                      {weekCompleted && (
                        <Check className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <h2
                      className={`text-base sm:text-lg font-bold ${headerTextColorClass} flex items-center gap-2`}
                    >
                      <Calendar className={`h-5 w-5 ${headerIconColorClass}`} />
                      Semana {week.weekNumber}
                    </h2>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className={`h-5 w-5 ${headerIconColorClass}`} />
                  ) : (
                    <ChevronDown
                      className={`h-5 w-5 ${headerIconColorClass}`}
                    />
                  )}
                </CardContent>
              </button>
              {/* {!isExpanded && (
                <div className="p-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWeekCompletion(week.weekNumber, week.days);
                    }}
                    className={`${weekCompleted ? "text-green-500" : ""}`}
                  >
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                </div>
              )} */}
            </div>
            {isExpanded && (
              <div className={`p-3 sm:p-4 pt-0 ${expandedContentClass}`}>
                <div className="flex justify-end mb-4">
                  <Button
                    variant="outline"
                    className={`${buttonClass} bg-transparent text-xs sm:text-sm ${
                      weekCompleted
                        ? isDark
                          ? "border-green-500 text-green-500"
                          : "border-green-500 text-green-600"
                        : ""
                    }`}
                    size="sm"
                    onClick={() =>
                      toggleWeekCompletion(week.weekNumber, week.days)
                    }
                  >
                    <CheckCircle className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                    {weekCompleted ? "Semana completada" : "Completar semana"}
                  </Button>
                </div>
                <div className="space-y-4">
                  {week.days.map((day) => {
                    const dayCompleted = isDayCompleted(
                      week.weekNumber,
                      day.dayNumber,
                      day.exercises
                    );

                    return (
                      <div
                        key={day.dayNumber}
                        className={`pb-4 last:pb-0 ${borderColorClass} border-b last:border-0 ${
                          dayCompleted
                            ? isDark
                              ? "bg-gray-700/50"
                              : "bg-green-50"
                            : ""
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h3
                            className={`text-sm sm:text-base font-bold flex items-center gap-2 ${headerTextColorClass}`}
                          >
                            <div
                              className={`flex items-center justify-center h-5 w-5 rounded-full ${
                                dayCompleted
                                  ? "bg-green-500"
                                  : isDark
                                  ? "bg-gray-700"
                                  : "bg-gray-200"
                              }`}
                            >
                              {dayCompleted && (
                                <Check className="h-3 w-3 text-white" />
                              )}
                            </div>
                            <Calendar
                              className={`h-4 w-4 ${headerIconColorClass}`}
                            />
                            Día {day.dayNumber}: {day.focus}
                          </h3>
                        </div>

                        <div className="sm:hidden space-y-3">
                          {day.exercises.map((exercise, exIndex) => {
                            const exKey = `${week.weekNumber}-${day.dayNumber}-${exIndex}`;
                            const isCompleted = completedExercises[exKey];

                            return (
                              <div
                                key={exIndex}
                                className={`p-3 rounded-lg ${
                                  isDark ? "bg-gray-700" : "bg-gray-50"
                                } ${
                                  isCompleted
                                    ? isDark
                                      ? "ring-1 ring-green-500"
                                      : "ring-1 ring-green-500"
                                    : ""
                                }`}
                              >
                                <div className="flex items-center gap-2 mb-2">
                                  <button
                                    onClick={() =>
                                      toggleExercise(
                                        week.weekNumber,
                                        day.dayNumber,
                                        exIndex
                                      )
                                    }
                                    className={`p-1 rounded-full border ${
                                      isCompleted
                                        ? "bg-green-500 border-green-500"
                                        : "border-gray-400"
                                    }`}
                                  >
                                    <Check
                                      className={`h-3 w-3 ${
                                        isCompleted ? "text-white" : "opacity-0"
                                      }`}
                                    />
                                  </button>
                                  <span
                                    className={`font-medium ${
                                      isCompleted
                                        ? "text-green-500"
                                        : headerTextColorClass
                                    }`}
                                  >
                                    {exercise.name}
                                  </span>
                                  <Play
                                    onClick={() => {
                                      setIsOpen(true);
                                    }}
                                    className="w-5 h-5 cursor-pointer"
                                  />
                                </div>
                                <div className="grid grid-cols-3 gap-2 text-xs pl-8">
                                  <div className={`${secondaryTextClass}`}>
                                    <div className="font-semibold">Series</div>
                                    <div>{exercise.sets}</div>
                                  </div>
                                  <div className={`${secondaryTextClass}`}>
                                    <div className="font-semibold">Reps</div>
                                    <div>{exercise.reps}</div>
                                  </div>
                                  <div className={`${secondaryTextClass}`}>
                                    <div className="font-semibold">
                                      Descanso
                                    </div>
                                    <div>{exercise.rest}</div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        <div className="hidden sm:block">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className={tableHeadBgClass}>
                                <th
                                  className={`p-2 text-xs font-semibold uppercase ${tableHeadTextClass}`}
                                >
                                  ✓
                                </th>
                                <th
                                  className={`p-2 text-xs font-semibold uppercase ${tableHeadTextClass}`}
                                >
                                  Ejercicio
                                </th>
                                <th
                                  className={`p-2 text-xs font-semibold uppercase ${tableHeadTextClass}`}
                                >
                                  Series
                                </th>
                                <th
                                  className={`p-2 text-xs font-semibold uppercase ${tableHeadTextClass}`}
                                >
                                  Reps
                                </th>
                                <th
                                  className={`p-2 text-xs font-semibold uppercase ${tableHeadTextClass}`}
                                >
                                  Descanso
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {day.exercises.map((exercise, exIndex) => {
                                const exKey = `${week.weekNumber}-${day.dayNumber}-${exIndex}`;
                                const isCompleted = completedExercises[exKey];

                                return (
                                  <tr
                                    key={exIndex}
                                    className={`${tableRowHoverClass} border-t ${borderColorClass} ${
                                      isCompleted
                                        ? isDark
                                          ? "bg-gray-700/30"
                                          : "bg-green-50"
                                        : ""
                                    }`}
                                  >
                                    <td className="p-2">
                                      <button
                                        onClick={() =>
                                          toggleExercise(
                                            week.weekNumber,
                                            day.dayNumber,
                                            exIndex
                                          )
                                        }
                                        className={`p-1 rounded-full border ${
                                          isCompleted
                                            ? "bg-green-500 border-green-500"
                                            : "border-gray-400"
                                        }`}
                                      >
                                        <Check
                                          className={`h-3 w-3 ${
                                            isCompleted
                                              ? "text-white"
                                              : "opacity-0"
                                          }`}
                                        />
                                      </button>
                                    </td>
                                    <td
                                      className={`p-2 font-medium ${
                                        isCompleted
                                          ? "text-green-500"
                                          : headerTextColorClass
                                      }`}
                                    >
                                      {exercise.name}
                                    </td>
                                    <td
                                      className={`p-2 ${
                                        isCompleted
                                          ? "text-green-500"
                                          : secondaryTextClass
                                      }`}
                                    >
                                      {exercise.sets}
                                    </td>
                                    <td
                                      className={`p-2 ${
                                        isCompleted
                                          ? "text-green-500"
                                          : secondaryTextClass
                                      }`}
                                    >
                                      {exercise.reps}
                                    </td>
                                    <td
                                      className={`p-2 ${
                                        isCompleted
                                          ? "text-green-500"
                                          : secondaryTextClass
                                      }`}
                                    >
                                      {exercise.rest}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>

                        <div className="mt-3 text-right">
                          <Button
                            variant="outline"
                            className={`${buttonClass} bg-transparent text-xs sm:text-sm ${
                              dayCompleted
                                ? isDark
                                  ? "border-green-500 text-green-500"
                                  : "border-green-500 text-green-600"
                                : ""
                            }`}
                            size="sm"
                            onClick={() =>
                              toggleDay(
                                week.weekNumber,
                                day.dayNumber,
                                day.exercises
                              )
                            }
                          >
                            <CheckCircle className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                            {dayCompleted ? "Día completado" : "Completar día"}
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </Card>
        );
      })}
      {isOpen && (
        <EjercicioModal isOpen={isOpen} setIsOpen={setIsOpen} name={"prueba"} />
      )}
    </div>
  );
}
