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
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import EditProfileModal from "./EditProfileModal";
import TrainerInfo from "./TrainerInfo";
import { getUserByEmail } from "../../services/users";

export default function Perfil() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [routineData, setRoutineData] = useState(null);
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

        const today = new Date();
        const expirationDate = new Date(today);
        expirationDate.setDate(today.getDate() + 25);
        const daysRemaining = Math.ceil(
          (expirationDate - today) / (1000 * 60 * 60 * 24)
        );

        setRoutineData({
          name: "Plan Transformación Total",
          type: "Funcional en Casa y Gimnasio",
          duration: "5 Semanas",
          expiresInDays: daysRemaining,
          progress: "70%",
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
                
                {routineData && (
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-gray-600" />
                    <span>
                      Tu rutina vence en:{" "}
                      <span className="font-semibold">
                        {routineData.expiresInDays} días
                      </span>
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
                Mi Rutina Actual
              </h2>
              {routineData ? (
                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4 text-gray-700 mb-6">
                    <div>
                      <p className="text-lg font-semibold mb-1">
                        {routineData.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {routineData.type}
                      </p>
                    </div>
                    <div className="text-right sm:text-left">
                      <p className="text-lg font-semibold mb-1">
                        Duración: {routineData.duration}
                      </p>
                      <p className="text-sm text-gray-600">
                        Progreso: {routineData.progress}
                      </p>
                    </div>
                  </div>

                  {/* Trainer Information */}
                  {userData.trainerId && <TrainerInfo trainerId={userData.trainerId} />}

                  <div className="text-center pt-4">
                    <p className="text-gray-600 text-lg mb-4">
                      Accede a los detalles completos de tu rutina
                      personalizada.
                    </p>
                    <Button
                      onClick={handleViewRoutine}
                      className="bg-black text-white hover:bg-gray-800 text-lg py-3 px-8"
                    >
                      <ArrowRight className="mr-2 h-5 w-5" />
                      Mi Rutina
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 text-lg mb-4">
                    Aún no tienes una rutina activa.
                  </p>
                  <Button className="bg-black text-white hover:bg-gray-800">
                    Explorar Planes de Entrenamiento
                  </Button>
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
    </div>
  );
}
