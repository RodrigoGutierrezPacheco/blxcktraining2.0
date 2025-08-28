import { FileText, Eye, Download, Trash2 } from "lucide-react";
import { Button } from "../pages/Components/Button";

export default function DocumentsList({ 
  isLoading, 
  documents, 
  documentTypes, 
  handleViewDocument, 
  handleDeleteDocument, 
  formatFileSize, 
  getFileIcon 
}) {
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Cargando documentos...</p>
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="text-center py-8">
        <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-gray-500 mb-2">No hay documentos subidos aún</p>
        <p className="text-sm text-gray-400">
          Comienza subiendo tu primera certificación o documento
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">
              {getFileIcon(doc.fileType || doc.type)}
            </span>
            <div>
              <h5 className="font-medium text-gray-900">{doc.title}</h5>
              <p className="text-sm text-gray-600">{doc.description}</p>
              <div className="flex items-center gap-4 mt-1">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {documentTypes.find(t => t.value === doc.type)?.label || doc.type}
                </span>
                {doc.fileSize && (
                  <span className="text-xs text-gray-500">
                    {formatFileSize(doc.fileSize)}
                  </span>
                )}
                {doc.uploadedAt && (
                  <span className="text-xs text-gray-500">
                    {new Date(doc.uploadedAt).toLocaleDateString('es-ES')}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              onClick={() => handleViewDocument(doc.id, false)}
              className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-100"
              title="Ver"
            >
              <Eye className="h-4 w-4" />
            </Button>
            {doc.downloadUrl && (
              <Button
                onClick={() => window.open(doc.downloadUrl, '_blank')}
                className="p-2 text-gray-600 hover:text-black hover:bg-gray-100"
                title="Descargar"
              >
                <Download className="h-4 w-4" />
              </Button>
            )}
            <Button
              onClick={() => handleDeleteDocument(doc.id)}
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
