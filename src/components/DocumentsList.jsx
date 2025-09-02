import { FileText, Eye, Download, Trash2, GraduationCap, Award, BookOpen, Users, Calendar, Clock, CheckCircle, XCircle } from "lucide-react";
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

  // Función para obtener el icono específico de educación
  const getEducationIcon = (docType) => {
    switch (docType) {
      case 'certification':
        return <Award className="h-6 w-6 text-amber-600" />;
      case 'diploma':
        return <GraduationCap className="h-6 w-6 text-blue-600" />;
      case 'course':
        return <BookOpen className="h-6 w-6 text-green-600" />;
      case 'workshop':
        return <Users className="h-6 w-6 text-purple-600" />;
      case 'seminar':
        return <Calendar className="h-6 w-6 text-indigo-600" />;
      default:
        return <FileText className="h-6 w-6 text-gray-600" />;
    }
  };

  // Función para obtener estilos específicos de educación
  const getEducationStyles = (docType) => {
    if (!isEducationDocument(docType)) return {};
    
    switch (docType) {
      case 'certification':
        return {
          border: 'border-amber-200',
          bg: 'bg-amber-50',
          hover: 'hover:bg-amber-100',
          badge: 'bg-amber-100 text-amber-800 border-amber-200'
        };
      case 'diploma':
        return {
          border: 'border-blue-200',
          bg: 'bg-blue-50',
          hover: 'hover:bg-blue-100',
          badge: 'bg-blue-100 text-blue-800 border-blue-200'
        };
      case 'course':
        return {
          border: 'border-green-200',
          bg: 'bg-green-50',
          hover: 'hover:bg-green-100',
          badge: 'bg-green-100 text-green-800 border-green-200'
        };
      case 'workshop':
        return {
          border: 'border-purple-200',
          bg: 'bg-purple-50',
          hover: 'hover:bg-purple-100',
          badge: 'bg-purple-100 text-purple-800 border-purple-200'
        };
      case 'seminar':
        return {
          border: 'border-indigo-200',
          bg: 'bg-indigo-50',
          hover: 'hover:bg-indigo-100',
          badge: 'bg-indigo-100 text-indigo-800 border-indigo-200'
        };
      default:
        return {};
    }
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
      {documents.map((doc) => {
        const isEducation = isEducationDocument(doc.type);
        const educationStyles = getEducationStyles(doc.type);
        const verificationStyles = getVerificationStatusStyles(doc.verificationStatus);
        
        return (
          <div
            key={doc.id}
            className={`flex items-center justify-between p-4 border rounded-lg transition-all duration-200 ${
              isEducation 
                ? `${educationStyles.border} ${educationStyles.bg} ${educationStyles.hover} shadow-sm` 
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">
                {isEducation ? getEducationIcon(doc.type) : getFileIcon(doc.fileType || doc.type)}
              </span>
              <div>
                <h5 className={`font-medium ${isEducation ? 'text-gray-900' : 'text-gray-900'}`}>
                  {doc.title}
                </h5>
                <p className={`text-sm ${isEducation ? 'text-gray-700' : 'text-gray-600'}`}>
                  {doc.description}
                </p>
                <div className="flex items-center gap-4 mt-1">
                  <span className={`text-xs px-2 py-1 rounded border ${
                    isEducation 
                      ? educationStyles.badge
                      : 'text-gray-500 bg-gray-100'
                  }`}>
                    {documentTypes.find(t => t.value === doc.type)?.label || doc.type}
                  </span>
                  
                  {/* Estado de verificación */}
                  {doc.verificationStatus && (
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${
                      verificationStyles.bg
                    } ${verificationStyles.text} ${verificationStyles.border}`}>
                      {verificationStyles.icon}
                      {doc.verificationStatus.charAt(0).toUpperCase() + doc.verificationStatus.slice(1)}
                    </span>
                  )}
                  
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
                onClick={() => handleViewDocument(doc.id, false, isEducation)}
                className={`p-2 ${
                  isEducation 
                    ? 'text-blue-600 hover:text-blue-700 hover:bg-blue-100' 
                    : 'text-blue-600 hover:text-blue-700 hover:bg-blue-100'
                }`}
                title="Ver"
              >
                <Eye className="h-4 w-4" />
              </Button>
              {doc.downloadUrl && (
                <Button
                  onClick={() => window.open(doc.downloadUrl, '_blank')}
                  className={`p-2 ${
                    isEducation 
                      ? 'text-gray-600 hover:text-black hover:bg-gray-100' 
                      : 'text-gray-600 hover:text-black hover:bg-gray-100'
                  }`}
                  title="Descargar"
                >
                  <Download className="h-4 w-4" />
                </Button>
              )}
              <Button
                onClick={() => handleDeleteDocument(doc.id)}
                className={`p-2 ${
                  isEducation 
                    ? 'text-red-600 hover:text-red-700 hover:bg-red-50' 
                    : 'text-red-600 hover:text-red-700 hover:bg-red-50'
                }`}
                title="Eliminar"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
