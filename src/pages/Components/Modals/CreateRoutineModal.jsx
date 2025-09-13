import { useState, useEffect } from "react";
import { Button } from "../Button";
import { X, Plus, Trash2, Save, Loader2, Calendar, Clock, Dumbbell, Image, ChevronDown, ChevronUp } from "lucide-react";
import { createRoutine } from "../../../services/routines";
import ExerciseImageModal from "./ExerciseImageModal";
import ExerciseImageViewModal from "./ExerciseImageViewModal";

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
                order: 1,
                exerciseId: null
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
  const [imageModalOpen, setImageModalOpen] = useState({
    isOpen: false,
    exercisePath: null // Formato: "weekIndex-dayIndex-exerciseIndex"
  });
  const [imageViewModalOpen, setImageViewModalOpen] = useState({
    isOpen: false,
    exerciseId: null,
    exerciseName: null,
    exercisePath: null // Formato: "weekIndex-dayIndex-exerciseIndex"
  });
  const [expandedWeeks, setExpandedWeeks] = useState(new Set([0])); // Primera semana expandida por defecto
  const [expandedDays, setExpandedDays] = useState(new Set());

  // Effect to block body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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
              order: exerciseIndex + 1,
              exerciseId: exercise.exerciseId || null
            }))
          }))
        }))
      };


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
    const newWeekIndex = routine.weeks.length;
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
              order: 1,
              exerciseId: null
            }
          ]
        }
      ]
    };
    
    setRoutine(prev => ({
      ...prev,
      weeks: [...prev.weeks, newWeek]
    }));

    // Expandir automáticamente la nueva semana
    setExpandedWeeks(prev => new Set([...prev, newWeekIndex]));
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
          order: 1,
          exerciseId: null
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
      order: day.exercises.length + 1,
      exerciseId: null
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

  const openImageModal = (weekIndex, dayIndex, exerciseIndex) => {
    const exercise = routine.weeks[weekIndex].days[dayIndex].exercises[exerciseIndex];
    
    if (exercise.exerciseId) {
      // Si el ejercicio ya tiene imagen, abrir modal de visualización
      setImageViewModalOpen({
        isOpen: true,
        exerciseId: exercise.exerciseId,
        exerciseName: exercise.name,
        exercisePath: `${weekIndex}-${dayIndex}-${exerciseIndex}`
      });
    } else {
      // Si no tiene imagen, abrir modal de selección
      setImageModalOpen({
        isOpen: true,
        exercisePath: `${weekIndex}-${dayIndex}-${exerciseIndex}`
      });
    }
  };

  const closeImageModal = () => {
    setImageModalOpen({
      isOpen: false,
      exercisePath: null
    });
  };

  const closeImageViewModal = () => {
    setImageViewModalOpen({
      isOpen: false,
      exerciseId: null,
      exerciseName: null,
      exercisePath: null
    });
  };

  const handleEditImageFromView = () => {
    // Cerrar modal de visualización y abrir modal de selección
    closeImageViewModal();
    setImageModalOpen({
      isOpen: true,
      exercisePath: imageViewModalOpen.exercisePath
    });
  };

  const toggleWeek = (weekIndex) => {
    const newExpandedWeeks = new Set(expandedWeeks);
    if (newExpandedWeeks.has(weekIndex)) {
      newExpandedWeeks.delete(weekIndex);
    } else {
      newExpandedWeeks.add(weekIndex);
    }
    setExpandedWeeks(newExpandedWeeks);
  };

  const toggleDay = (weekIndex, dayIndex) => {
    const dayKey = `${weekIndex}-${dayIndex}`;
    const newExpandedDays = new Set(expandedDays);
    if (newExpandedDays.has(dayKey)) {
      newExpandedDays.delete(dayKey);
    } else {
      newExpandedDays.add(dayKey);
    }
    setExpandedDays(newExpandedDays);
  };

  const handleExerciseSelect = (exercise) => {
    if (!imageModalOpen.exercisePath) {
      return;
    }
    
    // Parsear la ruta del ejercicio (formato: "weekIndex-dayIndex-exerciseIndex")
    const [weekIndex, dayIndex, exerciseIndex] = imageModalOpen.exercisePath.split('-').map(Number);
    
    // Actualizar el ejercicio seleccionado con la información del ejercicio
    const week = routine.weeks[weekIndex];
    const day = week.days[dayIndex];
    const updatedExercises = day.exercises.map((ex, index) => 
      index === exerciseIndex 
        ? { ...ex, exerciseId: exercise.id, name: exercise.name }
        : ex
    );
    updateDay(weekIndex, dayIndex, 'exercises', updatedExercises);
    // Cerrar el modal
    closeImageModal();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl max-w-7xl w-full max-h-[95vh] overflow-y-auto shadow-2xl border border-gray-200">
        <div className="p-6">
          {/* Header */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <Plus className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900">
                    Crear Nueva Rutina
                  </h3>
                  <p className="text-gray-600">
                    Diseña tu rutina personalizada
                  </p>
                </div>
              </div>
              <Button
                onClick={onClose}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-3 rounded-lg transition-all duration-200"
              >
                <X className="h-5 w-5" />
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
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-600" />
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 bg-white"
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 bg-white"
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 bg-white"
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 bg-white"
                  placeholder="Notas especiales, consideraciones o instrucciones..."
                />
              </div>
            </div>
          </div>

          {/* Semanas */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-2 rounded-lg">
                  <Calendar className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Semanas</h4>
                  <p className="text-gray-600 text-sm">Organiza tu rutina por semanas</p>
                </div>
              </div>
              <Button
                onClick={addWeek}
                className="bg-gray-900 text-white hover:bg-gray-800 px-4 py-2 rounded-lg font-medium transition-all duration-200"
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar Semana
              </Button>
            </div>

            {routine.weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="bg-white border border-gray-200 rounded-lg mb-4 overflow-hidden">
                {/* Header de la Semana */}
                <div className="bg-gray-50 p-4 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="bg-gray-900 text-white px-3 py-1 rounded text-sm font-semibold">
                        Semana {week.weekNumber}
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          value={week.name}
                          onChange={(e) => updateWeek(weekIndex, 'name', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
                          placeholder="Nombre de la semana"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-500">
                        {week.days.length} día{week.days.length !== 1 ? 's' : ''}
                      </span>
                      <Button
                        onClick={() => toggleWeek(weekIndex)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-lg transition-all duration-200"
                      >
                        {expandedWeeks.has(weekIndex) ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                      {routine.weeks.length > 1 && (
                        <Button
                          onClick={() => removeWeek(weekIndex)}
                          className="bg-red-500 text-white hover:bg-red-600 p-2 rounded-lg transition-all duration-200"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {expandedWeeks.has(weekIndex) && (
                    <div className="mt-3">
                      <input
                        type="text"
                        value={week.comments || ""}
                        onChange={(e) => updateWeek(weekIndex, 'comments', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
                        placeholder="Comentarios sobre la semana..."
                      />
                    </div>
                  )}
                </div>

                {/* Días */}
                {expandedWeeks.has(weekIndex) && (
                  <div className="p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <h6 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-600" />
                        Días de Entrenamiento ({week.days.length})
                      </h6>
                      <Button
                        onClick={() => addDay(weekIndex)}
                        className="bg-gray-900 text-white hover:bg-gray-800 px-3 py-2 rounded-lg font-medium transition-all duration-200"
                      >
                        <Plus className="h-3 w-3 mr-2" />
                        Agregar Día
                      </Button>
                    </div>

                    {week.days.map((day, dayIndex) => (
                      <div key={dayIndex} className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                        {/* Header del Día */}
                        <div className="bg-white p-4 border-b border-gray-200">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <div className="bg-gray-900 text-white px-2 py-1 rounded text-xs font-semibold">
                                Día {day.dayNumber}
                              </div>
                              <div className="flex-1">
                                <input
                                  type="text"
                                  value={day.name}
                                  onChange={(e) => updateDay(weekIndex, dayIndex, 'name', e.target.value)}
                                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
                                  placeholder="Nombre del día"
                                />
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-gray-500">
                                {day.exercises.length} ejercicio{day.exercises.length !== 1 ? 's' : ''}
                              </span>
                              <Button
                                onClick={() => toggleDay(weekIndex, dayIndex)}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-1 rounded transition-all duration-200"
                              >
                                {expandedDays.has(`${weekIndex}-${dayIndex}`) ? (
                                  <ChevronUp className="h-3 w-3" />
                                ) : (
                                  <ChevronDown className="h-3 w-3" />
                                )}
                              </Button>
                              {week.days.length > 1 && (
                                <Button
                                  onClick={() => removeDay(weekIndex, dayIndex)}
                                  className="bg-red-500 text-white hover:bg-red-600 p-1 rounded transition-all duration-200"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              )}
                            </div>
                          </div>
                          
                          {expandedDays.has(`${weekIndex}-${dayIndex}`) && (
                            <div className="mt-3">
                              <input
                                type="text"
                                value={day.comments || ""}
                                onChange={(e) => updateDay(weekIndex, dayIndex, 'comments', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
                                placeholder="Comentarios sobre el día..."
                              />
                            </div>
                          )}
                        </div>

                        {/* Ejercicios */}
                        {expandedDays.has(`${weekIndex}-${dayIndex}`) && (
                          <div className="p-4">
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <h7 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                                  <Dumbbell className="h-4 w-4 text-gray-600" />
                                  Ejercicios ({day.exercises.length})
                                </h7>
                                <Button
                                  onClick={() => addExercise(weekIndex, dayIndex)}
                                  className="bg-gray-900 text-white hover:bg-gray-800 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                                >
                                  <Plus className="h-3 w-3 mr-1" />
                                  Agregar Ejercicio
                                </Button>
                              </div>

                              {day.exercises.map((exercise, exerciseIndex) => (
                                <div key={exerciseIndex} className="bg-white border border-gray-200 rounded-lg p-4">
                                  <div className="flex justify-between mb-3">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 flex-1">
                                      <div>
                                        <label className="flex text-xs font-semibold text-gray-700 mb-1 items-center gap-2">
                                          Nombre del Ejercicio *
                                          {exercise.exerciseId && (
                                            <span className="text-green-600 text-xs flex items-center gap-1">
                                              <Image className="h-3 w-3" />
                                              Imagen
                                            </span>
                                          )}
                                        </label>
                                        <input
                                          type="text"
                                          value={exercise.name}
                                          onChange={(e) => updateExercise(weekIndex, dayIndex, exerciseIndex, 'name', e.target.value)}
                                          className={`w-full p-2 border rounded-lg focus:ring-2 focus:border-transparent text-sm transition-all duration-200 ${
                                            exercise.exerciseId 
                                              ? 'border-green-300 focus:ring-green-500 bg-green-50' 
                                              : 'border-gray-300 focus:ring-gray-500'
                                          }`}
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
                                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent text-sm transition-all duration-200"
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
                                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent text-sm transition-all duration-200"
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
                                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent text-sm transition-all duration-200"
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
                                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent text-sm transition-all duration-200"
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
                                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent text-sm transition-all duration-200"
                                          placeholder="Notas sobre el ejercicio..."
                                        />
                                      </div>
                                    </div>
                                    <div className="flex flex-col gap-2 ml-3 items-center justify-center">
                                      <Button
                                        onClick={() => openImageModal(weekIndex, dayIndex, exerciseIndex)}
                                        className={`p-2 rounded-lg transition-all duration-200 ${
                                          exercise.exerciseId 
                                            ? 'bg-green-500 text-white hover:bg-green-600' 
                                            : 'bg-gray-900 text-white hover:bg-gray-800'
                                        }`}
                                        title={exercise.exerciseId ? "Cambiar imagen del ejercicio" : "Agregar imagen al ejercicio"}
                                      >
                                        <Image className="h-3 w-3" />
                                      </Button>
                                      {day.exercises.length > 1 && (
                                        <Button
                                          onClick={() => removeExercise(weekIndex, dayIndex, exerciseIndex)}
                                          className="bg-red-500 text-white hover:bg-red-600 p-2 rounded-lg transition-all duration-200"
                                        >
                                          <Trash2 className="h-3 w-3" />
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Botones de acción */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex justify-end gap-4">
              <Button
                onClick={onClose}
                className="bg-gray-500 text-white hover:bg-gray-600 px-6 py-3 rounded-lg font-medium transition-all duration-200"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving || successMessage}
                className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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

      {/* Modal de Imagen para Ejercicios */}
      <ExerciseImageModal
        isOpen={imageModalOpen.isOpen}
        onClose={closeImageModal}
        exercisePath={imageModalOpen.exercisePath}
        onExerciseSelect={handleExerciseSelect}
      />

      {/* Modal de Visualización de Imagen del Ejercicio */}
      <ExerciseImageViewModal
        isOpen={imageViewModalOpen.isOpen}
        onClose={closeImageViewModal}
        exerciseId={imageViewModalOpen.exerciseId}
        exerciseName={imageViewModalOpen.exerciseName}
        onEditImage={handleEditImageFromView}
      />
    </div>
  );
}
