import { useMemo, useState } from "react";
import ExercisesFullscreenModal from "./ExercisesFullscreenModal";
import CreateExerciseWithImageModal from "./CreateExerciseWithImageModal";
import { exercisesService } from "../../../services/exercises";
import { useAuth } from "../../../context/useAuth";

export default function ExercisesFolders({ exercises, onExerciseCreated, onExerciseUpdated }) {
  const { token } = useAuth();
  
  const groups = useMemo(() => {
    const map = {};
    (exercises || []).forEach((ex) => {
      const folder = ex.muscleGroupName || "Sin grupo";
      if (!map[folder]) map[folder] = [];
      map[folder].push(ex);
    });
    return map;
  }, [exercises]);

  const [showFullscreenModal, setShowFullscreenModal] = useState(false);
  const [activeMuscleGroup, setActiveMuscleGroup] = useState("");
  const [activeExercises, setActiveExercises] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [saving, setSaving] = useState(false);

  const folders = Object.entries(groups).sort((a, b) => a[0].localeCompare(b[0]));

  const handleMuscleGroupClick = (muscleGroupName, exercises) => {
    setActiveMuscleGroup(muscleGroupName);
    setActiveExercises(exercises);
    setShowFullscreenModal(true);
  };

  const handleCreateExercise = async (exerciseData) => {
    setSaving(true);
    try {
      // Crear el ejercicio usando el servicio
      const createdExercise = await exercisesService.createExercise(token, exerciseData);
      
      // Notificar al componente padre que se creó un ejercicio
      if (onExerciseCreated) {
        onExerciseCreated(createdExercise);
      }
      
      setShowCreateModal(false);
    } catch (error) {
      console.error("Error creating exercise:", error);
      alert("Error al crear el ejercicio: " + (error.message || "Error desconocido"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Grupos Musculares</h3>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            + Agregar Ejercicio
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {folders.map(([muscleGroup, items]) => (
            <button
              key={muscleGroup}
              onClick={() => handleMuscleGroupClick(muscleGroup, items)}
              className="text-left border rounded-lg p-4 hover:shadow-lg transition-all duration-200 bg-gray-50 hover:bg-gray-100 border-gray-200 hover:border-gray-300"
            >
              <div className="text-sm font-semibold text-gray-900 truncate">{muscleGroup}</div>
              <div className="text-xs text-gray-600 mt-1">{items.length} ejercicios</div>
            </button>
          ))}
          {folders.length === 0 && (
            <div className="text-gray-600">No hay ejercicios disponibles.</div>
          )}
        </div>
      </div>

      <ExercisesFullscreenModal
        isOpen={showFullscreenModal}
        onClose={() => setShowFullscreenModal(false)}
        muscleGroupName={activeMuscleGroup}
        exercises={activeExercises}
        onExerciseUpdated={onExerciseUpdated}
      />

      <CreateExerciseWithImageModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleCreateExercise}
        saving={saving}
      />
    </div>
  );
}


