const APP_URL = import.meta.env.VITE_API_URL;

// Función para subir documento de verificación del entrenador
export const uploadVerificationDocument = async (trainerId, file, documentType, notes) => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    if (!trainerId) {
      throw new Error("ID del entrenador no válido");
    }

    if (!file) {
      throw new Error("No se ha seleccionado ningún archivo");
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', documentType);
    formData.append('notes', notes);

    const response = await fetch(`${APP_URL}trainer-verification/upload/${trainerId}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error uploading verification document:", error);
    throw new Error(error.message || "Error al subir el documento de verificación");
  }
};

// Función para subir documento general del entrenador
export const uploadTrainerDocument = async (trainerId, documentData) => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    if (!trainerId) {
      throw new Error("ID del entrenador no válido");
    }

    if (!documentData.file) {
      throw new Error("No se ha seleccionado ningún archivo");
    }

    const formData = new FormData();
    formData.append('document', documentData.file);
    formData.append('title', documentData.title);
    formData.append('description', documentData.description || '');
    formData.append('type', documentData.type);

    const response = await fetch(`${APP_URL}trainers/${trainerId}/documents`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error uploading trainer document:", error);
    throw new Error(error.message || "Error al subir el documento");
  }
};

// Función para obtener documentos del entrenador
export const getTrainerDocuments = async (trainerId) => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    if (!trainerId) {
      throw new Error("ID del entrenador no válido");
    }

    const response = await fetch(`${APP_URL}trainers/${trainerId}/documents`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting trainer documents:", error);
    throw new Error(error.message || "Error al obtener los documentos");
  }
};

// Función para eliminar documento del entrenador
export const deleteTrainerDocument = async (trainerId, documentId) => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    if (!trainerId || !documentId) {
      throw new Error("ID del entrenador o documento no válido");
    }

    const response = await fetch(`${APP_URL}trainers/${trainerId}/documents/${documentId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting trainer document:", error);
    throw new Error(error.message || "Error al eliminar el documento");
  }
};

// Función para obtener documentos de verificación del entrenador
export const getTrainerVerificationDocuments = async (trainerId) => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    if (!trainerId) {
      throw new Error("ID del entrenador no válido");
    }

    const response = await fetch(`${APP_URL}trainer-verification/documents/${trainerId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting trainer verification documents:", error);
    throw new Error(error.message || "Error al obtener los documentos de verificación");
  }
};

// Función para obtener los tipos de documentos disponibles para verificación
export const getVerificationDocumentTypes = async () => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const response = await fetch(`${APP_URL}trainer-verification/document-types`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting verification document types:", error);
    throw new Error(error.message || "Error al obtener los tipos de documentos de verificación");
  }
};

// Función para descargar un documento
export const downloadDocument = async (documentUrl) => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const response = await fetch(documentUrl, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'documento';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    return true;
  } catch (error) {
    console.error("Error downloading document:", error);
    throw new Error(error.message || "Error al descargar el documento");
  }
};

// Función para validar tipos de archivo permitidos
export const validateFileType = (file, allowedTypes) => {
  if (!file) return false;
  return allowedTypes.includes(file.type);
};

// Función para validar tamaño de archivo
export const validateFileSize = (file, maxSizeMB = 10) => {
  if (!file) return false;
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
};

// Tipos de archivo permitidos para verificación
export const VERIFICATION_ALLOWED_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/jpg'
];

// Tipos de archivo permitidos para documentos generales
export const DOCUMENT_ALLOWED_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/jpg',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

// Tamaño máximo de archivo (10MB)
export const MAX_FILE_SIZE_MB = 10;

// Función para obtener un documento específico del entrenador
export const getTrainerDocument = async (documentId, trainerId) => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    if (!documentId || !trainerId) {
      throw new Error("ID del documento o entrenador no válido");
    }

    const response = await fetch(`${APP_URL}trainer-verification/file/${documentId}/${trainerId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting trainer document:", error);
    throw new Error(error.message || "Error al obtener el documento");
  }
};

// Función para eliminar un documento de verificación del entrenador
export const deleteVerificationDocument = async (documentId, trainerId) => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    if (!documentId || !trainerId) {
      throw new Error("ID del documento o entrenador no válido");
    }

    const response = await fetch(`${APP_URL}trainer-verification/${documentId}/${trainerId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting verification document:", error);
    throw new Error(error.message || "Error al eliminar el documento de verificación");
  }
};

// Función para verificar/rechazar un documento del entrenador
export const verifyTrainerDocument = async (documentId, verificationData) => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    if (!documentId) {
      throw new Error("ID del documento no válido");
    }

    const response = await fetch(`${APP_URL}users/trainer/document/${documentId}/verify`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(verificationData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error verifying trainer document:", error);
    throw new Error(error.message || "Error al verificar el documento");
  }
};


