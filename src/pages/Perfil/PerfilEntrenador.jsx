import { useState, useEffect } from "react";
import { Card, CardContent } from "../Components/Card";
import { Button } from "../Components/Button";
import {
  Award,
} from "lucide-react";
import { useAuth } from "../../context/useAuth";
import { getTrainerById, getUsersByTrainer } from "../../services/trainers";
import { getUserRoutineByEmail, getTrainerRoutines } from "../../services/routines";
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
  const [showTrainerRoutinesModal, setShowTrainerRoutinesModal] = useState(false);
  const [showEditRoutineModal, setShowEditRoutineModal] = useState(false);
  const [editingRoutineId, setEditingRoutineId] = useState(null);

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
  }, [user?.id]);

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

  const handleCloseTrainerRoutinesModal = () => {
    setShowTrainerRoutinesModal(false);
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

  const fetchTrainerRoutines = async () => {
    try {
      setIsLoadingRoutines(true);
      const routines = await getTrainerRoutines(user.id);
      setRoutinesData(routines);
    } catch (err) {
      console.error("Error fetching trainer routines:", err);
    } finally {
      setIsLoadingRoutines(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl text-gray-700">
          Cargando información del perfil...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600 mb-4">
            Error al cargar el perfil: {error}
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-black text-white hover:bg-gray-800"
          >
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  if (!trainerData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl text-gray-700">
          No se pudo cargar la información del entrenador.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      {/* Profile Header */}
      <section className="bg-black text-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10 mb-8 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative">
            <img
              src={
                trainerData.profileImage ||
                "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
              }
              alt="Imagen de perfil del entrenador"
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-md"
            />
            {trainerData.verified && (
              <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white rounded-full p-2">
                <Award className="h-4 w-4" />
              </div>
            )}
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              ¡Hola, {trainerData.fullName}!
            </h1>
            <p className="text-gray-300 text-lg">
              Bienvenido a tu espacio de entrenador en BLXCK Training.
            </p>
            {trainerData.specialty && (
              <p className="text-blue-300 text-lg mt-2">
                {trainerData.specialty}
              </p>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
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
      <div className="max-w-6xl mx-auto mt-8">
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
      <div className="max-w-6xl mx-auto mt-8">
        <TrainerRoutinesSection
          routinesData={routinesData}
          isLoadingRoutines={isLoadingRoutines}
          handleViewRoutines={handleViewRoutines}
        />
      </div>

      {/* Trainer Documents Section */}
      <div className="max-w-6xl mx-auto mt-8">
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
