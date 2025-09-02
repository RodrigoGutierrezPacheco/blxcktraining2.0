import { useState, useEffect } from "react";
import { Button } from "../../Components/Button";
import {
  FileText,
  Download,
  Eye,
  RefreshCw,
  CheckCircle,
  XCircle,
  MessageSquare,
  X,
} from "lucide-react";
import {
  getTrainerVerificationDocuments,
  getTrainerEducationDocuments,
  verifyTrainerDocument,
  verifyTrainerEducationDocument,
} from "../../../services/documents";
import DocumentViewModal from "./DocumentViewModal";

export default function TrainerDocumentsSection({ trainerId, trainerName }) {
  const [verificationDocuments, setVerificationDocuments] = useState([]);
  const [educationDocuments, setEducationDocuments] = useState([]);
  const [documentsLoading, setDocumentsLoading] = useState(false);
  const [documentsError, setDocumentsError] = useState("");
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [verificationNotes, setVerificationNotes] = useState("");
  const [isEducationDocument, setIsEducationDocument] = useState(false);

  useEffect(() => {
    if (trainerId) {
      fetchTrainerDocuments();
    }
  }, [trainerId]);

  const fetchTrainerDocuments = async () => {
    if (!trainerId) return;

    try {
      setDocumentsLoading(true);
      setDocumentsError("");
      
      // Cargar documentos de verificación y educación en paralelo
      const [verificationData, educationData] = await Promise.all([
        getTrainerVerificationDocuments(trainerId),
        getTrainerEducationDocuments(trainerId)
      ]);
      
      setVerificationDocuments(verificationData);
      setEducationDocuments(educationData);
    } catch (err) {
      setDocumentsError(err.message || "Error al cargar los documentos");
    } finally {
      setDocumentsLoading(false);
    }
  };

  const handleViewDocument = async (document) => {
    try {
      setSelectedDocument(document);
      setShowDocumentModal(true);
    } catch (err) {
      console.error("Error al abrir el documento:", err);
    }
  };

  const closeDocumentModal = () => {
    setShowDocumentModal(false);
    setSelectedDocument(null);
  };

  const openVerificationModal = (document, isEducation = false) => {
    setSelectedDocument(document);
    setVerificationNotes(document.verificationNotes || "");
    setIsEducationDocument(isEducation);
    setShowVerificationModal(true);
  };

  const closeVerificationModal = () => {
    setShowVerificationModal(false);
    setSelectedDocument(null);
    setVerificationNotes("");
    setIsEducationDocument(false);
  };

  const handleVerifyDocument = async (isVerified) => {
    if (!selectedDocument) return;

    try {
      setVerificationLoading(true);
      
      // Usar la función apropiada según el tipo de documento
      if (isEducationDocument) {
        const verificationData = {
          verificationStatus: isVerified ? "aceptada" : "rechazada",
          verificationNotes:
            verificationNotes.trim() ||
            (isVerified
              ? "Documento verificado correctamente"
              : "Documento rechazado"),
        };
        await verifyTrainerEducationDocument(selectedDocument.id, verificationData);
      } else {
        // Para documentos de verificación, usar el formato original
        const verificationData = {
          verificationStatus: isVerified ? "aceptada" : "rechazada",
          verificationNotes:
            verificationNotes.trim() ||
            (isVerified
              ? "Documento verificado correctamente"
              : "Documento rechazado"),
        };
        await verifyTrainerDocument(selectedDocument.id, verificationData);
      }

      // Recargar documentos para mostrar el nuevo estado
      await fetchTrainerDocuments();
      closeVerificationModal();
    } catch (err) {
      console.error("Error al verificar documento:", err);
      alert(err.message || "Error al verificar el documento");
    } finally {
      setVerificationLoading(false);
    }
  };

  if (!trainerId) return null;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">
          Documentos del Entrenador
        </h3>
        <Button
          onClick={fetchTrainerDocuments}
          className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1 text-sm rounded-lg flex items-center gap-2"
          disabled={documentsLoading}
        >
          <RefreshCw
            className={`h-4 w-4 ${documentsLoading ? "animate-spin" : ""}`}
          />
          {documentsLoading ? "Actualizando..." : "Actualizar"}
        </Button>
      </div>

      {documentsLoading ? (
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-3"></div>
          <p className="text-gray-600">Cargando documentos...</p>
        </div>
      ) : documentsError ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-sm">{documentsError}</p>
        </div>
      ) : verificationDocuments.length === 0 && educationDocuments.length === 0 ? (
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">
            No hay documentos registrados
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {trainerName} aún no ha subido documentos
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Documentos de Verificación */}
          {verificationDocuments.length > 0 && (
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-3">
                Documentos de Verificación
              </h4>
              <div className="space-y-3">
                {verificationDocuments.map((document) => (
            <div
              key={document.id}
              className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {document.documentType || "Documento de Verificación"}
                      </h4>
                      {document.originalName && (
                        <p className="text-sm text-gray-600">
                          {document.originalName}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      {document.documentType}
                    </span>

                    {/* Estado de Verificación */}
                    <div className="flex items-center gap-2">
                      {document.verificationStatus === 'aceptada' ? (
                        <span className="flex items-center gap-1 text-green-700">
                          <CheckCircle className="h-4 w-4" />
                          <span className="font-medium">Aceptada</span>
                        </span>
                      ) : document.verificationStatus === 'rechazada' ? (
                        <span className="flex items-center gap-1 text-red-700">
                          <XCircle className="h-4 w-4" />
                          <span className="font-medium">Rechazada</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-yellow-700">
                          <XCircle className="h-4 w-4" />
                          <span className="font-medium">Pendiente</span>
                        </span>
                      )}
                    </div>

                    {document.createdAt && (
                      <span className="flex items-center gap-1">
                        <span>Subido:</span>
                        <span className="font-medium">
                          {new Date(document.createdAt).toLocaleDateString(
                            "es-ES"
                          )}
                        </span>
                      </span>
                    )}
                    {document.fileSize && (
                      <span className="flex items-center gap-1">
                        <span>Tamaño:</span>
                        <span className="font-medium">
                          {(document.fileSize / 1024).toFixed(2)} KB
                        </span>
                      </span>
                    )}
                  </div>
                  
                  {/* Información de rechazo */}
                  {document.verificationStatus === 'rechazada' && document.verificationNotes && (
                    <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <span className="text-red-500 text-sm">❌</span>
                        <div className="text-sm">
                          <p className="text-red-700 font-medium mb-1">Motivo de Rechazo:</p>
                          <p className="text-red-800 bg-red-100 px-3 py-2 rounded border border-red-200">
                            {document.verificationNotes}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 ml-4">
                  {document.firebaseUrl && (
                    <>
                      <Button
                        onClick={() => handleViewDocument(document)}
                        className="bg-blue-100 text-blue-700 hover:bg-blue-200 p-2 rounded-lg transition-colors"
                        title="Ver documento"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => {
                          const a = document.createElement("a");
                          a.href = document.firebaseUrl;
                          a.download =
                            document.originalName || "documento-verificacion";
                          document.body.appendChild(a);
                          a.click();
                          document.body.removeChild(a);
                        }}
                        className="bg-green-100 text-green-700 hover:bg-green-200 p-2 rounded-lg transition-colors"
                        title="Descargar documento"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </>
                  )}

                  {/* Botón de Verificación */}
                  <Button
                    onClick={() => openVerificationModal(document, false)}
                    className={`p-2 rounded-lg transition-colors ${
                      document.verificationStatus === 'aceptada'
                        ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
                        : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                    }`}
                    title={
                      document.verificationStatus === 'aceptada'
                        ? "Cambiar estado de verificación"
                        : "Verificar documento"
                    }
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
                ))}
              </div>
            </div>
          )}

          {/* Documentos de Educación */}
          {educationDocuments.length > 0 && (
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-3">
                Documentos de Educación
              </h4>
              <div className="space-y-3">
                {educationDocuments.map((document) => (
            <div
              key={document.id}
              className="bg-green-50 p-4 rounded-lg border border-green-200 hover:border-green-300 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="h-5 w-5 text-green-600" />
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {document.title || "Documento de Educación"}
                      </h4>
                      {document.originalName && (
                        <p className="text-sm text-gray-600">
                          {document.originalName}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      Educación
                    </span>

                    {/* Estado de Verificación */}
                    <div className="flex items-center gap-2">
                      {document.verificationStatus === 'aceptada' ? (
                        <span className="flex items-center gap-1 text-green-700">
                          <CheckCircle className="h-4 w-4" />
                          <span className="font-medium">Aceptada</span>
                        </span>
                      ) : document.verificationStatus === 'rechazada' ? (
                        <span className="flex items-center gap-1 text-red-700">
                          <XCircle className="h-4 w-4" />
                          <span className="font-medium">Rechazada</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-yellow-700">
                          <XCircle className="h-4 w-4" />
                          <span className="font-medium">Pendiente</span>
                        </span>
                      )}
                    </div>

                    {document.createdAt && (
                      <span className="flex items-center gap-1">
                        <span>Subido:</span>
                        <span className="font-medium">
                          {new Date(document.createdAt).toLocaleDateString(
                            "es-ES"
                          )}
                        </span>
                      </span>
                    )}
                    {document.fileSize && (
                      <span className="flex items-center gap-1">
                        <span>Tamaño:</span>
                        <span className="font-medium">
                          {(document.fileSize / 1024).toFixed(2)} KB
                        </span>
                      </span>
                    )}
                  </div>
                  
                  {/* Información de rechazo */}
                  {document.verificationStatus === 'rechazada' && document.verificationNotes && (
                    <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <span className="text-red-500 text-sm">❌</span>
                        <div className="text-sm">
                          <p className="text-red-700 font-medium mb-1">Motivo de Rechazo:</p>
                          <p className="text-red-800 bg-red-100 px-3 py-2 rounded border border-red-200">
                            {document.verificationNotes}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 ml-4">
                  {document.firebaseUrl && (
                    <>
                      <Button
                        onClick={() => handleViewDocument(document)}
                        className="bg-blue-100 text-blue-700 hover:bg-blue-200 p-2 rounded-lg transition-colors"
                        title="Ver documento"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => {
                          const a = document.createElement("a");
                          a.href = document.firebaseUrl;
                          a.download =
                            document.originalName || "documento-educacion";
                          document.body.appendChild(a);
                          a.click();
                          document.body.removeChild(a);
                        }}
                        className="bg-green-100 text-green-700 hover:bg-green-200 p-2 rounded-lg transition-colors"
                        title="Descargar documento"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </>
                  )}

                  {/* Botón de Verificación */}
                  <Button
                    onClick={() => openVerificationModal(document, true)}
                    className={`p-2 rounded-lg transition-colors ${
                      document.verificationStatus === 'aceptada'
                        ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
                        : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                    }`}
                    title={
                      document.verificationStatus === 'aceptada'
                        ? "Cambiar estado de verificación"
                        : "Verificar documento"
                    }
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Document View Modal */}
      <DocumentViewModal
        document={selectedDocument}
        isOpen={showDocumentModal}
        onClose={closeDocumentModal}
      />

      {/* Verification Modal */}
      {showVerificationModal && selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {isEducationDocument ? (
                    selectedDocument.verificationStatus === 'aceptada'
                      ? "Cambiar Estado de Verificación"
                      : selectedDocument.verificationStatus === 'rechazada'
                      ? "Revisar Documento Rechazado"
                      : "Verificar Documento de Educación"
                  ) : (
                    selectedDocument.verificationStatus === 'aceptada'
                      ? "Cambiar Estado de Verificación"
                      : selectedDocument.verificationStatus === 'rechazada'
                      ? "Revisar Documento Rechazado"
                      : "Verificar Documento"
                  )}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {isEducationDocument ? (
                    <>
                      {selectedDocument.title} - {selectedDocument.originalName}
                    </>
                  ) : (
                    <>
                      {selectedDocument.documentType} - {selectedDocument.originalName}
                    </>
                  )}
                </p>
              </div>
              <Button
                onClick={closeVerificationModal}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Current Status */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Estado Actual
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    {isEducationDocument ? (
                      // Estados para documentos de educación
                      selectedDocument.verificationStatus === 'aceptada' ? (
                        <>
                          <CheckCircle className="h-6 w-6 text-green-600" />
                          <div>
                            <p className="font-medium text-green-700">
                              Documento Aceptado
                            </p>
                            <p className="text-sm text-gray-600">
                              Aceptado el{" "}
                              {selectedDocument.verifiedAt
                                ? new Date(
                                    selectedDocument.verifiedAt
                                  ).toLocaleDateString("es-ES")
                                : "fecha no disponible"}
                            </p>
                          </div>
                        </>
                      ) : selectedDocument.verificationStatus === 'rechazada' ? (
                        <>
                          <XCircle className="h-6 w-6 text-red-600" />
                          <div>
                            <p className="font-medium text-red-700">
                              Documento Rechazado
                            </p>
                            <p className="text-sm text-gray-600">
                              Rechazado el{" "}
                              {selectedDocument.verifiedAt
                                ? new Date(
                                    selectedDocument.verifiedAt
                                  ).toLocaleDateString("es-ES")
                                : "fecha no disponible"}
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-6 w-6 text-yellow-600" />
                          <div>
                            <p className="font-medium text-yellow-700">
                              Documento Pendiente de Verificación
                            </p>
                            <p className="text-sm text-gray-600">
                              Aún no ha sido revisado
                            </p>
                          </div>
                        </>
                      )
                    ) : (
                      // Estados para documentos de verificación
                      selectedDocument.verificationStatus === 'aceptada' ? (
                        <>
                          <CheckCircle className="h-6 w-6 text-green-600" />
                          <div>
                            <p className="font-medium text-green-700">
                              Documento Aceptado
                            </p>
                            <p className="text-sm text-gray-600">
                              Aceptado el{" "}
                              {selectedDocument.verifiedAt
                                ? new Date(
                                    selectedDocument.verifiedAt
                                  ).toLocaleDateString("es-ES")
                                : "fecha no disponible"}
                            </p>
                          </div>
                        </>
                      ) : selectedDocument.verificationStatus === 'rechazada' ? (
                        <>
                          <XCircle className="h-6 w-6 text-red-600" />
                          <div>
                            <p className="font-medium text-red-700">
                              Documento Rechazado
                            </p>
                            <p className="text-sm text-gray-600">
                              Rechazado el{" "}
                              {selectedDocument.verifiedAt
                                ? new Date(
                                    selectedDocument.verifiedAt
                                  ).toLocaleDateString("es-ES")
                                : "fecha no disponible"}
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-6 w-6 text-yellow-600" />
                          <div>
                            <p className="font-medium text-yellow-700">
                              Documento Pendiente de Verificación
                            </p>
                            <p className="text-sm text-gray-600">
                              Aún no ha sido revisado
                            </p>
                          </div>
                        </>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Verification Notes */}
              <div className="mb-6">
                <label
                  htmlFor="verificationNotes"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Notas de Verificación
                </label>
                <textarea
                  id="verificationNotes"
                  value={verificationNotes}
                  onChange={(e) => setVerificationNotes(e.target.value)}
                  placeholder="Agregar notas sobre la verificación del documento..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Las notas son opcionales pero recomendadas para documentar la
                  decisión.
                </p>
              </div>

              {/* Previous Notes */}
              {selectedDocument.verificationNotes && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    {isEducationDocument ? (
                      selectedDocument.verificationStatus === 'aceptada' ? "Notas Anteriores" : "Motivo de Rechazo"
                    ) : (
                      selectedDocument.verificationStatus === 'aceptada' ? "Notas Anteriores" : "Motivo de Rechazo"
                    )}
                  </h4>
                  <div className={`rounded-lg p-3 ${
                    isEducationDocument ? (
                      selectedDocument.verificationStatus === 'aceptada'
                        ? 'bg-blue-50 border border-blue-200' 
                        : 'bg-red-50 border border-red-200'
                    ) : (
                      selectedDocument.verificationStatus === 'aceptada'
                        ? 'bg-blue-50 border border-blue-200' 
                        : 'bg-red-50 border border-red-200'
                    )
                  }`}>
                    <p className={`text-sm ${
                      isEducationDocument ? (
                        selectedDocument.verificationStatus === 'aceptada' ? 'text-blue-800' : 'text-red-800'
                      ) : (
                        selectedDocument.verificationStatus === 'aceptada' ? 'text-blue-800' : 'text-red-800'
                      )
                    }`}>
                      {selectedDocument.verificationNotes}
                    </p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end gap-3">
                <Button
                  onClick={closeVerificationModal}
                  className="bg-gray-300 text-gray-700 hover:bg-gray-400 px-4 py-2 rounded-lg"
                  disabled={verificationLoading}
                >
                  Cancelar
                </Button>

                {isEducationDocument ? (
                  // Botones para documentos de educación
                  selectedDocument.verificationStatus === 'aceptada' ? (
                    <Button
                      onClick={() => handleVerifyDocument(false)}
                      className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-lg flex items-center gap-2"
                      disabled={verificationLoading}
                    >
                      <XCircle className="h-4 w-4" />
                      {verificationLoading ? "Rechazando..." : "Rechazar"}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleVerifyDocument(true)}
                      className="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-lg flex items-center gap-2"
                      disabled={verificationLoading}
                    >
                      <CheckCircle className="h-4 w-4" />
                      {verificationLoading ? "Verificando..." : "Aceptar"}
                    </Button>
                  )
                ) : (
                  // Botones para documentos de verificación
                  selectedDocument.verificationStatus === 'aceptada' ? (
                    <Button
                      onClick={() => handleVerifyDocument(false)}
                      className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-lg flex items-center gap-2"
                      disabled={verificationLoading}
                    >
                      <XCircle className="h-4 w-4" />
                      {verificationLoading ? "Rechazando..." : "Rechazar"}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleVerifyDocument(true)}
                      className="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-lg flex items-center gap-2"
                      disabled={verificationLoading}
                    >
                      <CheckCircle className="h-4 w-4" />
                      {verificationLoading ? "Verificando..." : "Aceptar"}
                    </Button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
