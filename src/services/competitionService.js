import axios from "axios";

const API_URL_COMPETITION = "http://192.168.0.21:3000/competition"; 

// Obtener un competicion por su ID
export const fetchCompetitionById = async (competitionId) => {
  try {
    const response = await axios.get(`${API_URL_COMPETITION}/${competitionId}`);
    return response.data.name; 
  } catch (error) {
    console.error("Error al obtener la competición", error);
    throw error;
  }
};

// Obtener la lista de todas las competiciones
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

// Agregar un nuevo equipo
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

    // Finalmente eliminamos al usuario de la base de datos
    await axios.delete(`${API_URL_COMPETITION}/${competitionId}`);
  } catch (error) {
    console.error("Error al eliminar la competición:", error);
    throw error;
  }
};

