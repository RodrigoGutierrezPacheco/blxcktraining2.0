import { Card, CardContent } from "../Components/Card";
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Dumbbell,
  CheckCircle,
} from "lucide-react";
import { Button } from "../Components/Button";

export default function RutinaInfo({
  routineData,
  weekRefs,
  toggleWeek,
  getWeekTheme,
  expandedWeek,
}) {
  return (
    <div className="max-w-6xl mx-auto space-y-4 px-4">
      {routineData.weeks.map((week, index) => {
        const theme = getWeekTheme(index);
        const isDark = theme === "dark";
        const isExpanded = expandedWeek === week.weekNumber;

        // Clases base que no cambian al expandir
        const cardBaseClass = isDark
          ? "bg-gray-900 text-gray-100 border-gray-700"
          : "bg-white text-black border-gray-200";

        // Clases para el contenido expandido (mantienen el mismo tema)
        const expandedContentClass = isDark
          ? "bg-gray-900 text-gray-100"
          : "bg-white text-black";

        // Clases para elementos específicos
        const headerTextColorClass = isDark ? "text-gray-100" : "text-gray-900";
        const headerIconColorClass = isDark ? "text-gray-300" : "text-gray-700";
        const hoverBgClass = isDark ? "hover:bg-gray-800" : "hover:bg-gray-50";
        const borderColorClass = isDark ? "border-gray-700" : "border-gray-200";
        const tableHeadBgClass = isDark ? "bg-gray-800" : "bg-gray-50";
        const tableHeadTextClass = isDark ? "text-gray-100" : "text-gray-700";
        const tableRowHoverClass = isDark
          ? "hover:bg-gray-800"
          : "hover:bg-gray-50";
        const secondaryTextClass = isDark ? "text-gray-300" : "text-gray-600";
        const buttonClass = isDark
          ? "border-gray-300 text-gray-100 hover:bg-gray-800"
          : "border-gray-300 text-black hover:bg-gray-100";

        return (
          <Card
            key={week.weekNumber}
            className={`border-2 rounded-lg overflow-hidden ${cardBaseClass}`}
            ref={(el) => (weekRefs.current[week.weekNumber] = el)}
          >
            <button
              onClick={() => toggleWeek(week.weekNumber)}
              className={`w-full text-left transition-colors duration-200 ${hoverBgClass}`}
            >
              <CardContent className="p-4 flex justify-between items-center">
                <h2
                  className={`text-lg sm:text-xl font-bold ${headerTextColorClass} flex items-center gap-2`}
                >
                  <Calendar className={`h-5 w-5 ${headerIconColorClass}`} />
                  Semana {week.weekNumber}
                </h2>
                {isExpanded ? (
                  <ChevronUp className={`h-5 w-5 ${headerIconColorClass}`} />
                ) : (
                  <ChevronDown className={`h-5 w-5 ${headerIconColorClass}`} />
                )}
              </CardContent>
            </button>
            {isExpanded && (
              <div className={`p-4 sm:p-6 pt-0 ${expandedContentClass}`}>
                <div className="space-y-6">
                  {week.days.map((day) => (
                    <div
                      key={day.dayNumber}
                      className={`pb-6 last:pb-0 ${borderColorClass} border-b last:border-0`}
                    >
                      <h3
                        className={`text-base sm:text-lg font-bold mb-4 flex items-center gap-2 ${headerTextColorClass}`}
                      >
                        <Calendar
                          className={`h-5 w-5 ${headerIconColorClass}`}
                        />
                        Día {day.dayNumber}: {day.focus}
                      </h3>
                      
                      {/* Mobile-friendly exercise list */}
                      <div className="sm:hidden space-y-4">
                        {day.exercises.map((exercise, exIndex) => (
                          <div
                            key={exIndex}
                            className={`p-3 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'} space-y-2`}
                          >
                            <div className="flex items-center gap-2">
                              <Dumbbell
                                className={`h-4 w-4 ${headerIconColorClass}`}
                              />
                              <span className={`font-medium ${headerTextColorClass}`}>
                                {exercise.name}
                              </span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-sm">
                              <div className={`${secondaryTextClass}`}>
                                <div className="font-semibold">Series</div>
                                <div>{exercise.sets}</div>
                              </div>
                              <div className={`${secondaryTextClass}`}>
                                <div className="font-semibold">Reps</div>
                                <div>{exercise.reps}</div>
                              </div>
                              <div className={`${secondaryTextClass}`}>
                                <div className="font-semibold">Descanso</div>
                                <div>{exercise.rest}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Desktop table (hidden on mobile) */}
                      <div className="hidden sm:block">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className={tableHeadBgClass}>
                              <th
                                className={`p-3 text-sm font-semibold uppercase tracking-wider ${tableHeadTextClass}`}
                              >
                                Ejercicio
                              </th>
                              <th
                                className={`p-3 text-sm font-semibold uppercase tracking-wider ${tableHeadTextClass}`}
                              >
                                Series
                              </th>
                              <th
                                className={`p-3 text-sm font-semibold uppercase tracking-wider ${tableHeadTextClass}`}
                              >
                                Repeticiones
                              </th>
                              <th
                                className={`p-3 text-sm font-semibold uppercase tracking-wider ${tableHeadTextClass}`}
                              >
                                Descanso
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {day.exercises.map((exercise, exIndex) => (
                              <tr
                                key={exIndex}
                                className={`${tableRowHoverClass} border-b ${borderColorClass}`}
                              >
                                <td
                                  className={`p-3 font-medium flex items-center gap-2 ${headerTextColorClass}`}
                                >
                                  <Dumbbell
                                    className={`h-4 w-4 ${headerIconColorClass}`}
                                  />
                                  {exercise.name}
                                </td>
                                <td className={`p-3 ${secondaryTextClass}`}>
                                  {exercise.sets}
                                </td>
                                <td className={`p-3 ${secondaryTextClass}`}>
                                  {exercise.reps}
                                </td>
                                <td className={`p-3 ${secondaryTextClass}`}>
                                  {exercise.rest}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      <div className="mt-4 text-right">
                        <Button
                          variant="outline"
                          className={`${buttonClass} bg-transparent text-sm`}
                          size="sm"
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Marcar día como completado
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}