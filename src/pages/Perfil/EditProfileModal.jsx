import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "../Components/Card";
import { Button } from "../Components/Button";
import {
  X,
  Eye,
  EyeOff,
  Save,
  User,
  Calendar,
  Heart,
  Lock,
  Scale,
  Ruler,
} from "lucide-react";
import { updateUserProfile } from "../../services/users";

export default function EditProfileModal({
  isOpen,
  onClose,
  userData,
  setUserData,
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    healthIssues: "",
    password: "",
    age: "",
    weight: "",
    height: "",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const messageRef = useRef(null);

  useEffect(() => {
    if (isOpen && userData) {
      // Convertir la fecha de nacimiento al formato YYYY-MM-DD para el input date
      const birthDate = userData.dateOfBirth
        ? new Date(userData.dateOfBirth).toISOString().split("T")[0]
        : "";

      let calculatedAge = "";
      // Calcular la edad si hay fecha de nacimiento
      if (birthDate) {
        const birthDateObj = new Date(birthDate);
        const today = new Date();
        let age = today.getFullYear() - birthDateObj.getFullYear();
        const monthDiff = today.getMonth() - birthDateObj.getMonth();

        // Ajustar la edad si aún no ha cumplido años este año
        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
        ) {
          age--;
        }

        calculatedAge = age.toString();
      }

      setFormData({
        fullName: userData.fullName || "",
        dateOfBirth: birthDate,
        healthIssues: userData.healthIssues || "",
        password: userData.password || "",
        age: calculatedAge || userData.age || "",
        weight: userData.weight || "",
        height: userData.height || "",
        phone: userData.phone || "",
      });
    }
  }, [isOpen, userData]);

  // Efecto para hacer scroll hasta el mensaje de error cuando aparece
  useEffect(() => {
    if (message.text && message.type === "error" && messageRef.current) {
      // Pequeño delay para asegurar que el DOM se haya actualizado
      setTimeout(() => {
        messageRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 100);
    }
  }, [message]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Si se cambia la fecha de nacimiento, calcular la edad automáticamente
    if (id === "dateOfBirth" && value) {
      const birthDate = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      // Ajustar la edad si aún no ha cumplido años este año
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      setFormData((prev) => ({ ...prev, age: age.toString() }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const token = localStorage.getItem("tokenBlck");
      if (!token) {
        throw new Error("No hay token de autenticación");
      }

      // Filtrar campos vacíos, especialmente la contraseña
      const dataToSend = { ...formData };

      // Si la contraseña está vacía, no la enviar
      if (!dataToSend.password || dataToSend.password.trim() === "") {
        delete dataToSend.password;
      }

      // Filtrar otros campos vacíos que podrían causar problemas
      Object.keys(dataToSend).forEach((key) => {
        if (
          dataToSend[key] === "" ||
          dataToSend[key] === null ||
          dataToSend[key] === undefined
        ) {
          delete dataToSend[key];
        }
      });

      // Convertir campos numéricos a números
      if (dataToSend.age) {
        dataToSend.age = parseInt(dataToSend.age, 10);
      }
      if (dataToSend.weight) {
        dataToSend.weight = parseFloat(dataToSend.weight);
      }
      if (dataToSend.height) {
        dataToSend.height = parseInt(dataToSend.height, 10);
      }

      // Usar el servicio para actualizar el perfil
      const updatedUser = await updateUserProfile(userData.id, dataToSend);

      // Actualizar el estado local
      setUserData((prev) => ({
        ...prev,
        ...updatedUser,
      }));

      setMessage({
        text: "Perfil actualizado exitosamente",
        type: "success",
      });

      // Cerrar el modal después de 2 segundos
      setTimeout(() => {
        onClose();
        setMessage({ text: "", type: "" });
      }, 2000);
    } catch (error) {
      console.error("Error updating profile:", error);

      // Intentar parsear errores de validación del backend
      try {
        const errorData = JSON.parse(error.message);

        if (errorData.errors && Array.isArray(errorData.errors)) {
          // Mostrar todos los errores de validación en una lista
          const errorList = errorData.errors.map((err) => `• ${err}`).join('\n');
          setMessage({
            text: `Errores de validación:\n${errorList}`,
            type: "error",
          });
        } else if (errorData.message) {
          setMessage({
            text: errorData.message,
            type: "error",
          });
        } else {
          setMessage({
            text: error.message || "Error al actualizar el perfil",
            type: "error",
          });
        }
      } catch {
        // Si no se puede parsear, mostrar el error original
        setMessage({
          text: error.message || "Error al actualizar el perfil",
          type: "error",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto border-2 border-black bg-white">
        <CardContent className="p-6 bg-white">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-black flex items-center gap-2">
              <User className="h-6 w-6" />
              Editar Perfil
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-black transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {message.text && (
            <div
              ref={messageRef}
              className={`mb-6 p-4 rounded-md text-left ${
                message.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              <div className="whitespace-pre-line">
                {message.text}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors"
                  placeholder="Tu nombre completo"
                />
              </div>

              <div>
                <label
                  htmlFor="dateOfBirth"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Fecha de nacimiento
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Edad
                </label>
                <input
                  type="number"
                  id="age"
                  value={formData.age}
                  onChange={handleChange}
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
                  placeholder="Se calcula automáticamente"
                  min="1"
                  max="150"
                />
                <p className="mt-1 text-sm text-gray-500">
                  La edad se calcula automáticamente según tu fecha de
                  nacimiento
                </p>
              </div>

              <div>
                <label
                  htmlFor="weight"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Peso (kg)
                </label>
                <input
                  type="number"
                  id="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors"
                  placeholder="Tu peso en kg"
                  min="20"
                  max="500"
                  step="0.1"
                />
              </div>

              <div>
                <label
                  htmlFor="height"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Altura (cm)
                </label>
                <input
                  type="number"
                  id="height"
                  value={formData.height}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors"
                  placeholder="Tu altura en cm"
                  min="100"
                  max="300"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Número telefónico
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors"
                  placeholder="+52 55 1234 5678"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="healthIssues"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Problemas de salud/Enfermedades crónicas
              </label>
              <textarea
                id="healthIssues"
                value={formData.healthIssues}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors"
                placeholder="Describe cualquier problema de salud, lesión o condición médica relevante"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nueva contraseña (opcional)
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors pr-10"
                  placeholder="Deja vacío para mantener la actual"
                  minLength="6"
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
              {formData.password &&
                formData.password.length > 0 &&
                formData.password.length < 6 && (
                  <p className="mt-1 text-sm text-red-600">
                    La contraseña debe tener al menos 6 caracteres
                  </p>
                )}
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-black text-black hover:bg-gray-100 bg-transparent"
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-black text-white hover:bg-gray-800"
                disabled={isLoading}
              >
                <Save className="mr-2 h-5 w-5" />
                {isLoading ? "Guardando..." : "Guardar Cambios"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
