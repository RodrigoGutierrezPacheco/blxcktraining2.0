import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Components/Button";
import MuscleGroupsTable from "./components/MuscleGroupsTable";
import ExercisesTable from "./components/ExercisesTable";
import ExercisesFolders from "./components/ExercisesFolders";
import CreateMuscleGroupModal from "./components/CreateMuscleGroupModal";
import CreateExerciseModal from "./components/CreateExerciseModal";
import ImagesSection from "./components/ImagesSection";
import { useAuth } from "../../context/useAuth";
import { muscleGroupsService } from "../../services/muscleGroups";
import { exercisesService } from "../../services/exercises";
import { Dumbbell, LogOut, Shield, Activity } from "lucide-react";

export default function AllExercises() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("muscle-groups");
  const [muscleGroups, setMuscleGroups] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showCreateMuscleGroup, setShowCreateMuscleGroup] = useState(false);
  const [showCreateExercise, setShowCreateExercise] = useState(false);
  const [editingMuscleGroup, setEditingMuscleGroup] = useState(null);
  const [editingExercise, setEditingExercise] = useState(null);

  useEffect(() => {
    // Verificar si el usuario es admin
    if (!user || user.role !== "admin") {
      navigate("/admin/login");
      return;
    }

    // Cargar datos iniciales
    loadMuscleGroups();
    loadExercises();
  }, [user, navigate]);

  const loadMuscleGroups = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("tokenBlck");
      if (!token) {
        throw new Error("No hay token de autenticación");
      }

      const data = await muscleGroupsService.getAllMuscleGroups(token);

      // Transformar la respuesta de la API al formato esperado por el componente
      const transformedData = data.map((item) => ({
        id: item.id,
        name: item.title,
        description: item.description,
        exercisesCount: item.exercises_count || 0,
        isActive: item.isActive === true, // Solo true si explícitamente es true
      }));

      setMuscleGroups(transformedData);
    } catch (error) {
      console.error("Error cargando grupos musculares:", error);
      // En caso de error, mostrar datos de ejemplo como fallback
      const fallbackData = [
        {
          id: 1,
          name: "Pecho",
          description: "Músculos del pecho",
          exercisesCount: 15,
          isActive: true,
        },
        {
          id: 2,
          name: "Espalda",
          description: "Músculos de la espalda",
          exercisesCount: 12,
          isActive: false,
        },
        {
          id: 3,
          name: "Piernas",
          description: "Músculos de las piernas",
          exercisesCount: 20,
          isActive: true,
        },
        {
          id: 4,
          name: "Hombros",
          description: "Músculos de los hombros",
          exercisesCount: 10,
          isActive: false,
        },
        {
          id: 5,
          name: "Brazos",
          description: "Músculos de los brazos",
          exercisesCount: 18,
          isActive: true,
        },
        {
          id: 6,
          name: "Core",
          description: "Músculos del abdomen",
          exercisesCount: 14,
          isActive: true,
        },
      ];
      setMuscleGroups(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  const loadExercises = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("tokenBlck");
      if (!token) {
        throw new Error("No hay token de autenticación");
      }

      const data = await exercisesService.getAllExercises(token);
      console.log("data", data);	

      // Transformar la respuesta de la API al formato esperado por el componente
      const transformedData = data.map((item) => ({
        id: item.id,
        name: item.name,
        muscleGroupId: item.muscleGroupId,
        muscleGroup: item.muscleGroupName || 'N/A',
        muscleGroupName: item.muscleGroupName || 'N/A',
        description: item.description,
        image: item.image?.url || item.image,
        imagePath: item.imagePath,
        isActive: item.isActive,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        imageId: item.image?.imageId,
      }));

      setExercises(transformedData);
    } catch (error) {
      console.error("Error cargando ejercicios:", error);
      // En caso de error, mostrar datos de ejemplo como fallback
      const fallbackData = [
        {
          id: 1,
          name: "Press de Banca",
          muscleGroupId: "1",
          muscleGroup: "Pecho",
          description: "Ejercicio básico para el desarrollo del pecho",
        },
        {
          id: 2,
          name: "Sentadillas",
          muscleGroupId: "3",
          muscleGroup: "Piernas",
          description: "Ejercicio fundamental para las piernas",
        },
        {
          id: 3,
          name: "Dominadas",
          muscleGroupId: "2",
          muscleGroup: "Espalda",
          description: "Ejercicio para fortalecer la espalda",
        },
      ];
      setExercises(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const handleCreateMuscleGroup = () => {
    setShowCreateMuscleGroup(true);
  };

  // const handleCreateExercise = () => {
  //   setShowCreateExercise(true);
  // };

  const handleEditMuscleGroup = (muscleGroup) => {
    setEditingMuscleGroup(muscleGroup);
    setShowCreateMuscleGroup(true);
  };

  // const handleEditExercise = (exercise) => {
  //   setEditingExercise(exercise);
  //   setShowCreateExercise(true);
  // };

  const handleDeleteMuscleGroup = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este grupo muscular?")) {
      try {
        const token = localStorage.getItem("tokenBlck");
        if (!token) {
          throw new Error("No hay token de autenticación");
        }
        
        await muscleGroupsService.deleteMuscleGroup(token, id);
        setMuscleGroups(muscleGroups.filter(mg => mg.id !== id));
      } catch (error) {
        console.error("Error eliminando grupo muscular:", error);
        alert("Error al eliminar el grupo muscular. Por favor, inténtalo de nuevo.");
      }
    }
  };

  // const handleDeleteExercise = async (id) => {
  //   if (
  //     window.confirm("¿Estás seguro de que quieres eliminar este ejercicio?")
  //   ) {
  //     try {
  //       const token = localStorage.getItem("tokenBlck");
  //       if (!token) {
  //         throw new Error("No hay token de autenticación");
  //       }
  //       await exercisesService.deleteExercise(token, id);
  //       setExercises(exercises.filter((ex) => ex.id !== id));
  //     } catch (error) {
  //       console.error("Error eliminando ejercicio:", error);
  //       alert("Error al eliminar el ejercicio. Por favor, inténtalo de nuevo.");
  //     }
  //   }
  // };

  const handleToggleMuscleGroupStatus = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem("tokenBlck");
      if (!token) {
        throw new Error("No hay token de autenticación");
      }

      const newStatus = !currentStatus;
      await muscleGroupsService.toggleMuscleGroupStatus(token, id, newStatus);

      // Actualizar el estado local
      setMuscleGroups(
        muscleGroups.map((mg) =>
          mg.id === id ? { ...mg, isActive: newStatus } : mg
        )
      );
    } catch (error) {
      console.error("Error cambiando estado del grupo muscular:", error);
      alert(
        "Error al cambiar el estado del grupo muscular. Por favor, inténtalo de nuevo."
      );
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-red-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Gestión de Ejercicios</h1>
                <p className="text-red-100">
                  Panel Administrativo - {user.fullName}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => navigate("/admin/dashboard")}
                className="bg-white/20 text-white hover:bg-white/30 px-4 py-2 rounded-lg transition-all duration-200"
              >
                Volver al Dashboard
              </Button>
              <Button
                onClick={handleLogout}
                className="bg-white/20 text-white hover:bg-white/30 px-4 py-2 rounded-lg transition-all duration-200"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-10">
        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab("muscle-groups")}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
                activeTab === "muscle-groups"
                  ? "bg-white text-red-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Dumbbell className="h-5 w-5" />
                Grupos Musculares
              </div>
            </button>
            <button
              onClick={() => setActiveTab("exercises")}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
                activeTab === "exercises"
                  ? "bg-white text-red-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Activity className="h-5 w-5" />
                Ejercicios
              </div>
            </button>
            <button
              onClick={() => setActiveTab("images")}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
                activeTab === "images"
                  ? "bg-white text-red-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                Imágenes
              </div>
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === "muscle-groups" ? (
          <MuscleGroupsTable
            muscleGroups={muscleGroups}
            loading={loading}
            onCreate={handleCreateMuscleGroup}
            onEdit={handleEditMuscleGroup}
            onDelete={handleDeleteMuscleGroup}
            onToggleStatus={handleToggleMuscleGroupStatus}
          />
        ) : activeTab === "exercises" ? (
          <ExercisesFolders
            exercises={exercises}
            onExerciseCreated={(newExercise) => {
              // Agregar el nuevo ejercicio a la lista
              const muscleGroup = muscleGroups.find(mg => mg.id === newExercise.muscleGroupId);
              const transformedExercise = {
                id: newExercise.id,
                name: newExercise.name,
                muscleGroup: muscleGroup ? muscleGroup.name : 'N/A',
                muscleGroupId: newExercise.muscleGroupId,
                description: newExercise.description,
                image: newExercise.image,
                muscleGroupName: muscleGroup ? muscleGroup.name : 'N/A',
                isActive: newExercise.isActive,
                createdAt: newExercise.createdAt,
                updatedAt: newExercise.updatedAt,
              };
              setExercises([...exercises, transformedExercise]);
            }}
            onExerciseUpdated={(exerciseId, updatedData) => {
              // Actualizar el ejercicio en la lista
              const muscleGroup = muscleGroups.find(mg => mg.id === updatedData.muscleGroupId);
              setExercises(exercises.map(ex => 
                ex.id === exerciseId 
                  ? {
                      ...ex,
                      name: updatedData.name,
                      description: updatedData.description,
                      muscleGroupId: updatedData.muscleGroupId,
                      muscleGroup: muscleGroup ? muscleGroup.name : ex.muscleGroup,
                      muscleGroupName: muscleGroup ? muscleGroup.name : ex.muscleGroupName,
                      imagePath: updatedData.imagePath,
                      updatedAt: new Date().toISOString(),
                    }
                  : ex
              ));
            }}
          />
        ) : (
          <ImagesSection />
        )}
      </main>

      {/* Modals */}
      {showCreateMuscleGroup && (
        <CreateMuscleGroupModal
          isOpen={showCreateMuscleGroup}
          onClose={() => {
            setShowCreateMuscleGroup(false);
            setEditingMuscleGroup(null);
          }}
          muscleGroup={editingMuscleGroup}
          saving={saving}
          onSave={async (data) => {
            setSaving(true);
            try {
              const token = localStorage.getItem("tokenBlck");
              if (!token) {
                throw new Error("No hay token de autenticación");
              }

              if (editingMuscleGroup) {
                // Update existing
                const updatedMuscleGroup =
                  await muscleGroupsService.updateMuscleGroup(
                    token,
                    editingMuscleGroup.id,
                    data
                  );

                setMuscleGroups(
                  muscleGroups.map((mg) =>
                    mg.id === editingMuscleGroup.id
                      ? {
                          ...mg,
                          name: updatedMuscleGroup.title,
                          description: updatedMuscleGroup.description,
                        }
                      : mg
                  )
                );
              } else {
                // Create new
                const newMuscleGroup =
                  await muscleGroupsService.createMuscleGroup(token, data);

                const transformedMuscleGroup = {
                  id: newMuscleGroup.id,
                  name: newMuscleGroup.title,
                  description: newMuscleGroup.description,
                  exercisesCount: 0,
                  isActive: newMuscleGroup.isActive === true,
                };

                setMuscleGroups([...muscleGroups, transformedMuscleGroup]);
              }

              setShowCreateMuscleGroup(false);
              setEditingMuscleGroup(null);
            } catch (error) {
              console.error("Error guardando grupo muscular:", error);
              alert(
                "Error al guardar el grupo muscular. Por favor, inténtalo de nuevo."
              );
            } finally {
              setSaving(false);
            }
          }}
        />
      )}

      {showCreateExercise && (
        <CreateExerciseModal
          isOpen={showCreateExercise}
          onClose={() => {
            setShowCreateExercise(false);
            setEditingExercise(null);
          }}
          exercise={editingExercise}
          muscleGroups={muscleGroups}
          saving={saving}
          onSave={async (data) => {
            setSaving(true);
            try {
              const token = localStorage.getItem("tokenBlck");
              if (!token) {
                throw new Error("No hay token de autenticación");
              }

              if (editingExercise) {
                // Update existing
                const updatedExercise = await exercisesService.updateExercise(
                  token,
                  editingExercise.id,
                  data
                );

                setExercises(
                  exercises.map((ex) =>
                    ex.id === editingExercise.id
                      ? {
                          ...ex,
                          name: updatedExercise.name,
                          muscleGroupId: updatedExercise.muscleGroupId,
                          description: updatedExercise.description,
                        }
                      : ex
                  )
                );
              } else {
                // Create new
                const newExercise = await exercisesService.createExercise(
                  token,
                  data
                );

                // Buscar el nombre del grupo muscular para mostrar en la tabla
                const muscleGroup = muscleGroups.find(mg => mg.id === data.muscleGroupId);
                
                const transformedExercise = {
                  id: newExercise.id,
                  name: newExercise.name,
                  muscleGroup: muscleGroup ? muscleGroup.name : 'N/A',
                  muscleGroupId: newExercise.muscleGroupId,
                  description: newExercise.description,
                };

                setExercises([...exercises, transformedExercise]);
              }

              setShowCreateExercise(false);
              setEditingExercise(null);
            } catch (error) {
              console.error("Error guardando ejercicio:", error);
              alert(
                "Error al guardar el ejercicio. Por favor, inténtalo de nuevo."
              );
            } finally {
              setSaving(false);
            }
          }}
        />
      )}
    </div>
  );
}
