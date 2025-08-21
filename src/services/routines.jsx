const APP_URL = import.meta.env.VITE_API_URL;

export const getUserRoutineByEmail = async (userEmail) => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    if (!userEmail) {
      throw new Error("ID del usuario no válido");
    }

    const apiUrl = `${APP_URL}routines/user/email/${userEmail}`;

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
    console.log("User routine data:", data);
    
    // Si no hay rutinas asignadas, retornar null
    if (!data || data.length === 0) {
      return null;
    }
    
    // Retornar la primera rutina activa o la primera disponible
    const activeRoutine = data.find(routine => routine.isActive) || data[0];
    return activeRoutine;
  } catch (error) {
    console.log("Error getting user routine:", error);
    throw new Error(error.message || "Error al obtener la rutina del usuario");
  }
};

export const getTrainerRoutines = async (trainerId) => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    if (!trainerId) {
      throw new Error("ID del entrenador no válido");
    }

    const apiUrl = `${APP_URL}routines/trainer/${trainerId}`;
    
    console.log("Fetching routines for trainer ID:", trainerId);
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
    console.log("Trainer routines data:", data);
    
    return data;
  } catch (error) {
    console.log("Error getting trainer routines:", error);
    throw new Error(error.message || "Error al obtener las rutinas del entrenador");
  }
};

export const assignRoutineToUser = async (routineId, userId) => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    if (!routineId || !userId) {
      throw new Error("IDs de rutina y usuario son requeridos");
    }

    const apiUrl = `${APP_URL}routines/${routineId}/assign`;
    
    console.log("Assigning routine:", routineId, "to user:", userId);
    console.log("API URL:", apiUrl);

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ userId })
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Routine assignment successful:", data);
    
    return data;
  } catch (error) {
    console.log("Error assigning routine to user:", error);
    throw new Error(error.message || "Error al asignar la rutina al usuario");
  }
};
