import { FileText, Eye, Download, Trash2, Clock, CheckCircle, XCircle } from "lucide-react";
import { Button } from "../pages/Components/Button";

export default function DocumentsList({ 
  isLoading, 
  documents, 
  documentTypes, 
  handleViewDocument, 
  handleDeleteDocument, 
  formatFileSize, 
  getFileIcon,
  isEducationSection = false // Nueva prop para indicar si es la sección de educación
}) {
  // Función para determinar si un documento es de educación
  const isEducationDocument = (docType) => {
    if (isEducationSection) return true; // Si es la sección de educación, todos los documentos son de educación
    const educationTypes = ['certification', 'diploma', 'course', 'workshop', 'seminar'];
    return educationTypes.includes(docType);
  };

  // Función para obtener estilos del estado de verificación
  const getVerificationStatusStyles = (status) => {
    switch (status) {
      case 'pendiente':
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-800',
          border: 'border-yellow-200',
          icon: <Clock className="h-3 w-3 text-yellow-600" />
        };
      case 'verificado':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          border: 'border-green-200',
          icon: <CheckCircle className="h-3 w-3 text-green-600" />
        };
        case 'aceptada':
          return {
            bg: 'bg-green-100',
            text: 'text-green-800',
            border: 'border-green-200',
            icon: <CheckCircle className="h-3 w-3 text-green-600" />
          };
      case 'rechazado':
        return {
          bg: 'bg-red-100',
          text: 'text-red-800',
          border: 'border-red-200',
          icon: <XCircle className="h-3 w-3 text-red-600" />
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          border: 'border-gray-200',
          icon: <Clock className="h-3 w-3 text-gray-600" />
        };
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-6">
        <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-gray-300 border-r-gray-600"></div>
        <p className="text-xs text-gray-500 mt-2">Cargando...</p>
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="text-center py-6 bg-gray-50 rounded border border-gray-200">
        <FileText className="mx-auto h-6 w-6 text-gray-400 mb-2" />
        <p className="text-xs text-gray-600">No hay documentos</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {documents.map((doc) => {
        const isEducation = isEducationDocument(doc.type);
        const verificationStyles = getVerificationStatusStyles(doc.verificationStatus);
        
        return (
          <div
            key={doc.id}
            className="flex items-center justify-between p-3 border border-gray-200 rounded hover:bg-gray-50 bg-white transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg text-gray-500">
                {getFileIcon(doc.fileType || doc.type)}
              </span>
              <div className="flex-1">
                <h5 className="text-sm font-medium text-gray-900">
                  {doc.title}
                </h5>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500">
                    {documentTypes.find(t => t.value === doc.type)?.label || doc.type}
                  </span>
                  
                  {/* Estado de verificación */}
                  {doc.verificationStatus && (
                    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs border ${
                      verificationStyles.bg
                    } ${verificationStyles.text} ${verificationStyles.border}`}>
                      {verificationStyles.icon}
                    </span>
                  )}
                  
                  {doc.fileSize && (
                    <span className="text-xs text-gray-500">
                      {formatFileSize(doc.fileSize)}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-0.5">
              <Button
                onClick={() => handleViewDocument(doc.id, false, isEducation)}
                className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
                title="Ver"
              >
                <Eye className="h-3.5 w-3.5" />
              </Button>
              {doc.downloadUrl && (
                <Button
                  onClick={() => window.open(doc.downloadUrl, '_blank')}
                  className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
                  title="Descargar"
                >
                  <Download className="h-3.5 w-3.5" />
                </Button>
              )}
              <Button
                onClick={() => handleDeleteDocument(doc.id)}
                className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                title="Eliminar"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
