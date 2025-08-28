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
  verificationTypes 
}) {
  if (!showVerificationForm) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold">Subir Documento de Verificación</h4>
          <button
            onClick={() => setShowVerificationForm(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleVerificationSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Documento *
            </label>
            <select
              value={verificationForm.documentType}
              onChange={(e) => setVerificationForm(prev => ({ ...prev, documentType: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            >
              {verificationTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notas Adicionales
            </label>
            <textarea
              value={verificationForm.notes}
              onChange={(e) => setVerificationForm(prev => ({ ...prev, notes: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="Notas adicionales sobre el documento"
              rows="3"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Archivo *
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <input
                type="file"
                onChange={handleVerificationFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                id="verification-file-upload"
                required
              />
              <label htmlFor="verification-file-upload" className="cursor-pointer">
                <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
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
          
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={() => setShowVerificationForm(false)}
              className="flex-1 bg-gray-200 text-gray-800 hover:bg-gray-300"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isUploading}
              className="flex-1 bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isUploading ? "Subiendo..." : "Subir Verificación"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
