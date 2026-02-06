import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, Text, TouchableOpacity, Modal, Image, Dimensions, Platform } from "react-native";
import { useFocusEffect } from "@react-navigation/native"; 
import UniversityForm from "../../../components/University/UniversityForm.jsx";
import UniversityList from "../../../components/University/UniversityList.jsx";
import { fetchUniversities, deleteUniversity } from "../../../services/universityService.js";
import University from "../../../models/universitymodel.js";
import Admin_GlobalMenu from "../../../components/Admin_GlobalMenu.jsx";

const { width } = Dimensions.get('window');
const isMobile = width < 768;


const FixedHeader = () => {
  const { t } = useTranslation();
  return(
    <View style={headerStyles.headerContainer}>
        <Image 
            style={headerStyles.logo} 
            source={require('../../../../assets/unite!.png')}
        />
        <Text style={headerStyles.title}> {t("universitiesscreen.universities_list")} </Text>
    </View>
);}
  

export default function Admin_UniversitiesScreen({ navigation }) {
  const { t } = useTranslation();
  const [universities, setUniversities] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [universityToEdit, setUniversityToEdit] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const loadUniversities = async () => {
    try {
      const [universitiesData] = await Promise.all([
        fetchUniversities(),
      ]);

      const universityInstances = universitiesData.map(
        (university) =>
          new University(
            university._id,
            university.name,
            university.sports,
            university.competitions,
            university.teams,         
            university.players,       
            university.matches,
            university.wins,
            university.loses,
            university.draws,
          )
      );

      setUniversities(universityInstances);
    } catch (error) {
      console.error("Error al cargar uinversidades:", error);
    }
  };


  useFocusEffect(
    React.useCallback(() => {
      loadUniversities();
    }, [])
  );

  const handleDeleteUniversity = async (university_id) => {
    try {
      await deleteUniversity(university_id);

      setUniversities((prevUniversities) => prevUniversities.filter((university) => university._id !== university_id));

      loadUniversities();
    } catch (error) {
      console.error("Error al eliminar Universidad:", error);
    }
  };

  const handleUpdateUniversity = async (university_id) => {
    setUniversityToEdit(university_id);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setUniversityToEdit(null); 
  };
  
  const handleFormSubmitted = () => {
    handleModalClose();
    loadUniversities(); 
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
      <UniversityList
        universities={universities}
        onDeleteUniversity={handleDeleteUniversity}
        onUpdateUniversity={handleUpdateUniversity}
      />
      <TouchableOpacity style={styles.openButton} onPress={() => {setUniversityToEdit(null); setModalVisible(true);}} >
        <Text style={styles.buttonText}>{t("universitiesscreen.add_university")}</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
       >
        <View style={styles.modalWrapper}>
        <View style={styles.modalContainer}>
          
          <UniversityForm
            universityToEdit={universityToEdit}        
            onUniversityAdded={handleFormSubmitted}
          />
          
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleModalClose} 
          >
            <Text style={styles.closeButtonText}>{t("universitiesscreen.close")}</Text>
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
