import { X, Download, FileText } from "lucide-react";
import { Button } from "../../Components/Button";

export default function DocumentViewModal({ 
  document: selectedDocument, 
  isOpen, 
  onClose 
}) {
  if (!isOpen || !selectedDocument) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Visualizar Documento
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {selectedDocument.documentType || "Documento de Verificación"}
            </p>
          </div>
          <Button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Document Info */}
          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Tipo de Documento</p>
                <p className="font-medium text-gray-900">
                  {selectedDocument.documentType || "No especificado"}
                </p>
              </div>
              {selectedDocument.createdAt && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Fecha de Subida</p>
                  <p className="font-medium text-gray-900">
                    {new Date(selectedDocument.createdAt).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              )}
            </div>
            
            {selectedDocument.originalName && (
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-500 mb-1">Nombre Original</p>
                <p className="text-gray-900">{selectedDocument.originalName}</p>
              </div>
            )}

            {selectedDocument.fileSize && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Tamaño del Archivo</p>
                <p className="font-medium text-gray-900">
                  {(selectedDocument.fileSize / 1024).toFixed(2)} KB
                </p>
              </div>
            )}
          </div>

          {/* Document Viewer */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Vista Previa del Documento</h3>
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              {selectedDocument.firebaseUrl ? (
                <div className="space-y-4">
                  {/* PDF Viewer */}
                  {selectedDocument.firebaseUrl.toLowerCase().includes('.pdf') ? (
                    <iframe
                      src={selectedDocument.firebaseUrl}
                      className="w-full h-96 border border-gray-300 rounded-lg"
                      title="Vista previa del documento"
                    />
                  ) : (
                    /* Image Viewer */
                    <img
                      src={selectedDocument.firebaseUrl}
                      alt={selectedDocument.documentType || "Documento"}
                      className="max-w-full max-h-96 mx-auto rounded-lg shadow-lg"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                  )}
                  
                  {/* Fallback for unsupported formats */}
                  <div className="hidden">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <FileText className="h-16 w-16 text-blue-400 mx-auto mb-3" />
                      <p className="text-blue-800 font-medium mb-2">
                        Documento no compatible con vista previa
                      </p>
                      <p className="text-blue-600 text-sm mb-4">
                        Este tipo de archivo no puede ser visualizado en el navegador
                      </p>
                      <Button
                        onClick={() => window.open(selectedDocument.firebaseUrl, '_blank')}
                        className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg"
                      >
                        Abrir en Nueva Pestaña
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <FileText className="h-16 w-16 text-red-400 mx-auto mb-3" />
                  <p className="text-red-800 font-medium">URL del documento no disponible</p>
                  <p className="text-red-600 text-sm">
                    No se puede acceder al archivo del documento
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button
              onClick={onClose}
              className="bg-gray-300 text-gray-700 hover:bg-gray-400 px-4 py-2 rounded-lg"
            >
              Cerrar
            </Button>
            {selectedDocument.firebaseUrl && (
              <Button
                onClick={() => {
                  const a = document.createElement('a');
                  a.href = selectedDocument.firebaseUrl;
                  a.download = selectedDocument.originalName || 'documento-verificacion';
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                }}
                className="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Descargar
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
