import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { addTeam, updateTeam } from "../services/teamService";
import { fetchCompetitions } from "../services/competitionService";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

export default function TeamForm({ onTeamAdded, teamToEdit }) {
  const [name, setName] = useState("");
  const [availableCompetitions, setAvailableCompetitions] = useState([]); 
  const [selectedCompetitions, setSelectedCompetitions] = useState([]);

  useEffect(() => {
    async function loadCompetitions() {
      try {
        const competitions = await fetchCompetitions();
        setAvailableCompetitions(competitions);
        if (competitions.length > 0 && !teamToEdit) {
          setSelectedCompetitions("");
        }
      } catch (e) {
         console.error("Error al cargar competiciones:", e);
      }
    }
    loadCompetitions();
  }, []);

  useEffect(() => {
    if (teamToEdit) {
      // MODO EDICIÓN: Carga los datos del objeto
      setName(teamToEdit.name);
      // Asegúrate de que la competición seleccionada es el ID
      setSelectedCompetitions(teamToEdit.competitions || ""); 
    } else {
      // MODO CREACIÓN (o modal cerrado): Limpia los campos
      setName("");
      setSelectedCompetitions("");
    }
  }, [teamToEdit]);

  const toggleCompetition = (competitionId) => {
    setSelectedCompetitions(prevIds => {
      if (prevIds.includes(competitionId)) {
        // Si ya está seleccionado, lo quitamos (deseleccionar)
        return prevIds.filter(id => id !== competitionId);
      } else {
        // Si no está seleccionado, lo añadimos (seleccionar)
        return [...prevIds, competitionId];
      }
    });
  };

  const handleSubmit = async () => {
    if (!name || !selectedCompetitions) {
        alert("Por favor, introduce un nombre y selecciona una competición.");
        return;
    }
    try {
      const teamData = { name, competitions: selectedCompetitions }; 
      if (teamToEdit) {
        await updateTeam(teamToEdit._id, teamData); 
      } else {
      await addTeam(teamData);  
    } 
    onTeamAdded();
    } catch (error) {
      console.error("Error al agregar equipo:", error);
    } 
  }

  /*return (
    <View style={styles.form}>
      <Text style={styles.title}>{teamToEdit ? "Editar Equipo" : "Agregar Equipo"}</Text>
      <TextInput
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      

      <Text style={styles.label}>Seleccionar Competición:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCompetitions}
          onValueChange={(itemValue) => setSelectedCompetitions(itemValue)}
        >
          {/* ✅ AÑADIDO: Opción de "Seleccione..." con valor "" }
          <Picker.Item label="--- Seleccione una Competición ---" value="" enabled={false} />
          
          {availableCompetitions.map(competitions => (
            <Picker.Item 
                key={competitions._id} 
                label={competitions.name} 
                value={competitions._id} // Valor es el ID
            /> 
          ))}
        </Picker>
      </View>
      
      <Button title={teamToEdit ? "Guardar Cambios" : "Enviar"} onPress={handleSubmit} />
    </View>
  );*/

  return (
    <View style={styles.form}>
      <Text style={styles.title}>{teamToEdit ? "Editar Equipo" : "Agregar Equipo"}</Text>
      <TextInput
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <Text style={styles.label}>Seleccionar Competiciones:</Text> 
      
      {/* 👈 CAMBIO CLAVE: Usamos ScrollView para la lista de selección */}
      <ScrollView style={styles.multiSelectContainer}>
        {availableCompetitions.map(competition => {
            // Comprueba si la competición actual está seleccionada
            const isSelected = selectedCompetitions.includes(competition._id);
            
            return (
              <TouchableOpacity 
                key={competition._id} 
                onPress={() => toggleCompetition(competition._id)}
                style={[
                    styles.competitionItem,
                    // Aplica un estilo diferente si está seleccionado
                    isSelected && styles.competitionItemSelected 
                ]}
              >
                <Text style={styles.competitionItemText}>
                    {/* Indicador visual de selección */}
                    {isSelected ? '✅ ' : '◻️ '}
                    {competition.name}
                </Text>
              </TouchableOpacity>
            );
        })}
      </ScrollView>
      
      <Button title={teamToEdit ? "Guardar Cambios" : "Enviar"} onPress={handleSubmit} />
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
