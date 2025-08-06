import { useState, useEffect } from "react";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { Button } from "../Components/Button";
import { Card, CardContent } from "../Components/Card";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../services/users";

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

  // Validación en tiempo real
  useEffect(() => {
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
      } else if (formData.password.length < 6) {
        newErrors.password = "La contraseña debe tener al menos 6 caracteres";
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
  }, [formData, touched]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    // Marcar el campo como "touched" cuando el usuario comienza a escribir
    if (!touched[id]) {
      setTouched((prev) => ({ ...prev, [id]: true }));
    }
  };

  const handleBlur = (e) => {
    const { id } = e.target;
    setTouched((prev) => ({ ...prev, [id]: true }));
  };

  const validateForm = () => {
    // Forzar validación de todos los campos al enviar
    setTouched({
      fullName: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    // Verificar si hay errores
    return !Object.values(errors).some((error) => error !== "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "", type: "" });

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      await createUser(formData);
      setMessage({
        text: "Registro exitoso! Redirigiendo...",
        type: "success",
      });
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      if (error.message.includes("El correo electrónico ya está registrado")) {
        setErrors((prev) => ({
          ...prev,
          email: "Este correo ya está registrado",
        }));
      } else {
        setMessage({
          text:
            error.message ||
            "Error al registrar. Por favor intenta nuevamente.",
          type: "error",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-2 border-black">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-black mb-2">Registro</h2>
            <p className="text-gray-600">Crea tu cuenta en BLXCK Training</p>
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
                Nombre completo
              </label>
              <input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 border ${
                  errors.fullName ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors`}
                placeholder="Tu nombre completo"
              />
              {errors.fullName && touched.fullName && (
                <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors`}
                placeholder="tu@email.com"
              />
              {errors.email && touched.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
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
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors pr-10`}
                  placeholder="Mínimo 6 caracteres"
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
              {errors.password && touched.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
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
              {isLoading ? "Registrando..." : "Registrarse"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              ¿Ya tienes cuenta?{" "}
              <a
                href="/login"
                className="text-black hover:underline font-medium"
              >
                Inicia sesión aquí
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
