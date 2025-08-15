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
