import axios from "axios";

//const API_URL_USER = "http://192.168.0.21:3000/user";
//const API_URL_USER = "http://192.168.1.38:3000/user";
const API_URL_USER = "http://10.5.59.106:3000/user";


// Obtener un usuario por su ID
export const fetchUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_URL_USER}/${userId}`);
    return response.data.name; 
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    throw error;
  }
};

// Obtener la lista de todos los usuarios
export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_URL_USER}/all`);
        console.log("Usuarios obtenidos:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    throw error;
  }
};

// Agregar un nuevo usuario
export const addUser = async (newUser) => {
  try {
    await axios.post(API_URL_USER, newUser);
  } catch (error) {
    console.error("Error al agregar usuario:", error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    if (!userId) {
      throw new Error("El ID del usuario es indefinido");
    }
    // Finalmente eliminamos al usuario de la base de datos
    await axios.delete(`${API_URL_USER}/${userId}`);
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    throw error;
  }
};

export const updateUser = async (userId, updatedUser) => {
  try {
    if (!userId) {
      throw new Error("El ID del equipo es indefinido");
    }
    // Finalmente actualizamos al equipo en la base de datos
    await axios.put(`${API_URL_USER}/${userId}`, updatedUser);
  }catch (error) {
    console.error("Error al actualizar equipo:", error);
    throw error;
  }
}


