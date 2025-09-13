import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "../Components/Card";
import { Button } from "../Components/Button";
import { Award } from "lucide-react";
import { useAuth } from "../../context/useAuth";
import { getTrainerById, getUsersByTrainer } from "../../services/trainers";
import {
  getUserRoutineByEmail,
  getTrainerRoutines,
} from "../../services/routines";
import ClientTrainer from "../Components/Modals/ClientTrainer";
import UserRoutineModal from "../Components/Modals/UserRoutineModal";
import AssignRoutineModal from "../Components/Modals/AssignRoutineModal";
import TrainerRoutinesModal from "../Components/Modals/TrainerRoutinesModal";
import EditRoutineModal from "../Components/Modals/EditRoutineModal";
import TrainerInfo from "../Components/TrainerInfo";
import TrainerStatsBio from "../Components/TrainerStatsBio";
import ClientsSection from "../Components/ClientsSection";
import TrainerRoutinesSection from "../Components/TrainerRoutinesSection";
import TrainerDocumentsSection from "../../components/TrainerDocumentsSection";

export default function PerfilEntrenador() {
  const { user } = useAuth();
  const [trainerData, setTrainerData] = useState(null);
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showAssignRoutineModal, setShowAssignRoutineModal] = useState(false);
  const [showRoutineModal, setShowRoutineModal] = useState(false);
  const [selectedUserRoutine, setSelectedUserRoutine] = useState(null);
  const [loadingRoutine, setLoadingRoutine] = useState(false);
  const [routinesData, setRoutinesData] = useState([]);
  const [isLoadingRoutines, setIsLoadingRoutines] = useState(false);
  const [showTrainerRoutinesModal, setShowTrainerRoutinesModal] =
    useState(false);
  const [showEditRoutineModal, setShowEditRoutineModal] = useState(false);
  const [editingRoutineId, setEditingRoutineId] = useState(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };

    return date.toLocaleDateString("es-ES", options);
  };
  const fetchTrainerRoutines = useCallback(async () => {
    try {
      setIsLoadingRoutines(true);
      const routines = await getTrainerRoutines(user.id);
      setRoutinesData(routines);
    } catch (err) {
      console.error("Error fetching trainer routines:", err);
    } finally {
      setIsLoadingRoutines(false);
    }
  }, [user?.id]);
  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) {
        setIsLoading(false);
        setError("No se encontró información del entrenador");
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const trainerInfo = await getTrainerById(user.id);
        setTrainerData(trainerInfo);
        const users = await getUsersByTrainer(user.id);
        setUsersData(users);

        // Obtener rutinas del entrenador
        await fetchTrainerRoutines();
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message || "Error desconocido al cargar los datos");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user?.id, fetchTrainerRoutines]);

  const formatUserDate = (dateString) => {
    if (!dateString) return "No disponible";

    const date = new Date(dateString);
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };

    return date.toLocaleDateString("es-ES", options);
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleCloseModal = () => {
    setShowUserModal(false);
    setSelectedUser(null);
  };

  const handleAssignRoutine = (user) => {
    setSelectedUser(user);
    setShowAssignRoutineModal(true);
  };

  const handleCloseAssignRoutineModal = () => {
    setShowAssignRoutineModal(false);
    setSelectedUser(null);
  };

  const handleViewRoutine = async (user) => {
    try {
      setLoadingRoutine(true);
      setSelectedUser(user);

      const routine = await getUserRoutineByEmail(user.email);

      if (routine) {
        setSelectedUserRoutine(routine);
        setShowRoutineModal(true);
      } else {
        alert(`${user.fullName} no tiene una rutina asignada aún.`);
      }
    } catch (error) {
      console.error("Error fetching user routine:", error);
      alert(`Error al obtener la rutina de ${user.fullName}`);
    } finally {
      setLoadingRoutine(false);
    }
  };

  const handleCloseRoutineModal = () => {
    setShowRoutineModal(false);
    setSelectedUserRoutine(null);
    setSelectedUser(null);
  };

  const handleViewRoutines = () => {
    setShowTrainerRoutinesModal(true);
  };

  const handleCreateRoutine = () => {
    setOpenCreateModal(true);
    setShowTrainerRoutinesModal(true);
  };

  const handleCloseTrainerRoutinesModal = () => {
    setShowTrainerRoutinesModal(false);
    setOpenCreateModal(false);
  };

  const handleEditRoutine = (routineId) => {
    setEditingRoutineId(routineId);
    setShowEditRoutineModal(true);
    setShowTrainerRoutinesModal(false);
  };

  const handleCloseEditRoutineModal = () => {
    setShowEditRoutineModal(false);
    setEditingRoutineId(null);
  };

  const handleRoutineUpdated = () => {
    // Recargar las rutinas del entrenador
    if (user?.id) {
      fetchTrainerRoutines();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">
            Cargando información del perfil...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-red-600 mb-4">
            Error al cargar el perfil: {error}
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-gray-900 text-white hover:bg-gray-800 px-4 py-2 rounded-lg font-medium transition-all duration-200"
          >
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  if (!trainerData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-sm text-gray-600">
          No se pudo cargar la información del entrenador.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      {/* Profile Header */}
      <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative">
            <img
              src={
                trainerData.profileImage ||
                "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
              }
              alt="Imagen de perfil del entrenador"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border border-gray-200"
            />
            {trainerData.verified && (
              <div className="absolute -bottom-1 -right-1 bg-gray-600 text-white rounded-full p-1">
                <Award className="h-3 w-3" />
              </div>
            )}
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1">
              {trainerData.fullName}
            </h1>
            <p className="text-gray-600 text-sm">
              Entrenador en BLXCK Training
            </p>
            {trainerData.specialty && (
              <p className="text-gray-500 text-sm mt-1">
                {trainerData.specialty}
              </p>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6">
        {/* Trainer Information Section */}
        <div className="lg:col-span-1">
          <TrainerInfo trainerData={trainerData} formatDate={formatDate} />
        </div>

        {/* Trainer Stats & Bio Section */}
        <div className="lg:col-span-2">
          <TrainerStatsBio trainerData={trainerData} usersData={usersData} />
        </div>
      </div>

      {/* Clients Section */}
      <div className="max-w-6xl mx-auto mt-6">
        <ClientsSection
          usersData={usersData}
          formatUserDate={formatUserDate}
          handleViewUser={handleViewUser}
          handleViewRoutine={handleViewRoutine}
          handleAssignRoutine={handleAssignRoutine}
          loadingRoutine={loadingRoutine}
        />
      </div>

      {/* Trainer Routines Section */}
      <div className="max-w-6xl mx-auto mt-6">
        <TrainerRoutinesSection
          routinesData={routinesData}
          isLoadingRoutines={isLoadingRoutines}
          handleViewRoutines={handleViewRoutines}
          handleCreateRoutine={handleCreateRoutine}
        />
      </div>

      {/* Trainer Documents Section */}
      <div className="max-w-6xl mx-auto mt-6">
        <TrainerDocumentsSection trainerId={user?.id} />
      </div>

      {/* User Details Modal */}
      {showUserModal && selectedUser && (
        <ClientTrainer
          selectedUser={selectedUser}
          handleCloseModal={handleCloseModal}
          formatUserDate={formatUserDate}
        />
      )}

      {/* Assign Routine Modal */}
      {showAssignRoutineModal && selectedUser && (
        <AssignRoutineModal
          isOpen={showAssignRoutineModal}
          onClose={handleCloseAssignRoutineModal}
          userName={selectedUser.fullName}
          userId={selectedUser.id}
          trainerId={user?.id}
          onRoutineAssigned={() => {
            // Recargar la lista de usuarios para mostrar la rutina asignada
            if (user?.id) {
              // Recargar los datos del entrenador y usuarios
              const reloadData = async () => {
                try {
                  const trainerInfo = await getTrainerById(user.id);
                  setTrainerData(trainerInfo);
                  const users = await getUsersByTrainer(user.id);
                  setUsersData(users);
                } catch (err) {
                  console.error("Error reloading data:", err);
                }
              };
              reloadData();
            }
          }}
        />
      )}

      {/* User Routine Modal */}
      {showRoutineModal && selectedUserRoutine && selectedUser && (
        <UserRoutineModal
          isOpen={showRoutineModal}
          onClose={handleCloseRoutineModal}
          userRoutine={selectedUserRoutine}
          userName={selectedUser.fullName}
        />
      )}

      {/* Trainer Routines Modal */}
      {showTrainerRoutinesModal && (
        <TrainerRoutinesModal
          isOpen={showTrainerRoutinesModal}
          onClose={handleCloseTrainerRoutinesModal}
          routinesData={routinesData}
          onEditRoutine={handleEditRoutine}
          onRoutineCreated={() => {
            // Recargar las rutinas del entrenador
            if (user?.id) {
              fetchTrainerRoutines();
            }
          }}
          openCreateModal={openCreateModal}
          trainerId={user?.id}
        />
      )}

      {/* Edit Routine Modal */}
      {showEditRoutineModal && editingRoutineId && (
        <EditRoutineModal
          isOpen={showEditRoutineModal}
          onClose={handleCloseEditRoutineModal}
          routineId={editingRoutineId}
          onRoutineUpdated={handleRoutineUpdated}
        />
      )}
    </div>
  );
}
