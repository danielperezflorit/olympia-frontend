import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { addCompetition, updateCompetition } from "../../services/competitionService";
import { fetchSports } from "../../services/sportService";
  import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

export default function CompetitionForm({ onCompetitionAdded, competitionToEdit }) {
  const [name, setName] = useState("");
  const [selectedSport, setSelectedSport] = useState("");
  const [availableSports, setAvailableSports] = useState([]); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadSports() {
      try {
        const sports = await fetchSports();
        setAvailableSports(sports);
        if (sports.length > 0 && !competitionToEdit) {
          setSelectedSport("");
        }
      } catch (e) {
         console.error("Error al cargar competiciones:", e);
      }
    }
    loadSports();
  }, []);

  useEffect(() => {
    if (competitionToEdit) {
      // MODO EDICIÓN: Carga los datos del objeto
      setName(competitionToEdit.name);
      // Asegúrate de que la competición seleccionada es el ID
      setSelectedSport(competitionToEdit.sport || ""); 
    } else {
      // MODO CREACIÓN (o modal cerrado): Limpia los campos
      setName("");
      setSelectedSport("");
    }
  }, [competitionToEdit]);

  const handleSelectSport = (sportId) => {
    setSelectedSport(prevId => (prevId === sportId ? "" : sportId));
  };

  const handleSubmit = async () => {
    if (!name || !selectedSport) {
        alert("Por favor, introduce un nombre y selecciona un deporte.");
        return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    const sportToSend = selectedSport === "" ? null : selectedSport; 
    try {
      const competitionData = { name, sport: sportToSend }; 
      if (competitionToEdit) {
        await updateCompetition(competitionToEdit._id, competitionData); 
      } else {
      await addCompetition(competitionData);  
    } 
    onCompetitionAdded();
    } catch (error) {
      console.error("Error al agregar Competición:", error);
      setIsSubmitting(false);
    } 
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>{competitionToEdit ? "Editar Competición" : "Agregar Competición"}</Text>
      <TextInput
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      {/* --- SELECCIÓN DE Deporte (ÚNICA) --- */}
      <Text style={styles.label}>Seleccionar Deporte:</Text> 
      <ScrollView style={styles.multiSelectContainer}>
        {availableSports.map(sport => {
            // 👈 CAMBIO: Comprueba si la ID del deporte coincide con la ID seleccionada
            const isSelected = selectedSport === sport._id;
            
            return (
              <TouchableOpacity 
                key={sport._id} 
                // 👈 CAMBIO: Usamos la nueva función handleSelectsport
                onPress={() => handleSelectSport(sport._id)} 
                style={[
                    styles.sportItem,
                    isSelected && styles.sportItemSelected 
                ]}
              >
                <Text style={styles.sportItemText}>
                    {/* Indicador visual de selección */}
                    {/* 💡 Nota: Puedes usar un círculo (●) para indicar selección única */}
                    {isSelected ? '● ' : '○ '}
                    {sport.name}
                </Text>
              </TouchableOpacity>
            );
        })}
      </ScrollView>
      
      <Button 
        title={competitionToEdit ? "Guardar Cambios" : "Enviar"} 
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
