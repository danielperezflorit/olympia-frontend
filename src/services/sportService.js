import axios from "axios";

const API_URL_SPORT = "http://192.168.0.21:3000/sport"; 

// Obtener un deporte por su ID
export const fetchSportById = async (sportId) => {
  try {
    const response = await axios.get(`${API_URL_SPORT}/${sportId}`);
    return response.data.name; 
  } catch (error) {
    console.error("Error al obtener el deporte", error);
    throw error;
  }
};

// Obtener la lista de todos los deportes
export const fetchSports = async () => {
  try {
    const response = await axios.get(`${API_URL_SPORT}/all`);
        console.log("Deportes obtenidos:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los deportes:", error);
    throw error;
  }
};

// Agregar un nuevo equipo
export const addSport = async (newSport) => {
  try {
    await axios.post(API_URL_SPORT, newSport);
  } catch (error) {
    console.error("Error al agregar deporte:", error);
    throw error;
  }
};

export const deleteSport = async (sportId) => {
  try {
    if (!sportId) {
      throw new Error("El ID de deporte es indefinido");
    }

    // Finalmente eliminamos al usuario de la base de datos
    await axios.delete(`${API_URL_SPORT}/${sportId}`);
  } catch (error) {
    console.error("Error al eliminar el deporte:", error);
    throw error;
  }
};

