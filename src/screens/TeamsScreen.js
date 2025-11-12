import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Modal, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native"; 
import TeamForm from "../components/TeamForm.jsx";
import TeamList from "../components/TeamList.jsx";
import { fetchTeams, deleteTeam } from "../services/teamService.js";
import Team from "../models/teammodel.js";
import GlobalMenu from "../components/GlobalMenu.jsx";

const FixedHeader = () => (
    <View style={headerStyles.headerContainer}>
        {/* LOGO */}
        <Image 
            style={headerStyles.logo} 
            source={require('../../assets/unite!.png')}
        />
        <Text style={headerStyles.title}>Lista de Equipos</Text>
    </View>
);

export default function TeamsScreen({ navigation }) {
  const [teams, setTeams] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [teamToEdit, setTeamToEdit] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);



  const loadTeams = async () => {
    try {
      const [teamsData] = await Promise.all([
        fetchTeams(),
      ]);

      const teamInstances = teamsData.map(
        (team) =>
          new Team(
            team._id,
            team.name,
            team.competitions,
            team.players,
            team.matches,
            team.wins,
            team.losses,
            team.draws,
          )
      );

      setTeams(teamInstances);
    } catch (error) {
      console.error("Error al cargar equipos:", error);
    }
  };


  // Usamos useFocusEffect para recargar equipos cada vez que la pantalla se enfoca
  useFocusEffect(
    React.useCallback(() => {
      loadTeams(); // Cargamos equipos
    }, [])
  );

  const handleDeleteTeam = async (team_id) => {
    try {
      // Llamamos a la función deleteTeam para eliminar al equipo de la base de datos
      await deleteTeam(team_id);

      // Actualizamos la lista de usuarios después de eliminar
      setTeams((prevTeams) => prevTeams.filter((team) => team._id !== team_id));

      // Actualizamos también las experiencias por si hay cambios en los participantes
      loadTeams();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  const handleUpdateTeam = async (team_id) => {
    setTeamToEdit(team_id);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setTeamToEdit(null); // Limpia el equipo a editar
  };
  
  // Función de callback después de agregar/editar
  const handleFormSubmitted = () => {
    handleModalClose();
    loadTeams(); 
  };

  return (
    <View style={styles.container}>
      <FixedHeader />
      <TouchableOpacity 
      style={[
        headerStyles.menuIcon, 
        { zIndex: 1001 }, 
        isMenuOpen && headerStyles.menuIconBackgroundActive
      ]}
      onPress={toggleMenu}>
        <Text style={[
            headerStyles.menuIconText, 
            isMenuOpen && headerStyles.menuIconTextActive 
            ]}>☰
          </Text> 
          </TouchableOpacity>  
          {isMenuOpen && (
            <GlobalMenu 
              navigation={navigation} 
              onClose={() => setIsMenuOpen(false)}
            />
          )}
      <TeamList
        teams={teams}
        onDeleteTeam={handleDeleteTeam}
        onUpdateTeam={handleUpdateTeam}
      />
      <TouchableOpacity style={styles.openButton} onPress={() => {setTeamToEdit(null); setModalVisible(true);}} >
        <Text style={styles.buttonText}>Agregar Equipo</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
       >
        <View style={styles.modalWrapper}>
        <View style={styles.modalContainer}>
          
          {/* ⬅️ CAMBIO CLAVE: Pasar el objeto a editar y el callback de éxito */}
          <TeamForm
            teamToEdit={teamToEdit}        // Pasa el objeto del equipo si estamos editando (será null si es 'Agregar')
            onTeamAdded={handleFormSubmitted} // Esta función se llama al CREAR o EDITAR
          />
          
          <TouchableOpacity
            style={styles.closeButton}
            // Llama a la función que cierra el modal y limpia el estado teamToEdit
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

const headerStyles = StyleSheet.create({
    headerContainer: {
        height: 100, 
        width: '100%',
        backgroundColor: '#ffffffff', 
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'flex-start', 
        paddingTop: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1, 
        borderBottomColor: '#eee',
        zIndex: 10, 
        // HACEMOS LA CABECERA ABSOLUTA PARA QUE PERMANEZCA FIJA
        position: 'absolute',
        top: 0,
        reight: 0,
    },
    // ✅ ÍCONO AHORA ES ABSOLUTO Y SEPARADO DEL HEADER CONTAINER
    menuIcon: {
        position: 'absolute', // Clave para flotar
        top: 45, // Ajuste para que se vea bien en el header
        right: 10,
        padding: 5,
        borderRadius: 5,
    },
    menuIconText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#0084C9', // Color predeterminado (azul)
    },
    menuIconBackgroundActive: {
        backgroundColor: '#0084C9', 
    },
    menuIconTextActive: {
        color: 'white', 
    },
    logo: {
        width: 300, 
        height: 80, 
        resizeMode: 'contain',
        // Ajustar la posición para evitar el ícono de hamburguesa
        marginLeft: 55, 
    },
    title: {
      position: 'absolute',
      fontSize: 50,
      marginBottom: 10,
      textAlign: "center",
      color: "#0084C9",
      fontWeight: 'bold',
      left: '50%', // Mueve el punto de inicio del elemento al centro horizontal del contenedor padre
      transform: 'translateX(-50%)', // Mueve el elemento hacia la izquierda el 50% de SU PROPIO ancho
  },
});



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 120,
    paddingHorizontal: 20,
    paddingBottom:10,
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
