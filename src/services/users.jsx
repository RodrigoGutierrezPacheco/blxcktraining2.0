const APP_URL = import.meta.env.VITE_API_URL;

export const loginUser = async (user) => {
  try {
    const response = await fetch(`${APP_URL}auth/login/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error al iniciar sesión");
    }

    return data;
  } catch (error) {
    console.log("error backend", error);
    throw new Error(error.message || "Error de conexión");
  }
};

export const loginTrainer = async (trainer) => {
  try {
    const response = await fetch(`${APP_URL}auth/login/trainer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trainer),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error al iniciar sesión");
    }

    return data;
  } catch (error) {
    console.log("error backend", error);
    throw new Error(error.message || "Error de conexión");
  }
};

export const createUser = async (user) => {
  try {
    const response = await fetch(`${APP_URL}auth/register/user`, {
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

export const updateUserProfile = async (userId, profileData) => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const response = await fetch(`${APP_URL}users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(profileData)
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
      
      // Si es un error de validación u otro tipo
      throw new Error(JSON.stringify({
        message: data.message || "Error al actualizar el perfil",
        statusCode: data.statusCode || response.status
      }));
    }

    return data;
  } catch (error) {
    console.log("error backend", error);
    
    // Si el error ya es un JSON stringificado, lo re-lanzamos
    if (error.message && error.message.startsWith('{')) {
      throw error;
    }
    
    throw new Error(error.message || "Error de conexión");
  }
};

export const getUserByEmail = async () => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const storedUser = localStorage.getItem("userBlck");
    if (!storedUser) {
      throw new Error("No hay información de usuario almacenada");
    }

    const user = JSON.parse(storedUser);
    const email = user.email;

    if (!email) {
      throw new Error("No se encontró el email del usuario");
    }

    const response = await fetch(`${APP_URL}users/by-email?email=${encodeURIComponent(email)}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error al obtener información del usuario");
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

    const response = await fetch(`${APP_URL}users/trainer/${trainerId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error al obtener información del entrenador");
    }

    return data;
  } catch (error) {
    console.log("error backend", error);
    throw new Error(error.message || "Error de conexión");
  }
};

export const unassignUserFromTrainer = async (userId) => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const response = await fetch(`${APP_URL}users/${userId}/trainer`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error al desasignar usuario del entrenador");
    }

    return data;
  } catch (error) {
    console.log("error backend", error);
    throw new Error(error.message || "Error de conexión");
  }
};