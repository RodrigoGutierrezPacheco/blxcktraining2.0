import { useState, useEffect } from "react";
import { Eye, EyeOff, LogInIcon, User, Dumbbell } from "lucide-react";
import { Button } from "../Components/Button";
import { Card, CardContent } from "../Components/Card";
import { useNavigate } from "react-router-dom";
import { loginUser, loginTrainer } from "../../services/users";
import Spinner from "../Components/Spinner";
import { useAuth } from "../../context/useAuth";

export default function Login() {
  const [activeTab, setActiveTab] = useState("user"); // "user" o "trainer"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login, user, userType } = useAuth();

  // Redirigir automáticamente si el usuario ya está autenticado
  useEffect(() => {
    if (user && userType) {
      // Redirigir según el tipo de usuario
      if (userType === "user") {
        navigate("/perfil");
      } else if (userType === "trainer") {
        navigate("/entrenadores/perfil");
      }
    }
  }, [user, userType, navigate]);

  const handleLogin = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    if (!email || !password) {
      setIsLoading(false);
      setMessage("Por favor, ingresa tu email y contraseña.");
      return;
    }

    try {
      let response;
      if (activeTab === "user") {
        response = await loginUser({ email, password });
      } else {
        response = await loginTrainer({ email, password });
      }

      if (response.status === "success") {
        setIsLoading(false);
        
        // Extraer datos según el tipo de usuario
        let userData, authToken;
        if (activeTab === "user") {
          userData = response.user;
          authToken = response.token;
        } else {
          userData = response.trainer;
          authToken = response.token;
        }
        
        // Llamar a login con el tipo correcto
        login(userData, authToken, activeTab);
        setMessage("Inicio de sesión exitoso!");
        
        // Redirigir según el tipo de usuario
        if (activeTab === "user") {
          navigate("/perfil");
        } else {
          navigate("/entrenadores/perfil"); // O la ruta que corresponda para entrenadores
        }
      } else {
        setIsLoading(false);
        setMessage(response.message);
      }
    } catch (error) {
      setIsLoading(false);
      setMessage(error.message || "Error al iniciar sesión");
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setMessage(""); // Limpiar mensajes al cambiar de tab
    setEmail(""); // Limpiar campos al cambiar de tab
    setPassword("");
  };

  return (
    <div className="min-h-[calc(100vh-60px)] bg-gray-100 flex items-center justify-center p-1 sm:p-4 pt-8 sm:pt-4">
      <Card className="w-full max-w-md border-2 border-black relative">
        <CardContent className="p-4 sm:p-6 lg:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-black mb-2">
              Iniciar Sesión
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Accede a tu cuenta de BLXCK Training
            </p>
          </div>

          {/* Tabs para seleccionar tipo de usuario */}
          <div className="flex mb-4 sm:mb-6 bg-gray-100 rounded-lg p-0.5 sm:p-1">
            <button
              type="button"
              onClick={() => handleTabChange("user")}
              className={`flex-1 cursor-pointer flex items-center justify-center gap-1 sm:gap-2 py-2 px-2 sm:px-4 rounded-md font-medium transition-colors text-sm sm:text-base ${
                activeTab === "user"
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <User className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="truncate">Usuario</span>
            </button>
            <button
              type="button"
              onClick={() => handleTabChange("trainer")}
              className={`flex-1 cursor-pointer flex items-center justify-center gap-1 sm:gap-2 py-2 px-2 sm:px-4 rounded-md font-medium transition-colors text-sm sm:text-base ${
                activeTab === "trainer"
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <Dumbbell className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="truncate">Entrenador</span>
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors text-sm sm:text-base"
                placeholder="Tu correo electrónico"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors pr-10 text-sm sm:text-base"
                  placeholder="Tu contraseña"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-black focus:outline-none"
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                </button>
              </div>
            </div>

            {message && (
              <p
                className={`text-center text-sm ${
                  message.includes("exitoso")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}

            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-800 text-base sm:text-lg py-2.5 sm:py-3"
              disabled={isLoading}
            >
              {!isLoading ? (
                <div className="flex items-center gap-1 justify-center">
                  <LogInIcon className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-sm sm:text-base">
                    Iniciar Sesión
                  </span>
                </div>
              ) : (
                <Spinner className="h-1 w-1" size="sm" />
              )}
            </Button>
          </form>

          <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm">
            <a href="#" className="text-black hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
            <p className="mt-2 text-gray-600">
              ¿No tienes cuenta?{" "}
              <a
                href={activeTab === "user" ? "/registro" : "/registro-entrenadores"}
                className="text-black hover:underline font-medium"
              >
                Regístrate aquí
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
