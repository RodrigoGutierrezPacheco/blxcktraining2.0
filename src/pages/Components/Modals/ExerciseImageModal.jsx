import { useState, useEffect, useCallback } from "react";
import { Button } from "../Button";
import { X, Image, ArrowLeft } from "lucide-react";
import { exercisesService } from "../../../services/exercises";
import { useAuth } from "../../../context/useAuth";
import ExerciseFolderContent from "./ExerciseFolderContent";
import ExerciseImageContent from "./ExerciseImageContent";

export default function ExerciseImageModal({
  isOpen,
  onClose,
  onExerciseSelect,
}) {
  const { token } = useAuth();
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentView, setCurrentView] = useState("folders"); // 'folders' o 'exercises'
  const [selectedFolder, setSelectedFolder] = useState(null);
  const fetchFolders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await exercisesService.getExerciseFolders(token);
      setFolders(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching folders:", err);
    } finally {
      setLoading(false);
    }
  }, [token]);
  useEffect(() => {
    if (isOpen && token) {
      // Resetear siempre a la vista de carpetas cuando se abre el modal
      setCurrentView("folders");
      setSelectedFolder(null);
      fetchFolders();
    }
  }, [isOpen, token, fetchFolders]);

  // Effect to block body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleFolderClick = (folder) => {
    setSelectedFolder(folder);
    setCurrentView("exercises");
  };

  const handleBackToFolders = () => {
    setCurrentView("folders");
    setSelectedFolder(null);
  };

  const handleExerciseSelect = (exercise) => {
    if (onExerciseSelect) {
      onExerciseSelect(exercise);
    } else {
      console.log("Ejercicio seleccionado:", exercise);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[60]">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl border border-gray-200">
        <div className="p-6">
          {/* Header del Modal de Imagen */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                {currentView === "exercises" && (
                  <Button
                    onClick={handleBackToFolders}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-lg transition-all duration-200"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                )}
                <div className="bg-gray-100 p-3 rounded-lg">
                  <Image className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {currentView === "folders"
                      ? "Seleccionar Carpeta"
                      : selectedFolder?.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {currentView === "folders"
                      ? "Selecciona una carpeta de ejercicios"
                      : "Selecciona un ejercicio"}
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

          {/* Contenido del Modal de Imagen */}
          <div className="py-6">
            {loading && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 mx-auto"></div>
                <p className="text-gray-600 mt-4 text-sm">
                  {currentView === "folders"
                    ? "Cargando carpetas..."
                    : "Cargando ejercicios..."}
                </p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {!loading && !error && currentView === "folders" && (
              <ExerciseFolderContent
                folders={folders}
                onFolderClick={handleFolderClick}
              />
            )}

            {!loading && !error && currentView === "exercises" && (
              <ExerciseImageContent
                folder={selectedFolder}
                onExerciseSelect={handleExerciseSelect}
                setError={setError}
              />
            )}
          </div>

          {/* Botones del Modal de Imagen */}
          <div className="flex justify-end gap-4 mt-6">
            <Button
              onClick={onClose}
              className="bg-gray-500 text-white hover:bg-gray-600 px-6 py-3 rounded-lg font-medium transition-all duration-200"
            >
              Cerrar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
