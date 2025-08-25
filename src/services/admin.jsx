const APP_URL = import.meta.env.VITE_API_URL;

export const adminLogin = async (email, password) => {
  try {
    const response = await fetch(`${APP_URL}auth/login/admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en login de administrador:", error);
    throw new Error(error.message || "Error al iniciar sesión como administrador");
  }
};

export const getAdminProfile = async () => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const response = await fetch(`${APP_URL}admin/profile`, {
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
    console.error("Error obteniendo perfil de administrador:", error);
    throw new Error(error.message || "Error al obtener el perfil del administrador");
  }
};

// ==================== USUARIOS ====================

// Obtener todos los administradores
export const getAllAdmins = async () => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const response = await fetch(`${APP_URL}users/admins`, {
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
    console.error("Error obteniendo administradores:", error);
    throw new Error(error.message || "Error al obtener la lista de administradores");
  }
};

// Obtener todos los entrenadores
export const getAllTrainers = async () => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const response = await fetch(`${APP_URL}users/trainers`, {
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
    console.error("Error obteniendo entrenadores:", error);
    throw new Error(error.message || "Error al obtener la lista de entrenadores");
  }
};

// Obtener todos los usuarios normales
export const getAllNormalUsers = async () => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const response = await fetch(`${APP_URL}users/normal`, {
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
    console.error("Error obteniendo usuarios:", error);
    throw new Error(error.message || "Error al obtener la lista de usuarios");
  }
};

// Obtener todos los usuarios con entrenadores
export const getAllUsersWithTrainers = async () => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const response = await fetch(`${APP_URL}users/with-trainers`, {
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
    console.error("Error obteniendo usuarios con entrenadores:", error);
    throw new Error(error.message || "Error al obtener la lista de usuarios con entrenadores");
  }
};

// Obtener usuario por ID
export const getUserById = async (userId) => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const response = await fetch(`${APP_URL}users/${userId}`, {
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
    console.error("Error obteniendo usuario:", error);
    throw new Error(error.message || "Error al obtener el usuario");
  }
};

// Crear nuevo usuario
export const createUser = async (userData) => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const response = await fetch(`${APP_URL}auth/register/user`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creando usuario:", error);
    throw new Error(error.message || "Error al crear el usuario");
  }
};

// Actualizar usuario
export const updateUser = async (userId, userData) => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const response = await fetch(`${APP_URL}users/${userId}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error actualizando usuario:", error);
    throw new Error(error.message || "Error al actualizar el usuario");
  }
};

// Eliminar usuario
export const deleteUser = async (userId) => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const response = await fetch(`${APP_URL}users/${userId}`, {
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

    return { success: true, message: "Usuario eliminado correctamente" };
  } catch (error) {
    console.error("Error eliminando usuario:", error);
    throw new Error(error.message || "Error al eliminar el usuario");
  }
};

// Asignar entrenador a usuario
export const assignTrainerToUser = async (userId, trainerId) => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const response = await fetch(`${APP_URL}users/assign-trainer`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        userId,
        trainerId
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error asignando entrenador:", error);
    throw new Error(error.message || "Error al asignar el entrenador");
  }
};

// Remover entrenador de usuario
export const removeTrainerFromUser = async (userId) => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const response = await fetch(`${APP_URL}users/${userId}/trainer`, {
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

    return { success: true, message: "Entrenador removido correctamente" };
  } catch (error) {
    console.error("Error removiendo entrenador:", error);
    throw new Error(error.message || "Error al remover el entrenador");
  }
};

// Cambiar estado del usuario (activar/desactivar)
export const toggleUserStatus = async (userId) => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const response = await fetch(`${APP_URL}users/${userId}/toggle-status`, {
      method: "PATCH",
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
    console.error("Error cambiando estado del usuario:", error);
    throw new Error(error.message || "Error al cambiar el estado del usuario");
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
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al obtener datos del entrenador");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error obteniendo entrenador por ID:", error);
    throw new Error(error.message || "Error al obtener datos del entrenador");
  }
};

// ==================== RUTINAS ====================

// Obtener todas las rutinas
export const getAllRoutines = async () => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const response = await fetch(`${APP_URL}routines/all`, {
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
    console.error("Error obteniendo rutinas:", error);
    throw new Error(error.message || "Error al obtener la lista de rutinas");
  }
};

// Obtener rutina por ID
export const getRoutineById = async (routineId) => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const response = await fetch(`${APP_URL}routines/${routineId}`, {
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
    console.error("Error obteniendo rutina:", error);
    throw new Error(error.message || "Error al obtener la rutina");
  }
};

// Crear nueva rutina
export const createRoutine = async (routineData) => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const response = await fetch(`${APP_URL}routines`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(routineData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creando rutina:", error);
    throw new Error(error.message || "Error al crear la rutina");
  }
};

// Actualizar rutina
export const updateRoutine = async (routineId, routineData) => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const response = await fetch(`${APP_URL}routines/${routineId}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(routineData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error actualizando rutina:", error);
    throw new Error(error.message || "Error al actualizar la rutina");
  }
};

// Eliminar rutina
export const deleteRoutine = async (routineId) => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const response = await fetch(`${APP_URL}routines/${routineId}`, {
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

    return { success: true, message: "Rutina eliminada correctamente" };
  } catch (error) {
    console.error("Error eliminando rutina:", error);
    throw new Error(error.message || "Error al eliminar la rutina");
  }
};

// ==================== PLANES ====================

// Obtener todos los planes
export const getAllPlans = async () => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const response = await fetch(`${APP_URL}plans/all`, {
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
    console.error("Error obteniendo planes:", error);
    throw new Error(error.message || "Error al obtener la lista de planes");
  }
};

// Obtener plan por ID
export const getPlanById = async (planId) => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const response = await fetch(`${APP_URL}plans/${planId}`, {
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
    console.error("Error obteniendo plan:", error);
    throw new Error(error.message || "Error al obtener el plan");
  }
};

// Crear nuevo plan
export const createPlan = async (planData) => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const response = await fetch(`${APP_URL}plans`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(planData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creando plan:", error);
    throw new Error(error.message || "Error al crear el plan");
  }
};

// Actualizar plan
export const updatePlan = async (planId, planData) => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const response = await fetch(`${APP_URL}plans/${planId}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(planData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error actualizando plan:", error);
    throw new Error(error.message || "Error al actualizar el plan");
  }
};

// Eliminar plan
export const deletePlan = async (planId) => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const response = await fetch(`${APP_URL}plans/${planId}`, {
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

    return { success: true, message: "Plan eliminado correctamente" };
  } catch (error) {
    console.error("Error eliminando plan:", error);
    throw new Error(error.message || "Error al eliminar el plan");
  }
};

// Activar plan
export const activatePlan = async (planId) => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const response = await fetch(`${APP_URL}plans/${planId}/activate`, {
      method: "PATCH",
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
    console.error("Error activando plan:", error);
    throw new Error(error.message || "Error al activar el plan");
  }
};

// Desactivar plan
export const deactivatePlan = async (planId) => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const response = await fetch(`${APP_URL}plans/${planId}/deactivate`, {
      method: "PATCH",
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
    console.error("Error desactivando plan:", error);
    throw new Error(error.message || "Error al desactivar el plan");
  }
};

// ==================== ENTRENADORES ====================

// Cambiar status del entrenador (activar/desactivar)
export const toggleTrainerStatus = async (trainerId) => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const response = await fetch(`${APP_URL}users/trainer/${trainerId}/toggle-status`, {
      method: "PATCH",
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
    console.error("Error cambiando status del entrenador:", error);
    throw new Error(error.message || "Error al cambiar el status del entrenador");
  }
};

// Cambiar verificación del entrenador (verificar/desverificar)
export const toggleTrainerVerification = async (trainerId) => {
  try {
    const token = localStorage.getItem("tokenBlck");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const response = await fetch(`${APP_URL}users/trainer/${trainerId}/toggle-verification`, {
      method: "PATCH",
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
    console.error("Error cambiando verificación del entrenador:", error);
    throw new Error(error.message || "Error al cambiar la verificación del entrenador");
  }
};
