import { useState, useEffect } from "react";
import { Card, CardContent } from "../Components/Card";
import { Button } from "../Components/Button";
import {
  Calendar,
  Clock,
  Dumbbell,
  Users,
  Award,
  Mail,
  Phone,
  MapPin,
  Star,
  Edit,
  Plus,
  Eye,
  BookOpen,
} from "lucide-react";
import { useAuth } from "../../context/useAuth";
import { getTrainerById, getUsersByTrainer } from "../../services/trainers";
import ClientTrainer from "../Components/Modals/ClientTrainer";

export default function PerfilEntrenador() {
  const { user } = useAuth();
  const [trainerData, setTrainerData] = useState(null);
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showAssignRoutineModal, setShowAssignRoutineModal] = useState(false);

  // Función para formatear la fecha del backend
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
        console.log("Fetching trainer data for user:", user);

        // Cargar datos del entrenador
        const trainerInfo = await getTrainerById(user.id);
        console.log("Received trainer info:", trainerInfo);
        setTrainerData(trainerInfo);
        // Cargar usuarios del entrenador (ya incluye hasRoutine del backend)
        const users = await getUsersByTrainer(user.id);
        console.log("Received users:", users);
        setUsersData(users);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message || "Error desconocido al cargar los datos");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user?.id]);

  // Función para formatear la fecha de creación del usuario
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

  // Función para abrir modal de información del usuario
  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  // Función para cerrar modal
  const handleCloseModal = () => {
    setShowUserModal(false);
    setSelectedUser(null);
  };

  // Función para abrir modal de asignar rutina
  const handleAssignRoutine = (user) => {
    setSelectedUser(user);
    setShowAssignRoutineModal(true);
  };

  // Función para cerrar modal de asignar rutina
  const handleCloseAssignRoutineModal = () => {
    setShowAssignRoutineModal(false);
    setSelectedUser(null);
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
          <Card className="border-2 border-black h-full">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-2">
                <Dumbbell className="h-6 w-6" />
                Información del Entrenador
              </h2>
              <div className="space-y-4 text-gray-700">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-600" />
                  <span>
                    Entrenador desde:{" "}
                    <span className="font-semibold">
                      {trainerData.createdAt
                        ? formatDate(trainerData.createdAt)
                        : "Fecha no disponible"}
                    </span>
                  </span>
                </div>

                {trainerData.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-600" />
                    <span>
                      Email:{" "}
                      <span className="font-semibold">{trainerData.email}</span>
                    </span>
                  </div>
                )}

                {trainerData.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gray-600" />
                    <span>
                      Teléfono:{" "}
                      <span className="font-semibold">{trainerData.phone}</span>
                    </span>
                  </div>
                )}

                {trainerData.location && (
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-gray-600" />
                    <span>
                      Ubicación:{" "}
                      <span className="font-semibold">
                        {trainerData.location}
                      </span>
                    </span>
                  </div>
                )}

                {trainerData.rating && (
                  <div className="flex items-center gap-3">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <span>
                      Calificación:{" "}
                      <span className="font-semibold">
                        {trainerData.rating} / 5 estrellas
                      </span>
                    </span>
                  </div>
                )}

                {trainerData.experience && (
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-gray-600" />
                    <span>
                      Experiencia:{" "}
                      <span className="font-semibold">
                        {trainerData.experience}
                      </span>
                    </span>
                  </div>
                )}

                <div className="pt-4">
                  <Button
                    variant="outline"
                    className="w-full border-black text-black hover:bg-gray-100 bg-transparent"
                    onClick={() => {
                      /* TODO: Implementar edición */
                    }}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Editar Perfil
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trainer Stats & Bio Section */}
        <div className="lg:col-span-2">
          <Card className="border-2 border-black h-full">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-2">
                <Users className="h-6 w-6" />
                Estadísticas y Biografía
              </h2>

              {trainerData ? (
                <div className="space-y-6">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-black">
                        {usersData.length}
                      </div>
                      <div className="text-sm text-gray-600">Clientes</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-black">
                        {trainerData.activePrograms || 0}
                      </div>
                      <div className="text-sm text-gray-600">
                        Programas Activos
                      </div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-black">
                        {trainerData.completedSessions || 0}
                      </div>
                      <div className="text-sm text-gray-600">
                        Sesiones Completadas
                      </div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-black">
                        {trainerData.rating || "N/A"}
                      </div>
                      <div className="text-sm text-gray-600">Rating</div>
                    </div>
                  </div>

                  {/* Bio Section */}
                  {trainerData.bio && (
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h3 className="text-lg font-semibold text-black mb-3">
                        Sobre mí
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {trainerData.bio}
                      </p>
                    </div>
                  )}

                  {/* Certifications */}
                  {trainerData.certifications &&
                    trainerData.certifications.length > 0 && (
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-semibold text-black mb-3">
                          Certificaciones
                        </h3>
                        <div className="space-y-2">
                          {trainerData.certifications.map((cert, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >
                              <Award className="h-4 w-4 text-blue-600" />
                              <span className="text-gray-700">{cert}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Specialties */}
                  {trainerData.specialties &&
                    trainerData.specialties.length > 0 && (
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-semibold text-black mb-3">
                          Especialidades
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {trainerData.specialties.map((specialty, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 text-lg mb-4">
                    No hay información disponible del entrenador.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Users Section */}
      <div className="max-w-6xl mx-auto mt-8">
        <Card className="border-2 border-black">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-black flex items-center gap-2">
                <Users className="h-6 w-6" />
                Mis Usuarios y Entrenamientos
              </h2>
              <div className="text-lg font-semibold text-gray-700">
                Total: {usersData.length} usuario
                {usersData.length !== 1 ? "s" : ""}
              </div>
            </div>
            {console.log("usersData", usersData)}
            {usersData.length > 0 ? (
              <div className="grid gap-4">
                {usersData.map((user) => (
                  <div
                    key={user.id}
                    className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-black mb-2">
                          {user.fullName}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-700">
                          <div>
                            <span className="font-medium">Email:</span>{" "}
                            {user.email}
                          </div>
                          {user.age && (
                            <div>
                              <span className="font-medium">Edad:</span>{" "}
                              {user.age} años
                            </div>
                          )}
                          {user.weight && (
                            <div>
                              <span className="font-medium">Peso:</span>{" "}
                              {user.weight} kg
                            </div>
                          )}
                          {user.height && (
                            <div>
                              <span className="font-medium">Altura:</span>{" "}
                              {user.height} cm
                            </div>
                          )}
                          <div>
                            <span className="font-medium">Registrado:</span>{" "}
                            {formatUserDate(user.createdAt)}
                          </div>
                        </div>

                        {(user.chronicDiseases || user.healthIssues) && (
                          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                            <h4 className="font-medium text-yellow-800 mb-2">
                              Información de Salud:
                            </h4>
                            {user.chronicDiseases && (
                              <p className="text-sm text-yellow-700">
                                <span className="font-medium">
                                  Enfermedades crónicas:
                                </span>{" "}
                                {user.chronicDiseases}
                              </p>
                            )}
                            {user.healthIssues && (
                              <p className="text-sm text-yellow-700 mt-1">
                                <span className="font-medium">
                                  Problemas de salud:
                                </span>{" "}
                                {user.healthIssues}
                              </p>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-2 ml-4">
                        <Button
                          onClick={() => handleViewUser(user)}
                          className="bg-blue-600 text-white hover:bg-blue-700 text-sm px-3 py-2"
                        >
                          <Eye className="mr-1 h-4 w-4" />
                          Ver Detalles
                        </Button>
                        {user.hasRoutine ? (
                          <Button
                            className="bg-purple-600 text-white hover:bg-purple-700 text-sm px-3 py-2"
                          >
                            <BookOpen className="mr-1 h-4 w-4" />
                            Ver Rutina
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handleAssignRoutine(user)}
                            className="bg-green-600 text-white hover:bg-green-700 text-sm px-3 py-2"
                          >
                            <Plus className="mr-1 h-4 w-4" />
                            Asignar Rutina
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg mb-2">
                  No tienes usuarios asignados aún
                </p>
                <p className="text-gray-500">
                  Los usuarios que se registren con tu código aparecerán aquí
                </p>
              </div>
            )}
          </CardContent>
        </Card>
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
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl max-w-md w-full shadow-2xl border border-gray-200">
            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold text-black mb-4">
                Asignar Rutina
              </h3>
              <p className="text-gray-600 mb-6">
                Funcionalidad en desarrollo
              </p>
              <Button
                onClick={handleCloseAssignRoutineModal}
                className="bg-gray-500 text-white hover:bg-gray-600 px-6 py-3"
              >
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
