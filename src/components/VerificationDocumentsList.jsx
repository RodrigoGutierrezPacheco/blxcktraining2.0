import { FileText, Eye, Download, Trash2, CheckCircle, XCircle } from "lucide-react";
import { Button } from "../pages/Components/Button";

export default function VerificationDocumentsList({
  isLoadingVerification,
  verificationDocuments,
  verificationTypes,
  handleViewDocument,
  handleDeleteVerificationDocument,
  formatFileSize,
  getFileIcon,
}) {
  if (isLoadingVerification) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-500">Cargando documentos de verificación...</p>
      </div>
    );
  }

  if (verificationDocuments.length === 0) {
    return (
      <div className="text-center py-6 bg-gray-50 rounded-lg">
        <FileText className="mx-auto h-10 w-10 text-gray-400 mb-3" />
        <p className="text-gray-500 mb-2">No hay documentos de verificación</p>
        <p className="text-sm text-gray-400">
          Sube documentos de identificación, CURP, RFC y otros para verificación
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {verificationDocuments.map((doc) => (
        <div
          key={doc.id}
          className="flex items-center justify-between p-4 border border-blue-200 rounded-lg hover:bg-blue-50 bg-blue-50"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">
              {getFileIcon(doc.fileType || "application/pdf")}
            </span>
            <div>
              <h5 className="font-medium text-gray-900">
                {verificationTypes.find((t) => t.value === doc.documentType)
                  ?.label || doc.documentType}
              </h5>
              {doc.notes && (
                <p className="text-sm text-gray-600">{doc.notes}</p>
              )}
              <div className="flex items-center gap-4 mt-1">
                <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                  Verificación
                </span>
                
                {/* Estado de Verificación en la información del documento */}
                <div className="flex items-center gap-1">
                  {doc.verificationStatus === 'aceptada' ? (
                    <span className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      <CheckCircle className="h-3 w-3" />
                      <span>aceptada</span>
                    </span>
                  ) : doc.verificationStatus === 'rechazada' ? (
                    <span className="flex items-center gap-1 bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                      <XCircle className="h-3 w-3" />
                      <span>Rechazado</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                      <XCircle className="h-3 w-3" />
                      <span>Pendiente</span>
                    </span>
                  )}
                </div>
                
                {doc.fileSize && (
                  <span className="text-xs text-gray-500">
                    {formatFileSize(doc.fileSize)}
                  </span>
                )}
                {doc.uploadedAt && (
                  <span className="text-xs text-gray-500">
                    {new Date(doc.uploadedAt).toLocaleDateString("es-ES")}
                  </span>
                )}
              </div>
              
              {/* Información de rechazo */}
              {doc.verificationStatus === 'rechazada' && doc.verificationNotes && (
                <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <span className="text-red-500 text-xs">❌</span>
                    <div className="text-xs">
                      <p className="text-red-700 font-medium mb-1">Motivo de Rechazo:</p>
                      <p className="text-red-800 bg-red-100 px-2 py-1 rounded border border-red-200">
                        {doc.verificationNotes}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            
            <Button
              onClick={() => handleViewDocument(doc.id, true)}
              className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-100"
              title="Ver"
            >
              <Eye className="h-4 w-4" />
            </Button>
            {doc.downloadUrl && (
              <Button
                onClick={() => window.open(doc.downloadUrl, "_blank")}
                className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-100"
                title="Descargar"
              >
                <Download className="h-4 w-4" />
              </Button>
            )}
            <Button
              onClick={() => handleDeleteVerificationDocument(doc.id)}
              className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50"
              title="Eliminar"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
