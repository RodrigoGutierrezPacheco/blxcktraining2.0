import { useState, useEffect } from "react";
import { Card, CardContent } from "../pages/Components/Card";
import {Button} from "../pages/Components/Button";
import { 
  Upload, 
  FileText, 
  Trash2, 
  Download, 
  Plus,
  X,
  AlertCircle,
  Eye
} from "lucide-react";
import { 
  uploadTrainerDocument, 
  getTrainerDocuments, 
  deleteTrainerDocument,
  uploadVerificationDocument,
  getTrainerVerificationDocuments,
  getTrainerDocument,
  deleteVerificationDocument,
  validateFileType,
  validateFileSize,
  VERIFICATION_ALLOWED_TYPES,
  DOCUMENT_ALLOWED_TYPES,
  MAX_FILE_SIZE_MB
} from "../services/documents";

export default function TrainerDocumentsSection({ trainerId }) {
  console.log("trainerId", trainerId);
  const [documents, setDocuments] = useState([]);
  const [verificationDocuments, setVerificationDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingVerification, setIsLoadingVerification] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [showVerificationForm, setShowVerificationForm] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isLoadingDocument, setIsLoadingDocument] = useState(false);
  const [documentContent, setDocumentContent] = useState(null);
  const [uploadForm, setUploadForm] = useState({
    title: "",
    description: "",
    type: "certification",
    file: null
  });
  const [verificationForm, setVerificationForm] = useState({
    documentType: "identification",
    notes: "",
    file: null
  });
  const [error, setError] = useState(null);

  const documentTypes = [
    { value: "certification", label: "Certificación" },
    { value: "diploma", label: "Diploma" },
    { value: "license", label: "Licencia" },
    { value: "insurance", label: "Seguro" },
    { value: "other", label: "Otro" }
  ];

  const verificationTypes = [
    { value: "identification", label: "Identificación (INE/Pasaporte)" },
    { value: "birth_certificate", label: "Acta de Nacimiento" },
    { value: "curp", label: "CURP" },
    { value: "rfc", label: "RFC" }
  ];

  useEffect(() => {
    if (trainerId) {
      fetchDocuments();
      fetchVerificationDocuments();
    }
  }, [trainerId]);

  const fetchDocuments = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const docs = await getTrainerDocuments(trainerId);
      setDocuments(docs);
    } catch (err) {
      console.error("Error fetching documents:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchVerificationDocuments = async () => {
    try {
      setIsLoadingVerification(true);
      setError(null);
      const docs = await getTrainerVerificationDocuments(trainerId);
      setVerificationDocuments(docs);
    } catch (err) {
      console.error("Error fetching verification documents:", err);
      setError(err.message);
    } finally {
      setIsLoadingVerification(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tipo de archivo usando el servicio
      if (!validateFileType(file, DOCUMENT_ALLOWED_TYPES)) {
        setError("Solo se permiten archivos PDF, imágenes y documentos de Word");
        return;
      }
      
      // Validar tamaño usando el servicio
      if (!validateFileSize(file, MAX_FILE_SIZE_MB)) {
        setError(`El archivo no puede ser mayor a ${MAX_FILE_SIZE_MB}MB`);
        return;
      }
      
      setUploadForm(prev => ({ ...prev, file }));
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!uploadForm.title.trim() || !uploadForm.file) {
      setError("Por favor completa todos los campos requeridos");
      return;
    }

    try {
      setIsUploading(true);
      setError(null);
      
      await uploadTrainerDocument(trainerId, uploadForm);
      
      // Limpiar formulario y cerrar modal
      setUploadForm({
        title: "",
        description: "",
        type: "certification",
        file: null
      });
      setShowUploadForm(false);
      
      // Recargar documentos
      await fetchDocuments();
      
    } catch (err) {
      console.error("Error uploading document:", err);
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteDocument = async (documentId) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este documento?")) {
      return;
    }

    try {
      await deleteTrainerDocument(trainerId, documentId);
      await fetchDocuments();
    } catch (err) {
      console.error("Error deleting document:", err);
      setError(err.message);
    }
  };

  const handleDeleteVerificationDocument = async (documentId) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este documento de verificación?")) {
      return;
    }

    try {
      await deleteVerificationDocument(documentId, trainerId);
      await fetchVerificationDocuments();
      // Mostrar mensaje de éxito
      alert("Documento de verificación eliminado exitosamente");
    } catch (err) {
      console.error("Error deleting verification document:", err);
      setError(err.message);
    }
  };

  const handleVerificationFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tipo de archivo para verificación usando el servicio
      if (!validateFileType(file, VERIFICATION_ALLOWED_TYPES)) {
        setError("Para verificación solo se permiten archivos PDF e imágenes (JPG, PNG)");
        return;
      }
      
      // Validar tamaño usando el servicio
      if (!validateFileSize(file, MAX_FILE_SIZE_MB)) {
        setError(`El archivo no puede ser mayor a ${MAX_FILE_SIZE_MB}MB`);
        return;
      }
      
      setVerificationForm(prev => ({ ...prev, file }));
      setError(null);
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    
    if (!verificationForm.file) {
      setError("Por favor selecciona un archivo");
      return;
    }

    try {
      setIsUploading(true);
      setError(null);
      
      await uploadVerificationDocument(
        trainerId, 
        verificationForm.file, 
        verificationForm.documentType, 
        verificationForm.notes
      );
      
      // Limpiar formulario y cerrar modal
      setVerificationForm({
        documentType: "identification",
        notes: "",
        file: null
      });
      setShowVerificationForm(false);
      
             // Mostrar mensaje de éxito
       alert("Documento de verificación subido exitosamente");
       
       // Recargar documentos de verificación
       await fetchVerificationDocuments();
      
    } catch (err) {
      console.error("Error uploading verification document:", err);
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleViewDocument = async (documentId, isVerification = false) => {
    try {
      setIsLoadingDocument(true);
      setError(null);
      
      const document = isVerification 
        ? verificationDocuments.find(doc => doc.id === documentId)
        : documents.find(doc => doc.id === documentId);
      
      if (!document) {
        throw new Error("Documento no encontrado");
      }
      
      setSelectedDocument(document);
      
      // Obtener el contenido del documento usando el endpoint
      const documentData = await getTrainerDocument(documentId, trainerId);
      setDocumentContent(documentData);
      
      setShowViewModal(true);
    } catch (err) {
      console.error("Error viewing document:", err);
      setError(err.message);
    } finally {
      setIsLoadingDocument(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType) => {
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('image')) return '🖼️';
    if (fileType.includes('word')) return '📝';
    return '📎';
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              Documentos del Entrenador
            </h3>
            <p className="text-gray-600 mt-1">
              Gestiona tus certificaciones, diplomas y otros documentos importantes
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => setShowVerificationForm(true)}
              className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Verificación
            </Button>
            <Button
              onClick={() => setShowUploadForm(true)}
              className="bg-black text-white hover:bg-gray-800 flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Subir Documento
            </Button>
          </div>
        </div>

                 {/* Verification Form Modal */}
         {showVerificationForm && (
           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
             <div className="bg-white rounded-lg max-w-md w-full p-6">
               <div className="flex items-center justify-between mb-4">
                 <h4 className="text-lg font-semibold">Subir Documento de Verificación</h4>
                 <button
                   onClick={() => setShowVerificationForm(false)}
                   className="text-gray-400 hover:text-gray-600"
                 >
                   <X className="h-5 w-5" />
                 </button>
               </div>
               
               <form onSubmit={handleVerificationSubmit} className="space-y-4">
                                   <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tipo de Documento *
                    </label>
                    <select
                      value={verificationForm.documentType}
                      onChange={(e) => setVerificationForm(prev => ({ ...prev, documentType: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    >
                      {verificationTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                 
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">
                     Notas Adicionales
                   </label>
                   <textarea
                     value={verificationForm.notes}
                     onChange={(e) => setVerificationForm(prev => ({ ...prev, notes: e.target.value }))}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                     placeholder="Notas adicionales sobre el documento"
                     rows="3"
                   />
                 </div>
                 
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">
                     Archivo *
                   </label>
                   <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                     <input
                       type="file"
                       onChange={handleVerificationFileChange}
                       accept=".pdf,.jpg,.jpeg,.png"
                       className="hidden"
                       id="verification-file-upload"
                       required
                     />
                     <label htmlFor="verification-file-upload" className="cursor-pointer">
                       <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                       <p className="text-sm text-gray-600">
                         Haz clic para seleccionar un archivo
                       </p>
                       <p className="text-xs text-gray-500 mt-1">
                         Solo PDF e imágenes (JPG, PNG) - máx. 10MB
                       </p>
                     </label>
                   </div>
                   {verificationForm.file && (
                     <p className="text-sm text-gray-600 mt-2">
                       Archivo seleccionado: {verificationForm.file.name}
                     </p>
                   )}
                 </div>
                 
                 <div className="flex gap-3 pt-4">
                   <Button
                     type="button"
                     onClick={() => setShowVerificationForm(false)}
                     className="flex-1 bg-gray-200 text-gray-800 hover:bg-gray-300"
                   >
                     Cancelar
                   </Button>
                   <Button
                     type="submit"
                     disabled={isUploading}
                     className="flex-1 bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                   >
                     {isUploading ? "Subiendo..." : "Subir Verificación"}
                   </Button>
                 </div>
               </form>
             </div>
           </div>
         )}

         {/* Upload Form Modal */}
         {showUploadForm && (
           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
             <div className="bg-white rounded-lg max-w-md w-full p-6">
               <div className="flex items-center justify-between mb-4">
                 <h4 className="text-lg font-semibold">Subir Nuevo Documento</h4>
                 <button
                   onClick={() => setShowUploadForm(false)}
                   className="text-gray-400 hover:text-gray-600"
                 >
                   <X className="h-5 w-5" />
                 </button>
               </div>
               
               <form onSubmit={handleSubmit} className="space-y-4">
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">
                     Título del Documento *
                   </label>
                   <input
                     type="text"
                     value={uploadForm.title}
                     onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                     placeholder="Ej: Certificación de Entrenador Personal"
                     required
                   />
                 </div>
                 
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">
                     Descripción
                   </label>
                   <textarea
                     value={uploadForm.description}
                     onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                     placeholder="Descripción opcional del documento"
                     rows="3"
                   />
                 </div>
                 
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">
                     Tipo de Documento
                   </label>
                   <select
                     value={uploadForm.type}
                     onChange={(e) => setUploadForm(prev => ({ ...prev, type: e.target.value }))}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                   >
                     {documentTypes.map(type => (
                       <option key={type.value} value={type.value}>
                         {type.label}
                       </option>
                     ))}
                   </select>
                 </div>
                 
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">
                     Archivo *
                   </label>
                   <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                     <input
                       type="file"
                       onChange={handleFileChange}
                       accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                       className="hidden"
                       id="file-upload"
                       required
                     />
                     <label htmlFor="file-upload" className="cursor-pointer">
                       <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                       <p className="text-sm text-gray-600">
                         Haz clic para seleccionar un archivo
                       </p>
                       <p className="text-xs text-gray-500 mt-1">
                         PDF, JPG, PNG, DOC, DOCX (máx. 10MB)
                       </p>
                     </label>
                   </div>
                   {uploadForm.file && (
                     <p className="text-sm text-gray-600 mt-2">
                       Archivo seleccionado: {uploadForm.file.name}
                     </p>
                   )}
                 </div>
                 
                 <div className="flex gap-3 pt-4">
                   <Button
                     type="button"
                     onClick={() => setShowUploadForm(false)}
                     className="flex-1 bg-gray-200 text-gray-800 hover:bg-gray-300"
                   >
                     Cancelar
                   </Button>
                   <Button
                     type="submit"
                     disabled={isUploading}
                     className="flex-1 bg-black text-white hover:bg-gray-800 disabled:opacity-50"
                   >
                     {isUploading ? "Subiendo..." : "Subir Documento"}
                   </Button>
                 </div>
               </form>
             </div>
           </div>
         )}

                 {/* Documents List */}
         {isLoading ? (
           <div className="text-center py-8">
             <p className="text-gray-500">Cargando documentos...</p>
           </div>
         ) : documents.length === 0 ? (
           <div className="text-center py-8">
             <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
             <p className="text-gray-500 mb-2">No hay documentos subidos aún</p>
             <p className="text-sm text-gray-400">
               Comienza subiendo tu primera certificación o documento
             </p>
           </div>
         ) : (
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
         )}

         {/* Verification Documents Section */}
         <div className="mt-8">
           <h4 className="text-lg font-semibold text-gray-900 mb-4">
             Documentos de Verificación
           </h4>
           
           {isLoadingVerification ? (
             <div className="text-center py-6">
               <p className="text-gray-500">Cargando documentos de verificación...</p>
             </div>
           ) : verificationDocuments.length === 0 ? (
             <div className="text-center py-6 bg-gray-50 rounded-lg">
               <FileText className="mx-auto h-10 w-10 text-gray-400 mb-3" />
               <p className="text-gray-500 mb-2">No hay documentos de verificación</p>
               <p className="text-sm text-gray-400">
                 Sube documentos de identificación, CURP, RFC y otros para verificación
               </p>
             </div>
           ) : (
             <div className="space-y-3">
               {verificationDocuments.map((doc) => (
                 <div
                   key={doc.id}
                   className="flex items-center justify-between p-4 border border-blue-200 rounded-lg hover:bg-blue-50 bg-blue-50"
                 >
                   <div className="flex items-center gap-3">
                     <span className="text-2xl">
                       {getFileIcon(doc.fileType || 'application/pdf')}
                     </span>
                     <div>
                       <h5 className="font-medium text-gray-900">
                         {verificationTypes.find(t => t.value === doc.documentType)?.label || doc.documentType}
                       </h5>
                       {doc.notes && (
                         <p className="text-sm text-gray-600">{doc.notes}</p>
                       )}
                       <div className="flex items-center gap-4 mt-1">
                         <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                           Verificación
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
                        onClick={() => handleViewDocument(doc.id, true)}
                        className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-100"
                        title="Ver"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {doc.downloadUrl && (
                        <Button
                          onClick={() => window.open(doc.downloadUrl, '_blank')}
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
           )}
         </div>

         {/* Document View Modal */}
         {showViewModal && selectedDocument && (
           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
             <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
               <div className="flex items-center justify-between p-4 border-b">
                 <h4 className="text-lg font-semibold">
                   {selectedDocument.title || verificationTypes.find(t => t.value === selectedDocument.documentType)?.label || 'Ver Documento'}
                 </h4>
                 <button
                   onClick={() => {
                     setShowViewModal(false);
                     setSelectedDocument(null);
                     setDocumentContent(null);
                   }}
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
                       </div>
                       
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
                     <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                     <p className="text-gray-500">No se pudo cargar el contenido del documento</p>
                   </div>
                 )}
               </div>
             </div>
           </div>
         )}
      </CardContent>
    </Card>
  );
}
