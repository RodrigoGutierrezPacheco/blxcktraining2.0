import { apiCallWithTokenCheck } from '../utils/tokenUtils';

export const exercisesService = {
  // Obtener todos los ejercicios
  async getAllExercises(token) {
    try {
      const response = await apiCallWithTokenCheck('/exercises', {
        method: 'GET',
      }, token);

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching exercises:', error);
      throw error;
    }
  },

  // Crear un nuevo ejercicio
  async createExercise(token, exerciseData) {
    try {
      const response = await apiCallWithTokenCheck('/exercises', {
        method: 'POST',
        body: JSON.stringify({
          name: exerciseData.name,
          description: exerciseData.description,
          imageId: exerciseData.imageId,
          muscleGroupId: exerciseData.muscleGroupId,
        }),
      }, token);

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating exercise:', error);
      throw error;
    }
  },

  // Actualizar un ejercicio existente
  async updateExercise(token, id, exerciseData) {
    try {
      const response = await fetch(`${API_BASE_URL}/exercises/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: exerciseData.name,
          muscle_group: exerciseData.muscleGroup,
          difficulty: exerciseData.difficulty,
          equipment: exerciseData.equipment,
          description: exerciseData.description,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating exercise:', error);
      throw error;
    }
  },

  // Actualizar un ejercicio con imagen
  async updateExerciseWithImage(token, id, exerciseData) {
    try {
      const response = await fetch(`${API_BASE_URL}/exercises/${id}/with-image`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: exerciseData.name,
          description: exerciseData.description,
          muscleGroupId: exerciseData.muscleGroupId,
          imagePath: exerciseData.imagePath,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating exercise with image:', error);
      throw error;
    }
  },

  // Eliminar un ejercicio
  async deleteExercise(token, id) {
    try {
      const response = await fetch(`${API_BASE_URL}/exercises/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return true;
    } catch (error) {
      console.error('Error deleting exercise:', error);
      throw error;
    }
  },

  // Obtener un ejercicio específico por ID
  async getExerciseById(token, id) {
    try {
      const response = await fetch(`${API_BASE_URL}/exercises/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching exercise by ID:', error);
      throw error;
    }
  },

  // Obtener ejercicios por grupo muscular
  async getExercisesByMuscleGroup(token, muscleGroupId) {
    try {
      const response = await fetch(`${API_BASE_URL}/muscle-groups/${muscleGroupId}/exercises`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching exercises by muscle group:', error);
      throw error;
    }
  },

  // Desasignar imagen de un ejercicio
  async unassignImage(token, exerciseId, imageId) {
    try {
      const response = await fetch(`${API_BASE_URL}/exercises/unassign-image`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          exerciseId: exerciseId,
          imageId: imageId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("data", data)
      return data;
    } catch (error) {
      console.error('Error unassigning image from exercise:', error);
      throw error;
    }
  },

  // Obtener carpetas de ejercicios
  async getExerciseFolders(token) {
    try {
      const response = await apiCallWithTokenCheck('/exercises/folders', {
        method: 'GET',
      }, token);

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching exercise folders:', error);
      throw error;
    }
  },

  // Obtener ejercicios de una carpeta específica
  async getExercisesByFolder(token, folderId) {
    try {
      const response = await apiCallWithTokenCheck(`/exercises/folders/${folderId}/exercises`, {
        method: 'GET',
      }, token);

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching exercises by folder:', error);
      throw error;
    }
  },

  // Obtener imagen de un ejercicio específico
  async getExerciseImage(token, exerciseId) {
    try {
      const response = await apiCallWithTokenCheck(`/exercises/${exerciseId}/image`, {
        method: 'GET',
      }, token);

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching exercise image:', error);
      throw error;
    }
  },
};
