import { useState } from "react";
import { Button } from "../Button";
import { Card, CardContent } from "../Card";
import { Calendar, X, Clock, AlertCircle, CheckCircle } from "lucide-react";

export default function ChangeDurationModal({
  isOpen,
  onClose,
  user,
  onConfirm,
  loading = false
}) {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    notes: ""
  });
  const [errors, setErrors] = useState({});

  // Resetear formulario cuando se abre el modal
  const resetForm = () => {
    if (user?.routineInfo) {
      // Verificar que las fechas sean válidas antes de convertirlas
      const startDateStr = user.routineInfo.routineStartDate;
      const endDateStr = user.routineInfo.routineEndDate;
      
      let startDate = "";
      let endDate = "";
      
      if (startDateStr) {
        const startDateObj = new Date(startDateStr);
        if (!isNaN(startDateObj.getTime())) {
          startDate = startDateObj.toISOString().split('T')[0];
        }
      }
      
      if (endDateStr) {
        const endDateObj = new Date(endDateStr);
        if (!isNaN(endDateObj.getTime())) {
          endDate = endDateObj.toISOString().split('T')[0];
        }
      }
      
      setFormData({
        startDate: startDate,
        endDate: endDate,
        notes: ""
      });
    } else {
      setFormData({
        startDate: "",
        endDate: "",
        notes: ""
      });
    }
    setErrors({});
  };

  // Resetear cuando se abre el modal
  useState(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.startDate) {
      newErrors.startDate = "La fecha de inicio es requerida";
    }
    
    if (!formData.endDate) {
      newErrors.endDate = "La fecha de fin es requerida";
    }
    
    if (formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      
      if (startDate >= endDate) {
        newErrors.endDate = "La fecha de fin debe ser posterior a la fecha de inicio";
      }
    }

    // Validar que las fechas no sean muy lejanas en el pasado
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (formData.startDate && new Date(formData.startDate) < today) {
      newErrors.startDate = "La fecha de inicio no puede ser anterior a hoy";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const durationData = {
      userId: user.id,
      startDate: formData.startDate,
      endDate: formData.endDate,
      notes: formData.notes.trim()
    };

    onConfirm(durationData);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen || !user) return null;

  const calculateDuration = () => {
    if (formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      const diffTime = Math.abs(endDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  };

  const duration = calculateDuration();
  const isDurationValid = duration > 0 && duration <= 365; // Máximo 1 año

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl max-w-2xl w-full shadow-2xl border border-gray-200">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-2xl font-bold text-black mb-2">
                Cambiar Duración de Rutina
              </h3>
              <p className="text-gray-600">
                Modifica las fechas de inicio y fin para {user.fullName}
              </p>
            </div>
            
            <Button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 bg-transparent hover:bg-gray-100 p-2 rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Current Duration Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="h-5 w-5 text-blue-600" />
              <h4 className="font-semibold text-blue-900">Duración</h4>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-blue-700 font-medium">Inicio:</span>
                <p className="text-blue-900">
                  {user.routineInfo.routineStartDate ? 
                    (() => {
                      const date = new Date(user.routineInfo.routineStartDate);
                      return !isNaN(date.getTime()) ? 
                        date.toLocaleDateString('es-ES') : 
                        'Fecha no válida';
                    })() : 
                    'No disponible'
                  }
                </p>
              </div>
              <div>
                <span className="text-blue-700 font-medium">Fin:</span>
                <p className="text-blue-900">
                  {user.routineInfo.routineEndDate ? 
                    (() => {
                      const date = new Date(user.routineInfo.routineEndDate);
                      return !isNaN(date.getTime()) ? 
                        date.toLocaleDateString('es-ES') : 
                        'Fecha no válida';
                    })() : 
                    'No disponible'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Start Date */}
              <div className="space-y-2">
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                  Fecha de Inicio *
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                    errors.startDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                  min={new Date().toISOString().split('T')[0]}
                />
                {errors.startDate && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.startDate}
                  </p>
                )}
              </div>

              {/* End Date */}
              <div className="space-y-2">
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                  Fecha de Fin *
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                    errors.endDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                  min={formData.startDate || new Date().toISOString().split('T')[0]}
                />
                {errors.endDate && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.endDate}
                  </p>
                )}
              </div>
            </div>

            {/* Duration Preview */}
            {duration > 0 && (
              <div className={`p-3 rounded-lg border ${
                isDurationValid 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center gap-2">
                  {isDurationValid ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  )}
                  <span className={`text-sm font-medium ${
                    isDurationValid ? 'text-green-800' : 'text-red-800'
                  }`}>
                    Duración: {duration} día{duration !== 1 ? 's' : ''}
                  </span>
                </div>
                {!isDurationValid && (
                  <p className="text-xs text-red-700 mt-1">
                    La duración debe ser entre 1 y 365 días
                  </p>
                )}
              </div>
            )}

            {/* Notes */}
            <div className="space-y-2">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                Notas (opcional)
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Ej: Rutina extendida por buen progreso del usuario..."
              />
              <p className="text-xs text-gray-500">
                Describe el motivo del cambio de duración
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <Button
                type="button"
                onClick={handleClose}
                className="bg-gray-500 text-white hover:bg-gray-600 px-6 py-3"
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-orange-600 text-white hover:bg-orange-700 px-6 py-3"
                disabled={loading || !isDurationValid}
              >
                {loading ? (
                  <>
                    <Clock className="mr-2 h-4 w-4 animate-spin" />
                    Actualizando...
                  </>
                ) : (
                  "Actualizar Duración"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
