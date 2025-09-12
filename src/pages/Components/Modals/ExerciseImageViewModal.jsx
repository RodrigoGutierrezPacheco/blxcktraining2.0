import { useState, useEffect } from "react";
import { Button } from "../Button";
import { X, Image, Loader2, AlertCircle } from "lucide-react";
import { exercisesService } from "../../../services/exercises";
import { useAuth } from "../../../context/useAuth";

export default function ExerciseImageViewModal({ 
  isOpen, 
  onClose, 
  exerciseId 
}) {
  const { token } = useAuth();
  const [exerciseData, setExerciseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && exerciseId && token) {
      fetchExerciseImage();
    }
  }, [isOpen, exerciseId, token]);

  const fetchExerciseImage = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching exercise image for ID:', exerciseId);
      const data = await exercisesService.getExerciseImage(token, exerciseId);
      setExerciseData(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching exercise image:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[70]">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
        <div className="p-6">
          {/* Header del Modal */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 mb-6 text-white shadow-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-3 rounded-full">
                  <Image className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">
                    Imagen del Ejercicio
                  </h3>
                  <p className="text-blue-100 text-lg">
                    {exerciseData?.exerciseName || 'Cargando...'}
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

          {/* Contenido del Modal */}
          <div className="py-6">
            {loading && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-600 mt-4 text-lg">Cargando imagen del ejercicio...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-6 mb-6">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                  <div>
                    <h4 className="text-red-800 font-semibold">Error al cargar la imagen</h4>
                    <p className="text-red-700 mt-1">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {!loading && !error && exerciseData && (
              <div className="space-y-6">
                {/* Información del ejercicio */}
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Image className="h-5 w-5 text-blue-600" />
                    Información del Ejercicio
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        ID del Ejercicio
                      </label>
                      <p className="text-gray-600 font-mono text-sm bg-white p-2 rounded border">
                        {exerciseData.exerciseId}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Nombre del Ejercicio
                      </label>
                      <p className="text-gray-800 font-semibold text-lg">
                        {exerciseData.exerciseName}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Imagen del ejercicio */}
                <div className="bg-gradient-to-br from-gray-50 to-indigo-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Image className="h-5 w-5 text-indigo-600" />
                    Imagen del Ejercicio
                  </h4>
                  
                  {exerciseData.image?.url ? (
                    <div className="text-center">
                      <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm inline-block">
                        <img
                          src={exerciseData.image.url}
                          alt={exerciseData.exerciseName}
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
                          <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600 text-lg">No se pudo cargar la imagen</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center justify-center gap-2">
                          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                            {exerciseData.image.type?.toUpperCase() || 'Imagen'}
                          </span>
                          {exerciseData.image.imageId && (
                            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium font-mono">
                              ID: {exerciseData.image.imageId}
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
            )}
          </div>

          {/* Botones del Modal */}
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
