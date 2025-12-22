// src/services/matchService.js

import axios from "axios";

// Ajusta esta URL si es diferente
//const API_URL_MATCH = "http://192.168.0.21:3000/match";
//const API_URL_MATCH = "http://192.168.1.38:3000/match";
const API_URL_MATCH = "http://10.5.59.106:3000/match";



/**
 * Agrega un nuevo partido (Programación).
 * Llama a POST /match
 */
export const addMatch = async (newMatch) => {
  try {
    const response = await axios.post(API_URL_MATCH, newMatch);
    return response.data;
  } catch (error) {
    console.error("Error al programar el partido:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Obtiene todos los partidos de una competición específica.
 * Llama a GET /match/competition/:competitionId
 */
export const fetchMatchesByCompetitionId = async (competitionId) => {
  try {
    const response = await axios.get(`${API_URL_MATCH}/competition/${competitionId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los partidos por competición:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Registra el resultado de un partido.
 * Llama a PUT /match/:id/result
 */
export const updateMatchResult = async (matchId, scoreLocal, scoreVisitor) => {
  try {
    const body = { scoreLocal, scoreVisitor };
    const response = await axios.put(`${API_URL_MATCH}/${matchId}/result`, body); 
    return response.data;
  } catch (error) {
    console.error("Error al registrar el resultado:", error.response?.data || error.message);
    throw error;
  }
};
