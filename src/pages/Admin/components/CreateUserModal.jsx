import { useState } from "react";
import { Button } from "../../Components/Button";
import { createUser } from "../../../services/admin";

export default function CreateUserModal({ isOpen, onClose, onCreateSuccess, existingUsers }) {
  const [newUserData, setNewUserData] = useState({
    fullName: "",
    email: "",
    password: ""
  });
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newUserData.fullName.trim() || !newUserData.email.trim() || !newUserData.password.trim()) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (newUserData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    // Validar que el email no esté duplicado
    const emailExists = existingUsers.some(user => user.email.toLowerCase() === newUserData.email.toLowerCase());
    if (emailExists) {
      setError("Ya existe un usuario con este email");
      return;
    }

    try {
      setIsCreating(true);
      setError("");
      await createUser(newUserData);
      setNewUserData({
        fullName: "",
        email: "",
        password: ""
      });
      onCreateSuccess();
    } catch (err) {
      setError(err.message || "Error al crear el usuario");
    } finally {
      setIsCreating(false);
    }
  };

  const handleClose = () => {
    setNewUserData({
      fullName: "",
      email: "",
      password: ""
    });
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Crear Nuevo Usuario
        </h3>
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre Completo *
            </label>
            <input
              type="text"
              name="fullName"
              value={newUserData.fullName}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ingresa el nombre completo"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={newUserData.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ingresa el email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña *
            </label>
            <input
              type="password"
              name="password"
              value={newUserData.password}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Mínimo 6 caracteres"
              minLength={6}
              required
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              onClick={handleClose}
              className="bg-gray-300 text-gray-700 hover:bg-gray-400 px-4 py-2 rounded-lg"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isCreating}
              className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg disabled:opacity-50"
            >
              {isCreating ? "Creando..." : "Crear Usuario"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
