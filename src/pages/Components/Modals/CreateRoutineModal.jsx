import { useState } from "react";
import { Button } from "../Button";
import { X, Plus, Trash2, Save, Loader2, Calendar, Clock, Dumbbell } from "lucide-react";
import { createRoutine } from "../../../services/routines";

export default function CreateRoutineModal({ 
  isOpen, 
  onClose, 
  onRoutineCreated,
  trainerId
}) {
  const [routine, setRoutine] = useState({
    name: "",
    description: "",
    comments: "",
    totalWeeks: 1,
    isActive: true,
    weeks: [
      {
        weekNumber: 1,
        name: "Semana 1",
        comments: "",
        days: [
          {
            dayNumber: 1,
            name: "Día 1",
            comments: "",
            exercises: [
              {
                name: "",
                sets: 3,
                repetitions: 10,
                restBetweenSets: 60,
                restBetweenExercises: 120,
                comments: "",
                order: 1
              }
            ]
          }
        ]
      }
    ]
  });

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError(null);
      setSuccessMessage(null);
      
      // Validar datos antes de enviar
      if (!routine.name || !routine.name.trim()) {
        throw new Error("El nombre de la rutina es requerido");
      }
      
      if (!routine.description || !routine.description.trim()) {
        throw new Error("La descripción de la rutina es requerida");
      }
      
      if (!routine.weeks || routine.weeks.length === 0) {
        throw new Error("La rutina debe tener al menos una semana");
      }
      
      // Validar que cada semana tenga días y ejercicios
      for (let i = 0; i < routine.weeks.length; i++) {
        const week = routine.weeks[i];
        if (!week.days || week.days.length === 0) {
          throw new Error(`La semana ${i + 1} debe tener al menos un día`);
        }
        
        for (let j = 0; j < week.days.length; j++) {
          const day = week.days[j];
          if (!day.exercises || day.exercises.length === 0) {
            throw new Error(`El día ${j + 1} de la semana ${i + 1} debe tener al menos un ejercicio`);
          }
          
          // Validar que cada ejercicio tenga los campos requeridos
          for (let k = 0; k < day.exercises.length; k++) {
            const exercise = day.exercises[k];
            if (!exercise.name || !exercise.name.trim()) {
              throw new Error(`El ejercicio ${k + 1} del día ${j + 1} de la semana ${i + 1} debe tener un nombre`);
            }
            if (!exercise.sets || exercise.sets < 1) {
              throw new Error(`El ejercicio ${k + 1} del día ${j + 1} de la semana ${i + 1} debe tener al menos 1 serie`);
            }
            if (!exercise.repetitions || exercise.repetitions < 1) {
              throw new Error(`El ejercicio ${k + 1} del día ${j + 1} de la semana ${i + 1} debe tener al menos 1 repetición`);
            }
          }
        }
      }
      
      // Preparar datos para enviar
      const createData = {
        name: routine.name.trim(),
        description: routine.description.trim(),
        comments: routine.comments ? routine.comments.trim() : "",
        totalWeeks: routine.weeks.length,
        isActive: routine.isActive,
        trainer_id: trainerId,
        weeks: routine.weeks.map((week, weekIndex) => ({
          weekNumber: weekIndex + 1,
          name: week.name.trim(),
          comments: week.comments ? week.comments.trim() : "",
          days: week.days.map((day, dayIndex) => ({
            dayNumber: dayIndex + 1,
            name: day.name.trim(),
            comments: day.comments ? day.comments.trim() : "",
            exercises: day.exercises.map((exercise, exerciseIndex) => ({
              name: exercise.name.trim(),
              sets: parseInt(exercise.sets),
              repetitions: parseInt(exercise.repetitions),
              restBetweenSets: parseInt(exercise.restBetweenSets),
              restBetweenExercises: parseInt(exercise.restBetweenExercises),
              comments: exercise.comments ? exercise.comments.trim() : "",
              order: exerciseIndex + 1
            }))
          }))
        }))
      };

      // Llamar a la API para crear la rutina
      console.log("Datos a enviar para crear rutina:", createData);
      
      const createdRoutine = await createRoutine(createData);
      console.log("Rutina creada exitosamente:", createdRoutine);
      
      // Mostrar mensaje de éxito
      setSuccessMessage("¡Rutina creada exitosamente!");
      
      // Notificar que se creó la rutina
      if (onRoutineCreated) {
        onRoutineCreated();
      }
      
      // Cerrar el modal después de un breve delay para mostrar el mensaje de éxito
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const updateRoutineField = (field, value) => {
    setRoutine(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addWeek = () => {
    const newWeek = {
      weekNumber: routine.weeks.length + 1,
      name: `Semana ${routine.weeks.length + 1}`,
      comments: "",
      days: [
        {
          dayNumber: 1,
          name: `Día 1`,
          comments: "",
          exercises: [
            {
              name: "",
              sets: 3,
              repetitions: 10,
              restBetweenSets: 60,
              restBetweenExercises: 120,
              comments: "",
              order: 1
            }
          ]
        }
      ]
    };
    
    setRoutine(prev => ({
      ...prev,
      weeks: [...prev.weeks, newWeek]
    }));
  };

  const removeWeek = (weekIndex) => {
    setRoutine(prev => ({
      ...prev,
      weeks: prev.weeks.filter((_, index) => index !== weekIndex)
    }));
  };

  const updateWeek = (weekIndex, field, value) => {
    setRoutine(prev => ({
      ...prev,
      weeks: prev.weeks.map((week, index) => 
        index === weekIndex ? { ...week, [field]: value } : week
      )
    }));
  };

  const addDay = (weekIndex) => {
    const week = routine.weeks[weekIndex];
    const newDay = {
      dayNumber: week.days.length + 1,
      name: `Día ${week.days.length + 1}`,
      comments: "",
      exercises: [
        {
          name: "",
          sets: 3,
          repetitions: 10,
          restBetweenSets: 60,
          restBetweenExercises: 120,
          comments: "",
          order: 1
        }
      ]
    };
    
    updateWeek(weekIndex, 'days', [...week.days, newDay]);
  };

  const removeDay = (weekIndex, dayIndex) => {
    const week = routine.weeks[weekIndex];
    const updatedDays = week.days.filter((_, index) => index !== dayIndex);
    updateWeek(weekIndex, 'days', updatedDays);
  };

  const updateDay = (weekIndex, dayIndex, field, value) => {
    const week = routine.weeks[weekIndex];
    const updatedDays = week.days.map((day, index) => 
      index === dayIndex ? { ...day, [field]: value } : day
    );
    updateWeek(weekIndex, 'days', updatedDays);
  };

  const addExercise = (weekIndex, dayIndex) => {
    const week = routine.weeks[weekIndex];
    const day = week.days[dayIndex];
    const newExercise = {
      name: "",
      sets: 3,
      repetitions: 10,
      restBetweenSets: 60,
      restBetweenExercises: 120,
      comments: "",
      order: day.exercises.length + 1
    };
    
    const updatedExercises = [...day.exercises, newExercise];
    updateDay(weekIndex, dayIndex, 'exercises', updatedExercises);
  };

  const removeExercise = (weekIndex, dayIndex, exerciseIndex) => {
    const week = routine.weeks[weekIndex];
    const day = week.days[dayIndex];
    const updatedExercises = day.exercises.filter((_, index) => index !== exerciseIndex);
    updateDay(weekIndex, dayIndex, 'exercises', updatedExercises);
  };

  const updateExercise = (weekIndex, dayIndex, exerciseIndex, field, value) => {
    const week = routine.weeks[weekIndex];
    const day = week.days[dayIndex];
    const updatedExercises = day.exercises.map((exercise, index) => 
      index === exerciseIndex ? { ...exercise, [field]: value } : exercise
    );
    updateDay(weekIndex, dayIndex, 'exercises', updatedExercises);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl max-w-7xl w-full max-h-[95vh] overflow-y-auto shadow-2xl border border-gray-200">
        <div className="p-6">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-6 mb-8 text-white shadow-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-3 rounded-full">
                  <Plus className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold">
                    Crear Nueva Rutina
                  </h3>
                  <p className="text-green-100 text-lg">
                    Diseña tu rutina personalizada
                  </p>
                </div>
              </div>
              <Button
                onClick={onClose}
                className="bg-white/20 text-white hover:bg-white/30 p-3 rounded-full transition-all duration-200 hover:scale-105"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {successMessage && (
            <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
              <p className="text-green-700">{successMessage}</p>
            </div>
          )}

          {/* Información básica de la rutina */}
          <div className="bg-gradient-to-br from-gray-50 to-green-50 rounded-xl p-6 mb-8 border border-gray-200 shadow-sm">
            <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-600" />
              Información de la Rutina
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Nombre de la Rutina *
                </label>
                <input
                  type="text"
                  value={routine.name}
                  onChange={(e) => updateRoutineField('name', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
                  placeholder="Ej: Rutina de Fuerza"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Estado
                </label>
                <select
                  value={routine.isActive ? 'true' : 'false'}
                  onChange={(e) => updateRoutineField('isActive', e.target.value === 'true')}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
                >
                  <option value="true">✅ Activa</option>
                  <option value="false">⏸️ Inactiva</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Descripción *
                </label>
                <textarea
                  value={routine.description}
                  onChange={(e) => updateRoutineField('description', e.target.value)}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
                  placeholder="Describe el objetivo y enfoque de esta rutina..."
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Comentarios Adicionales
                </label>
                <textarea
                  value={routine.comments || ""}
                  onChange={(e) => updateRoutineField('comments', e.target.value)}
                  rows={2}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
                  placeholder="Notas especiales, consideraciones o instrucciones..."
                />
              </div>
            </div>
          </div>

          {/* Semanas */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-gray-800">Semanas</h4>
                  <p className="text-gray-600">Organiza tu rutina por semanas</p>
                </div>
              </div>
              <Button
                onClick={addWeek}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                <Plus className="h-5 w-5 mr-2" />
                Agregar Semana
              </Button>
            </div>

            {routine.weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="bg-white rounded-xl border border-gray-200 shadow-lg mb-6 overflow-hidden">
                {/* Header de la Semana */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                        Semana {week.weekNumber}
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          value={week.name}
                          onChange={(e) => updateWeek(weekIndex, 'name', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="Nombre de la semana"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 bg-white px-2 py-1 rounded-full">
                        {week.days.length} día{week.days.length !== 1 ? 's' : ''}
                      </span>
                      {routine.weeks.length > 1 && (
                        <Button
                          onClick={() => removeWeek(weekIndex)}
                          className="bg-red-500 text-white hover:bg-red-600 p-2 rounded-full transition-all duration-200 hover:scale-110"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <input
                      type="text"
                      value={week.comments || ""}
                      onChange={(e) => updateWeek(weekIndex, 'comments', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Comentarios sobre la semana..."
                    />
                  </div>
                </div>

                {/* Días */}
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <h6 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                      <Clock className="h-5 w-5 text-indigo-600" />
                      Días de Entrenamiento ({week.days.length})
                    </h6>
                    <Button
                      onClick={() => addDay(weekIndex)}
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Agregar Día
                    </Button>
                  </div>

                  {week.days.map((day, dayIndex) => (
                    <div key={dayIndex} className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                      {/* Header del Día */}
                      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-4">
                            <div className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                              Día {day.dayNumber}
                            </div>
                            <div className="flex-1">
                              <input
                                type="text"
                                value={day.name}
                                onChange={(e) => updateDay(weekIndex, dayIndex, 'name', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                                placeholder="Nombre del día"
                              />
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600 bg-white px-2 py-1 rounded-full">
                              {day.exercises.length} ejercicio{day.exercises.length !== 1 ? 's' : ''}
                            </span>
                            {week.days.length > 1 && (
                              <Button
                                onClick={() => removeDay(weekIndex, dayIndex)}
                                className="bg-red-500 text-white hover:bg-red-600 p-2 rounded-full transition-all duration-200 hover:scale-110"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          <input
                            type="text"
                            value={day.comments || ""}
                            onChange={(e) => updateDay(weekIndex, dayIndex, 'comments', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                            placeholder="Comentarios sobre el día..."
                          />
                        </div>
                      </div>

                      {/* Ejercicios */}
                      <div className="p-4">
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <h7 className="text-md font-semibold text-gray-700 flex items-center gap-2">
                              <Dumbbell className="h-4 w-4 text-purple-600" />
                              Ejercicios ({day.exercises.length})
                            </h7>
                            <Button
                              onClick={() => addExercise(weekIndex, dayIndex)}
                              className="bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:from-purple-600 hover:to-pink-700 px-3 py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                            >
                              <Plus className="h-3 w-3 mr-1" />
                              Agregar Ejercicio
                            </Button>
                          </div>

                          {day.exercises.map((exercise, exerciseIndex) => (
                            <div key={exerciseIndex} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                              <div className="flex justify-between items-start mb-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
                                  <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                                      Nombre del Ejercicio *
                                    </label>
                                    <input
                                      type="text"
                                      value={exercise.name}
                                      onChange={(e) => updateExercise(weekIndex, dayIndex, exerciseIndex, 'name', e.target.value)}
                                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm transition-all duration-200"
                                      placeholder="Ej: Press de Banca"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                                      Series *
                                    </label>
                                    <input
                                      type="number"
                                      value={exercise.sets}
                                      onChange={(e) => updateExercise(weekIndex, dayIndex, exerciseIndex, 'sets', parseInt(e.target.value))}
                                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm transition-all duration-200"
                                      min="1"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                                      Repeticiones *
                                    </label>
                                    <input
                                      type="number"
                                      value={exercise.repetitions}
                                      onChange={(e) => updateExercise(weekIndex, dayIndex, exerciseIndex, 'repetitions', parseInt(e.target.value))}
                                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm transition-all duration-200"
                                      min="1"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                                      Descanso entre series (seg)
                                    </label>
                                    <input
                                      type="number"
                                      value={exercise.restBetweenSets}
                                      onChange={(e) => updateExercise(weekIndex, dayIndex, exerciseIndex, 'restBetweenSets', parseInt(e.target.value))}
                                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm transition-all duration-200"
                                      min="0"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                                      Descanso entre ejercicios (seg)
                                    </label>
                                    <input
                                      type="number"
                                      value={exercise.restBetweenExercises}
                                      onChange={(e) => updateExercise(weekIndex, dayIndex, exerciseIndex, 'restBetweenExercises', parseInt(e.target.value))}
                                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm transition-all duration-200"
                                      min="0"
                                    />
                                  </div>
                                  <div className="md:col-span-2">
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                                      Comentarios
                                    </label>
                                    <input
                                      type="text"
                                      value={exercise.comments || ""}
                                      onChange={(e) => updateExercise(weekIndex, dayIndex, exerciseIndex, 'comments', e.target.value)}
                                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm transition-all duration-200"
                                      placeholder="Notas sobre el ejercicio..."
                                    />
                                  </div>
                                </div>
                                {day.exercises.length > 1 && (
                                  <Button
                                    onClick={() => removeExercise(weekIndex, dayIndex, exerciseIndex)}
                                    className="bg-red-500 text-white hover:bg-red-600 p-2 rounded-full ml-3 transition-all duration-200 hover:scale-110"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Botones de acción */}
          <div className="bg-gradient-to-r from-gray-50 to-green-50 rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex justify-end gap-4">
              <Button
                onClick={onClose}
                className="bg-gray-500 text-white hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 shadow-md"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving || successMessage}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    Creando Rutina...
                  </>
                ) : successMessage ? (
                  <>
                    <Save className="h-5 w-5 mr-2" />
                    ¡Creada!
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5 mr-2" />
                    Crear Rutina
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
