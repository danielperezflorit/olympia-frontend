import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Modal, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native"; 
import CompetitionForm from "../../../components/Competition/CompetitionForm.jsx";
import CompetitionList from "../../../components/Competition/Admin_CompetitionList.jsx";
import { fetchCompetitions, deleteCompetition } from "../../../services/competitionService.js";
import Admin_GlobalMenu from "../../../components/Admin_GlobalMenu.jsx";
import Competition from "../../../models/competitionmodel.js";

const FixedHeader = () => (
    <View style={headerStyles.headerContainer}>
        <Image 
            style={headerStyles.logo} 
            source={require('../../../../assets/unite!.png')}
        />
        <Text style={headerStyles.title}>Lista de Competiciones</Text>
    </View>
);

export default function Admin_CompetitionsScreen({ navigation }) {
  const [competitions, setCompetitions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [competitionToEdit, setCompetitionToEdit] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const loadCompetitions = async () => {
    try {
      const [competitionsData] = await Promise.all([
        fetchCompetitions(),
      ]);

      const competitionInstances = competitionsData.map(
        (competition) =>
          new Competition(
            competition._id,
            competition.name,
            competition.teams,
            competition.sport
          )
      );

      setCompetitions(competitionInstances);
    } catch (error) {
      console.error("Error al cargar competiciones:", error);
    }
  };


  useFocusEffect(
    React.useCallback(() => {
      loadCompetitions(); 
    }, [])
  );

  const handleDeleteCompetition = async (competition_id) => {
    try {
      await deleteCompetition(competition_id);

      setCompetitions((prevCompetitions) => prevCompetitions.filter((competition) => competition._id !== competition_id));

      loadCompetitions();
    } catch (error) {
      console.error("Error al eliminar competición:", error);
    }
  };

  const handleUpdateCompetition = async (competition_id) => {
    setCompetitionToEdit(competition_id);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setCompetitionToEdit(null); 
  };
  
  const handleFormSubmitted = () => {
    handleModalClose();
    loadCompetitions(); 
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
            <Admin_GlobalMenu 
              navigation={navigation} 
              onClose={() => setIsMenuOpen(false)}
            />
          )}
      <CompetitionList
        competitions={competitions}
        onDeleteCompetition={handleDeleteCompetition}
        onUpdateCompetition={handleUpdateCompetition}
      />
      <TouchableOpacity style={styles.openButton} onPress={() => {setCompetitionToEdit(null); setModalVisible(true);}} >
        <Text style={styles.buttonText}>Agregar Competición</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
       >
        <View style={styles.modalWrapper}>
        <View style={styles.modalContainer}>
          
          <CompetitionForm
            competitionToEdit={competitionToEdit}        
            onCompetitionAdded={handleFormSubmitted} 
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
        position: 'absolute',
        top: 0,
        reight: 0,
    },
    menuIcon: {
        position: 'absolute', 
        top: 45,
        right: 10,
        padding: 5,
        borderRadius: 5,
    },
    menuIconText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#0084C9', 
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
        marginLeft: 55, 
    },
    title: {
      position: 'absolute',
      fontSize: 50,
      marginBottom: 10,
      textAlign: "center",
      color: "#0084C9",
      fontWeight: 'bold',
      left: '50%', 
      transform: 'translateX(-50%)',
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
