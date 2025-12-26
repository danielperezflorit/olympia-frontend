import axios from "axios";

//const API_URL_UNIVERSITY = "http://192.168.0.21:3000/university";
const API_URL_UNIVERSITY = "http://192.168.1.41:3000/university";
//const API_URL_UNIVERSITY = "http://10.5.59.106:3000/university";


export const fetchUniversityById = async (universityId) => {
  try {
    const response = await axios.get(`${API_URL_UNIVERSITY}/${universityId}`);
    return response.data.name; 
  } catch (error) {
    console.error("Error al obtener el equipo", error);
    throw error;
  }
};

export const fetchUniversities = async () => {
  try {
    const response = await axios.get(`${API_URL_UNIVERSITY}/all`);
        console.log("Universidades obtenidas:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los Equipos:", error);
    throw error;
  }
};

export const addUniversity = async (newUniversity) => {
  try {
    await axios.post(API_URL_UNIVERSITY, newUniversity);
  } catch (error) {
    console.error("Error al agregar Universidad:", error);
    throw error;
  }
};

export const deleteUniversity = async (universityId) => {
  try {
    if (!universityId) {
      throw new Error("El ID de la universidad es indefinido");
    }

    await axios.delete(`${API_URL_UNIVERSITY}/${universityId}`);
  } catch (error) {
    console.error("Error al eliminar universidad:", error);
    throw error;
  }
};

export const updateUniversity = async (universityId, updatedUniversity) => {
  try {
    if (!universityId) {
      throw new Error("El ID del equipo es indefinido");
    }
    await axios.put(`${API_URL_UNIVERSITY}/${universityId}`, updatedUniversity);
  }catch (error) {
    console.error("Error al actualizar universidad:", error);
    throw error;
  }
}

