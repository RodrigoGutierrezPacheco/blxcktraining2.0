import { useState, useEffect } from "react";
import { muscleGroupsService } from "../../../services/muscleGroups";
import { useAuth } from "../../../context/useAuth";

export default function EditExerciseWithImageModal({
  isOpen,
  onClose,
  onSave,
  exercise,
  saving = false,
}) {
  const { token } = useAuth();
  const [muscleGroups, setMuscleGroups] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    muscleGroupId: "",
    imagePath: "",
  });

  // Cargar grupos musculares al abrir el modal
  useEffect(() => {
    if (isOpen && token) {
      loadMuscleGroups();
    }
  }, [isOpen, token]);

  // Cargar datos del ejercicio cuando se abre el modal
  useEffect(() => {
    if (isOpen && exercise) {
      setFormData({
        name: exercise.name || "",
        description: exercise.description || "",
        muscleGroupId: exercise.muscleGroupId || "",
        imagePath: exercise.imagePath || "",
      });
    }
  }, [isOpen, exercise]);

  // Cargar imágenes cuando se selecciona un grupo muscular
  useEffect(() => {
    if (formData.muscleGroupId && token) {
      loadImagesByFolder();
    }
  }, [formData.muscleGroupId, token]);

  const loadMuscleGroups = async () => {
    try {
      const data = await muscleGroupsService.getAllMuscleGroups(token);
      setMuscleGroups(data.filter(mg => mg.isActive));
    } catch (error) {
      console.error("Error loading muscle groups:", error);
    }
  };

  const loadImagesByFolder = async () => {
    if (!formData.muscleGroupId) return;
    
    setLoadingImages(true);
    try {
      const selectedMuscleGroup = muscleGroups.find(mg => mg.id === formData.muscleGroupId);
      if (!selectedMuscleGroup) return;

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/media-assets/by-folder-with-signed-urls?folder=${encodeURIComponent(selectedMuscleGroup.title)}&expirationMinutes=120`,
        {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSelectedImages(data || []);
    } catch (error) {
      console.error("Error loading images:", error);
      setSelectedImages([]);
    } finally {
      setLoadingImages(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.imagePath) {
      alert("Por favor selecciona una imagen");
      return;
    }
    onSave(formData);
  };

  const handleImageSelect = (image) => {
    setFormData({
      ...formData,
      imagePath: image.path || image.name || image.url,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      muscleGroupId: "",
      imagePath: "",
    });
    setSelectedImages([]);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Editar Ejercicio
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Información básica */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Información del Ejercicio
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del Ejercicio
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: Press de Banca Inclinado"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Seleccionar grupo muscular</option>
                  {muscleGroups.map((mg) => (
                    <option key={mg.id} value={mg.id}>
                      {mg.title}
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  placeholder="Describe el ejercicio, técnica, músculos involucrados..."
                  required
                />
              </div>
            </div>

            {/* Selección de imagen */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Seleccionar Imagen
              </h3>

              {!formData.muscleGroupId ? (
                <div className="text-center py-8 text-gray-500">
                  Primero selecciona un grupo muscular
                </div>
              ) : loadingImages ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Cargando imágenes...</p>
                </div>
              ) : selectedImages.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No hay imágenes disponibles para este grupo muscular
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                  {selectedImages.map((image, index) => (
                    <div
                      key={index}
                      onClick={() => handleImageSelect(image)}
                      className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                        formData.imagePath === (image.path || image.name || image.url)
                          ? "border-blue-500 ring-2 ring-blue-200"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <img
                        src={image.signedUrl || image.url}
                        alt={image.name || `Imagen ${index + 1}`}
                        className="w-full h-24 object-cover"
                        onError={(e) => {
                          e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y3ZjdmNyIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2VuPC90ZXh0Pjwvc3ZnPg==";
                        }}
                      />
                      {formData.imagePath === (image.path || image.name || image.url) && (
                        <div className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center">
                          <div className="bg-blue-500 text-white rounded-full p-1">
                            ✓
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {formData.imagePath && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800 font-medium">
                    ✓ Imagen seleccionada: {formData.imagePath}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving || !formData.imagePath}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Actualizando...
                </div>
              ) : (
                "Actualizar Ejercicio"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
