import { useState, useEffect } from "react";
import { Button } from "../Button";
import { X, Image, ArrowLeft } from "lucide-react";
import { exercisesService } from "../../../services/exercises";
import { useAuth } from "../../../context/useAuth";
import ExerciseFolderContent from "./ExerciseFolderContent";
import ExerciseImageContent from "./ExerciseImageContent";

export default function ExerciseImageModal({ 
  isOpen, 
  onClose, 
  exercisePath,
  onExerciseSelect
}) {
  const { token } = useAuth();
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentView, setCurrentView] = useState('folders'); // 'folders' o 'exercises'
  const [selectedFolder, setSelectedFolder] = useState(null);

  useEffect(() => {
    if (isOpen && token) {
      fetchFolders();
    }
  }, [isOpen, token]);

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

  const fetchFolders = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await exercisesService.getExerciseFolders(token);
      setFolders(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching folders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFolderClick = (folder) => {
    setSelectedFolder(folder);
    setCurrentView('exercises');
  };

  const handleBackToFolders = () => {
    setCurrentView('folders');
    setSelectedFolder(null);
  };

  const handleExerciseSelect = (exercise) => {
    if (onExerciseSelect) {
      onExerciseSelect(exercise);
    } else {
      console.log('Ejercicio seleccionado:', exercise);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[60]">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl border border-gray-200">
        <div className="p-6">
          {/* Header del Modal de Imagen */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 mb-6 text-white shadow-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                {currentView === 'exercises' && (
                  <Button
                    onClick={handleBackToFolders}
                    className="bg-white/20 text-white hover:bg-white/30 p-2 rounded-full transition-all duration-200 hover:scale-105"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                )}
                <div className="bg-white/20 p-3 rounded-full">
                  <Image className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">
                    {currentView === 'folders' ? 'Seleccionar Carpeta' : selectedFolder?.title}
                  </h3>
                  <p className="text-purple-100 text-lg">
                    {currentView === 'folders' 
                      ? 'Selecciona una carpeta de ejercicios' 
                      : 'Selecciona un ejercicio'
                    }
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

          {/* Contenido del Modal de Imagen */}
          <div className="py-6">
            {loading && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                <p className="text-gray-600 mt-4">
                  {currentView === 'folders' ? 'Cargando carpetas...' : 'Cargando ejercicios...'}
                </p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {!loading && !error && currentView === 'folders' && (
              <ExerciseFolderContent
                folders={folders}
                onFolderClick={handleFolderClick}
              />
            )}

            {!loading && !error && currentView === 'exercises' && (
              <ExerciseImageContent
                folder={selectedFolder}
                onExerciseSelect={handleExerciseSelect}
                setError={setError}
              />
            )}

            {exercisePath && (
              <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                <p className="text-gray-500 text-xs font-mono">
                  Ejercicio: {exercisePath}
                </p>
              </div>
            )}
          </div>

          {/* Botones del Modal de Imagen */}
          <div className="flex justify-end gap-4 mt-6">
            <Button
              onClick={onClose}
              className="bg-gray-500 text-white hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 shadow-md"
            >
              Cerrar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
