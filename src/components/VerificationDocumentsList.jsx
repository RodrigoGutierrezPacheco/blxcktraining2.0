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
        <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-gray-300 border-r-gray-600"></div>
        <p className="text-xs text-gray-500 mt-2">Cargando...</p>
      </div>
    );
  }

  if (verificationDocuments.length === 0) {
    return (
      <div className="text-center py-6 bg-gray-50 rounded border border-gray-200">
        <FileText className="mx-auto h-6 w-6 text-gray-400 mb-2" />
        <p className="text-xs text-gray-600">No hay documentos</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {verificationDocuments.map((doc) => (
        <div
          key={doc.id}
          className="flex items-center justify-between p-3 border border-gray-200 rounded hover:bg-gray-50 bg-white transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg text-gray-500">
              {getFileIcon(doc.fileType || "application/pdf")}
            </span>
            <div className="flex-1">
              <h5 className="text-sm font-medium text-gray-900">
                {verificationTypes.find((t) => t.value === doc.documentType)
                  ?.label || doc.documentType}
              </h5>
              {doc.notes && (
                <p className="text-xs text-gray-600 mt-1">{doc.notes}</p>
              )}
              <div className="flex items-center gap-2 mt-1">
                {/* Estado de Verificación */}
                {doc.verificationStatus === 'aceptada' ? (
                  <span className="flex items-center gap-1 bg-green-50 text-green-700 px-1.5 py-0.5 rounded text-xs border border-green-200">
                    <CheckCircle className="h-3 w-3" />
                  </span>
                ) : doc.verificationStatus === 'rechazada' ? (
                  <span className="flex items-center gap-1 bg-red-50 text-red-700 px-1.5 py-0.5 rounded text-xs border border-red-200">
                    <XCircle className="h-3 w-3" />
                  </span>
                ) : (
                  <span className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-1.5 py-0.5 rounded text-xs border border-yellow-200">
                    <XCircle className="h-3 w-3" />
                  </span>
                )}
                
                {doc.fileSize && (
                  <span className="text-xs text-gray-500">
                    {formatFileSize(doc.fileSize)}
                  </span>
                )}
              </div>
              
              {/* Información de rechazo */}
              {doc.verificationStatus === 'rechazada' && doc.verificationNotes && (
                <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
                  <div className="flex items-start gap-1.5">
                    <XCircle className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                    <div className="text-xs">
                      <p className="text-red-700 font-medium mb-1">Motivo:</p>
                      <p className="text-red-800 bg-white px-1.5 py-1 rounded border border-red-200">
                        {doc.verificationNotes}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-0.5">
            <Button
              onClick={() => handleViewDocument(doc.id, true)}
              className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
              title="Ver"
            >
              <Eye className="h-3.5 w-3.5" />
            </Button>
            {doc.downloadUrl && (
              <Button
                onClick={() => window.open(doc.downloadUrl, "_blank")}
                className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
                title="Descargar"
              >
                <Download className="h-3.5 w-3.5" />
              </Button>
            )}
            <Button
              onClick={() => handleDeleteVerificationDocument(doc.id)}
              className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
              title="Eliminar"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
