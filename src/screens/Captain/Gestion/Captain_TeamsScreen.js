import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, Text, TouchableOpacity, Image, Dimensions, Platform } from "react-native";
import { useFocusEffect } from "@react-navigation/native"; 
import Captain_TeamList from "../../../components/Team/Captain_TeamList.jsx";
import { fetchTeamsByCaptain } from "../../../services/teamService.js";
import Team from "../../../models/teammodel.js";
import Captain_GlobalMenu from "../../../components/Captain_GlobalMenu.jsx";
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export default function Captain_TeamsScreen({ navigation }) {
  const { t } = useTranslation();
  const [teams, setTeams] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const loadTeams = async () => {
    try {
      const userInfoString = await AsyncStorage.getItem('userInfo');
      
      if (!userInfoString) {
          console.error("No hay usuario logueado");
          return;
      }

      const userInfo = JSON.parse(userInfoString);
      const captainId = userInfo._id; 

      const teamsData = await fetchTeamsByCaptain(captainId);

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
            team.draws
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
            <Captain_GlobalMenu 
              navigation={navigation} 
              onClose={() => setIsMenuOpen(false)}
            />
          )}
      <Captain_TeamList
        teams={teams}
      />
      
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
    paddingTop: isMobile? 150 : 120,
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
