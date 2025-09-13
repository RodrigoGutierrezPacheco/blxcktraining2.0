import { X, AlertCircle, Download, FileText, CheckCircle, XCircle, MessageSquare, Calendar, User, Upload, RefreshCw } from "lucide-react";
import { Button } from "../pages/Components/Button";
import { useState, useEffect } from "react";
import { replaceVerificationDocument, replaceTrainerEducationDocument } from "../services/documents";

export default function DocumentViewModal({ 
  showViewModal, 
  setShowViewModal, 
  selectedDocument, 
  setSelectedDocument, 
  documentContent, 
  setDocumentContent, 
  isLoadingDocument, 
  error, 
  verificationTypes, 
  formatFileSize,
  isEducationDocument = false,
}) {
  const [showReplaceModal, setShowReplaceModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isReplacing, setIsReplacing] = useState(false);
  const [replaceError, setReplaceError] = useState("");
  const [replaceNotes, setReplaceNotes] = useState("");

  // Bloquear scroll cuando el modal está abierto
  useEffect(() => {
    if (showViewModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function para restaurar scroll cuando el componente se desmonte
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showViewModal]);

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
      
      if (isEducationDocument) {
        // Para documentos de educación
        await replaceTrainerEducationDocument(
          selectedDocument.trainerId || selectedDocument.userId, 
          selectedDocument.id, 
          selectedFile,
          replaceNotes
        );
      } else {
        // Para documentos de verificación
        await replaceVerificationDocument(
          selectedDocument.trainerId || selectedDocument.userId, 
          selectedDocument.documentType, 
          selectedFile
        );
      }

      // Cerrar modal y recargar
      setShowReplaceModal(false);
      setSelectedFile(null);
      setReplaceNotes("");
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
    setReplaceNotes("");
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h4 className="text-lg font-medium text-gray-900">
            {selectedDocument.title || verificationTypes.find(t => t.value === selectedDocument.documentType)?.label || 'Ver Documento'}
          </h4>
          <Button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-lg"
            variant="ghost"
          >
            <X className="h-5 w-5 text-gray-400" />
          </Button>
        </div>
        
        <div className="p-6 overflow-auto max-h-[calc(90vh-80px)]">
          {isLoadingDocument ? (
            <div className="text-center py-8">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gray-300 border-r-gray-600"></div>
              <p className="text-sm text-gray-500 mt-3">Cargando documento...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <AlertCircle className="mx-auto h-8 w-8 text-red-500 mb-3" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          ) : documentContent ? (
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 p-4 rounded-lg">
                <h5 className="text-base font-medium text-gray-900 mb-4">Información del Documento</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {documentContent.fileName && (
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Nombre del Archivo</span>
                      <span className="text-sm text-gray-900 mt-1">{documentContent.fileName}</span>
                    </div>
                  )}
                  {selectedDocument.description && (
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Descripción</span>
                      <span className="text-sm text-gray-900 mt-1">{selectedDocument.description}</span>
                    </div>
                  )}
                  {selectedDocument.notes && (
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Notas</span>
                      <span className="text-sm text-gray-900 mt-1">{selectedDocument.notes}</span>
                    </div>
                  )}
                  {selectedDocument.createdAt && (
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Fecha de Subida</span>
                      <span className="text-sm text-gray-900 mt-1">
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
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Tamaño</span>
                      <span className="text-sm text-gray-900 mt-1">{formatFileSize(selectedDocument.fileSize)}</span>
                    </div>
                  )}
                  {selectedDocument.originalName && (
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Nombre Original</span>
                      <span className="text-sm text-gray-900 mt-1">{selectedDocument.originalName}</span>
                    </div>
                  )}
                  {/* Estado de Verificación - Solo para documentos de verificación */}
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Estado</span>
                    <span className="mt-1">
                      {selectedDocument.verificationStatus === 'aceptada' ? (
                        <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-md text-xs font-medium border border-green-200">
                          <CheckCircle className="h-3 w-3" />
                          Aceptada
                        </span>
                      ) : selectedDocument.verificationStatus === 'rechazada' ? (
                        <span className="inline-flex items-center gap-1 bg-red-50 text-red-700 px-2 py-1 rounded-md text-xs font-medium border border-red-200">
                          <XCircle className="h-3 w-3" />
                          Rechazada
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-1 rounded-md text-xs font-medium border border-yellow-200">
                          <XCircle className="h-3 w-3" />
                          Pendiente
                        </span>
                      )}
                    </span>
                  </div>
                </div>
                
                {/* Sección de Información de Verificación - Solo para documentos de verificación */}
                { (selectedDocument.verificationStatus === 'aceptada' || selectedDocument.verificationStatus === 'rechazada' || selectedDocument.verificationNotes || selectedDocument.verifiedAt) && (
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h6 className="text-sm font-medium text-gray-900 mb-4 flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-gray-600" />
                      Información de Verificación
                    </h6>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Notas de Verificación */}
                      {selectedDocument.verificationNotes && (
                        <div className="p-3 rounded-lg border border-gray-200 bg-gray-50">
                          <div className="flex items-start gap-2">
                            <MessageSquare className="h-4 w-4 mt-0.5 text-gray-600" />
                            <div>
                              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                {selectedDocument.verificationStatus === 'aceptada' ? 'Notas de Verificación' : 'Motivo de Rechazo'}
                              </p>
                              <p className="text-sm text-gray-900 bg-white p-3 rounded border border-gray-200">
                                {selectedDocument.verificationNotes}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Fecha de Verificación */}
                      {selectedDocument.verifiedAt && (
                        <div className="p-3 rounded-lg border border-gray-200 bg-gray-50">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-600" />
                            <div>
                              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Fecha de Verificación</p>
                              <p className="text-sm text-gray-900 bg-white p-3 rounded border border-gray-200">
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
                      
                      {/* Última Actualización */}
                      {selectedDocument.updatedAt && (
                        <div className="p-3 rounded-lg border border-gray-200 bg-gray-50">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-600" />
                            <div>
                              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Última Actualización</p>
                              <p className="text-sm text-gray-900 bg-white p-3 rounded border border-gray-200">
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
                    <div className="mt-6 p-4 rounded-lg border border-gray-200 bg-white">
                      <div className="text-center">
                        {selectedDocument.verificationStatus === 'aceptada' ? (
                          <div className="flex flex-col items-center gap-3">
                            <CheckCircle className="h-8 w-8 text-green-600" />
                            <div>
                              <p className="text-base font-medium text-green-900">Documento Aceptado</p>
                              <p className="text-sm text-gray-600 mt-1">
                                Este documento ha sido revisado y aprobado por el equipo de verificación
                              </p>
                            </div>
                          </div>
                        ) : selectedDocument.verificationStatus === 'rechazada' ? (
                          <div className="flex flex-col items-center gap-3">
                            <XCircle className="h-8 w-8 text-red-600" />
                            <div>
                              <p className="text-base font-medium text-red-900">Documento Rechazado</p>
                              <p className="text-sm text-gray-600 mt-1">
                                Este documento fue revisado pero no cumple con los requisitos de verificación
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-3">
                            <XCircle className="h-8 w-8 text-gray-500" />
                            <div>
                              <p className="text-base font-medium text-gray-900">Documento Pendiente</p>
                              <p className="text-sm text-gray-600 mt-1">
                                Este documento está en espera de revisión y verificación
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
                {(documentContent.signedUrl || documentContent.firebaseUrl )&& (
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <Button
                      onClick={() => window.open(documentContent.signedUrl || documentContent.firebaseUrl, '_blank')}
                      className="w-full bg-gray-900 text-white hover:bg-gray-800 flex items-center justify-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Descargar Documento
                    </Button>
                  </div>
                )}

                {/* Botón para reemplazar documento rechazado - Para documentos de verificación y educación rechazados */}
                {selectedDocument.verificationStatus === 'rechazada' && (
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <Button
                      onClick={() => setShowReplaceModal(true)}
                      className="w-full bg-gray-600 text-white hover:bg-gray-700 flex items-center justify-center gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      Reemplazar Documento
                    </Button>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Sube un nuevo archivo para reemplazar el documento rechazado
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <AlertCircle className="mx-auto h-8 w-8 text-red-500 mb-3" />
              <p className="text-sm text-gray-500">No se pudo cargar el contenido del documento</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal para reemplazar documento */}
      {showReplaceModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[80] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full shadow-2xl border border-gray-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Reemplazar Documento
              </h3>
              <Button
                onClick={closeReplaceModal}
                className="p-1 hover:bg-gray-100 rounded-lg"
                variant="ghost"
              >
                <X className="h-5 w-5 text-gray-400" />
              </Button>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-4">
                  Selecciona un nuevo archivo para reemplazar el documento rechazado. 
                  El estado se restablecerá a pendiente para nueva verificación.
                </p>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nuevo Archivo
                  </label>
                  <input
                    type="file"
                    onChange={handleFileSelect}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Formatos permitidos: PDF, JPG, JPEG, PNG (máx. 10MB)
                  </p>
                </div>

                {/* Campo de notas solo para documentos de educación */}
                {isEducationDocument && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notas del Reemplazo (Opcional)
                    </label>
                    <textarea
                      value={replaceNotes}
                      onChange={(e) => setReplaceNotes(e.target.value)}
                      placeholder="Ej: Documento anterior expirado, se reemplaza con el vigente"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      rows={3}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Explica brevemente el motivo del reemplazo
                    </p>
                  </div>
                )}

                {replaceError && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="text-sm font-medium text-red-800">Error</h4>
                        <p className="text-sm text-red-700 mt-1">{replaceError}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <Button
                  onClick={closeReplaceModal}
                  className="bg-gray-600 text-white hover:bg-gray-700 px-4 py-2"
                  disabled={isReplacing}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleReplaceDocument}
                  className="bg-gray-900 text-white hover:bg-gray-800 px-4 py-2 flex items-center gap-2"
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
