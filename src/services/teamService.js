import axios from "axios";

//const API_URL_TEAM = "http://192.168.0.21:3000/team"; 
const API_URL_TEAM = "http://192.168.1.41:3000/team";
//const API_URL_TEAM = "http://10.5.59.106:3000/team";

export const fetchTeamById = async (teamId) => {
  try {
    const response = await axios.get(`${API_URL_TEAM}/${teamId}`);
    return response.data.name; 
  } catch (error) {
    console.error("Error al obtener el equipo", error);
    throw error;
  }
};

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
    await axios.put(`${API_URL_TEAM}/${teamId}`, updatedTeam);
  }catch (error) {
    console.error("Error al actualizar equipo:", error);
    throw error;
  }
}

export const fetchCompetitionRanking = async (competitionId) => {
  try {
    const response = await axios.get(`${API_URL_TEAM}/ranking/${competitionId}`);
    return response.data; 
  } catch (error) {
    console.error("Error al obtener la clasificación:", error);
    throw error;
  }
};

