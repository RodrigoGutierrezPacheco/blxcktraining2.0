import { useState, useEffect } from "react";
import { X, Save, User } from "lucide-react";
import { Button } from "../Button";
import { updateTrainer } from "../../../services/trainers";

export default function EditTrainerProfileModal({ isOpen, onClose, trainerData, onUpdate }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    age: "",
    dateOfBirth: "",
    curp: "",
    rfc: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (trainerData) {
      setFormData({
        fullName: trainerData.fullName || "",
        email: trainerData.email || "",
        phone: trainerData.phone || "",
        age: trainerData.age || "",
        dateOfBirth: trainerData.dateOfBirth ? new Date(trainerData.dateOfBirth).toISOString().split('T')[0] : "",
        curp: trainerData.curp || "",
        rfc: trainerData.rfc || ""
      });
    }
  }, [trainerData]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const updateData = {};
      Object.keys(formData).forEach(key => {
        if (formData[key] !== (trainerData[key] || "")) {
          if (key === 'age' && formData[key]) {
            updateData[key] = parseInt(formData[key], 10);
          } 
          else if (key === 'dateOfBirth' && formData[key]) {
            updateData[key] = formData[key];
          } 
          else {
            updateData[key] = formData[key] || null;
          }
        }
      });

      if (Object.keys(updateData).length === 0) {
        setError("No hay cambios para guardar");
        setIsLoading(false);
        return;
      }
      console.log("informacion enviada", updateData)
      const response = await updateTrainer(trainerData.id, updateData);
      
      if (onUpdate) {
        onUpdate(response);
      }
      
      onClose();
    } catch (error) {
      setError(error.message || "Error al actualizar el perfil");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !trainerData) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
      {/* Contenido del modal */}
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Editar Perfil del Entrenador
              </h3>
            </div>
            <Button
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-lg transition-all duration-200"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Formulario */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Información Personal */}
            <div className="space-y-4">
              <h4 className="text-base font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Información Personal
              </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Edad
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  min="18"
                  max="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de Nacimiento
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                />
              </div>
            </div>
          </div>

            {/* Información Profesional */}
            <div className="space-y-4">
              <h4 className="text-base font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Información Profesional
              </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CURP
                </label>
                <input
                  type="text"
                  name="curp"
                  value={formData.curp}
                  onChange={handleInputChange}
                  maxLength="18"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  RFC
                </label>
                <input
                  type="text"
                  name="rfc"
                  value={formData.rfc}
                  onChange={handleInputChange}
                  maxLength="13"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                />
              </div>
            </div>
          </div>

            {/* Botones */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <Button
                type="button"
                onClick={onClose}
                className="bg-gray-500 text-white hover:bg-gray-600 px-4 py-2 rounded-lg font-medium transition-all duration-200"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-gray-900 text-white hover:bg-gray-800 px-4 py-2 rounded-lg font-medium transition-all duration-200"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Guardando...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Guardar Cambios
                  </div>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
