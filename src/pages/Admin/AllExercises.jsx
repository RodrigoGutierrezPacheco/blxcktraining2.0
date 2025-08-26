import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Components/Button";
import { useAuth } from "../../context/useAuth";
import { muscleGroupsService } from "../../services/muscleGroups";
import { exercisesService } from "../../services/exercises";
import {
  Users,
  Dumbbell,
  TrendingUp,
  Settings,
  LogOut,
  Shield,
  BarChart3,
  Calendar,
  Plus,
  Edit,
  Trash2,
  Eye,
  Activity,
} from "lucide-react";

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

             // Transformar la respuesta de la API al formato esperado por el componente
       const transformedData = data.map((item) => ({
         id: item.id,
         name: item.name,
         muscleGroupId: item.muscleGroupId,
         muscleGroup: item.muscleGroup || 'N/A',
         description: item.description,
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

  const handleCreateExercise = () => {
    setShowCreateExercise(true);
  };

  const handleEditMuscleGroup = (muscleGroup) => {
    setEditingMuscleGroup(muscleGroup);
    setShowCreateMuscleGroup(true);
  };

  const handleEditExercise = (exercise) => {
    setEditingExercise(exercise);
    setShowCreateExercise(true);
  };

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

  const handleDeleteExercise = async (id) => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar este ejercicio?")
    ) {
      try {
        const token = localStorage.getItem("tokenBlck");
        if (!token) {
          throw new Error("No hay token de autenticación");
        }

        await exercisesService.deleteExercise(token, id);
        setExercises(exercises.filter((ex) => ex.id !== id));
      } catch (error) {
        console.error("Error eliminando ejercicio:", error);
        alert("Error al eliminar el ejercicio. Por favor, inténtalo de nuevo.");
      }
    }
  };

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
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === "muscle-groups" ? (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Grupos Musculares
                </h2>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    {muscleGroups.filter((mg) => mg.isActive).length} Activos
                  </span>
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    {muscleGroups.filter((mg) => !mg.isActive).length} Inactivos
                  </span>
                </div>
              </div>
              <Button
                onClick={handleCreateMuscleGroup}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                <Plus className="h-5 w-5 mr-2" />
                Nuevo Grupo Muscular
              </Button>
            </div>

            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nombre
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Descripción
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {muscleGroups.map((muscleGroup) => (
                      <tr
                        key={muscleGroup.id}
                        className={`hover:bg-gray-50 ${
                          !muscleGroup.isActive ? "bg-gray-50 opacity-75" : ""
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {muscleGroup.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {muscleGroup.description}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() =>
                              handleToggleMuscleGroupStatus(
                                muscleGroup.id,
                                muscleGroup.isActive
                              )
                            }
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                              muscleGroup.isActive
                                ? "bg-green-500 text-white hover:bg-green-600 shadow-sm"
                                : "bg-red-500 text-white hover:bg-red-600 shadow-sm"
                            }`}
                          >
                            {muscleGroup.isActive ? "✓ Activo" : "✗ Inactivo"}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                     <div className="flex space-x-2">
                             <button
                               onClick={() => handleEditMuscleGroup(muscleGroup)}
                               className="text-indigo-600 hover:text-indigo-900"
                             >
                               <Edit className="h-4 w-4" />
                             </button>
                             <button
                               onClick={() => handleDeleteMuscleGroup(muscleGroup.id)}
                               className="text-red-600 hover:text-red-900"
                             >
                               <Trash2 className="h-4 w-4" />
                             </button>
                           </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Ejercicios</h2>
              <Button
                onClick={handleCreateExercise}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                <Plus className="h-5 w-5 mr-2" />
                Nuevo Ejercicio
              </Button>
            </div>

            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nombre
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Grupo Muscular
                      </th>
                      
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {exercises.map((exercise) => (
                      <tr key={exercise.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {exercise.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {exercise.description}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {exercise.muscleGroup}
                          </span>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditExercise(exercise)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteExercise(exercise.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Modals will be added here */}
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

// Modal para crear/editar grupo muscular
function CreateMuscleGroupModal({
  isOpen,
  onClose,
  muscleGroup,
  saving,
  onSave,
}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (muscleGroup) {
      setFormData({
        name: muscleGroup.name,
        description: muscleGroup.description,
      });
    } else {
      setFormData({
        name: "",
        description: "",
      });
    }
  }, [muscleGroup]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {muscleGroup ? "Editar Grupo Muscular" : "Nuevo Grupo Muscular"}
        </h3>
        {muscleGroup && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Estado actual:</span>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  muscleGroup.isActive
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {muscleGroup.isActive ? "Activo" : "Inactivo"}
              </span>
            </div>
          </div>
        )}
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
                  {muscleGroup ? "Actualizando..." : "Creando..."}
                </div>
              ) : muscleGroup ? (
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

// Modal para crear/editar ejercicio
function CreateExerciseModal({
  isOpen,
  onClose,
  exercise,
  muscleGroups,
  saving,
  onSave,
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
      setFormData({
        name: "",
        muscleGroupId: "",
        description: "",
      });
    }
  }, [exercise]);

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
                .filter(mg => mg.isActive)
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
