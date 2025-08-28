const APP_URL = import.meta.env.VITE_API_URL;

export const createTrainer = async (user) => {
  try {
    const response = await fetch(`${APP_URL}auth/register/trainer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();

    if (!response.ok) {
      // Si hay errores de validación específicos, los incluimos en el error
      if (data.errors && Array.isArray(data.errors)) {
        throw new Error(JSON.stringify({
          message: data.message || "Error de validación",
          errors: data.errors,
          statusCode: data.statusCode
        }));
      }
      
      // Si es un error de conflicto (email ya registrado) u otro tipo
      if (data.statusCode === 409 || data.error === "Conflict") {
        throw new Error(JSON.stringify({
          message: data.message || "Error de conflicto",
          error: data.error,
          statusCode: data.statusCode
        }));
      }
      
      throw new Error(data.message || "Error al registrar usuario");
    }

    return data;
  } catch (error) {
    console.log("error backend", error);
    throw new Error(error.message || "Error de conexión");
  }
};

export const getTrainerById = async (trainerId) => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    if (!trainerId) {
      throw new Error("ID del entrenador no válido");
    }

    const apiUrl = `${APP_URL}users/trainer/${trainerId}`;
    
    console.log("Fetching trainer data for ID:", trainerId);
    console.log("Using token:", token ? `${token.substring(0, 20)}...` : "No token");
    console.log("API URL:", apiUrl);
    console.log("APP_URL from env:", APP_URL);

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json"
      }
    });

    console.log("Response status:", response.status);
    console.log("Response status text:", response.statusText);
    console.log("Response headers:", Object.fromEntries(response.headers.entries()));

    // Verificar si la respuesta tiene contenido
    const responseText = await response.text();
    
    console.log("Response text length:", responseText.length);
    console.log("Response text:", responseText);
    
    if (!responseText) {
      throw new Error("La respuesta del servidor está vacía");
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      console.error("Error parsing JSON response:", responseText);
      throw new Error("Respuesta del servidor no válida");
    }

    if (!response.ok) {
      throw new Error(data.message || `Error ${response.status}: ${response.statusText}`);
    }

    console.log("Parsed trainer data:", data);
    return data;
  } catch (error) {
    console.log("error backend", error);
    throw new Error(error.message || "Error al obtener datos del entrenador");
  }
};

// Actualizar entrenador
export const updateTrainer = async (trainerId, trainerData) => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    if (!trainerId) {
      throw new Error("ID del entrenador no válido");
    }

    const response = await fetch(`${APP_URL}users/trainer/${trainerId}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(trainerData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error actualizando entrenador:", error);
    throw new Error(error.message || "Error al actualizar el entrenador");
  }
};

export const getUsersByTrainer = async (trainerId) => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    if (!trainerId) {
      throw new Error("ID del entrenador no válido");
    }

    const apiUrl = `${APP_URL}users/by-trainer/${trainerId}`;
    
    console.log("Fetching users for trainer ID:", trainerId);
    console.log("API URL:", apiUrl);

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json"
      }
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Users data:", data);
    
    // Filtrar solo los campos que queremos mostrar
    const filteredUsers = data.map(user => ({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      age: user.age,
      weight: user.weight,
      height: user.height,
      chronicDiseases: user.chronicDiseases,
      dateOfBirth: user.dateOfBirth,
      healthIssues: user.healthIssues,
      createdAt: user.createdAt,
      hasRoutine: user.hasRoutine
    }));

    return filteredUsers;
  } catch (error) {
    console.log("Error getting users by trainer:", error);
    throw new Error(error.message || "Error al obtener usuarios del entrenador");
  }
};

// Funciones para manejar documentos de entrenadores
export const uploadTrainerDocument = async (trainerId, documentData) => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    if (!trainerId) {
      throw new Error("ID del entrenador no válido");
    }

    const formData = new FormData();
    formData.append('document', documentData.file);
    formData.append('title', documentData.title);
    formData.append('description', documentData.description);
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
    console.error("Error subiendo documento:", error);
    throw new Error(error.message || "Error al subir el documento");
  }
};

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
    console.error("Error obteniendo documentos:", error);
    throw new Error(error.message || "Error al obtener los documentos");
  }
};

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
    console.error("Error eliminando documento:", error);
    throw new Error(error.message || "Error al eliminar el documento");
  }
};
