import { useState, useEffect } from "react";
import { Button } from "../../Components/Button";
import { updateUser } from "../../../services/admin";

export default function EditUserModal({ isOpen, user, onClose, onEditSuccess }) {
  const [editUserData, setEditUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen && user) {
      setEditUserData({
        fullName: user.fullName || "",
        age: user.age || "",
        weight: user.weight || "",
        height: user.height || "",
        dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split('T')[0] : "",
        healthIssues: user.healthIssues || "",
        chronicDiseases: user.chronicDiseases || "",
        password: ""
      });
    }
  }, [isOpen, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!editUserData.fullName.trim()) {
      setError("El nombre completo es obligatorio");
      return;
    }

    try {
      setIsEditing(true);
      setError("");
      
      // Preparar datos para enviar (solo campos con valor)
      const dataToSend = {};
      Object.keys(editUserData).forEach(key => {
        if (editUserData[key] !== "" && editUserData[key] !== null) {
          dataToSend[key] = editUserData[key];
        }
      });

      await updateUser(user.id, dataToSend);
      onEditSuccess();
    } catch (err) {
      setError(err.message || "Error al actualizar el usuario");
    } finally {
      setIsEditing(false);
    }
  };

  const handleClose = () => {
    setEditUserData({});
    setError("");
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
                  max="120"
                />
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
                  step="0.1"
                />
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
                  max="300"
                />
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enfermedades Crónicas
                </label>
                <textarea
                  name="chronicDiseases"
                  value={editUserData.chronicDiseases}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describir enfermedades crónicas..."
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
