import { useEffect } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "../pages/Components/Button";

export default function VerificationFormModal({ 
  showVerificationForm, 
  setShowVerificationForm, 
  verificationForm, 
  setVerificationForm, 
  handleVerificationSubmit, 
  handleVerificationFileChange, 
  isUploading, 
  verificationTypes,
  error,
  setError
}) {
  useEffect(() => {
    if (showVerificationForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      // Limpiar errores cuando se cierra el modal
      if (setError) {
        setError(null);
      }
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showVerificationForm, setError]);

  const handleCloseModal = () => {
    if (setError) {
      setError(null);
    }
    setShowVerificationForm(false);
  };

  if (!showVerificationForm) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full shadow-2xl border border-gray-200">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Subir Documento de Verificación
              </h3>
            </div>
            <Button
              onClick={handleCloseModal}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-lg transition-all duration-200"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleVerificationSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Error al subir documento
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{error.message || error}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Documento *
              </label>
              <select
                value={verificationForm.documentType}
                onChange={(e) => setVerificationForm(prev => ({ ...prev, documentType: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              >
                {verificationTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notas Adicionales
              </label>
              <textarea
                value={verificationForm.notes}
                onChange={(e) => setVerificationForm(prev => ({ ...prev, notes: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                placeholder="Notas adicionales sobre el documento"
                rows="3"
              />
            </div>
          
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Archivo *
              </label>
              <div className="border border-gray-300 rounded-lg p-4 text-center">
                <input
                  type="file"
                  onChange={handleVerificationFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  id="verification-file-upload"
                  required
                />
                <label htmlFor="verification-file-upload" className="cursor-pointer">
                  <Upload className="mx-auto h-6 w-6 text-gray-600 mb-2" />
                  <p className="text-sm text-gray-600">
                    Haz clic para seleccionar un archivo
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Solo PDF e imágenes (JPG, PNG) - máx. 10MB
                  </p>
                </label>
              </div>
              {verificationForm.file && (
                <p className="text-sm text-gray-600 mt-2">
                  Archivo seleccionado: {verificationForm.file.name}
                </p>
              )}
            </div>
          
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <Button
                type="button"
                onClick={handleCloseModal}
                className="flex-1 bg-gray-500 text-white hover:bg-gray-600 px-4 py-2 rounded-lg font-medium transition-all duration-200"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isUploading}
                className="flex-1 bg-gray-900 text-white hover:bg-gray-800 px-4 py-2 rounded-lg font-medium transition-all duration-200"
              >
                {isUploading ? "Subiendo..." : "Subir Verificación"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
