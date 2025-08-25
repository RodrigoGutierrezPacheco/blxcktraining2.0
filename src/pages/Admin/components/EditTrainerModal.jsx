import { useState, useEffect } from "react";
import { Button } from "../../Components/Button";
import { X, Save, User, Phone ,Star, Calendar} from "lucide-react";

export default function EditTrainerModal({ trainer, isOpen, onClose, onSave, isLoading: externalLoading = false }) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    age: "",
    rfc: "",
    curp: "",
    dateOfBirth: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (trainer) {
      console.log("Datos del entrenador recibidos:", trainer);
      setFormData({
        fullName: trainer.fullName || "",
        phone: trainer.phone || "",
        age: trainer.age || "",
        rfc: trainer.rfc || "",
        curp: trainer.curp || "",
        dateOfBirth: trainer.dateOfBirth || ""
      });
      setErrors({});
    }
  }, [trainer]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };



  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "El nombre es requerido";
    }
    
    if (formData.age && (isNaN(formData.age) || formData.age < 18 || formData.age > 100)) {
      newErrors.age = "La edad debe ser un número entre 18 y 100";
    }

    if (formData.dateOfBirth) {
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }
      
      if (calculatedAge < 18 || calculatedAge > 100) {
        newErrors.dateOfBirth = "La fecha de nacimiento debe corresponder a una edad entre 18 y 100 años";
      }
    }

    if (formData.rfc && formData.rfc.length !== 13) {
      newErrors.rfc = "El RFC debe tener exactamente 13 caracteres";
    }

    if (formData.curp && formData.curp.length !== 18) {
      newErrors.curp = "El CURP debe tener exactamente 18 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Preparar los datos para enviar, convirtiendo la edad a número
      const dataToSend = {
        ...formData,
        age: formData.age ? parseInt(formData.age, 10) : undefined
      };
      
      // Remover campos vacíos para no enviar null
      Object.keys(dataToSend).forEach(key => {
        if (dataToSend[key] === "" || dataToSend[key] === null) {
          delete dataToSend[key];
        }
      });
      
      await onSave(trainer.id, dataToSend);
      onClose();
    } catch (error) {
      console.error("Error al guardar:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  if (externalLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!trainer) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Editar Entrenador
          </h2>
          <Button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Basic Information */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Información Personal
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    Nombre Completo *
                  </div>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.fullName ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Nombre completo del entrenador"
                />
                {errors.fullName && (
                  <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>



              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    Teléfono
                  </div>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="+34 123 456 789"
                />
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    Edad
                  </div>
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.age ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="25"
                  min="18"
                  max="100"
                />
                {errors.age && (
                  <p className="text-red-600 text-sm mt-1">{errors.age}</p>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    Fecha de Nacimiento
                  </div>
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.dateOfBirth ? 'border-red-300' : 'border-gray-300'
                  }`}
                  max={new Date().toISOString().split('T')[0]}
                />
                {errors.dateOfBirth && (
                  <p className="text-red-600 text-sm mt-1">{errors.dateOfBirth}</p>
                )}
              </div>
            </div>
          </div>

          {/* Official Documents */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Documentos Oficiales
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* RFC */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    RFC
                  </div>
                </label>
                <input
                  type="text"
                  name="rfc"
                  value={formData.rfc}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.rfc ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="XAXX010101000"
                  maxLength={13}
                />
                {errors.rfc && (
                  <p className="text-red-600 text-sm mt-1">{errors.rfc}</p>
                )}
              </div>

              {/* CURP */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    CURP
                  </div>
                </label>
                <input
                  type="text"
                  name="curp"
                  value={formData.curp}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.curp ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="XAXX010101HDFXXX00"
                  maxLength={18}
                />
                {errors.curp && (
                  <p className="text-red-600 text-sm mt-1">{errors.curp}</p>
                )}
              </div>
            </div>
          </div>

                     {/* Status and Verification */}
           <div className="mb-6">
             <h3 className="text-lg font-medium text-gray-900 mb-4">
               Estado y Verificación
             </h3>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {/* Active Status */}
               <div className="flex items-center">
                 <input
                   type="checkbox"
                   name="isActive"
                   checked={formData.isActive}
                   onChange={handleInputChange}
                   className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                 />
                 <label className="ml-2 block text-sm text-gray-900">
                   <div className="flex items-center gap-2">
                     <div className={`h-2 w-2 rounded-full ${formData.isActive ? 'bg-green-400' : 'bg-red-400'}`}></div>
                     Entrenador Activo
                   </div>
                 </label>
               </div>

               {/* Verification Status */}
               <div className="flex items-center">
                 <input
                   type="checkbox"
                   name="isVerified"
                   checked={formData.isVerified}
                   onChange={handleInputChange}
                   className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                 />
                 <label className="ml-2 block text-sm text-gray-900">
                   <div className="flex items-center gap-2">
                     <Star className="h-4 w-4 text-yellow-500" />
                     Entrenador Verificado
                   </div>
                 </label>
               </div>
             </div>
           </div>

           {/* Verification Action Button */}
           <div className="mb-6">
             <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
               <h4 className="text-sm font-medium text-blue-900 mb-2">
                 Acción de Verificación
               </h4>
               <p className="text-sm text-blue-700 mb-3">
                 {formData.isVerified 
                   ? "Este entrenador está verificado. Puedes desverificarlo si es necesario."
                   : "Este entrenador no está verificado. Puedes verificarlo para darle acceso completo."
                 }
               </p>
               <Button
                 type="button"
                 onClick={() => {
                   // Aquí se podría implementar la lógica para cambiar la verificación
                   // Por ahora solo mostramos el estado
                   console.log("Estado de verificación actual:", formData.isVerified);
                 }}
                 className={`w-full px-4 py-2 rounded-lg flex items-center justify-center gap-2 ${
                   formData.isVerified
                     ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
                     : "bg-green-100 text-green-700 hover:bg-green-200"
                 }`}
               >
                 <Star className="h-4 w-4" />
                 {formData.isVerified ? "Desverificar Entrenador" : "Verificar Entrenador"}
               </Button>
             </div>
           </div>





          {/* Footer */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <Button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 hover:bg-gray-400 px-4 py-2 rounded-lg"
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-lg flex items-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Guardar Cambios
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
