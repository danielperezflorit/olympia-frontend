import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { addUser, updateUser } from "../../services/userService";
import { fetchUniversities } from "../../services/universityService";
import { fetchTeams } from "../../services/teamService";
import { Picker } from "@react-native-picker/picker";



export default function UserForm({ onUserAdded, userToEdit }) {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [availableUniversities, setAvailableUniversities] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [availableTeams, setAvailableTeams] = useState([]); 
  const [selectedTeam, setSelectedTeam] = useState(""); 
  

  useEffect(() => {
    async function loadTeams() {
      const teams = await fetchTeams();
      setAvailableTeams(teams);
      // Establecer un blanco como preseleccionado por defecto
      if (teams.length > 0) {
        setSelectedTeam(""); 
      }
    }
    loadTeams();
  }, []);

  useEffect(() => {
    async function loadUniversities() {
      const universities = await fetchUniversities();
      setAvailableUniversities(universities);
      // Establecer un blanco como preseleccionado por defecto
      if (universities.length > 0) {
        setSelectedUniversity(""); 
      }
    }
    loadUniversities();
  }, []);

  useEffect(() => {
      if (userToEdit) {
        // MODO EDICIÓN: Carga los datos del objeto
        setName(userToEdit.name);
        setMail(userToEdit.mail);
        setPassword(userToEdit.password);
        setSelectedUniversity(userToEdit.university || "");
        setSelectedTeam(userToEdit.team || ""); 
      } else {
        // MODO CREACIÓN (o modal cerrado): Limpia los campos
        setName("");
        setMail("");
        setPassword("");
        setSelectedUniversity("");
        setSelectedTeam("");
      }
    }, [userToEdit]);

  const handleSubmit = async () => {
    if (!name || !mail || !password || !selectedUniversity || !selectedTeam) {
        alert("Por favor, introduce unos valores válidos en todos los campos.");
        return;
    }
    try {
      const userData = { name, mail, password, university: selectedUniversity, team: selectedTeam };
      if (userToEdit) {
        await updateUser(userToEdit._id, userData); 
      } else {
        await addUser(userData);
      }  
      onUserAdded();
    } catch (error) {
      console.error("Error al agregar usuario:", error);
    }
  };

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Agregar Usuario</Text>
      <TextInput
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        value={mail}
        onChangeText={setMail}
        style={styles.input}
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true} // Para ocultar la contraseña
        style={styles.input}
      />

      <Text style={styles.label}>Seleccionar Universidad:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedUniversity}
            onValueChange={(itemValue) => setSelectedUniversity(itemValue)}
          >
            <Picker.Item label="--- Seleccione una universidad ---" value="" />
            {availableUniversities.map(university => (
              // Usar team._id como valor, y team.name como etiqueta
              <Picker.Item key={university._id}label={university.name} value={university._id} /> 
            ))}
          </Picker>
        </View>

      <Text style={styles.label}>Seleccionar Equipo:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedTeam}
            onValueChange={(itemValue) => setSelectedTeam(itemValue)}
          >
            <Picker.Item label="--- Seleccione un equipo ---" value="" />
            {availableTeams.map(team => (
              // Usar team._id como valor, y team.name como etiqueta
              <Picker.Item key={team._id}label={team.name} value={team._id} /> 
            ))}
          </Picker>
        </View>
      <Button title="Enviar" onPress={handleSubmit} />
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    height: 50, 
    justifyContent: 'center', 
  },
});
