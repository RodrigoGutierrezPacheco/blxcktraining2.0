import { useState, useEffect } from "react";
import { Card, CardContent } from "../Components/Card";
import { Button } from "../Components/Button";
import {
  User,
  Calendar,
  Clock,
  Dumbbell,
  ArrowRight,
  Award,
  Scale,
  CheckCircle,
  Phone,
  MessageCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import EditProfileModal from "./EditProfileModal";
import TrainerInfo from "./TrainerInfo";
import { getUserByEmail, getTrainerById } from "../../services/users";
import FloatingTrainerContactButton from "../../components/FloatingTrainerContactButton";

export default function Perfil() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [trainerData, setTrainerData] = useState(null);

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
    const fetchUserData = async () => {
      try {
        setIsLoading(true);

        // Obtener información completa del usuario desde el backend
        const userInfo = await getUserByEmail();

        setUserData({
          ...userInfo,
          memberSince: formatDate(userInfo.createdAt), // Usar createdAt del backend
          profileImage:
            "https://images.unsplash.com/photo-1535713875002-d1d0cfd975fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        });

        // Fetch trainer data if user has a trainer
        if (userInfo.trainerId) {
          try {
            const trainerInfo = await getTrainerById(userInfo.trainerId);
            setTrainerData(trainerInfo);
          } catch (error) {
            console.error("Error fetching trainer data:", error);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Fallback a datos del localStorage si falla la API
        const storedUser = localStorage.getItem("userBlck");
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setUserData({
            username: user.username,
            fullName: user.fullName || user.username,
            dateOfBirth: user.dateOfBirth || null,
            healthIssues: user.healthIssues || "",
            age: user.age || null,
            weight: user.weight || null,
            height: user.height || null,
            memberSince: user.createdAt
              ? formatDate(user.createdAt)
              : "Fecha no disponible",
            profileImage:
              "https://images.unsplash.com/photo-1535713875002-d1d0cfd975fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleViewRoutine = () => {
    navigate("/mi-rutina");
  };

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
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

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl text-gray-700">
          No se pudo cargar la información del perfil.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      {/* Profile Header */}
      <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <img
            src="/public/images/BTNegro.png"
            alt="Imagen de perfil"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border border-gray-200"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1">
              ¡Hola, {userData.fullName}!
            </h1>
            <p className="text-gray-600 text-sm">Miembro de BLXCK Training</p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-4 gap-6">
        {/* Account Information Section */}
        <div className="lg:col-span-1">
          <Card className="border border-gray-200 h-fit">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <User className="h-5 w-5 text-gray-600" />
                Información de la Cuenta
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="h-4 w-4 text-gray-600" />
                  <div>
                    <label className="block text-xs font-medium text-gray-500">
                      Miembro desde
                    </label>
                    <span className="text-sm font-medium text-gray-900">
                      {userData.memberSince}
                    </span>
                  </div>
                </div>

                {userData.email && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <User className="h-4 w-4 text-gray-600" />
                    <div>
                      <label className="block text-xs font-medium text-gray-500">
                        Email
                      </label>
                      <span className="text-sm font-medium text-gray-900">
                        {userData.email}
                      </span>
                    </div>
                  </div>
                )}

                {userData.phone && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="h-4 w-4 text-gray-600" />
                    <div>
                      <label className="block text-xs font-medium text-gray-500">
                        Número telefónico
                      </label>
                      <span className="text-sm font-medium text-gray-900">
                        {userData.phone}
                      </span>
                    </div>
                  </div>
                )}

                {userData.fullName &&
                  userData.fullName !== userData.username && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <User className="h-4 w-4 text-gray-600" />
                      <div>
                        <label className="block text-xs font-medium text-gray-500">
                          Nombre completo
                        </label>
                        <span className="text-sm font-medium text-gray-900">
                          {userData.fullName}
                        </span>
                      </div>
                    </div>
                  )}

                {userData.age && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="h-4 w-4 text-gray-600" />
                    <div>
                      <label className="block text-xs font-medium text-gray-500">
                        Edad
                      </label>
                      <span className="text-sm font-medium text-gray-900">
                        {userData.age} años
                      </span>
                    </div>
                  </div>
                )}

                {userData.weight && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Scale className="h-4 w-4 text-gray-600" />
                    <div>
                      <label className="block text-xs font-medium text-gray-500">
                        Peso
                      </label>
                      <span className="text-sm font-medium text-gray-900">
                        {userData.weight} kg
                      </span>
                    </div>
                  </div>
                )}

                {userData.height && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Scale className="h-4 w-4 text-gray-600" />
                    <div>
                      <label className="block text-xs font-medium text-gray-500">
                        Altura
                      </label>
                      <span className="text-sm font-medium text-gray-900">
                        {userData.height} cm
                      </span>
                    </div>
                  </div>
                )}

                <div className="pt-4">
                  <Button
                    className="w-full bg-gray-900 text-white hover:bg-gray-800 px-4 py-2 rounded-lg font-medium transition-all duration-200"
                    onClick={handleEditProfile}
                  >
                    Editar Perfil
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* My Routine Section */}
        <div className="lg:col-span-3">
          <Card className="border border-gray-200 h-full">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Dumbbell className="h-5 w-5 text-gray-600" />
                  Entrenamiento
                </h2>
              </div>

              {/* Si no tiene entrenador asignado */}
              {!userData.trainerId ? (
                <div className="text-center py-8">
                  <Dumbbell className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-base font-medium text-gray-900 mb-2">
                    Sin plan de entrenamiento
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Elige un plan para acceder a rutinas personalizadas.
                  </p>
                  <button
                    onClick={() => navigate("/planes")}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
                  >
                    Ver planes disponibles →
                  </button>
                </div>
              ) : /* Si tiene entrenador pero no tiene rutina */
              !userData.hasRoutine ? (
                <div className="text-center py-8">
                  <Clock className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-base font-medium text-gray-900 mb-2">
                    Entrenador asignado
                  </h3>
                  <p className="text-sm text-gray-500">
                    Tu entrenador está preparando tu rutina.
                  </p>
                </div>
              ) : (
                /* Si tiene entrenador y tiene rutina */
                <div className="space-y-4">
                  <div className="flex items-center gap-3 py-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        Rutina activa
                      </h3>
                      <p className="text-xs text-gray-500">
                        Tu rutina está lista para entrenar
                      </p>
                    </div>
                  </div>
                  {/* Routine Expiration Info */}
                  {userData.routine && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        <div>
                          <h4 className="text-sm font-medium text-blue-900">
                            Vencimiento de la Rutina
                          </h4>
                          <p className="text-sm text-blue-700">
                            {userData.routine.endDate 
                              ? formatDate(userData.routine.endDate)
                              : "Fecha no disponible"
                            }
                          </p>
                          {userData.routine.endDate && (
                            <p className="text-xs text-blue-600 mt-1">
                              {(() => {
                                const endDate = new Date(userData.routine.endDate);
                                const today = new Date();
                                const diffTime = endDate - today;
                                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                
                                if (diffDays > 0) {
                                  return `${diffDays} día${diffDays !== 1 ? 's' : ''} restante${diffDays !== 1 ? 's' : ''}`;
                                } else if (diffDays === 0) {
                                  return "Rutina vence hoy";
                                } else {
                                  return "Rutina vencida";
                                }
                              })()}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Trainer Information */}
                  {userData.trainerId && (
                    <TrainerInfo trainerId={userData.trainerId} />
                  )}

                  {/* Routine Preview */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 sm:p-4 mt-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                      <h4 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                        <Dumbbell className="h-4 w-4 text-gray-600 flex-shrink-0" />
                        <span className="truncate">Vista Previa de la Rutina</span>
                      </h4>
                      <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full self-start sm:self-auto">
                        Preview
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 mb-3 sm:mb-4">
                      {/* Semana 1 */}
                      <div className="bg-white border border-gray-200 rounded-lg p-2 sm:p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                          <span className="text-xs font-medium text-gray-700">Semana 1</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Clock className="h-3 w-3 text-gray-400 flex-shrink-0" />
                            <span className="text-xs text-gray-600">Lunes</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-3 w-3 text-gray-400 flex-shrink-0" />
                            <span className="text-xs text-gray-600">Miércoles</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-3 w-3 text-gray-400 flex-shrink-0" />
                            <span className="text-xs text-gray-600">Viernes</span>
                          </div>
                        </div>
                      </div>

                      {/* Semana 2 */}
                      <div className="bg-white border border-gray-200 rounded-lg p-2 sm:p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                          <span className="text-xs font-medium text-gray-700">Semana 2</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Clock className="h-3 w-3 text-gray-400 flex-shrink-0" />
                            <span className="text-xs text-gray-600">Lunes</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-3 w-3 text-gray-400 flex-shrink-0" />
                            <span className="text-xs text-gray-600">Miércoles</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-3 w-3 text-gray-400 flex-shrink-0" />
                            <span className="text-xs text-gray-600">Viernes</span>
                          </div>
                        </div>
                      </div>

                      {/* Semana 3 */}
                      <div className="bg-white border border-gray-200 rounded-lg p-2 sm:p-3 sm:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                          <span className="text-xs font-medium text-gray-700">Semana 3</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Clock className="h-3 w-3 text-gray-400 flex-shrink-0" />
                            <span className="text-xs text-gray-600">Lunes</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-3 w-3 text-gray-400 flex-shrink-0" />
                            <span className="text-xs text-gray-600">Miércoles</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-3 w-3 text-gray-400 flex-shrink-0" />
                            <span className="text-xs text-gray-600">Viernes</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Ejemplo de ejercicio */}
                    <div className="bg-white border border-gray-200 rounded-lg p-2 sm:p-3 mb-3 sm:mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-gray-700">Ejemplo de Ejercicio</span>
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Dumbbell className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">Sentadillas</p>
                          <p className="text-xs text-gray-500 truncate">3 series x 12 repeticiones</p>
                        </div>
                      </div>
                    </div>

                    {/* Call to action */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h5 className="text-sm font-medium text-blue-900 mb-1">
                            ¿Listo para entrenar?
                          </h5>
                          <p className="text-xs text-blue-700">
                            Accede a tu rutina completa con todos los ejercicios, series y repeticiones
                          </p>
                        </div>
                    <button
                      onClick={handleViewRoutine}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 flex-shrink-0"
                    >
                          <span className="hidden sm:inline">Ver Rutina Completa</span>
                          <span className="sm:hidden">Ver Rutina</span>
                          <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                    </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        userData={userData}
        setUserData={setUserData}
      />
      
      {/* Floating Trainer Contact Button */}
      {userData?.trainerId && (
        <FloatingTrainerContactButton trainerData={trainerData} />
      )}
    </div>
  );
}
