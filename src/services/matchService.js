import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL_MATCH = "http://192.168.0.14:3000/match";
//const API_URL_MATCH = "http://192.168.1.43:3000/match";
//const API_URL_MATCH = "http://10.5.59.106:3000/match";
//const API_URL_MATCH = "http://10.35.187.135:3000/match";

const getAuthHeader = async () => {
    const token = await AsyncStorage.getItem('userToken');
    return { 'auth-token': token };
};

export const addMatch = async (newMatch) => {
  try {
    const headers = await getAuthHeader();
    const response = await axios.post(API_URL_MATCH, newMatch, { headers });
    return response.data;
  } catch (error) {
    console.error("Error al programar el partido:", error.response?.data || error.message);
    throw error;
  }
};

export const fetchMatchesByCompetitionId = async (competitionId) => {
  try {
    const response = await axios.get(`${API_URL_MATCH}/competition/${competitionId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los partidos por competición:", error.response?.data || error.message);
    throw error;
  }
};

export const updateMatchResult = async (matchId, scoreLocal, scoreVisitor) => {
  try {
    const body = { scoreLocal, scoreVisitor };
    const headers = await getAuthHeader();

    const response = await axios.put(
        `${API_URL_MATCH}/${matchId}/result`, 
        body, 
        { headers } 
    );    return response.data;
  } catch (error) {
    console.error("Error al registrar el resultado:", error.response?.data || error.message);
    throw error;
  }
};
