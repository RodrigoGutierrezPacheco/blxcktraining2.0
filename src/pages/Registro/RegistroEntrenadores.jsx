import { useState, useEffect } from "react";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { Button } from "../Components/Button";
import { Card, CardContent } from "../Components/Card";
import { useNavigate } from "react-router-dom";
import { createTrainer } from "./../../services/trainers";

export default function Registro() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [backendErrors, setBackendErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  useEffect(() => {
    // Solo validar si no hay errores del backend
    const hasBackendErrors = Object.values(backendErrors).some(error => 
      error && (error.includes("ya está registrado") || error.includes("debe tener"))
    );
    
    if (hasBackendErrors) {
      console.log("Hay errores del backend, no sobrescribir");
      return;
    }

    const newErrors = {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (touched.fullName && !formData.fullName.trim()) {
      newErrors.fullName = "El nombre completo es obligatorio";
    }

    if (touched.email) {
      if (!formData.email) {
        newErrors.email = "El correo electrónico es obligatorio";
      } else if (!validateEmail(formData.email)) {
        newErrors.email = "Ingresa un correo electrónico válido";
      }
    }

    if (touched.password) {
      if (!formData.password) {
        newErrors.password = "La contraseña es obligatoria";
      } else if (formData.password.length < 8) {
        newErrors.password = "La contraseña debe tener al menos 8 caracteres";
      }
    }

    if (touched.confirmPassword) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Confirma tu contraseña";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Las contraseñas no coinciden";
      }
    }

    setErrors(newErrors);
  }, [formData, touched, backendErrors]);

  // Debug: Monitorear cambios en errores y touched
  useEffect(() => {
    console.log("Estado de errores actualizado:", errors);
    console.log("Estado de errores del backend:", backendErrors);
    console.log("Estado de touched actualizado:", touched);
  }, [errors, backendErrors, touched]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (!touched[id]) {
      setTouched((prev) => ({ ...prev, [id]: true }));
    }
  };

  const handleBlur = (e) => {
    const { id } = e.target;
    setTouched((prev) => ({ ...prev, [id]: true }));
  };

  const validateForm = () => {
    setTouched({
      fullName: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    return !Object.values(errors).some((error) => error !== "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "", type: "" });
    
    // Limpiar errores del backend al iniciar nuevo envío
    setBackendErrors({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      await createTrainer({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });
      
      // Limpiar errores del backend al ser exitoso
      setBackendErrors({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      
      setMessage({
        text: "Registro exitoso! Redirigiendo...",
        type: "success",
      });
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      console.log(error);
      
      // Intentar parsear errores de validación del backend
      try {
        const errorData = JSON.parse(error.message);
        console.log("Error parseado:", errorData);
        
        // Si hay errores de validación específicos
        if (errorData.errors && Array.isArray(errorData.errors)) {
          console.log("Manejando errores de validación");
          // Mapear errores del backend a campos específicos
          const newBackendErrors = { ...backendErrors };
          
          errorData.errors.forEach(errorMsg => {
            if (errorMsg.includes("contraseña") || errorMsg.includes("password")) {
              newBackendErrors.password = errorMsg;
            } else if (errorMsg.includes("correo") || errorMsg.includes("email")) {
              newBackendErrors.email = errorMsg;
            } else if (errorMsg.includes("nombre") || errorMsg.includes("fullName")) {
              newBackendErrors.fullName = errorMsg;
            } else {
              // Si no se puede mapear a un campo específico, mostrar en el mensaje general
              setMessage({
                text: errorMsg,
                type: "error",
              });
            }
          });
          
          setBackendErrors(newBackendErrors);
          
          // Marcar los campos con errores como touched para mostrar los errores
          setTouched(prev => ({
            ...prev,
            password: true,
            email: true,
            fullName: true
          }));
          
          return;
        }
        
        // Si es un error de conflicto (email ya registrado)
        if (errorData.statusCode === 409 || errorData.error === "Conflict") {
          console.log("Manejando error de conflicto 409");
          const errorMessage = errorData.message || "Este correo ya está registrado como entrenador";
          console.log("Mensaje de error a mostrar:", errorMessage);
          
          // Configurar el error del backend
          setBackendErrors(prev => ({
            ...prev,
            email: errorMessage
          }));
          
          // Marcar el campo como touched
          setTouched(prev => ({ ...prev, email: true }));
          
          // Limpiar mensaje general si existe
          setMessage({ text: "", type: "" });
          
          console.log("Error del backend configurado en el campo email");
          return;
        }
        
        // Si hay un mensaje general en el error parseado
        if (errorData.message) {
          console.log("Manejando mensaje general del error");
          setMessage({
            text: errorData.message,
            type: "error",
          });
          return;
        }
      } catch (parseError) {
        console.log("Error al parsear JSON:", parseError);
        console.log("Mensaje de error original:", error.message);
        // Si no se puede parsear, continuar con el manejo normal de errores
      }
      
      // Manejo de errores específicos conocidos (fallback)
      if (error.message.includes("El correo electrónico ya está registrado") || 
          error.message.includes("correo ya está registrado") ||
          error.message.includes("ya está registrado como entrenador")) {
        console.log("Manejando error con fallback");
        setErrors((prev) => ({
          ...prev,
          email: "Este correo ya está registrado como entrenador",
        }));
        setTouched(prev => ({ ...prev, email: true }));
      } else {
        console.log("Mostrando mensaje de error general");
        setMessage({
          text: error.message || "Error al registrar. Por favor intenta nuevamente.",
          type: "error",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col gap-4 items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="w-full border-2 border-black">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-black mb-2">
                Registro para Entrenadores
              </h2>
              <p className="text-gray-600">
                Crea tu cuenta profesional en BLXCK Training
              </p>
            </div>

            {message.text && (
              <div
                className={`mb-6 p-3 rounded-md text-center ${
                  message.type === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nombre completo (como aparecerá en tu perfil)
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 border ${
                    (errors.fullName || backendErrors.fullName) ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors`}
                  placeholder="Ej: Carlos Rodríguez"
                />
                {(errors.fullName || backendErrors.fullName) && touched.fullName && (
                  <p className="mt-1 text-sm text-red-600">{backendErrors.fullName || errors.fullName}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Correo electrónico profesional
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 border ${
                    (errors.email || backendErrors.email) ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors`}
                  placeholder="tu@email.com"
                />
                {(errors.email || backendErrors.email) && touched.email && (
                  <p className="mt-1 text-sm text-red-600">{backendErrors.email || errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Contraseña de acceso
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 border ${
                      (errors.password || backendErrors.password) ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:ring-2 focus:ring-black focus:border-black transition-colors pr-10`}
                    placeholder="Mínimo 8 caracteres"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-black focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {(errors.password || backendErrors.password) && touched.password && (
                  <p className="mt-1 text-sm text-red-600">{backendErrors.password || errors.password}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Confirmar contraseña
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 border ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors pr-10`}
                    placeholder="Repite tu contraseña"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-black focus:outline-none"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && touched.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-black text-white hover:bg-gray-800 text-lg py-3 mt-6"
                disabled={isLoading}
              >
                <UserPlus className="mr-2 h-5 w-5" />
                {isLoading ? "Registrando..." : "Crear cuenta"}
              </Button>
             
            </form>

            <div className="mt-6 text-center text-sm">
              <p className="text-gray-600">
                ¿Ya tienes cuenta de entrenador?{" "}
                <a
                  href="/login"
                  className="text-black hover:underline font-medium"
                >
                  Inicia sesión aquí
                </a>
              </p>
            </div>

            <div className="mt-6 flex flex-col items-center text-sm">
              <p className="text-gray-600 text-center">
                Después del registro podrás subir tus certificaciones y acceder
                a todas las funciones profesionales
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
