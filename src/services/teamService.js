import axios from "axios";

//const API_URL_TEAM = "http://192.168.0.21:3000/team"; 
//const API_URL_TEAM = "http://192.168.1.38:3000/team";
const API_URL_TEAM = "http://10.5.59.106:3000/team";

// Obtener un equipo por su ID
export const fetchTeamById = async (teamId) => {
  try {
    const response = await axios.get(`${API_URL_TEAM}/${teamId}`);
    return response.data.name; 
  } catch (error) {
    console.error("Error al obtener el equipo", error);
    throw error;
  }
};

// Obtener la lista de todos los equipos
export const fetchTeams = async () => {
  try {
    const response = await axios.get(`${API_URL_TEAM}/all`);
        console.log("Equipos obtenidos:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los Equipos:", error);
    throw error;
  }
};

// Agregar un nuevo equipo
export const addTeam = async (newTeam) => {
  try {
    await axios.post(API_URL_TEAM, newTeam);
  } catch (error) {
    console.error("Error al agregar equipo:", error);
    throw error;
  }
};

export const deleteTeam = async (teamId) => {
  try {
    if (!teamId) {
      throw new Error("El ID del equipo es indefinido");
    }

    // Finalmente eliminamos al usuario de la base de datos
    await axios.delete(`${API_URL_TEAM}/${teamId}`);
  } catch (error) {
    console.error("Error al eliminar equipo:", error);
    throw error;
  }
};

export const updateTeam = async (teamId, updatedTeam) => {
  try {
    if (!teamId) {
      throw new Error("El ID del equipo es indefinido");
    }
    // Finalmente actualizamos al equipo en la base de datos
    await axios.put(`${API_URL_TEAM}/${teamId}`, updatedTeam);
  }catch (error) {
    console.error("Error al actualizar equipo:", error);
    throw error;
  }
}

export const fetchCompetitionRanking = async (competitionId) => {
  try {
    // Usa la ruta del backend: /team/ranking/:competitionId
    const response = await axios.get(`${API_URL_TEAM}/ranking/${competitionId}`);
    return response.data; // El backend ya lo devuelve ordenado
  } catch (error) {
    console.error("Error al obtener la clasificación:", error);
    throw error;
  }
};

