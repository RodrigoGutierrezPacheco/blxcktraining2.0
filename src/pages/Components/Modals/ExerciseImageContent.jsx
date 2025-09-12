import { useState, useEffect, useCallback } from "react";
import { Button } from "../Button";
import { Search, Dumbbell } from "lucide-react";
import { exercisesService } from "../../../services/exercises";
import { useAuth } from "../../../context/useAuth";

export default function ExerciseImageContent({ 
  folder, 
  onExerciseSelect,
  setError
}) {
  const { token } = useAuth();
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoadingExercises, setIsLoadingExercises] = useState(false);
  const [lastFetchedFolderId, setLastFetchedFolderId] = useState(null);

  const fetchExercises = useCallback(async () => {
    if (!folder?.id || !token || lastFetchedFolderId === folder.id) return;
    
    try {
      setIsLoadingExercises(true);
      setError(null);
      const data = await exercisesService.getExercisesByFolder(token, folder.id);
      setExercises(data);
      setFilteredExercises(data);
      setLastFetchedFolderId(folder.id);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching exercises:', err);
    } finally {
      setIsLoadingExercises(false);
    }
  }, [folder?.id, token, setError, lastFetchedFolderId]);

  useEffect(() => {
    if (folder?.id && token && lastFetchedFolderId !== folder.id) {
      // Limpiar datos anteriores
      setExercises([]);
      setFilteredExercises([]);
      setSearchTerm('');
      fetchExercises();
    }
  }, [folder?.id, token, fetchExercises, lastFetchedFolderId]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = exercises.filter(exercise =>
        exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exercise.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredExercises(filtered);
    } else {
      setFilteredExercises(exercises);
    }
  }, [searchTerm, exercises]);

  if (isLoadingExercises) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
        <p className="text-gray-600 mt-4">Cargando ejercicios...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Buscador */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Buscar ejercicios por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>

      <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Dumbbell className="h-5 w-5 text-purple-600" />
        Ejercicios ({filteredExercises.length})
      </h4>
      
      {filteredExercises.length === 0 ? (
        <div className="text-center py-8">
          <Dumbbell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">
            {searchTerm ? 'No se encontraron ejercicios' : 'No hay ejercicios disponibles'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredExercises.map((exercise) => (
            <div
              key={exercise.id}
              onClick={() => onExerciseSelect(exercise)}
              className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                {/* Imagen del ejercicio */}
                <div className="flex-shrink-0">
                  {exercise.image?.url ? (
                    <img
                      src={exercise.image.url}
                      alt={exercise.name}
                      className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded-lg border border-gray-200 flex items-center justify-center">
                      <Dumbbell className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                </div>
                
                {/* Información del ejercicio */}
                <div className="flex-1 min-w-0">
                  <h5 className="font-semibold text-gray-800 text-lg mb-1 truncate">
                    {exercise.name}
                  </h5>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {exercise.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                      {exercise.muscleGroupName}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      exercise.isActive 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {exercise.isActive ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-3">
                <Button
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 px-3 py-1 rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
                >
                  Seleccionar
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
