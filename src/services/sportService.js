import axios from "axios";

//const API_URL_SPORT = "http://192.168.0.21:3000/sport";
const API_URL_SPORT = "http://192.168.1.41:3000/sport";
//const API_URL_SPORT = "http://10.5.59.106:3000/sport";

export const fetchSportById = async (sportId) => {
  try {
    const response = await axios.get(`${API_URL_SPORT}/${sportId}`);
    return response.data.name; 
  } catch (error) {
    console.error("Error al obtener el deporte", error);
    throw error;
  }
};

export const fetchSportIdByName = async (name) => {
  try {
    const response = await axios.get(`${API_URL_SPORT}/all`);
    const sport = response.data.find(s => s.name.toUpperCase() === name.toUpperCase());
    return sport ? sport._id : null; 
  } catch (error) {
    console.error(`Error al obtener el ID del deporte ${name}:`, error);
    throw error;
  }
};

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

    await axios.delete(`${API_URL_SPORT}/${sportId}`);
  } catch (error) {
    console.error("Error al eliminar el deporte:", error);
    throw error;
  }
};

