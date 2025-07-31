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
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Perfil() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [routineData, setRoutineData] = useState(null);

  useEffect(() => {
    // Simulate fetching user data from localStorage
    const storedUser = localStorage.getItem("userBlck");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserData({
        username: user.username,
        memberSince: "15 de Enero, 2023", // Simulated data
        profileImage:
          "https://images.unsplash.com/photo-1535713875002-d1d0cfd975fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150", // Placeholder image
      });

      // Simulate routine data including trainer info
      const today = new Date();
      const expirationDate = new Date(today);
      expirationDate.setDate(today.getDate() + 25); // Routine expires in 25 days
      const daysRemaining = Math.ceil(
        (expirationDate - today) / (1000 * 60 * 60 * 24)
      );

      setRoutineData({
        name: "Plan Transformación Total",
        type: "Funcional en Casa y Gimnasio",
        duration: "5 Semanas",
        expiresInDays: daysRemaining,
        trainerName: "Juan Pérez", // Simulated trainer data
        trainerSpecialty: "Entrenador Funcional & HIIT", // Simulated trainer data
        progress: "70%", // Simulated progress
      });
    } else {
      // Handle case where user is not logged in or data is not in localStorage
      setUserData(null);
      setRoutineData(null);
      // In a real app, you might redirect to the login page here
      // window.location.href = '/login';
    }
  }, []);

  const handleViewRoutine = () => {
    navigate("/mi-rutina");
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl text-gray-700">
          Cargando perfil o no hay datos de usuario...
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
              ¡Hola, {userData.username}!
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
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
                    <h3 className="text-lg font-semibold text-black mb-3 flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Tu Entrenador:
                    </h3>
                    <p className="text-gray-700">
                      <span className="font-semibold">
                        {routineData.trainerName}
                      </span>{" "}
                      - {routineData.trainerSpecialty}
                    </p>
                    <Button
                      variant="link"
                      className="p-0 h-auto text-black hover:underline mt-2"
                    >
                      Ver perfil del entrenador
                    </Button>
                  </div>

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
    </div>
  );
}
