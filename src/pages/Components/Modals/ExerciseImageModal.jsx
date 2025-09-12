import { useState, useEffect } from "react";
import { Button } from "../Button";
import { X, Image, Folder, Dumbbell } from "lucide-react";
import { exercisesService } from "../../../services/exercises";
import { useAuth } from "../../../context/useAuth";

export default function ExerciseImageModal({ 
  isOpen, 
  onClose, 
  exercisePath 
}) {
  const { token } = useAuth();
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log("exercisePath", exercisePath);

  useEffect(() => {
    if (isOpen && token) {
      fetchFolders();
    }
  }, [isOpen, token]);

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[60]">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl border border-gray-200">
        <div className="p-6">
          {/* Header del Modal de Imagen */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 mb-6 text-white shadow-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-3 rounded-full">
                  <Image className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">
                    Agregar Imagen al Ejercicio
                  </h3>
                  <p className="text-purple-100 text-lg">
                    Selecciona una imagen para este ejercicio
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
                <p className="text-gray-600 mt-4">Cargando carpetas...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {!loading && !error && (
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Folder className="h-5 w-5 text-purple-600" />
                  Carpetas de Ejercicios
                </h4>
                
                {folders.length === 0 ? (
                  <div className="text-center py-8">
                    <Folder className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 text-lg">No hay carpetas disponibles</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {folders.map((folder) => (
                      <div
                        key={folder.id}
                        className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all duration-200 cursor-pointer group"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="bg-purple-100 p-2 rounded-lg group-hover:bg-purple-200 transition-colors duration-200">
                              <Folder className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                              <h5 className="font-semibold text-gray-800 text-lg">
                                {folder.title}
                              </h5>
                              <p className="text-gray-600 text-sm">
                                {folder.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Dumbbell className="h-4 w-4 text-gray-500" />
                            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-sm font-medium">
                              {folder.exerciseCount}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            folder.isActive 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {folder.isActive ? '✅ Activa' : '⏸️ Inactiva'}
                          </span>
                          <Button
                            className="bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:from-purple-600 hover:to-pink-700 px-3 py-1 rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
                          >
                            Seleccionar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
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
