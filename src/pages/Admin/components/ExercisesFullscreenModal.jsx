import { useState } from "react";
import EditExerciseWithImageModal from "./EditExerciseWithImageModal";
import { exercisesService } from "../../../services/exercises";
import { useAuth } from "../../../context/useAuth";

export default function ExercisesFullscreenModal({ 
  isOpen, 
  onClose, 
  muscleGroupName, 
  exercises = [],
  onExerciseUpdated
}) {
  const { token } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingExercise, setEditingExercise] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleEditExercise = (exercise) => {
    setEditingExercise(exercise);
    setShowEditModal(true);
  };

  const handleUpdateExercise = async (exerciseData) => {
    setSaving(true);
    try {
      // Actualizar el ejercicio usando el servicio
      const updatedExercise = await exercisesService.updateExerciseWithImage(token, editingExercise.id, exerciseData);
      
      console.log("Exercise updated successfully:", updatedExercise);
      
      // Notificar al componente padre que se actualizó un ejercicio
      if (onExerciseUpdated) {
        onExerciseUpdated(editingExercise.id, exerciseData);
      }
      
      setShowEditModal(false);
      setEditingExercise(null);
    } catch (error) {
      console.error("Error updating exercise:", error);
      alert("Error al actualizar el ejercicio: " + (error.message || "Error desconocido"));
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;
console.log("exercises", exercises);
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
      <div className="absolute inset-0 overflow-auto">
        <div className="min-h-full bg-white">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{muscleGroupName}</h2>
                <p className="text-gray-600 mt-1">{exercises.length} ejercicios disponibles</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {exercises.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.291A7.962 7.962 0 0112 4c-2.34 0-4.29 1.009-5.824 2.709" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hay ejercicios</h3>
                <p className="text-gray-500">Este grupo muscular no tiene ejercicios disponibles.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {exercises.map((exercise) => (
                  <div
                    key={exercise.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200"
                  >
                    {/* Imagen del ejercicio */}
                    <div className="relative bg-gray-200 h-48 overflow-hidden">
                      <img
                        src={exercise.image?.url || exercise.image}
                        alt={exercise.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y3ZjdmNyIvPjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LmZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZW4gZGUgRWplcmNpY2lvPC90ZXh0Pjwvc3ZnPg==";
                        }}
                      />
                      {/* Overlay con tipo de imagen */}
                      {exercise.image?.type && (
                        <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                          {exercise.image.type.toUpperCase()}
                        </div>
                      )}
                    </div>

                    {/* Contenido de la tarjeta */}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 overflow-hidden" style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}>
                        {exercise.name}
                      </h3>
                      
                      {exercise.description && (
                        <div className="mb-3">
                          <p className="text-sm text-gray-600 leading-relaxed overflow-hidden" style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical'
                          }}>
                            {exercise.description}
                          </p>
                        </div>
                      )}

                      {/* Información adicional */}
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {exercise.muscleGroupName}
                        </span>
                        <span className={`px-2 py-1 rounded-full ${
                          exercise.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {exercise.isActive ? 'Activo' : 'Inactivo'}
                        </span>
                      </div>

                      {/* Fecha de creación */}
                      {exercise.createdAt && (
                        <div className="mt-3 text-xs text-gray-400">
                          Creado: {new Date(exercise.createdAt).toLocaleDateString()}
                        </div>
                      )}
                    </div>

                    {/* Botones de acción */}
                    <div className="px-4 pb-4">
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors">
                          Ver Detalles
                        </button>
                        <button 
                          onClick={() => handleEditExercise(exercise)}
                          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2 px-3 rounded-lg transition-colors"
                        >
                          Editar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de edición */}
      <EditExerciseWithImageModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingExercise(null);
        }}
        onSave={handleUpdateExercise}
        exercise={editingExercise}
        saving={saving}
      />
    </div>
  );
}
