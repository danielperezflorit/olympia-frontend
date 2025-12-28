import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native"; 
import Captain_TeamList from "../../../components/Team/Captain_TeamList.jsx";
import { fetchTeamsByCaptain } from "../../../services/teamService.js";
import Team from "../../../models/teammodel.js";
import Captain_GlobalMenu from "../../../components/Captain_GlobalMenu.jsx";
import AsyncStorage from '@react-native-async-storage/async-storage';

const FixedHeader = () => (
    <View style={headerStyles.headerContainer}>
        <Image 
            style={headerStyles.logo} 
            source={require('../../../../assets/unite!.png')}
        />
        <Text style={headerStyles.title}>Lista de Equipos</Text>
    </View>
);

export default function Captain_TeamsScreen({ navigation }) {
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
            team.losses,
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
