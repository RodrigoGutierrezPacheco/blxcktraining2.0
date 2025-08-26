const API_BASE_URL = 'http://localhost:8000';

export const muscleGroupsService = {
  // Obtener todos los grupos musculares
  async getAllMuscleGroups(token) {
    try {
      const response = await fetch(`${API_BASE_URL}/muscle-groups`, {
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
      console.error('Error fetching muscle groups:', error);
      throw error;
    }
  },

  // Crear un nuevo grupo muscular
  async createMuscleGroup(token, muscleGroupData) {
    try {
      const response = await fetch(`${API_BASE_URL}/muscle-groups`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: muscleGroupData.name,
          description: muscleGroupData.description,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating muscle group:', error);
      throw error;
    }
  },

  // Actualizar un grupo muscular existente
  async updateMuscleGroup(token, id, muscleGroupData) {
    try {
      const response = await fetch(`${API_BASE_URL}/muscle-groups/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: muscleGroupData.name,
          description: muscleGroupData.description,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating muscle group:', error);
      throw error;
    }
  },

  // Activar/desactivar un grupo muscular
  async toggleMuscleGroupStatus(token, id, isActive) {
    try {
      const response = await fetch(`${API_BASE_URL}/muscle-groups/${id}/toggle-status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          is_active: isActive,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error toggling muscle group status:', error);
      throw error;
    }
  },

  // Eliminar un grupo muscular
  async deleteMuscleGroup(token, id) {
    try {
      const response = await fetch(`${API_BASE_URL}/muscle-groups/${id}`, {
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
      console.error('Error deleting muscle group:', error);
      throw error;
    }
  },

  // Obtener un grupo muscular específico por ID
  async getMuscleGroupById(token, id) {
    try {
      const response = await fetch(`${API_BASE_URL}/muscle-groups/${id}`, {
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
      console.error('Error fetching muscle group by ID:', error);
      throw error;
    }
  },
};
