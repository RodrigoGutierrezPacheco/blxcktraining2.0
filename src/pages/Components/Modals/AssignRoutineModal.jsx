import { useState, useEffect } from "react";
import { Button } from "../Button";
import { X, Dumbbell, Calendar, Clock, Target, Users, CheckCircle, XCircle, Plus, Search, Filter } from "lucide-react";
import { getTrainerRoutines, assignRoutineToUser } from "../../../services/routines";

export default function AssignRoutineModal({ 
  isOpen, 
  onClose, 
  userName,
  userId,
  trainerId,
  onRoutineAssigned 
}) {
  const [routines, setRoutines] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [isAssigning, setIsAssigning] = useState(false);
  const [showAssignmentForm, setShowAssignmentForm] = useState(false);
  const [assignmentData, setAssignmentData] = useState({
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: ""
  });

  useEffect(() => {
    if (isOpen && trainerId) {
      fetchTrainerRoutines();
    }
  }, [isOpen, trainerId]);

  const fetchTrainerRoutines = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const routinesData = await getTrainerRoutines(trainerId);
      setRoutines(routinesData);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAssignRoutine = async () => {
    if (!selectedRoutine) return;

    try {
      setIsAssigning(true);
      setError(null);

      const startDate = new Date(assignmentData.startDate).toISOString();
      const endDate = new Date(assignmentData.endDate).toISOString();

      await assignRoutineToUser(
        selectedRoutine.id,
        userId,
        startDate,
        endDate,
        assignmentData.notes
      );

      // Notificar que se asignó la rutina
      if (onRoutineAssigned) {
        onRoutineAssigned();
      }

      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsAssigning(false);
    }
  };

  const filteredRoutines = routines.filter(routine =>
    routine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    routine.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRoutineSelect = (routine) => {
    setSelectedRoutine(routine);
    setShowAssignmentForm(true);
  };

  const handleBackToRoutines = () => {
    setShowAssignmentForm(false);
    setSelectedRoutine(null);
    setAssignmentData({
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      notes: ""
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              {showAssignmentForm && (
                <Button
                  onClick={handleBackToRoutines}
                  className="bg-gray-500 text-white hover:bg-gray-600 p-2 rounded-full transition-all duration-200 hover:scale-105"
                >
                  <X className="h-5 w-5" />
                </Button>
              )}
              <h3 className="text-2xl font-bold text-black flex items-center gap-2">
                <Dumbbell className="h-6 w-6" />
                {showAssignmentForm ? 'Asignar Rutina' : `Asignar Rutina a ${userName}`}
              </h3>
            </div>
            <Button
              onClick={onClose}
              className="bg-gray-500 text-white hover:bg-gray-600 p-2 rounded-full transition-all duration-200 hover:scale-105"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {!showAssignmentForm ? (
            // Vista de selección de rutina
            <>
              {/* Barra de búsqueda */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar rutinas por nombre o descripción..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {/* Lista de rutinas */}
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600 text-lg">Cargando rutinas...</p>
                </div>
              ) : filteredRoutines.length > 0 ? (
                <div className="grid gap-4">
                  {filteredRoutines.map((routine) => (
                    <div
                      key={routine.id}
                      className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer"
                      onClick={() => handleRoutineSelect(routine)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="text-lg font-semibold text-black mb-2">
                            {routine.name}
                          </h4>
                          <p className="text-gray-600 mb-3">
                            {routine.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {routine.isActive ? (
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium flex items-center gap-1">
                              <CheckCircle className="h-3 w-3" />
                              Activa
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
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
                            {routine.totalWeeks} semana{routine.totalWeeks !== 1 ? "s" : ""}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-600" />
                          <span>
                            <span className="font-medium">Creada:</span>{" "}
                            {new Date(routine.createdAt).toLocaleDateString("es-ES")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-600" />
                          <span>
                            <span className="font-medium">Ejercicios:</span>{" "}
                            {routine.weeks?.reduce((total, week) => 
                              total + week.days?.reduce((dayTotal, day) => 
                                dayTotal + (day.exercises?.length || 0), 0
                              ), 0
                            ) || 0}
                          </span>
                        </div>
                      </div>

                      {routine.comments && (
                        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
                          <p className="text-sm text-blue-700">
                            <span className="font-medium">Comentarios:</span>{" "}
                            {routine.comments}
                          </p>
                        </div>
                      )}

                      <div className="mt-4">
                        <Button 
                          className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200"
                        >
                          <Dumbbell className="mr-2 h-4 w-4" />
                          Seleccionar esta Rutina
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Dumbbell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg mb-2">
                    {searchTerm ? 'No se encontraron rutinas que coincidan con la búsqueda' : 'No tienes rutinas creadas aún'}
                  </p>
                  <p className="text-gray-500">
                    {searchTerm ? 'Intenta con otros términos de búsqueda' : 'Crea tu primera rutina para poder asignarla a usuarios'}
                  </p>
                </div>
              )}
            </>
          ) : (
            // Vista de formulario de asignación
            <div className="space-y-6">
              {/* Información de la rutina seleccionada */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                <h4 className="text-lg font-semibold text-blue-800 mb-3 flex items-center gap-2">
                  <Dumbbell className="h-5 w-5" />
                  Rutina Seleccionada
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-blue-600 font-medium">Nombre</p>
                    <p className="text-lg font-bold text-blue-800">{selectedRoutine.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-600 font-medium">Duración</p>
                    <p className="text-lg font-bold text-blue-800">
                      {selectedRoutine.totalWeeks} semana{selectedRoutine.totalWeeks !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-600 font-medium">Descripción</p>
                    <p className="text-blue-800">{selectedRoutine.description}</p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-600 font-medium">Total Ejercicios</p>
                    <p className="text-lg font-bold text-blue-800">
                      {selectedRoutine.weeks?.reduce((total, week) => 
                        total + week.days?.reduce((dayTotal, day) => 
                          dayTotal + (day.exercises?.length || 0), 0
                        ), 0
                      ) || 0}
                    </p>
                  </div>
                </div>
              </div>

              {/* Formulario de asignación */}
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  Configuración de la Asignación
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Fecha de Inicio
                    </label>
                    <input
                      type="date"
                      value={assignmentData.startDate}
                      onChange={(e) => setAssignmentData(prev => ({ ...prev, startDate: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Fecha de Fin
                    </label>
                    <input
                      type="date"
                      value={assignmentData.endDate}
                      onChange={(e) => setAssignmentData(prev => ({ ...prev, endDate: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Notas de Asignación
                  </label>
                  <textarea
                    value={assignmentData.notes}
                    onChange={(e) => setAssignmentData(prev => ({ ...prev, notes: e.target.value }))}
                    rows={3}
                    placeholder="Notas especiales, instrucciones o consideraciones para el usuario..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex justify-end gap-4">
                <Button
                  onClick={handleBackToRoutines}
                  className="bg-gray-500 text-white hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleAssignRoutine}
                  disabled={isAssigning}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAssigning ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Asignando...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Asignar Rutina
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
