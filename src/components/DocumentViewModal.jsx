import { X, AlertCircle, Download, FileText, CheckCircle, XCircle, MessageSquare, Calendar, User, Upload, RefreshCw } from "lucide-react";
import { Button } from "../pages/Components/Button";
import { useState } from "react";
import { replaceVerificationDocument } from "../services/documents";

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
  const [showReplaceModal, setShowReplaceModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isReplacing, setIsReplacing] = useState(false);
  const [replaceError, setReplaceError] = useState("");

  console.log("selectedDocument", selectedDocument);
  if (!showViewModal || !selectedDocument) return null;

  const handleClose = () => {
    setShowViewModal(false);
    setSelectedDocument(null);
    setDocumentContent(null);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setReplaceError("");
    }
  };

  const handleReplaceDocument = async () => {
    if (!selectedFile) {
      setReplaceError("Por favor selecciona un archivo");
      return;
    }

    try {
      setIsReplacing(true);
      setReplaceError("");
      
      await replaceVerificationDocument(
        selectedDocument.trainerId || selectedDocument.userId, 
        selectedDocument.documentType, 
        selectedFile
      );

      // Cerrar modal y recargar
      setShowReplaceModal(false);
      setSelectedFile(null);
      alert("Documento reemplazado exitosamente. El estado se ha restablecido a pendiente.");
      
      // Recargar la página o emitir evento para actualizar
      window.location.reload();
      
    } catch (err) {
      console.error("Error replacing document:", err);
      setReplaceError(err.message || "Error al reemplazar el documento");
    } finally {
      setIsReplacing(false);
    }
  };

  const closeReplaceModal = () => {
    setShowReplaceModal(false);
    setSelectedFile(null);
    setReplaceError("");
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
                  {selectedDocument.createdAt && (
                    <div>
                      <span className="font-medium text-gray-700">Fecha de Subida:</span>
                      <span className="ml-2 text-gray-600">
                        {new Date(selectedDocument.createdAt).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  )}
                  {selectedDocument.fileSize && (
                    <div>
                      <span className="font-medium text-gray-700">Tamaño:</span>
                      <span className="ml-2 text-gray-600">{formatFileSize(selectedDocument.fileSize)}</span>
                    </div>
                  )}
                  
                  {selectedDocument.originalName && (
                    <div>
                      <span className="font-medium text-gray-700">Nombre Original:</span>
                      <span className="ml-2 text-gray-600">{selectedDocument.originalName}</span>
                    </div>
                  )}
                  
                  {/* Estado de Verificación */}
                  <div>
                    <span className="font-medium text-gray-700">Estado:</span>
                    <span className="ml-2">
                      {selectedDocument.verificationStatus === 'aceptada' ? (
                        <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          <CheckCircle className="h-3 w-3" />
                          Aceptada
                        </span>
                      ) : selectedDocument.verificationStatus === 'rechazada' ? (
                        <span className="inline-flex items-center gap-1 bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                          <XCircle className="h-3 w-3" />
                          Rechazada
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
                {(selectedDocument.verificationStatus === 'aceptada' || selectedDocument.verificationStatus === 'rechazada' || selectedDocument.verificationNotes || selectedDocument.verifiedAt) && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h6 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-blue-600" />
                      Información de Verificación
                    </h6>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Notas de Verificación */}
                      {selectedDocument.verificationNotes && (
                        <div className={`p-3 rounded-lg border ${
                          selectedDocument.verificationStatus === 'aceptada'
                            ? 'bg-white border-gray-200' 
                            : 'bg-red-50 border-red-200'
                        }`}>
                          <div className="flex items-start gap-2">
                            <MessageSquare className={`h-4 w-4 mt-0.5 ${
                              selectedDocument.verificationStatus === 'aceptada' ? 'text-blue-500' : 'text-red-500'
                            }`} />
                            <div>
                              <p className={`text-sm font-medium mb-1 ${
                                selectedDocument.verificationStatus === 'aceptada' ? 'text-gray-700' : 'text-red-700'
                              }`}>
                                {selectedDocument.verificationStatus === 'aceptada' ? 'Notas de Verificación' : 'Motivo de Rechazo'}
                              </p>
                              <p className={`text-sm p-2 rounded border ${
                                selectedDocument.verificationStatus === 'aceptada'
                                  ? 'text-gray-800 bg-gray-50 border-gray-200' 
                                  : 'text-red-800 bg-red-100 border-red-200'
                              }`}>
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
                        {selectedDocument.verificationStatus === 'aceptada' ? (
                          <div className="flex flex-col items-center gap-2">
                            <CheckCircle className="h-12 w-12 text-green-500" />
                            <div>
                              <p className="text-lg font-semibold text-green-800">Documento Aceptado</p>
                              <p className="text-sm text-green-600">
                                Este documento ha sido revisado y aprobado por el equipo de verificación
                              </p>
                            </div>
                          </div>
                        ) : selectedDocument.verificationStatus === 'rechazada' ? (
                          <div className="flex flex-col items-center gap-2">
                            <XCircle className="h-12 w-12 text-red-500" />
                            <div>
                              <p className="text-lg font-semibold text-red-800">Documento Rechazado</p>
                              <p className="text-sm text-red-600">
                                Este documento fue revisado pero no cumple con los requisitos de verificación
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

                {/* Botón para reemplazar documento rechazado */}
                {selectedDocument.verificationStatus === 'rechazada' && (
                  <div className="mt-4 pt-4 border-t">
                    <Button
                      onClick={() => setShowReplaceModal(true)}
                      className="w-full bg-orange-600 text-white hover:bg-orange-700 flex items-center justify-center gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      Reemplazar Documento
                    </Button>
                    <p className="text-sm text-gray-500 mt-2 text-center">
                      Sube un nuevo archivo para reemplazar el documento rechazado
                    </p>
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

      {/* Modal para reemplazar documento */}
      {showReplaceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Reemplazar Documento
              </h3>
              <Button
                onClick={closeReplaceModal}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-4">
                  Selecciona un nuevo archivo para reemplazar el documento rechazado. 
                  El estado se restablecerá a pendiente para nueva verificación.
                </p>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nuevo Archivo
                  </label>
                  <input
                    type="file"
                    onChange={handleFileSelect}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Formatos permitidos: PDF, JPG, JPEG, PNG (máx. 10MB)
                  </p>
                </div>

                {replaceError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{replaceError}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  onClick={closeReplaceModal}
                  className="bg-gray-300 text-gray-700 hover:bg-gray-400 px-4 py-2 rounded-lg"
                  disabled={isReplacing}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleReplaceDocument}
                  className="bg-orange-600 text-white hover:bg-orange-700 px-4 py-2 rounded-lg flex items-center gap-2"
                  disabled={isReplacing || !selectedFile}
                >
                  {isReplacing ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Reemplazando...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4" />
                      Reemplazar
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
