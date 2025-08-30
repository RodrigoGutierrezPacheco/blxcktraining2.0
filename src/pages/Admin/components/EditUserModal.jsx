import { useState, useEffect } from "react";
import { Button } from "../../Components/Button";
import { updateUser } from "../../../services/admin";

export default function EditUserModal({ isOpen, user, onClose, onEditSuccess }) {
  const [editUserData, setEditUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(() => {
    if (isOpen && user) {
      setEditUserData({
        fullName: user.fullName || "",
        age: user.age || "",
        weight: user.weight || "",
        height: user.height || "",
        dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split('T')[0] : "",
        healthIssues: user.healthIssues || "",
        password: ""
      });
      setError("");
      setValidationErrors([]);
    }
  }, [isOpen, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Convertir campos numéricos a números
    let processedValue = value;
    if (['age', 'weight', 'height'].includes(name)) {
      if (value === "") {
        processedValue = "";
      } else {
        const numValue = parseFloat(value);
        if (!isNaN(numValue)) {
          processedValue = numValue;
        }
      }
    }

    setEditUserData(prev => ({
      ...prev,
      [name]: processedValue
    }));
  };

  const validateForm = () => {
    const errors = [];

    if (!editUserData.fullName.trim()) {
      errors.push("El nombre completo es obligatorio");
    }

    if (editUserData.age !== "" && editUserData.age !== null) {
      const age = Number(editUserData.age);
      if (isNaN(age) || age < 0 || age > 200) {
        errors.push("La edad debe ser un número entre 0 y 200 años");
      }
    }

    if (editUserData.weight !== "" && editUserData.weight !== null) {
      const weight = Number(editUserData.weight);
      if (isNaN(weight) || weight < 0 || weight > 1000) {
        errors.push("El peso debe ser un número entre 0 y 1000 kg");
      }
    }

    if (editUserData.height !== "" && editUserData.height !== null) {
      const height = Number(editUserData.height);
      if (isNaN(height) || height < 0 || height > 500) {
        errors.push("La altura debe ser un número entre 0 y 500 cm");
      }
    }

    if (editUserData.password !== "" && editUserData.password.length < 6) {
      errors.push("La contraseña debe tener al menos 6 caracteres");
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación del frontend
    const frontendErrors = validateForm();
    if (frontendErrors.length > 0) {
      setValidationErrors(frontendErrors);
      return;
    }

    try {
      setIsEditing(true);
      setError("");
      setValidationErrors([]);
      
      // Preparar datos para enviar (solo campos con valor)
      const dataToSend = {};
      Object.keys(editUserData).forEach(key => {
        if (editUserData[key] !== "" && editUserData[key] !== null) {
          if (key === 'dateOfBirth' && editUserData[key]) {
            // Convertir YYYY-MM-DD a ISO string para el backend
            const date = new Date(editUserData[key]);
            dataToSend[key] = date.toISOString();
          } else {
            dataToSend[key] = editUserData[key];
          }
        }
      });

      await updateUser(user.id, dataToSend);
      onEditSuccess();
    } catch (err) {
      // Manejar errores de validación del backend
      if (err.message && err.message.includes("Error de validación")) {
        try {
          const errorData = JSON.parse(err.message);
          if (errorData.errors && Array.isArray(errorData.errors)) {
            setValidationErrors(errorData.errors);
          } else {
            setError(err.message);
          }
        } catch {
          setError(err.message);
        }
      } else {
        setError(err.message || "Error al actualizar el usuario");
      }
    } finally {
      setIsEditing(false);
    }
  };

  const handleClose = () => {
    setEditUserData({});
    setError("");
    setValidationErrors([]);
    onClose();
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-medium text-gray-900">
            Editar Usuario: {user.fullName}
          </h3>
          <Button
            onClick={handleClose}
            className="bg-gray-300 text-gray-700 hover:bg-gray-400 p-2 rounded-lg"
          >
            ✕
          </Button>
        </div>

        {/* Errores de validación */}
        {validationErrors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <h4 className="text-sm font-medium text-red-800 mb-2">Errores de validación:</h4>
            <ul className="list-disc list-inside space-y-1">
              {validationErrors.map((error, index) => (
                <li key={index} className="text-red-600 text-sm">{error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Error general */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información Personal */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 border-b pb-2">Información Personal</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={editUserData.fullName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nombre completo"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Edad
                </label>
                <input
                  type="number"
                  name="age"
                  value={editUserData.age}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Edad"
                  min="0"
                  max="200"
                  step="1"
                />
                <p className="text-xs text-gray-500 mt-1">Entre 0 y 200 años</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de Nacimiento
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={editUserData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  value={editUserData.password}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Dejar vacío para no cambiar"
                  minLength={6}
                />
                <p className="text-xs text-gray-500 mt-1">Mínimo 6 caracteres</p>
              </div>
            </div>
          </div>

          {/* Información Física */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 border-b pb-2">Información Física</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Peso (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  value={editUserData.weight}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Peso en kg"
                  min="0"
                  max="1000"
                  step="0.1"
                />
                <p className="text-xs text-gray-500 mt-1">Entre 0 y 1000 kg</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Altura (cm)
                </label>
                <input
                  type="number"
                  name="height"
                  value={editUserData.height}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Altura en cm"
                  min="0"
                  max="500"
                  step="1"
                />
                <p className="text-xs text-gray-500 mt-1">Entre 0 y 500 cm</p>
              </div>
            </div>
          </div>

          {/* Información de Salud */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 border-b pb-2">Información de Salud</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Problemas de Salud
                </label>
                <textarea
                  name="healthIssues"
                  value={editUserData.healthIssues}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describir problemas de salud..."
                />
              </div>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              onClick={handleClose}
              className="bg-gray-300 text-gray-700 hover:bg-gray-400 px-4 py-2 rounded-lg"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isEditing}
              className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg disabled:opacity-50"
            >
              {isEditing ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
