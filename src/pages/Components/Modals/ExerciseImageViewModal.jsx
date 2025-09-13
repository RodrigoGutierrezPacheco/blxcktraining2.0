import { useState, useEffect } from "react";
import { Button } from "../Button";
import { X, Image, Edit3 } from "lucide-react";
import { exercisesService } from "../../../services/exercises";
import { useAuth } from "../../../context/useAuth";

export default function ExerciseImageViewModal({
  isOpen,
  onClose,
  exerciseId,
  exerciseName,
  onEditImage
}) {
  const { token } = useAuth();
  const [exerciseImageData, setExerciseImageData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && exerciseId) {
      fetchExerciseImage();
    }
  }, [isOpen, exerciseId]);

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

  const fetchExerciseImage = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const imageData = await exercisesService.getExerciseImage(token, exerciseId);
      setExerciseImageData(imageData);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditImage = () => {
    onEditImage();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-60 flex items-center justify-center p-4 overflow-y-hidden">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200">
        {/* Header del modal */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {exerciseName || 'Imagen del Ejercicio'}
              </h3>
              <p className="text-sm text-gray-600">Ejercicio con imagen asociada</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleEditImage}
                className="bg-gray-900 text-white hover:bg-gray-800 px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2"
              >
                <Edit3 className="h-4 w-4" />
                Cambiar Imagen
              </Button>
              <Button
                onClick={onClose}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-lg transition-all duration-200"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Contenido del modal - Solo la imagen */}
        <div className="p-6 flex items-center justify-center min-h-[500px]">
          {isLoading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Cargando imagen del ejercicio...</p>
            </div>
          ) : error ? (
            <div className="text-center">
              <div className="bg-red-100 rounded-lg p-8 text-center">
                <Image className="h-16 w-16 text-red-400 mx-auto mb-4" />
                <p className="text-red-600 font-medium">Error al cargar la imagen</p>
                <p className="text-red-500 text-sm mt-2">{error}</p>
              </div>
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
  );
}