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
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import EditProfileModal from "./EditProfileModal";
import TrainerInfo from "./TrainerInfo";
import { getUserByEmail } from "../../services/users";

export default function Perfil() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Función para formatear la fecha del backend
  const formatDate = (dateString) => {
    if (!dateString) return "";
    
    const date = new Date(dateString);
    const options = { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    };
    
    return date.toLocaleDateString('es-ES', options);
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
            memberSince: user.createdAt ? formatDate(user.createdAt) : "Fecha no disponible",
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
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      {/* Profile Header */}
      <section className="bg-black text-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10 mb-8 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img
            src={userData.profileImage || "/placeholder.svg"}
            alt="Imagen de perfil"
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-md"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              ¡Hola, {userData.fullName}!
            </h1>
            <p className="text-gray-300 text-lg">
              Bienvenido a tu espacio personal en BLXCK Training.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
        {/* Account Information Section */}
        <div className="lg:col-span-1">
          <Card className="border-2 border-black h-full">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-2">
                <User className="h-6 w-6" />
                Información de la Cuenta
              </h2>
              <div className="space-y-4 text-gray-700">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-600" />
                  <span>
                    Miembro desde:{" "}
                    <span className="font-semibold">
                      {userData.memberSince}
                    </span>
                  </span>
                </div>
                
                {userData.email && (
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-gray-600" />
                    <span>
                      Correo electrónico:{" "}
                      <span className="font-semibold">
                        {userData.email}
                      </span>
                    </span>
                  </div>
                )}
                
                {userData.fullName && userData.fullName !== userData.username && (
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-gray-600" />
                    <span>
                      Nombre completo:{" "}
                      <span className="font-semibold">
                        {userData.fullName}
                      </span>
                    </span>
                  </div>
                )}
                
                {userData.age && (
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-gray-600" />
                    <span>
                      Edad:{" "}
                      <span className="font-semibold">
                        {userData.age} años
                      </span>
                    </span>
                  </div>
                )}
                
                {(userData.weight || userData.height) && (
                  <div className="flex items-center gap-3">
                    <Scale className="h-5 w-5 text-gray-600" />
                    <span>
                      {userData.weight && (
                        <span>Peso: <span className="font-semibold">{userData.weight} kg</span></span>
                      )}
                      {userData.weight && userData.height && " | "}
                      {userData.height && (
                        <span>Altura: <span className="font-semibold">{userData.height} cm</span></span>
                      )}
                    </span>
                  </div>
                )}
                
                <div className="pt-4">
                  <Button
                    variant="outline"
                    className="w-full border-black text-black hover:bg-gray-100 bg-transparent"
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
        <div className="lg:col-span-2">
          <Card className="border-2 border-black h-full">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-2">
                <Dumbbell className="h-6 w-6" />
                Mi Estado de Entrenamiento
              </h2>
              
              {/* Si no tiene entrenador asignado */}
              {!userData.trainerId ? (
                <div className="text-center py-8">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-8 border border-blue-200 mb-6">
                    <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Dumbbell className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">
                      ¡Comienza tu viaje fitness!
                    </h3>
                    <p className="text-gray-600 text-lg mb-6">
                      Para acceder a rutinas personalizadas y entrenamiento profesional, 
                      necesitas elegir un plan de entrenamiento.
                    </p>
                    <Button 
                      onClick={() => navigate("/planes")}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 text-lg py-3 px-8 shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      <ArrowRight className="mr-2 h-5 w-5" />
                      Ver Planes Disponibles
                    </Button>
                  </div>
                </div>
              ) : (
                /* Si tiene entrenador pero no tiene rutina */
                !userData.hasRoutine ? (
                  <div className="text-center py-8">
                    <div className="bg-gradient-to-br from-yellow-50 to-orange-100 rounded-xl p-8 border border-yellow-200 mb-6">
                      <div className="bg-yellow-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <Clock className="h-8 w-8" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-3">
                        Entrenador Asignado
                      </h3>
                      <p className="text-gray-600 text-lg mb-6">
                        Tu entrenador está preparando tu rutina personalizada. 
                        Pronto tendrás acceso a tu plan de entrenamiento.
                      </p>
                      <div className="bg-white rounded-lg p-4 border border-yellow-200">
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">Estado:</span> Esperando asignación de rutina
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Si tiene entrenador y tiene rutina */
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border border-green-200">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-green-600 text-white rounded-full p-2">
                          <CheckCircle className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">
                            Rutina Activa
                          </h3>
                          <p className="text-green-600 font-medium">
                            ¡Tu rutina está lista!
                          </p>
                        </div>
                      </div>
                      
                      {/* Trainer Information */}
                      {userData.trainerId && <TrainerInfo trainerId={userData.trainerId} />}
                    </div>

                    <div className="text-center pt-4">
                      <p className="text-gray-600 text-lg mb-4">
                        Accede a los detalles completos de tu rutina personalizada.
                      </p>
                      <Button
                        onClick={handleViewRoutine}
                        className="bg-black text-white hover:bg-gray-800 text-lg py-3 px-8"
                      >
                        <ArrowRight className="mr-2 h-5 w-5" />
                        Ver Mi Rutina
                      </Button>
                    </div>
                  </div>
                )
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
    </div>
  );
}
