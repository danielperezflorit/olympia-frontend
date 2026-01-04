import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { addUser, updateUser } from "../../services/userService";
import { fetchUniversities } from "../../services/universityService";
import { fetchTeams } from "../../services/teamService";
import { Picker } from "@react-native-picker/picker";



export default function UserForm({ onUserAdded, userToEdit }) {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [availableUniversities, setAvailableUniversities] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [availableTeams, setAvailableTeams] = useState([]); 
  const [selectedTeam, setSelectedTeam] = useState(""); 
  const [type, setType] = useState("user");

  useEffect(() => {
    async function loadTeams() {
      const teams = await fetchTeams();
      setAvailableTeams(teams);
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
      if (universities.length > 0) {
        setSelectedUniversity(""); 
      }
    }
    loadUniversities();
  }, []);

  useEffect(() => {
      if (userToEdit) {
        setName(userToEdit.name);
        setMail(userToEdit.mail);
        setPassword(userToEdit.password);
        setSelectedUniversity(userToEdit.university || "");
        setSelectedTeam(userToEdit.team || ""); 
        setType(userToEdit.type || "user");
      } else {
        setName("");
        setMail("");
        setPassword("");
        setSelectedUniversity("");
        setSelectedTeam("");
        setType("user");
      }
    }, [userToEdit]);

  const handleSubmit = async () => {
    if (!name || !mail || !password || !selectedUniversity || !selectedTeam) {
        alert("Por favor, introduce unos valores válidos en todos los campos.");
        return;
    }
    try {
      const userData = { name, mail, password, university: selectedUniversity, team: selectedTeam, type };
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
      <Text style={styles.title}>{userToEdit ? t("userform.edit_user") : t("userform.add_user")}</Text>      
      <TextInput
        placeholder= {t("userform.name_placeholder")}
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder= {t("userform.email_placeholder")}
        value={mail}
        onChangeText={setMail}
        style={styles.input}
        keyboardType="email-address"
      />

      <TextInput
        placeholder= {t("userform.password_placeholder")}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true} 
        style={styles.input}
      />

      <Text style={styles.label}>{t("userform.select_university")}:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedUniversity}
            onValueChange={(itemValue) => setSelectedUniversity(itemValue)}
          >
            <Picker.Item label= {t("userform.select_university_placeholder")} value="" />
            {availableUniversities.map(university => (
              <Picker.Item key={university._id}label={university.name} value={university._id} /> 
            ))}
          </Picker>
        </View>

      <Text style={styles.label}> {t("userform.select_team")}:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedTeam}
            onValueChange={(itemValue) => setSelectedTeam(itemValue)}
          >
            <Picker.Item label= {t("userform.select_team_placeholder")} value="" />
            {availableTeams.map(team => (
              <Picker.Item key={team._id}label={team.name} value={team._id} /> 
            ))}
          </Picker>
        </View>
      <Text style={styles.label}>{t("userform.select_role")}:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={type}
            onValueChange={(itemValue) => setType(itemValue)}
          >
            <Picker.Item label="User" value="user" />
            <Picker.Item label="Admin" value="admin" />
            <Picker.Item label="Captain" value="captain" />
            <Picker.Item label="Referee" value="referee" />
          </Picker>
        </View>
      <Button title= {t("userform.send")} onPress={handleSubmit} />
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
