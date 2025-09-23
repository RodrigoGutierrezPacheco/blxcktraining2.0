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


    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
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
    

    const response = await fetch(apiUrl, {
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
    console.log("Error getting trainer routines:", error);
    throw new Error(error.message || "Error al obtener las rutinas del entrenador");
  }
};

export const getTrainerUnassignedRoutines = async (trainerId) => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    if (!trainerId) {
      throw new Error("ID del entrenador no válido");
    }

    const apiUrl = `${APP_URL}routines/trainer/${trainerId}/unassigned`;
    
    console.log("Getting unassigned routines for trainer:", trainerId);
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
    console.log("Unassigned routines:", data);
    
    return data;
  } catch (error) {
    console.log("Error getting trainer unassigned routines:", error);
    throw new Error(error.message || "Error al obtener las rutinas sin asignar del entrenador");
  }
};

export const assignRoutineToUser = async (routineId, userId, startDate, endDate, notes) => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    if (!routineId || !userId) {
      throw new Error("IDs de rutina y usuario son requeridos");
    }

    const apiUrl = `${APP_URL}routines/assign`;
    

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        routine_id: routineId,
        user_id: userId,
        startDate: startDate || new Date().toISOString(),
        endDate: endDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 días por defecto
        notes: notes || "Rutina asignada por el entrenador"
      })
    });


    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    return data;
  } catch (error) {
    console.log("Error assigning routine to user:", error);
    throw new Error(error.message || "Error al asignar la rutina al usuario");
  }
};

export const getRoutineById = async (routineId) => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    if (!routineId) {
      throw new Error("ID de rutina no válido");
    }

    const apiUrl = `${APP_URL}routines/${routineId}`;
    

    const response = await fetch(apiUrl, {
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
    console.log("Error getting routine by ID:", error);
    throw new Error(error.message || "Error al obtener la rutina");
  }
};

export const updateRoutine = async (routineId, routineData) => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    if (!routineId) {
      throw new Error("ID de rutina no válido");
    }

    const apiUrl = `${APP_URL}routines/${routineId}`;
    

    const response = await fetch(apiUrl, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(routineData)
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Routine update successful:", data);
    
    return data;
  } catch (error) {
    console.log("Error updating routine:", error);
    throw new Error(error.message || "Error al actualizar la rutina");
  }
};

export const deleteRoutine = async (routineId) => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    if (!routineId) {
      throw new Error("ID de rutina no válido");
    }

    const apiUrl = `${APP_URL}routines/${routineId}`;
    
    console.log("Deleting routine:", routineId);
    console.log("API URL:", apiUrl);

    const response = await fetch(apiUrl, {
      method: "DELETE",
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
    console.log("Routine deletion successful:", data);
    
    return data;
  } catch (error) {
    console.log("Error deleting routine:", error);
    throw new Error(error.message || "Error al eliminar la rutina");
  }
};

export const createRoutine = async (routineData) => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    if (!routineData || !routineData.name) {
      throw new Error("Datos de rutina no válidos");
    }

    const apiUrl = `${APP_URL}routines`;
    
    console.log("Creating routine:", routineData.name);
    console.log("API URL:", apiUrl);
    console.log("Routine data:", JSON.stringify(routineData, null, 2));

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(routineData)
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Routine creation successful:", data);
    
    return data;
  } catch (error) {
    console.log("Error creating routine:", error);
    throw new Error(error.message || "Error al crear la rutina");
  }
};

export const createRoutineForUser = async (routineData) => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    if (!routineData || !routineData.name || !routineData.user_id || !routineData.trainer_id) {
      throw new Error("Datos de rutina no válidos");
    }

    const apiUrl = `${APP_URL}routines/create-for-user`;
    
    console.log("Creating routine for user:", routineData.name);
    console.log("API URL:", apiUrl);
    console.log("Routine data:", JSON.stringify(routineData, null, 2));

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(routineData)
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Routine creation for user successful:", data);
    
    return data;
  } catch (error) {
    console.log("Error creating routine for user:", error);
    throw new Error(error.message || "Error al crear la rutina para el usuario");
  }
};