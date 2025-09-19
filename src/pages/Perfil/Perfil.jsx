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
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      {/* Profile Header */}
      <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <img
            src={userData.profileImage || "/placeholder.svg"}
            alt="Imagen de perfil"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border border-gray-200"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1">
              ¡Hola, {userData.fullName}!
            </h1>
            <p className="text-gray-600 text-sm">
              Miembro de BLXCK Training
            </p>
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
                
                {userData.fullName && userData.fullName !== userData.username && (
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
              <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Dumbbell className="h-5 w-5 text-gray-600" />
                Entrenamiento
              </h2>
              
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
               ) : (
                 /* Si tiene entrenador pero no tiene rutina */
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
                     
                     {/* Trainer Information */}
                     {userData.trainerId && <TrainerInfo trainerId={userData.trainerId} />}

                     <div className="pt-2">
                       <button
                         onClick={handleViewRoutine}
                         className="text-sm text-gray-600 hover:text-gray-900 font-medium"
                       >
                         Ver rutina completa →
                       </button>
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
