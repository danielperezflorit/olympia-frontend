import axios from "axios";

//const API_URL_COMPETITION = "http://192.168.0.21:3000/competition"; 
const API_URL_COMPETITION = "http://192.168.1.41:3000/competition";
//const API_URL_COMPETITION = "http://10.5.59.106:3000/competition";

export const fetchCompetitionById = async (competitionId) => {
  try {
    const response = await axios.get(`${API_URL_COMPETITION}/${competitionId}`);
    return response.data.name; 
  } catch (error) {
    console.error("Error al obtener la competición", error);
    throw error;
  }
};

export const fetchCompetitions = async () => {
  try {
    const response = await axios.get(`${API_URL_COMPETITION}/all`);
        console.log("Competiciónes obtenidas:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las competiciones:", error);
    throw error;
  }
};

export const fetchCompetitionsBySportId = async (sportId) => {
  try {
    const response = await axios.get(`${API_URL_COMPETITION}/sport/${sportId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las competiciones por deporte:", error);
    throw error;
  }
};

export const addCompetition = async (newCompetition) => {
  try {
    await axios.post(API_URL_COMPETITION, newCompetition);
  } catch (error) {
    console.error("Error al agregar competición:", error);
    throw error;
  }
};

export const deleteCompetition = async (competitionId) => {
  try {
    if (!competitionId) {
      throw new Error("El ID de la competición es indefinido");
    }

    await axios.delete(`${API_URL_COMPETITION}/${competitionId}`);
  } catch (error) {
    console.error("Error al eliminar la competición:", error);
    throw error;
  }
};

