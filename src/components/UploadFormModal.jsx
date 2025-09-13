import { Upload, X, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "../pages/Components/Button";
import { uploadTrainerEducationDocument } from "../services/documents";
import { useAuth } from "../context/useAuth";

export default function UploadFormModal({ 
  showUploadForm, 
  setShowUploadForm, 
  onDocumentUploaded 
}) {
  const { user } = useAuth();
  const [uploadForm, setUploadForm] = useState({
    title: "",
    description: "",
    type: "certification",
    file: null
  });
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const documentTypes = [
    { value: "certification", label: "Certificación" },
    { value: "diploma", label: "Diploma" },
    { value: "course", label: "Curso" },
    { value: "workshop", label: "Taller" },
    { value: "seminar", label: "Seminario" },
    { value: "other", label: "Otro" }
  ];

  // Función para validar campos del formulario
  const validateForm = () => {
    const errors = {};
    
    // Validar título
    if (!uploadForm.title.trim()) {
      errors.title = "El título del documento es obligatorio";
    } else if (uploadForm.title.trim().length < 3) {
      errors.title = "El título debe tener al menos 3 caracteres";
    } else if (uploadForm.title.trim().length > 100) {
      errors.title = "El título no puede exceder 100 caracteres";
    }
    
    // Validar descripción
    if (!uploadForm.description.trim()) {
      errors.description = "La descripción del documento es obligatoria";
    } else if (uploadForm.description.trim().length < 10) {
      errors.description = "La descripción debe tener al menos 10 caracteres";
    } else if (uploadForm.description.trim().length > 500) {
      errors.description = "La descripción no puede exceder 500 caracteres";
    }
    
    // Validar archivo
    if (!uploadForm.file) {
      errors.file = "Debe seleccionar un archivo";
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Función para limpiar errores de un campo específico
  const clearFieldError = (fieldName) => {
    setFieldErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tipo de archivo
      const allowedTypes = [
        'application/pdf',
        'image/jpeg',
        'image/png',
        'image/jpg',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        setFieldErrors(prev => ({
          ...prev,
          file: "Tipo de archivo no permitido. Solo se aceptan PDF, JPG, PNG, DOC y DOCX."
        }));
        return;
      }

      // Validar tamaño (máximo 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB en bytes
      if (file.size > maxSize) {
        setFieldErrors(prev => ({
          ...prev,
          file: "El archivo es demasiado grande. El tamaño máximo es 10MB."
        }));
        return;
      }

      setUploadForm(prev => ({ ...prev, file }));
      clearFieldError('file');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Limpiar errores previos
    setError("");
    setFieldErrors({});
    
    // Validar formulario
    if (!validateForm()) {
      return;
    }

    setIsUploading(true);
    setError("");

    try {
      const documentData = {
        title: uploadForm.title.trim(),
        description: uploadForm.description.trim(),
        type: uploadForm.type,
        file: uploadForm.file
      };

      await uploadTrainerEducationDocument(user.id, documentData);
      
      setSuccess("Documento subido exitosamente");
      
      // Limpiar formulario
      setUploadForm({
        title: "",
        description: "",
        type: "certification",
        file: null
      });

      // Notificar al componente padre
      if (onDocumentUploaded) {
        onDocumentUploaded();
      }

      // Cerrar modal después de 2 segundos
      setTimeout(() => {
        setShowUploadForm(false);
        setSuccess("");
      }, 2000);

    } catch (err) {
      console.error("Error uploading document:", err);
      
      // Manejar diferentes tipos de errores
      if (err.response?.data) {
        const errorData = err.response.data;
        
        if (errorData.statusCode === 400 && errorData.errors) {
          // Errores de validación del servidor
          const serverErrors = {};
          errorData.errors.forEach(errorMsg => {
            if (errorMsg.includes("descripción")) {
              serverErrors.description = errorMsg;
            } else if (errorMsg.includes("título")) {
              serverErrors.title = errorMsg;
            } else if (errorMsg.includes("archivo")) {
              serverErrors.file = errorMsg;
            } else {
              // Error general
              setError(errorMsg);
            }
          });
          
          if (Object.keys(serverErrors).length > 0) {
            setFieldErrors(prev => ({ ...prev, ...serverErrors }));
          }
        } else {
          // Otro tipo de error del servidor
          setError(errorData.message || "Error al subir el documento");
        }
      } else if (err.message) {
        // Error de red o desconocido
        setError(err.message);
      } else {
        // Error genérico
        setError("Error desconocido al subir el documento");
      }
    } finally {
      setIsUploading(false);
    }
  };

  // Bloquear scroll cuando el modal está abierto
  useEffect(() => {
    if (showUploadForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function para restaurar scroll cuando el componente se desmonte
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showUploadForm]);

  const handleClose = () => {
    setShowUploadForm(false);
    setUploadForm({
      title: "",
      description: "",
      type: "certification",
      file: null
    });
    setError("");
    setSuccess("");
    setFieldErrors({});
  };

  if (!showUploadForm) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h4 className="text-lg font-medium text-gray-900">Subir Documento</h4>
          <Button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-lg"
            variant="ghost"
          >
            <X className="h-5 w-5 text-gray-400" />
          </Button>
        </div>
        
        <div className="p-6 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-red-800">Error</h4>
                  <p className="text-sm text-red-700 mt-1">{error.message || error}</p>
                </div>
              </div>
            </div>
          )}

          {success && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-sm text-green-700">{success}</p>
              </div>
            </div>
          )}
        
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título del Documento *
              </label>
              <input
                type="text"
                value={uploadForm.title}
                onChange={(e) => {
                  setUploadForm(prev => ({ ...prev, title: e.target.value }));
                  clearFieldError('title');
                }}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent ${
                  fieldErrors.title ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
                }`}
                placeholder="Ej: Certificación de Entrenador Personal"
                required
              />
              {fieldErrors.title && (
                <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {fieldErrors.title}
                </p>
              )}
            </div>
          
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción *
              </label>
              <textarea
                value={uploadForm.description}
                onChange={(e) => {
                  setUploadForm(prev => ({ ...prev, description: e.target.value }));
                  clearFieldError('description');
                }}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent ${
                  fieldErrors.description ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
                }`}
                placeholder="Descripción detallada del documento"
                rows="3"
                required
              />
              {fieldErrors.description && (
                <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {fieldErrors.description}
                </p>
              )}
              <p className="text-gray-500 text-xs mt-1">
                {uploadForm.description.length}/500 caracteres
              </p>
            </div>
          
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Documento
              </label>
              <select
                value={uploadForm.type}
                onChange={(e) => setUploadForm(prev => ({ ...prev, type: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              >
                {documentTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Archivo *
              </label>
              <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                fieldErrors.file ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
              }`}>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  className="hidden"
                  id="file-upload"
                  required
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="mx-auto h-8 w-8 text-gray-400 mb-3" />
                  <p className="text-sm text-gray-600 mb-1">
                    Haz clic para seleccionar un archivo
                  </p>
                  <p className="text-xs text-gray-500">
                    PDF, JPG, PNG, DOC, DOCX (máx. 10MB)
                  </p>
                </label>
              </div>
              {fieldErrors.file && (
                <p className="text-red-600 text-xs mt-2 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {fieldErrors.file}
                </p>
              )}
              {uploadForm.file && (
                <p className="text-sm text-gray-600 mt-2 p-2 bg-gray-50 rounded-lg">
                  <span className="font-medium">Archivo seleccionado:</span> {uploadForm.file.name}
                </p>
              )}
            </div>
          
            <div className="flex gap-3 pt-6 border-t border-gray-200">
              <Button
                type="button"
                onClick={handleClose}
                className="flex-1 bg-gray-600 text-white hover:bg-gray-700"
                disabled={isUploading}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isUploading}
                className="flex-1 bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50"
              >
                {isUploading ? "Subiendo..." : "Subir Documento"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
