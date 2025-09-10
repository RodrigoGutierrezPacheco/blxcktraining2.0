import { useState, useEffect } from "react";

export default function CreateExerciseModal({
  isOpen,
  onClose,
  exercise,
  muscleGroups,
  saving,
  onSave,
  initialMuscleGroupId,
}) {
  const [formData, setFormData] = useState({
    name: "",
    muscleGroupId: "",
    description: "",
  });

  useEffect(() => {
    if (exercise) {
      setFormData({
        name: exercise.name,
        muscleGroupId: exercise.muscleGroupId || "",
        description: exercise.description,
      });
    } else {
      setFormData({ name: "", muscleGroupId: initialMuscleGroupId || "", description: "" });
    }
  }, [exercise, initialMuscleGroupId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {exercise ? "Editar Ejercicio" : "Nuevo Ejercicio"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Grupo Muscular
            </label>
            <select
              value={formData.muscleGroupId}
              onChange={(e) =>
                setFormData({ ...formData, muscleGroupId: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            >
              <option value="">Seleccionar grupo muscular</option>
              {muscleGroups
                .filter((mg) => mg.isActive)
                .map((mg) => (
                  <option key={mg.id} value={mg.id}>
                    {mg.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              rows="3"
              required
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  {exercise ? "Actualizando..." : "Creando..."}
                </div>
              ) : exercise ? (
                "Actualizar"
              ) : (
                "Crear"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


