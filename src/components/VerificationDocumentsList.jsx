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
  console.log("verificationDocuments", verificationDocuments);
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
                  {doc.isVerified ? (
                    <span className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      <CheckCircle className="h-3 w-3" />
                      <span>Verificado</span>
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
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Estado de Verificación */}
            <div className="flex items-center gap-1">
              {doc.isVerified ? (
                <span className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1.5 rounded-full text-xs font-medium border border-green-200">
                  <CheckCircle className="h-3.5 w-3.5" />
                  <span>Verificado</span>
                </span>
              ) : (
                <span className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1.5 rounded-full text-xs font-medium border border-yellow-200">
                  <XCircle className="h-3.5 w-3.5" />
                  <span>Pendiente</span>
                </span>
              )}
            </div>
            
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
