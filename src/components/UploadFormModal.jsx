import { Upload, X, AlertCircle } from "lucide-react";
import { useState } from "react";
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

    } catch (error) {
      console.error("Error uploading document:", error);
      
      // Manejar diferentes tipos de errores
      if (error.response?.data) {
        const errorData = error.response.data;
        
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
      } else {
        // Error de red o desconocido
        setError(error.message || "Error al subir el documento");
      }
    } finally {
      setIsUploading(false);
    }
  };

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold">Subir Nuevo Documento</h4>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {success}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título del Documento *
            </label>
            <input
              type="text"
              value={uploadForm.title}
              onChange={(e) => {
                setUploadForm(prev => ({ ...prev, title: e.target.value }));
                clearFieldError('title');
              }}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción *
            </label>
            <textarea
              value={uploadForm.description}
              onChange={(e) => {
                setUploadForm(prev => ({ ...prev, description: e.target.value }));
                clearFieldError('description');
              }}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Documento
            </label>
            <select
              value={uploadForm.type}
              onChange={(e) => setUploadForm(prev => ({ ...prev, type: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            >
              {documentTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Archivo *
            </label>
            <div className={`border-2 border-dashed rounded-lg p-4 text-center ${
              fieldErrors.file ? 'border-red-300 bg-red-50' : 'border-gray-300'
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
                <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">
                  Haz clic para seleccionar un archivo
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PDF, JPG, PNG, DOC, DOCX (máx. 10MB)
                </p>
              </label>
            </div>
            {fieldErrors.file && (
              <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {fieldErrors.file}
              </p>
            )}
            {uploadForm.file && (
              <p className="text-sm text-gray-600 mt-2">
                Archivo seleccionado: {uploadForm.file.name}
              </p>
            )}
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={handleClose}
              className="flex-1 bg-gray-200 text-gray-800 hover:bg-gray-300"
              disabled={isUploading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isUploading}
              className="flex-1 bg-black text-white hover:bg-gray-800 disabled:opacity-50"
            >
              {isUploading ? "Subiendo..." : "Subir Documento"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
