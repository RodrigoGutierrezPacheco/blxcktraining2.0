import { X, AlertCircle, Download, FileText } from "lucide-react";
import { Button } from "../pages/Components/Button";

export default function DocumentViewModal({ 
  showViewModal, 
  setShowViewModal, 
  selectedDocument, 
  setSelectedDocument, 
  documentContent, 
  setDocumentContent, 
  isLoadingDocument, 
  error, 
  documentTypes, 
  verificationTypes, 
  formatFileSize 
}) {
  if (!showViewModal || !selectedDocument) return null;

  const handleClose = () => {
    setShowViewModal(false);
    setSelectedDocument(null);
    setDocumentContent(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h4 className="text-lg font-semibold">
            {selectedDocument.title || verificationTypes.find(t => t.value === selectedDocument.documentType)?.label || 'Ver Documento'}
          </h4>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-4 overflow-auto max-h-[calc(90vh-80px)]">
          {isLoadingDocument ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Cargando documento...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <AlertCircle className="mx-auto h-12 w-12 text-red-400 mb-4" />
              <p className="text-red-600">{error}</p>
            </div>
          ) : documentContent ? (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-medium text-gray-900 mb-2">Información del Documento</h5>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Tipo:</span>
                    <span className="ml-2 text-gray-600">
                      {selectedDocument.type ? 
                        documentTypes.find(t => t.value === selectedDocument.type)?.label : 
                        verificationTypes.find(t => t.value === selectedDocument.documentType)?.label
                      }
                    </span>
                  </div>
                  {documentContent.fileName && (
                    <div>
                      <span className="font-medium text-gray-700">Nombre del Archivo:</span>
                      <span className="ml-2 text-gray-600">{documentContent.fileName}</span>
                    </div>
                  )}
                  {documentContent.mimeType && (
                    <div>
                      <span className="font-medium text-gray-700">Tipo MIME:</span>
                      <span className="ml-2 text-gray-600">{documentContent.mimeType}</span>
                    </div>
                  )}
                  {selectedDocument.description && (
                    <div>
                      <span className="font-medium text-gray-700">Descripción:</span>
                      <span className="ml-2 text-gray-600">{selectedDocument.description}</span>
                    </div>
                  )}
                  {selectedDocument.notes && (
                    <div>
                      <span className="font-medium text-gray-700">Notas:</span>
                      <span className="ml-2 text-gray-600">{selectedDocument.notes}</span>
                    </div>
                  )}
                  {selectedDocument.uploadedAt && (
                    <div>
                      <span className="font-medium text-gray-700">Fecha de Subida:</span>
                      <span className="ml-2 text-gray-600">
                        {new Date(selectedDocument.uploadedAt).toLocaleDateString('es-ES')}
                      </span>
                    </div>
                  )}
                  {selectedDocument.fileSize && (
                    <div>
                      <span className="font-medium text-gray-700">Tamaño:</span>
                      <span className="ml-2 text-gray-600">{formatFileSize(selectedDocument.fileSize)}</span>
                    </div>
                  )}
                </div>
                
                {documentContent.signedUrl && (
                  <div className="mt-4 pt-4 border-t">
                    <Button
                      onClick={() => window.open(documentContent.signedUrl, '_blank')}
                      className="w-full bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Descargar Documento
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="border rounded-lg p-4">
                <h5 className="font-medium text-gray-900 mb-2">Vista Previa del Documento</h5>
                {documentContent.signedUrl ? (
                  <div className="text-center">
                    {documentContent.mimeType?.includes('image') ? (
                      <img 
                        src={documentContent.signedUrl} 
                        alt="Vista previa del documento"
                        className="max-w-full h-auto max-h-96 mx-auto"
                      />
                    ) : (
                      <div className="text-center py-8">
                        <FileText className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                        <p className="text-gray-600 mb-2">Documento no visualizable</p>
                        <Button
                          onClick={() => window.open(documentContent.signedUrl, '_blank')}
                          className="bg-blue-600 text-white hover:bg-blue-700"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Descargar para Ver
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-500">No se pudo cargar la vista previa del documento</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500">No se pudo cargar el contenido del documento</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
