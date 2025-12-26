import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { addUniversity, updateUniversity } from "../../services/universityService";

export default function UniversityForm({ onUniversityAdded, universityToEdit }) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (universityToEdit) {
      setName(universityToEdit.name);
    } else {
      setName("");
    }
  }, [universityToEdit]);



  const handleSubmit = async () => {
    if (!name) {
        alert("Por favor, introduce un nombre");
        return;
    }
    try {
      const universityData = { name }; 
      if (universityToEdit) {
        await updateUniversity(universityToEdit._id, universityData); 
      } else {
      await addUniversity(universityData);  
    } 
    onUniversityAdded();
    } catch (error) {
      console.error("Error al agregar Universidad:", error);
    } 
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>{universityToEdit ? "Editar Universidad" : "Agregar Universidad"}</Text>
      <TextInput
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      
      <Button title={universityToEdit ? "Guardar Cambios" : "Enviar"} onPress={handleSubmit} />
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
    maxHeight: 200, 
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
        backgroundColor: '#e6f7ff', 
    },
    competitionItemText: {
        fontSize: 16,
    },
});
