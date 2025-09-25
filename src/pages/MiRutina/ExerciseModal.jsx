import { useState, useEffect } from "react";
import { Button } from "../Components/Button";
import {
  X,
  Loader2,
} from "lucide-react";
import { exercisesService } from "../../services/exercises";

export default function ExerciseModal({ 
  isOpen, 
  onClose, 
  exercise 
}) {
  const [exerciseImage, setExerciseImage] = useState(null);
  const [loadingImage, setLoadingImage] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchExerciseImage = async () => {
      try {
        setLoadingImage(true);
        setImageError(false);
        const token = localStorage.getItem("tokenBlck");
        const imageData = await exercisesService.getExerciseImage(token, exercise.exerciseId);
        setExerciseImage(imageData);
      } catch (error) {
        console.error("Error fetching exercise image:", error);
        setImageError(true);
      } finally {
        setLoadingImage(false);
      }
    };

    if (isOpen && exercise?.exerciseId) {
      fetchExerciseImage();
    }
  }, [isOpen, exercise?.exerciseId]);

  // Block scroll when modal is open
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

  if (!isOpen || !exercise) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-gray-500/30 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {exercise.name}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-4">
          {/* Exercise Image */}
          <div className="w-full mb-4">
            {loadingImage ? (
              <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
              </div>
            ) : imageError ? (
              <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 text-sm">Imagen no disponible</p>
              </div>
            ) : exerciseImage?.image?.url ? (
              <img
                src={exerciseImage.image.url}
                alt={exerciseImage.exerciseName || exercise.name}
                className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
              />
            ) : (
              <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 text-sm">Sin imagen</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <Button
            onClick={onClose}
            className="w-full bg-gray-900 text-white hover:bg-gray-800"
          >
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
}
