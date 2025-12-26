import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

//const API_URL_USER = "http://192.168.0.21:3000/user";
const API_URL_USER = "http://192.168.1.41:3000/user";
//const API_URL_USER = "http://10.5.59.106:3000/user";


export const fetchUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_URL_USER}/${userId}`);
    return response.data.name; 
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    throw error;
  }
};

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
    await axios.put(`${API_URL_USER}/${userId}`, updatedUser);
  }catch (error) {
    console.error("Error al actualizar equipo:", error);
    throw error;
  }
}

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL_USER}/login`, credentials);
    
    if (response.data.token) {
        await AsyncStorage.setItem('userToken', response.data.token);
        await AsyncStorage.setItem('userInfo', JSON.stringify(response.data.user));
    }

    return response.data;
  } catch (error) {
    console.error("Error en login:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    try {
        await axios.post(`${API_URL_USER}/logOut`);
    } catch (backendError) {
        console.warn("El backend no respondió al logout, pero cerraremos sesión localmente.");
    }

    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userInfo');

    console.log("Sesión cerrada localmente");
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    throw error;
  }
};
