const APP_URL = import.meta.env.VITE_API_URL;

export const imagesService = {
  getByFolder: async () => {
    try {
      const response = await fetch(`${APP_URL}media-assets/by-folder`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await safeJson(response);
        throw new Error(
          (errorData && errorData.message) || `Error ${response.status}: ${response.statusText}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching images by folder:", error);
      throw new Error(error.message || "Error al obtener las imágenes");
    }
  },
  getMissing: async (root) => {
    try {
      const query = root ? `?root=${encodeURIComponent(root)}` : "";
      const response = await fetch(`${APP_URL}media-assets/missing${query}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await safeJson(response);
        throw new Error(
          (errorData && errorData.message) || `Error ${response.status}: ${response.statusText}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching missing images:", error);
      throw new Error(error.message || "Error al obtener imágenes faltantes");
    }
  },
  upsert: async (payload) => {
    try {
      const response = await fetch(`${APP_URL}media-assets/upsert`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await safeJson(response);
        throw new Error(
          (errorData && errorData.message) || `Error ${response.status}: ${response.statusText}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error upserting image:", error);
      throw new Error(error.message || "Error al guardar la imagen");
    }
  },
};

async function safeJson(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}


