const APP_URL = import.meta.env.VITE_API_URL;

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
      throw new Error(data.message || 'Error al registrar usuario');
    }

    return data;
  } catch (error) {
    console.log("error backend", error);
    throw new Error(error.message || 'Error de conexión');
  }
};