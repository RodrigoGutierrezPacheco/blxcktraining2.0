import { useState, useEffect } from "react";
import { Button } from "../Button";
import {
  X,
  Dumbbell,
  Calendar,
  Users,
  CheckCircle,
  Clock,
  ArrowLeft,
  Target,
  CheckCircle2,
  XCircle,
  Plus,
  Trash2,
  Image,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { getRoutineById } from "../../../services/routines";
import { exercisesService } from "../../../services/exercises";
import { useAuth } from "../../../context/useAuth";
import CreateRoutineModal from "./CreateRoutineModal";
import DeleteRoutineModal from "./DeleteRoutineModal";
import ExerciseImageViewModal from "./ExerciseImageViewModal";

export default function TrainerRoutinesModal({
  isOpen,
  onClose,
  routinesData,
  onEditRoutine,
  onRoutineCreated,
  openCreateModal = false,
  trainerId,
}) {
  const { token } = useAuth();
  const [viewMode, setViewMode] = useState("list"); // 'list' o 'details'
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [isLoadingRoutine, setIsLoadingRoutine] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [routineToDelete, setRoutineToDelete] = useState(null);
  const [showImageViewModal, setShowImageViewModal] = useState(false);
  const [selectedExerciseId, setSelectedExerciseId] = useState(null);
  const [exerciseImageData, setExerciseImageData] = useState(null);
  const [showExerciseImage, setShowExerciseImage] = useState(false);
  const [showExerciseImageModal, setShowExerciseImageModal] = useState(false);
  const [expandedWeeks, setExpandedWeeks] = useState(new Set());
  const [expandedDays, setExpandedDays] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");

  // Effect to open create modal when openCreateModal prop is true
  useEffect(() => {
    if (isOpen && openCreateModal) {
      setShowCreateModal(true);
    }
  }, [isOpen, openCreateModal]);

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

  const handleViewDetails = async (routineId) => {
    try {
      setIsLoadingRoutine(true);
      const routineData = await getRoutineById(routineId);
      setSelectedRoutine(routineData);
      setViewMode("details");
      
      // Expandir automáticamente la primera semana
      if (routineData.weeks && routineData.weeks.length > 0) {
        setExpandedWeeks(new Set([0]));
      }
    } catch (error) {
      console.error("Error al cargar la rutina:", error);
      // Aquí podrías mostrar un mensaje de error al usuario
    } finally {
      setIsLoadingRoutine(false);
    }
  };

  const handleBackToList = () => {
    setViewMode("list");
    setSelectedRoutine(null);
    setExpandedWeeks(new Set());
    setExpandedDays(new Set());
  };

  const handleCreateRoutine = () => {
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const handleRoutineCreated = () => {
    // Notificar que se creó una nueva rutina
    if (onRoutineCreated) {
      onRoutineCreated();
    }
  };

  const handleDeleteRoutine = (routine) => {
    setRoutineToDelete(routine);
    setShowDeleteModal(true);
  };

  const handleViewExerciseImage = async (exerciseId) => {
    try {
      setIsLoadingRoutine(true);
      setSelectedExerciseId(exerciseId);
      const imageData = await exercisesService.getExerciseImage(token, exerciseId);
      setExerciseImageData(imageData);
      setShowExerciseImageModal(true);
    } catch (error) {
      console.error('Error loading exercise image:', error);
      // Fallback al modal original si hay error
      setShowImageViewModal(true);
    } finally {
      setIsLoadingRoutine(false);
    }
  };

  const closeImageViewModal = () => {
    setShowImageViewModal(false);
    setSelectedExerciseId(null);
  };

  const handleBackToRoutine = () => {
    setShowExerciseImage(false);
    setExerciseImageData(null);
    setSelectedExerciseId(null);
  };

  const closeExerciseImageModal = () => {
    setShowExerciseImageModal(false);
    setExerciseImageData(null);
    setSelectedExerciseId(null);
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

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setRoutineToDelete(null);
  };

  const handleRoutineDeleted = () => {
    // Notificar que se eliminó una rutina
    if (onRoutineCreated) {
      onRoutineCreated();
    }
  };

  // Filtrar rutinas basado en el término de búsqueda
  const filteredRoutines = routinesData?.filter(routine => 
    routine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    routine.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (routine.comments && routine.comments.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50">
      <div className="bg-white/95 backdrop-blur-md w-full h-full overflow-y-auto shadow-2xl border border-gray-200">
        <div className="p-6">
          {/* Header con navegación */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
              {viewMode === "details" && (
                <Button
                  onClick={handleBackToList}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-lg transition-all duration-200"
                >
                    <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
                <div className="bg-gray-100 p-2 rounded-lg">
                  <Dumbbell className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                {viewMode === "list"
                  ? "Mis Rutinas Creadas"
                  : "Detalles de la Rutina"}
              </h3>
                  <p className="text-gray-600 text-sm">
                    {viewMode === "list"
                      ? "Gestiona tus rutinas de entrenamiento"
                      : "Información detallada de la rutina"}
                  </p>
                </div>
            </div>
            <div className="flex items-center gap-3">
              {viewMode === "list" && (
                <Button
                  onClick={handleCreateRoutine}
                    className="bg-gray-900 text-white hover:bg-gray-800 px-4 py-2 rounded-lg font-medium transition-all duration-200"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Crear Rutina
                </Button>
              )}
              <Button
                onClick={onClose}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-lg transition-all duration-200"
              >
                  <X className="h-4 w-4" />
              </Button>
              </div>
            </div>
          </div>

          {/* Contenido condicional según el modo de vista */}
          {viewMode === "list" ? (
            // Vista de lista de rutinas
            <>
              {/* Buscador de rutinas */}
              {routinesData && routinesData.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Buscar rutinas por nombre, descripción o comentarios..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm("")}
                        className="text-gray-400 hover:text-gray-600 p-2"
                        title="Limpiar búsqueda"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  {searchTerm && (
                    <div className="mt-2 text-sm text-gray-600">
                      {filteredRoutines.length > 0 ? (
                        <span>Mostrando {filteredRoutines.length} de {routinesData.length} rutinas</span>
                      ) : (
                        <span>No se encontraron rutinas que coincidan con "{searchTerm}"</span>
                      )}
                    </div>
                  )}
                </div>
              )}

              {filteredRoutines.length > 0 ? (
                <div className="grid gap-4">
                  {filteredRoutines.map((routine) => (
                    <div
                      key={routine.id}
                      className="bg-white p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">
                            {routine.name}
                          </h4>
                          <p className="text-gray-600 mb-3">
                            {routine.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {routine.isActive ? (
                            <span className="px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded text-xs font-medium flex items-center gap-1">
                              <CheckCircle className="h-3 w-3" />
                              Activa
                            </span>
                          ) : (
                            <span className="px-3 py-1 bg-gray-50 text-gray-600 border border-gray-200 rounded text-xs font-medium">
                              Inactiva
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-600" />
                          <span>
                            <span className="font-medium">Duración:</span>{" "}
                            {routine.totalWeeks} semana
                            {routine.totalWeeks !== 1 ? "s" : ""}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-600" />
                          <span>
                            <span className="font-medium">Creada:</span>{" "}
                            {new Date(routine.createdAt).toLocaleDateString(
                              "es-ES"
                            )}
                          </span>
                        </div>
                      </div>

                      {routine.comments && (
                        <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                          <p className="text-sm text-gray-700">
                            <span className="font-medium text-gray-900">Comentarios:</span>{" "}
                            {routine.comments}
                          </p>
                        </div>
                      )}

                      <div className="mt-4 flex gap-2">
                        <Button
                          onClick={() => handleViewDetails(routine.id)}
                          className="bg-gray-900 text-white hover:bg-gray-800 text-sm px-3 py-2 rounded-lg font-medium transition-all duration-200"
                        >
                          <Dumbbell className="mr-1 h-4 w-4" />
                          Ver Detalles
                        </Button>
                        <Button
                          onClick={() => onEditRoutine(routine.id)}
                          className="bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm px-3 py-2 rounded-lg font-medium transition-all duration-200"
                        >
                          Editar
                        </Button>
                        <Button
                          onClick={() => handleDeleteRoutine(routine)}
                          className="bg-red-500 text-white hover:bg-red-600 text-sm px-3 py-2 rounded-lg font-medium transition-all duration-200"
                        >
                          <Trash2 className="mr-1 h-4 w-4" />
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : searchTerm ? (
                <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                  <div className="bg-gray-100 rounded-lg w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No se encontraron rutinas
                  </h3>
                  <p className="text-gray-600 mb-4">
                    No hay rutinas que coincidan con "{searchTerm}"
                  </p>
                  <Button
                    onClick={() => setSearchTerm("")}
                    className="bg-gray-900 text-white hover:bg-gray-800 px-4 py-2 rounded-lg font-medium transition-all duration-200"
                  >
                    Limpiar Búsqueda
                  </Button>
                </div>
              ) : (
                <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                  <div className="bg-gray-100 rounded-lg w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Dumbbell className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No tienes rutinas creadas aún
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Crea tu primera rutina para comenzar a entrenar clientes
                  </p>
                  <Button
                    onClick={handleCreateRoutine}
                    className="bg-gray-900 text-white hover:bg-gray-800 px-4 py-2 rounded-lg font-medium transition-all duration-200"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Crear Primera Rutina
                  </Button>
                </div>
              )}
            </>
          ) : (
            // Vista de detalles de la rutina
            <>
              {isLoadingRoutine ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600 text-lg">
                    Cargando detalles de la rutina...
                  </p>
                </div>
              ) : selectedRoutine ? (
                <div className="space-y-6">
                  {/* Header de la rutina */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-gray-100 p-3 rounded-lg">
                        <Dumbbell className="h-6 w-6 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-1">
                          {selectedRoutine.name}
                        </h3>
                        <p className="text-gray-600">
                          {selectedRoutine.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Información de la Rutina */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-white p-2 rounded-lg border border-gray-200">
                          <Calendar className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-medium">
                            Duración
                          </p>
                          <p className="text-lg font-semibold text-gray-900">
                            {selectedRoutine.totalWeeks} semana
                            {selectedRoutine.totalWeeks !== 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-white p-2 rounded-lg border border-gray-200">
                          <Target className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-medium">
                            Estado
                          </p>
                          <div className="flex items-center gap-2">
                            {selectedRoutine.isActive ? (
                              <>
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                <span className="text-lg font-semibold text-gray-900">
                                  Activa
                                </span>
                              </>
                            ) : (
                              <>
                                <XCircle className="h-4 w-4 text-red-500" />
                                <span className="text-lg font-semibold text-gray-900">
                                  Inactiva
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-white p-2 rounded-lg border border-gray-200">
                          <Clock className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-medium">
                            Creada
                          </p>
                          <p className="text-lg font-semibold text-gray-900">
                            {new Date(
                              selectedRoutine.createdAt
                            ).toLocaleDateString("es-ES")}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-white p-2 rounded-lg border border-gray-200">
                          <Users className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-medium">
                            Total Ejercicios
                          </p>
                          <p className="text-lg font-semibold text-gray-900">
                            {selectedRoutine.weeks?.reduce(
                              (total, week) =>
                                total +
                                week.days?.reduce(
                                  (dayTotal, day) =>
                                    dayTotal + (day.exercises?.length || 0),
                                  0
                                ),
                              0
                            ) || 0}
                          </p>
                        </div>
                      </div>
                    </div>

                    {selectedRoutine.suggestedStartDate && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 p-2 rounded-lg border border-blue-200">
                            <Calendar className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-xs text-blue-600 font-medium">
                              Inicio Sugerido
                            </p>
                            <p className="text-lg font-semibold text-blue-900">
                              {new Date(selectedRoutine.suggestedStartDate).toLocaleDateString("es-ES")}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedRoutine.suggestedEndDate && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-green-100 p-2 rounded-lg border border-green-200">
                            <Calendar className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="text-xs text-green-600 font-medium">
                              Fin Sugerido
                            </p>
                            <p className="text-lg font-semibold text-green-900">
                              {new Date(selectedRoutine.suggestedEndDate).toLocaleDateString("es-ES")}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Comentarios */}
                  {selectedRoutine.comments && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                      <h4 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Target className="h-4 w-4 text-gray-600" />
                        Comentarios de la Rutina
                      </h4>
                      <p className="text-gray-700 leading-relaxed">
                        {selectedRoutine.comments}
                      </p>
                    </div>
                  )}

                  {/* Resumen de la Rutina */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <h4 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Dumbbell className="h-4 w-4 text-gray-600" />
                      Resumen de la Rutina
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center bg-white rounded-lg p-4 border border-gray-200">
                        <div className="bg-gray-100 rounded-lg w-12 h-12 flex items-center justify-center mx-auto mb-2">
                          <span className="text-xl font-semibold text-gray-900">
                            {selectedRoutine.weeks?.length || 0}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 font-medium">
                          Semanas
                        </p>
                      </div>
                      <div className="text-center bg-white rounded-lg p-4 border border-gray-200">
                        <div className="bg-gray-100 rounded-lg w-12 h-12 flex items-center justify-center mx-auto mb-2">
                          <span className="text-xl font-semibold text-gray-900">
                            {selectedRoutine.weeks?.reduce(
                              (total, week) => total + (week.days?.length || 0),
                              0
                            ) || 0}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 font-medium">
                          Días de Entrenamiento
                        </p>
                      </div>
                      <div className="text-center bg-white rounded-lg p-4 border border-gray-200">
                        <div className="bg-gray-100 rounded-lg w-12 h-12 flex items-center justify-center mx-auto mb-2">
                          <span className="text-xl font-semibold text-gray-900">
                            {selectedRoutine.weeks?.reduce(
                              (total, week) =>
                                total +
                                week.days?.reduce(
                                  (dayTotal, day) =>
                                    dayTotal + (day.exercises?.length || 0),
                                  0
                                ),
                              0
                            ) || 0}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 font-medium">
                          Ejercicios
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Plan de Entrenamiento */}
                  <div className="space-y-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-gray-100 p-2 rounded-lg">
                            {showExerciseImage ? <Image className="h-4 w-4 text-gray-600" /> : <Calendar className="h-4 w-4 text-gray-600" />}
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">
                              {showExerciseImage ? 'Imagen del Ejercicio' : 'Plan de Entrenamiento'}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {showExerciseImage ? 'Vista detallada del ejercicio' : 'Estructura completa de la rutina'}
                            </p>
                          </div>
                        </div>
                        {showExerciseImage && (
                          <Button
                            onClick={handleBackToRoutine}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium transition-all duration-200"
                          >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Regresar a Rutina
                          </Button>
                        )}
                      </div>
                    </div>

                    {showExerciseImage ? (
                      /* Vista de Imagen del Ejercicio */
                      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        {isLoadingRoutine ? (
                          <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-600 mx-auto"></div>
                            <p className="text-gray-600 mt-4 text-lg">Cargando imagen del ejercicio...</p>
                          </div>
                        ) : exerciseImageData ? (
                          <div className="p-6 space-y-6">
                            {/* Información del ejercicio */}
                            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                              <h5 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Image className="h-4 w-4 text-gray-600" />
                                Información del Ejercicio
                              </h5>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                                    ID del Ejercicio
                                  </label>
                                  <p className="text-gray-600 font-mono text-sm bg-white p-2 rounded border border-gray-200">
                                    {exerciseImageData.exerciseId}
                                  </p>
                                </div>
                                <div>
                                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                                    Nombre del Ejercicio
                                  </label>
                                  <p className="text-gray-900 font-semibold text-lg">
                                    {exerciseImageData.exerciseName}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Imagen del ejercicio */}
                            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                              <h5 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Image className="h-4 w-4 text-gray-600" />
                                Imagen del Ejercicio
                              </h5>
                              
                              {exerciseImageData.image?.url ? (
                                <div className="text-center">
                                  <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm inline-block">
                                    <img
                                      src={exerciseImageData.image.url}
                                      alt={exerciseImageData.exerciseName}
                                      className="max-w-full h-auto max-h-96 rounded-lg shadow-md"
                                      onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'block';
                                      }}
                                    />
                                    <div 
                                      className="hidden bg-gray-100 rounded-lg p-8 text-center"
                                      style={{ minHeight: '200px', display: 'none' }}
                                    >
                                      <Image className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                                      <p className="text-gray-600 text-lg">No se pudo cargar la imagen</p>
                                    </div>
                                  </div>
                                  
                                  <div className="mt-4 space-y-2">
                                    <div className="flex items-center justify-center gap-2">
                                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm font-medium border border-gray-200">
                                        {exerciseImageData.image.type?.toUpperCase() || 'Imagen'}
                                      </span>
                                      {exerciseImageData.image.imageId && (
                                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded text-xs font-medium font-mono border border-gray-200">
                                          ID: {exerciseImageData.image.imageId}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="text-center py-8">
                                  <Image className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                                  <p className="text-gray-600 text-lg">No hay imagen disponible para este ejercicio</p>
                                </div>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="p-6 text-center">
                            <Image className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 text-lg">No se pudo cargar la información del ejercicio</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      /* Vista del Plan de Entrenamiento */
                      selectedRoutine.weeks?.map((week, weekIndex) => (
                      <div
                        key={week.id || weekIndex}
                        className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                      >
                        {/* Header de la Semana */}
                        <div className="bg-gray-50 p-4 border-b border-gray-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="bg-gray-900 text-white px-3 py-1 rounded text-sm font-semibold">
                                Semana {week.weekNumber}
                              </div>
                              <div>
                                <h5 className="text-lg font-semibold text-gray-900">
                                  {week.name}
                                </h5>
                                {week.comments && (
                                  <p className="text-gray-600 mt-1 text-sm">
                                    {week.comments}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-sm text-gray-500">
                                  {week.days?.length || 0} días
                                </p>
                              </div>
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
                            </div>
                          </div>
                        </div>

                        {/* Días */}
                        {expandedWeeks.has(weekIndex) && (
                          <div className="p-4 space-y-4">
                          {week.days?.map((day, dayIndex) => (
                            <div
                              key={day.id || dayIndex}
                              className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden"
                            >
                              {/* Header del Día */}
                              <div className="bg-white p-4 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className="bg-gray-900 text-white px-2 py-1 rounded text-xs font-semibold">
                                      Día {day.dayNumber}
                                    </div>
                                    <div>
                                      <h6 className="text-base font-semibold text-gray-900">
                                        {day.name}
                                      </h6>
                                      {day.comments && (
                                        <p className="text-gray-600 mt-1 text-xs">
                                          {day.comments}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3">
                                  <div className="text-right">
                                      <p className="text-xs text-gray-500">
                                        {day.exercises?.length || 0} ejercicios
                                      </p>
                                    </div>
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
                                  </div>
                                </div>
                              </div>

                              {/* Ejercicios */}
                              {expandedDays.has(`${weekIndex}-${dayIndex}`) && (
                              <div className="p-4">
                                  <div className="space-y-3">
                                  {day.exercises?.map(
                                    (exercise, exerciseIndex) => (
                                      <div
                                        key={exercise.id || exerciseIndex}
                                        className="bg-white border border-gray-200 rounded-lg p-4"
                                      >
                                        <div className="flex items-center justify-between mb-3">
                                          <div className="flex items-center gap-3">
                                            <div className="bg-gray-900 text-white px-2 py-1 rounded text-xs font-semibold">
                                              {exercise.order}
                                            </div>
                                            <h6 className="text-base font-semibold text-gray-900">
                                              {exercise.name}
                                            </h6>
                                          </div>
                                          {exercise.comments && (
                                            <span className="text-xs text-gray-500">
                                              {exercise.comments}
                                            </span>
                                          )}
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                                          <div className="text-center bg-gray-50 rounded-lg p-3 border border-gray-200">
                                            <p className="text-xs text-gray-500 font-medium mb-1">
                                              Series
                                            </p>
                                            <p className="text-lg font-semibold text-gray-900">
                                              {exercise.sets}
                                            </p>
                                          </div>
                                          <div className="text-center bg-gray-50 rounded-lg p-3 border border-gray-200">
                                            <p className="text-xs text-gray-500 font-medium mb-1">
                                              Repeticiones
                                            </p>
                                            <p className="text-lg font-semibold text-gray-900">
                                              {exercise.repetitions}
                                            </p>
                                          </div>
                                          <div className="text-center bg-gray-50 rounded-lg p-3 border border-gray-200">
                                            <p className="text-xs text-gray-500 font-medium mb-1">
                                              Descanso entre series
                                            </p>
                                            <p className="text-sm font-semibold text-gray-900">
                                              {exercise.restBetweenSets}s
                                            </p>
                                          </div>
                                          <div className="text-center bg-gray-50 rounded-lg p-3 border border-gray-200">
                                            <p className="text-xs text-gray-500 font-medium mb-1">
                                              Descanso entre ejercicios
                                            </p>
                                            <p className="text-sm font-semibold text-gray-900">
                                              {exercise.restBetweenExercises}s
                                            </p>
                                          </div>
                                          <div 
                                            className={`text-center rounded-lg p-3 border transition-all duration-200 ${
                                              exercise.exerciseId 
                                                ? 'bg-green-50 border-green-200 hover:bg-green-100 cursor-pointer' 
                                                : 'bg-gray-50 border-gray-200'
                                            }`}
                                            onClick={exercise.exerciseId ? () => handleViewExerciseImage(exercise.exerciseId) : undefined}
                                          >
                                            <p className={`text-xs font-medium mb-1 ${
                                              exercise.exerciseId ? 'text-green-600' : 'text-gray-500'
                                            }`}>
                                              Imagen
                                            </p>
                                            <div className="flex items-center justify-center gap-1">
                                              {exercise.exerciseId ? (
                                                <>
                                                  <Image className="h-3 w-3 text-green-600" />
                                                  <p className="text-sm font-semibold text-green-700">
                                                    Ver
                                                  </p>
                                                </>
                                              ) : (
                                                <p className="text-sm font-semibold text-gray-600">
                                                  No
                                                </p>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                              )}
                            </div>
                          ))}
                        </div>
                        )}
                      </div>
                      ))
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-red-200 rounded-lg p-8 text-center">
                  <div className="bg-red-50 rounded-lg w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <XCircle className="h-8 w-8 text-red-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Error al cargar la rutina
                  </h3>
                  <p className="text-gray-600 mb-4">
                    No se pudieron cargar los detalles de la rutina
                  </p>
                  <Button
                    onClick={handleBackToList}
                    className="bg-gray-900 text-white hover:bg-gray-800 px-4 py-2 rounded-lg font-medium transition-all duration-200"
                  >
                    Volver a la lista
                  </Button>
                </div>
              )}
            </>
          )}

          {/* Modal de Crear Rutina */}
          <CreateRoutineModal
            isOpen={showCreateModal}
            onClose={handleCloseCreateModal}
            onRoutineCreated={handleRoutineCreated}
            trainerId={trainerId}
          />

          {/* Modal de Eliminar Rutina */}
          <DeleteRoutineModal
            isOpen={showDeleteModal}
            onClose={handleCloseDeleteModal}
            routine={routineToDelete}
            onRoutineDeleted={handleRoutineDeleted}
          />

          {/* Modal de Imagen del Ejercicio */}
          <ExerciseImageViewModal
            isOpen={showImageViewModal}
            onClose={closeImageViewModal}
            exerciseId={selectedExerciseId}
          />

          {/* Modal interno para mostrar imagen del ejercicio */}
          {showExerciseImageModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-60 flex items-center justify-center p-4 overflow-y-hidden">
              <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200">
                {/* Header del modal */}
                <div className="bg-white border-b border-gray-200 p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {exerciseImageData?.exerciseName || 'Imagen del Ejercicio'}
                      </h3>
                    </div>
                    <Button
                      onClick={closeExerciseImageModal}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-lg transition-all duration-200"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Contenido del modal - Solo la imagen */}
                <div className="p-6 flex items-center justify-center min-h-[500px]">
                  {isLoadingRoutine ? (
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-600 mx-auto"></div>
                      <p className="text-gray-600 mt-4">Cargando imagen del ejercicio...</p>
                    </div>
                  ) : exerciseImageData?.image?.url ? (
                    <div className="text-center">
                      <img
                        src={exerciseImageData.image.url}
                        alt={exerciseImageData.exerciseName}
                        className="max-w-full h-auto max-h-[70vh] rounded-lg shadow-lg"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                      <div 
                        className="hidden bg-gray-100 rounded-lg p-12 text-center"
                        style={{ minHeight: '300px', display: 'none' }}
                      >
                        <Image className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No se pudo cargar la imagen</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Image className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No hay imagen disponible para este ejercicio</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
