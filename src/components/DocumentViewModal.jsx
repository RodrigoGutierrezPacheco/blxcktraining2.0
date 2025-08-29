import { X, AlertCircle, Download, FileText, CheckCircle, XCircle, MessageSquare, Calendar, User } from "lucide-react";
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
                  
                  {/* Estado de Verificación */}
                  <div>
                    <span className="font-medium text-gray-700">Estado:</span>
                    <span className="ml-2">
                      {selectedDocument.isVerified ? (
                        <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          <CheckCircle className="h-3 w-3" />
                          Verificado
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                          <XCircle className="h-3 w-3" />
                          Pendiente
                        </span>
                      )}
                    </span>
                  </div>
                </div>
                
                {/* Sección de Información de Verificación */}
                {(selectedDocument.isVerified || selectedDocument.verificationNotes) && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h6 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-blue-600" />
                      Información de Verificación
                    </h6>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Notas de Verificación */}
                      {selectedDocument.verificationNotes && (
                        <div className="bg-white p-3 rounded-lg border border-gray-200">
                          <div className="flex items-start gap-2">
                            <MessageSquare className="h-4 w-4 text-blue-500 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-700 mb-1">Notas de Verificación</p>
                              <p className="text-sm text-gray-800 bg-gray-50 p-2 rounded border">
                                {selectedDocument.verificationNotes}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Fecha de Verificación */}
                      {selectedDocument.verifiedAt && (
                        <div className="bg-white p-3 rounded-lg border border-gray-200">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-green-500" />
                            <div>
                              <p className="text-sm font-medium text-gray-700 mb-1">Fecha de Verificación</p>
                              <p className="text-sm text-gray-800 bg-gray-50 p-2 rounded border">
                                {new Date(selectedDocument.verifiedAt).toLocaleDateString('es-ES', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Verificado Por */}
                      {selectedDocument.verifiedBy && (
                        <div className="bg-white p-3 rounded-lg border border-gray-200">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-purple-500" />
                            <div>
                              <p className="text-sm font-medium text-gray-700 mb-1">Verificado Por</p>
                              <p className="text-sm text-gray-800 bg-gray-50 p-2 rounded border font-mono">
                                {selectedDocument.verifiedBy}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Última Actualización */}
                      {selectedDocument.updatedAt && (
                        <div className="bg-white p-3 rounded-lg border border-gray-200">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-orange-500" />
                            <div>
                              <p className="text-sm font-medium text-gray-700 mb-1">Última Actualización</p>
                              <p className="text-sm text-gray-800 bg-gray-50 p-2 rounded border">
                                {new Date(selectedDocument.updatedAt).toLocaleDateString('es-ES', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Estado Visual de Verificación */}
                    <div className="mt-4 p-4 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
                      <div className="text-center">
                        {selectedDocument.isVerified ? (
                          <div className="flex flex-col items-center gap-2">
                            <CheckCircle className="h-12 w-12 text-green-500" />
                            <div>
                              <p className="text-lg font-semibold text-green-800">Documento Verificado</p>
                              <p className="text-sm text-green-600">
                                Este documento ha sido revisado y aprobado por el equipo de verificación
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-2">
                            <XCircle className="h-12 w-12 text-yellow-500" />
                            <div>
                              <p className="text-lg font-semibold text-yellow-800">Documento Pendiente</p>
                              <p className="text-sm text-yellow-600">
                                Este documento está en espera de revisión y verificación
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
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
              <AlertCircle className="mx-auto h-12 w-12 text-red-400 mb-4" />
              <p className="text-gray-500">No se pudo cargar el contenido del documento</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
