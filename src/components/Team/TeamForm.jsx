import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { addTeam, updateTeam } from "../../services/teamService";
import { fetchCompetitions } from "../../services/competitionService";
import { fetchUniversities } from "../../services/universityService";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

export default function TeamForm({ onTeamAdded, teamToEdit }) {
  const [name, setName] = useState("");
  const [availableCompetitions, setAvailableCompetitions] = useState([]); 
  const [selectedCompetition, setSelectedCompetition] = useState("");
  const [availableUniversities, setAvailableUniversities] = useState([]); 
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    
    async function loadCompetitions() {
      try {
        const competitions = await fetchCompetitions();
        setAvailableCompetitions(competitions);
        if (competitions.length > 0 && !teamToEdit) {
          setSelectedCompetition("");
        }
      } catch (e) {
         console.error("Error al cargar competiciones:", e);
      }
    }

    async function loadUniversities() {
      try {
        const universities = await fetchUniversities();
        setAvailableUniversities(universities);
        if (universities.length > 0 && !teamToEdit) {
          setSelectedUniversity("");
        }
      } catch (e) {
         console.error("Error al cargar universidades:", e);
      }
    }
    loadCompetitions();
    loadUniversities();
  }, []);

  useEffect(() => {
    if (teamToEdit) {
      // MODO EDICIÓN: Carga los datos del objeto
      setName(teamToEdit.name);
      // Asegúrate de que la competición seleccionada es el ID
      setSelectedCompetition(teamToEdit.competition || ""); 
      setSelectedUniversity(teamToEdit.universities || "");
    } else {
      // MODO CREACIÓN (o modal cerrado): Limpia los campos
      setName("");
      setSelectedCompetition("");
      setSelectedUniversity("");
    }
  }, [teamToEdit]);

  const handleSelectUniversity = (universityId) => {
    setSelectedUniversity(prevId => (prevId === universityId ? "" : universityId));
  };
  
  const handleSelectCompetition = (competitionId) => {
    setSelectedCompetition(prevId => (prevId === competitionId ? "" : competitionId));
  };

  const handleSubmit = async () => {
    if (!name || !selectedUniversity) {
        alert("Por favor, introduce un nombre y selecciona una universidad.");
        return;
    }
    
    if (isSubmitting) return;
    setIsSubmitting(true);

    const competitionToSend = selectedCompetition === "" ? null : selectedCompetition; 
    try {
      const teamData = { name, competition: competitionToSend, university: selectedUniversity }; 
      if (teamToEdit) {
        await updateTeam(teamToEdit._id, teamData); 
      } else {
      await addTeam(teamData);  
    } 
    onTeamAdded();
    } catch (error) {
      console.error("Error al agregar equipo:", error);
      setIsSubmitting(false);
    } 
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>{teamToEdit ? "Editar Equipo" : "Agregar Equipo"}</Text>
      <TextInput
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      {/* --- SELECCIÓN DE UNIVERSIDAD (ÚNICA) --- */}
      <Text style={styles.label}>Seleccionar Universidad:</Text> 
      <ScrollView style={styles.multiSelectContainer}>
        {availableUniversities.map(university => {
            // 👈 CAMBIO: Comprueba si la ID de la universidad coincide con la ID seleccionada
            const isSelected = selectedUniversity === university._id;
            
            return (
              <TouchableOpacity 
                key={university._id} 
                // 👈 CAMBIO: Usamos la nueva función handleSelectUniversity
                onPress={() => handleSelectUniversity(university._id)} 
                style={[
                    styles.universityItem,
                    isSelected && styles.universityItemSelected 
                ]}
              >
                <Text style={styles.universityItemText}>
                    {/* Indicador visual de selección */}
                    {/* 💡 Nota: Puedes usar un círculo (●) para indicar selección única */}
                    {isSelected ? '● ' : '○ '}
                    {university.name}
                </Text>
              </TouchableOpacity>
            );
        })}
      </ScrollView>


      {/* --- SELECCIÓN DE COMPETICIÓN (ÚNICA) --- */}
      <Text style={styles.label}>Seleccionar Competición:</Text> 
      <ScrollView style={styles.multiSelectContainer}>
        {availableCompetitions.map(competition => {
            // 👈 CAMBIO: Comprueba si la ID de la competición coincide con la ID seleccionada
            const isSelected = selectedCompetition === competition._id;
            
            return (
              <TouchableOpacity 
                key={competition._id} 
                // 👈 CAMBIO: Usamos la nueva función handleSelectCompetition
                onPress={() => handleSelectCompetition(competition._id)}
                style={[
                    styles.competitionItem,
                    isSelected && styles.competitionItemSelected 
                ]}
              >
                <Text style={styles.competitionItemText}>
                    {/* Indicador visual de selección */}
                    {isSelected ? '● ' : '○ '}
                    {competition.name}
                </Text>
              </TouchableOpacity>
            );
        })}
      </ScrollView>
      
      <Button 
        title={teamToEdit ? "Guardar Cambios" : "Enviar"}
        onPress={handleSubmit}
        disabled={isSubmitting}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  multiSelectContainer: {
    maxHeight: 200, // Limita la altura para que sea scrollable
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  competitionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  competitionItemSelected: {
        backgroundColor: '#e6f7ff', // Un color más claro para indicar selección
    },
    competitionItemText: {
        fontSize: 16,
    },
});
