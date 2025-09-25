import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "../pages/Components/Card";
import { Button } from "../pages/Components/Button";
import { Upload, Plus } from "lucide-react";
import {
  getTrainerDocuments,
  uploadVerificationDocument,
  getTrainerVerificationDocuments,
  getTrainerDocument,
  getTrainerEducationDocument,
  deleteVerificationDocument,
  getTrainerEducationDocuments,
  deleteTrainerEducationDocument,
  validateFileType,
  validateFileSize,
  VERIFICATION_ALLOWED_TYPES,
  MAX_FILE_SIZE_MB,
} from "../services/documents";

// Importar componentes modulares
import VerificationFormModal from "./VerificationFormModal";
import UploadFormModal from "./UploadFormModal";
import DocumentsList from "./DocumentsList";
import VerificationDocumentsList from "./VerificationDocumentsList";
import DocumentViewModal from "./DocumentViewModal";

export default function TrainerDocumentsSection({ trainerId }) {
  const [documents, setDocuments] = useState([]);
  const [verificationDocuments, setVerificationDocuments] = useState([]);
  const [educationDocuments, setEducationDocuments] = useState([]);
  // const [isLoading, setIsLoading] = useState(false); // No se usa actualmente
  const [isLoadingVerification, setIsLoadingVerification] = useState(false);
  const [isLoadingEducation, setIsLoadingEducation] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [showVerificationForm, setShowVerificationForm] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isLoadingDocument, setIsLoadingDocument] = useState(false);
  const [documentContent, setDocumentContent] = useState(null);
  const [verificationForm, setVerificationForm] = useState({
    documentType: "identification",
    notes: "",
    file: null,
  });
  const [error, setError] = useState(null);

  const documentTypes = [
    { value: "certification", label: "Certificación" },
    { value: "diploma", label: "Diploma" },
    { value: "license", label: "Licencia" },
    { value: "insurance", label: "Seguro" },
    { value: "other", label: "Otro" },
  ];

  const verificationTypes = [
    { value: "identification", label: "Documento de identificación" },
    { value: "birth_certificate", label: "Acta de nacimiento" },
    { value: "curp", label: "CURP del entrenador" },
    { value: "rfc", label: "RFC del entrenador" },
  ];

  const fetchVerificationDocuments = useCallback(async () => {
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
  }, [trainerId]);

  const fetchDocuments = useCallback(async () => {
    try {
      // setIsLoading(true); // No se usa actualmente
      setError(null);
      const docs = await getTrainerDocuments(trainerId);
      setDocuments(docs);
    } catch (err) {
      console.error("Error fetching documents:", err);
      setError(err.message);
    } finally {
      // setIsLoading(false); // No se usa actualmente
    }
  }, [trainerId]);

  const fetchEducationDocuments = useCallback(async () => {
    try {
      setIsLoadingEducation(true);
      setError(null);
      const docs = await getTrainerEducationDocuments(trainerId);
      setEducationDocuments(docs);
    } catch (err) {
      console.error("Error fetching education documents:", err);
      setError(err.message);
    } finally {
      setIsLoadingEducation(false);
    }
  }, [trainerId]);

  useEffect(() => {
    if (trainerId) {
      fetchDocuments();
      fetchVerificationDocuments();
      fetchEducationDocuments();
    }
  }, [
    trainerId,
    fetchDocuments,
    fetchVerificationDocuments,
    fetchEducationDocuments,
  ]);

  const handleViewDocument = async (
    documentId,
    isVerification = false,
    isEducation = false
  ) => {
    try {
      setIsLoadingDocument(true);
      setError(null);

      let document;
      if (isEducation) {
        document = educationDocuments.find((doc) => doc.id === documentId);
      } else if (isVerification) {
        document = verificationDocuments.find((doc) => doc.id === documentId);
      } else {
        document = documents.find((doc) => doc.id === documentId);
      }

      if (!document) {
        throw new Error("Documento no encontrado");
      }

      setSelectedDocument(document);

      // Use the correct endpoint based on document type
      let documentData;
      if (isEducation) {
        documentData = await getTrainerEducationDocument(documentId);
      } else {
        documentData = await getTrainerDocument(documentId, trainerId);
      }

      setDocumentContent(documentData);

      setShowViewModal(true);
    } catch (err) {
      console.error("Error viewing document:", err);
      setError(err.message);
    } finally {
      setIsLoadingDocument(false);
    }
  };

  // const handleDeleteDocument = async (documentId) => {
  //   if (!confirm("¿Estás seguro de que quieres eliminar este documento?")) {
  //     return;
  //   }

  //   try {
  //     await deleteTrainerDocument(trainerId, documentId);
  //     await fetchDocuments();
  //   } catch (err) {
  //     console.error("Error deleting document:", err);
  //     setError(err.message);
  //   }
  // };

  const handleDeleteVerificationDocument = async (documentId) => {
    if (
      !confirm(
        "¿Estás seguro de que quieres eliminar este documento de verificación?"
      )
    ) {
      return;
    }

    try {
      await deleteVerificationDocument(documentId, trainerId);
      await fetchVerificationDocuments();
      alert("Documento de verificación eliminado exitosamente");
    } catch (err) {
      console.error("Error deleting verification document:", err);
      setError(err.message);
    }
  };

  const handleDeleteEducationDocument = async (documentId) => {
    if (
      !confirm(
        "¿Estás seguro de que quieres eliminar este documento de educación?"
      )
    ) {
      return;
    }

    try {
      await deleteTrainerEducationDocument(documentId);
      await fetchEducationDocuments();
      alert("Documento de educación eliminado exitosamente");
    } catch (err) {
      console.error("Error deleting education document:", err);
      setError(err.message);
    }
  };

  const handleVerificationFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!validateFileType(file, VERIFICATION_ALLOWED_TYPES)) {
        setError(
          "Para verificación solo se permiten archivos PDF e imágenes (JPG, PNG)"
        );
        return;
      }

      if (!validateFileSize(file, MAX_FILE_SIZE_MB)) {
        setError(`El archivo no puede ser mayor a ${MAX_FILE_SIZE_MB}MB`);
        return;
      }

      setVerificationForm((prev) => ({ ...prev, file }));
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

      setVerificationForm({
        documentType: "identification",
        notes: "",
        file: null,
      });
      setShowVerificationForm(false);

      alert("Documento de verificación subido exitosamente");
      await fetchVerificationDocuments();
      // También refetch de otros documentos para mantener consistencia
      await fetchDocuments();
      await fetchEducationDocuments();
    } catch (err) {
      console.error("Error uploading verification document:", err);
      // Manejar errores de la API que vienen como objeto con message
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Error desconocido al subir el documento");
      }
    } finally {
      setIsUploading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (fileType) => {
    if (!fileType) return "📄"; // Manejar caso donde fileType es null o undefined

    if (fileType.includes("pdf")) return "📄";
    if (fileType.includes("image")) return "🖼️";
    if (fileType.includes("word")) return "📝";
    return "📄";
  };

  return (
    <Card className="border ml-auto mr-auto border-gray-200 w-[345px] sm:w-[360px] md:w-full h-fit">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900">
              Documentos del Entrenador
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Gestiona tus certificaciones, diplomas y otros documentos
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={() => {
                setError(null); // Limpiar errores previos
                setShowVerificationForm(true);
              }}
              className="bg-gray-600 text-white hover:bg-gray-700 flex items-center justify-center gap-2 px-4 py-2"
            >
              <Upload className="h-4 w-4" />
              Verificación
            </Button>
            <Button
              onClick={() => setShowUploadForm(true)}
              className="bg-gray-900 text-white hover:bg-gray-800 flex items-center justify-center gap-2 px-4 py-2"
            >
              <Plus className="h-4 w-4" />
              Subir
            </Button>
          </div>
        </div>

        {/* Sección de Documentos de Educación */}
        <div className="mt-8">
          <h4 className="text-base font-medium text-gray-900 mb-4">
            Documentos de Educación
          </h4>

          <DocumentsList
            isLoading={isLoadingEducation}
            documents={educationDocuments}
            documentTypes={documentTypes}
            handleViewDocument={(docId) =>
              handleViewDocument(docId, false, true)
            }
            handleDeleteDocument={handleDeleteEducationDocument}
            formatFileSize={formatFileSize}
            getFileIcon={getFileIcon}
            isEducationSection={true}
          />
        </div>

        {/* Sección de Documentos de Verificación */}
        <div className="mt-8">
          <h4 className="text-base font-medium text-gray-900 mb-4">
            Documentos de Verificación
          </h4>

          <VerificationDocumentsList
            isLoadingVerification={isLoadingVerification}
            verificationDocuments={verificationDocuments}
            verificationTypes={verificationTypes}
            handleViewDocument={handleViewDocument}
            handleDeleteVerificationDocument={handleDeleteVerificationDocument}
            formatFileSize={formatFileSize}
            getFileIcon={getFileIcon}
          />
        </div>

        {/* Modales */}
        <VerificationFormModal
          showVerificationForm={showVerificationForm}
          setShowVerificationForm={setShowVerificationForm}
          verificationForm={verificationForm}
          setVerificationForm={setVerificationForm}
          handleVerificationSubmit={handleVerificationSubmit}
          handleVerificationFileChange={handleVerificationFileChange}
          isUploading={isUploading}
          verificationTypes={verificationTypes}
          error={error}
          setError={setError}
        />

        <UploadFormModal
          showUploadForm={showUploadForm}
          setShowUploadForm={setShowUploadForm}
          onDocumentUploaded={() => {
            // Refetch de todos los documentos cuando se sube uno nuevo
            fetchDocuments();
            fetchVerificationDocuments();
            fetchEducationDocuments();
          }}
        />

        <DocumentViewModal
          showViewModal={showViewModal}
          setShowViewModal={setShowViewModal}
          selectedDocument={selectedDocument}
          setSelectedDocument={setSelectedDocument}
          documentContent={documentContent}
          setDocumentContent={setDocumentContent}
          isLoadingDocument={isLoadingDocument}
          error={error}
          documentTypes={documentTypes}
          verificationTypes={verificationTypes}
          formatFileSize={formatFileSize}
          isEducationDocument={
            selectedDocument &&
            educationDocuments.some((doc) => doc.id === selectedDocument.id)
          }
        />
      </CardContent>
    </Card>
  );
}
