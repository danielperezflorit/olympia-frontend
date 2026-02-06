import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, Text, TouchableOpacity, Modal, Image, Dimensions, Platform } from "react-native";
import { useFocusEffect } from "@react-navigation/native"; 
import TeamForm from "../../../components/Team/TeamForm.jsx";
import Admin_TeamList from "../../../components/Team/Admin_TeamList.jsx";
import { fetchTeams, deleteTeam } from "../../../services/teamService.js";
import Team from "../../../models/teammodel.js";
import Admin_GlobalMenu from "../../../components/Admin_GlobalMenu.jsx";
import SearchBar from "../../../components/SearchBar.jsx";

const { width } = Dimensions.get('window');
const isMobile = width < 768;

const FixedHeader = () => {
  const { t } = useTranslation();

  return (
    <View style={headerStyles.headerContainer}>
        <Image 
            style={headerStyles.logo} 
            source={require('../../../../assets/unite!.png')}
        />
        <Text style={headerStyles.title}>{t("teamsscreen.teams_list")}</Text>
    </View>
  );
}

export default function Admin_TeamsScreen({ navigation }) {
  const { t } = useTranslation();
  const [teams, setTeams] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [teamToEdit, setTeamToEdit] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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
            team.university,
            team.competition,
            team.captain,
            team.players,
            team.matches,
            team.wins,
            team.loses,
            team.draws,
          )
      );

      setTeams(teamInstances);
    } catch (error) {
      console.error("Error al cargar equipos:", error);
    }
  };


  useFocusEffect(
    React.useCallback(() => {
      loadTeams(); 
    }, [])
  );

  const handleDeleteTeam = async (team_id) => {
    try {
      await deleteTeam(team_id);

      setTeams((prevTeams) => prevTeams.filter((team) => team._id !== team_id));

      loadTeams();
    } catch (error) {
      console.error("Error al eliminar equipo:", error);
    }
  };

  const handleUpdateTeam = async (team_id) => {
    setTeamToEdit(team_id);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setTeamToEdit(null); 
  };
  
  const handleFormSubmitted = () => {
    handleModalClose();
    loadTeams(); 
  };

  const filteredTeams = teams.filter((team) => {
    const query = searchQuery.toLowerCase();
    return (
      team.getFullName().toLowerCase().includes(query) ||
      team.getUniversity().toLowerCase().includes(query)
    );
  });

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
      <View style={{ marginBottom: 10 }}>
        <SearchBar 
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder= {t("teamsscreen.searchbar_placeholder")}
        />
      </View>
      
      <Admin_TeamList
        teams={filteredTeams}
        onDeleteTeam={handleDeleteTeam}
        onUpdateTeam={handleUpdateTeam}
      />
      <TouchableOpacity style={styles.openButton} onPress={() => {setTeamToEdit(null); setModalVisible(true);}} >
        <Text style={styles.buttonText}>{t("teamsscreen.add_team")}</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
       >
        <View style={styles.modalWrapper}>
        <View style={styles.modalContainer}>
          
          <TeamForm
            teamToEdit={teamToEdit}        
            onTeamAdded={handleFormSubmitted} 
          />
          
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleModalClose} 
          >
            <Text style={styles.closeButtonText}>{t("teamsscreen.close")}</Text>
          </TouchableOpacity>
        </View>
      </View>
      </Modal>
    </View>
  );
}

const headerStyles = StyleSheet.create({
    headerContainer: {
        height: isMobile ? 150 : 100, 
        width: '100%',
        backgroundColor: '#ffffff', 
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'center', 
        paddingTop: isMobile ? 30 : 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1, 
        borderBottomColor: '#eee',
        zIndex: 10, 
        position: 'absolute', 
        top: 0,
        right: 0,
    },
    menuIcon: {
        position: 'absolute', 
        top: isMobile ? 30 : 45, 
        right: 10,
        padding: 5,
        borderRadius: 5,
    },
    menuIconText: {
        fontSize: isMobile ? 24 : 30, 
        top:  isMobile ? 30 : 10,
        fontWeight: 'bold',
        color: '#0084C9',
    },
    menuIconBackgroundActive: {
        backgroundColor: '#0084C9', 
    },
    menuIconTextActive: {
        color: 'white', 
        top:  isMobile ? 30 : 10,
    },
    logo: {
        width: isMobile ? 180 : 300, 
        height: isMobile ? 60 : 80, 
        resizeMode: 'contain',
        position: 'absolute',
        left: isMobile ? 0 : 15,
        top: isMobile ? 40 : 10,
    },    
    title: {
        fontSize: isMobile ? 30: 50,
        color: "#0084C9",
        fontWeight: 'bold',
        textAlign: "center",
        top: isMobile? 20:0,
    },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: isMobile? 150: 120,
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
    marginBottom: 20,
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
