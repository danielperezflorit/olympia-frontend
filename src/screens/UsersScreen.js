import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Modal } from "react-native";
import { useFocusEffect } from "@react-navigation/native"; 
import UserForm from "../components/UserForm";
import UserList from "../components/UserList";
import { fetchUsers, deleteUser } from "../services/userService";
import User from "../models/usermodel.js";

export default function UsersScreen() {
  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  const loadUsers = async () => {
    try {
      const [usersData] = await Promise.all([
        fetchUsers(),
      ]);

      const userInstances = usersData.map(
        (user) =>
          new User(
            user._id,
            user.name,
            user.mail,
            user.password,
            user.team,
            user.competitions,
          )
      );

      setUsers(userInstances);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
  };


  // Usamos useFocusEffect para recargar usuarios cada vez que la pantalla se enfoca
  useFocusEffect(
    React.useCallback(() => {
      loadUsers(); // Cargamos usuarios
    }, [])
  );

  const handleDeleteUser = async (user_id) => {
    try {
      // Llamamos a la función deleteUser para eliminar al usuario de las experiencias y la base de datos
      await deleteUser(user_id);

      // Actualizamos la lista de usuarios después de eliminar
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== user_id));

      // Actualizamos también las experiencias por si hay cambios en los participantes
      loadUsers();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

const handleUpdateUser = async (user_id) => {
    setUserToEdit(user_id);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setUserToEdit(null); // Limpia el equipo a editar
  };
  
  // Función de callback después de agregar/editar
  const handleFormSubmitted = () => {
    handleModalClose();
    loadUsers(); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Usuarios</Text>
      <UserList
        users={users}
        onDeleteUser={handleDeleteUser}
        onUpdateUser={handleUpdateUser}
      />
      <TouchableOpacity style={styles.openButton} onPress={() => {setUserToEdit(null); setModalVisible(true);}}>
        <Text style={styles.buttonText}>Agregar Usuario</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalWrapper}>
          <View style={styles.modalContainer}>
            <UserForm
              userToEdit={userToEdit}
              onUserAdded= {handleFormSubmitted}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleModalClose}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffffff",
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
    color: "#fff",
  },
  openButton: {
    backgroundColor: "#0084C9",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  modalWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#FF3B30",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
  },
});
