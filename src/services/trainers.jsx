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
    
    // Si es un error de red o del servidor, dar un mensaje más específico
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      throw new Error("Error de conexión con el servidor");
    }
    
    throw new Error(error.message || "Error al obtener información del entrenador");
  }
};
