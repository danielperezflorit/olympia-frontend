import React, {useState, useEffect, useCallback} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Modal } from 'react-native';
import Admin_GlobalMenu from '../../../components/Admin_GlobalMenu';

import { fetchSportIdByName } from '../../../services/sportService';
import { fetchCompetitionsBySportId } from '../../../services/competitionService';
import { fetchCompetitionRanking } from '../../../services/teamService';
import { fetchMatchesByCompetitionId } from '../../../services/matchService';

import CompetitionSelector from '../../../components/Competition/CompetitionSelector';
import RankingTable from '../../../components/Competition/RankingTable';
import MatchCalendar from '../../../components/Match/MatchCalendar'; 
import MatchForm from '../../../components/Match/MatchForm'; 

const FixedHeader = () => (
    <View style={headerStyles.headerContainer}>
        <Image 
            style={headerStyles.logo} 
            source={require('../../../../assets/unite!.png')}
        />
        <Text style={headerStyles.title}>FÚTBOL</Text>
    </View>
);

export default function Admin_FutbolScreen({ navigation }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false); 
    const [availableCompetitions, setAvailableCompetitions] = useState([]);
    const [selectedCompetitionId, setSelectedCompetitionId] = useState(null);
    const [rankingData, setRankingData] = useState([]);
    const [matchesData, setMatchesData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [isMatchFormVisible, setIsMatchFormVisible] = useState(false); 
    
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const loadCompetitionData = useCallback(async (competitionId) => {
        if (!competitionId) {
            setRankingData([]);
            setMatchesData([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const [ranking, matches] = await Promise.all([
                fetchCompetitionRanking(competitionId),
                fetchMatchesByCompetitionId(competitionId),
            ]);
            
            setRankingData(ranking);
            setMatchesData(matches);
        } catch (e) {
            console.error(`Error al cargar datos de la competición ${competitionId}:`, e);
            setRankingData([]);
            setMatchesData([]);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleDataUpdate = () => {
        setIsMatchFormVisible(false); 
        loadCompetitionData(selectedCompetitionId); 
    };

    useEffect(() => {
        async function loadInitialData() {
            setLoading(true);
            try {
                const footballId = await fetchSportIdByName("FÚTBOL");
                
                if (footballId) {
                    const competitions = await fetchCompetitionsBySportId(footballId);
                    setAvailableCompetitions(competitions);

                    if (competitions.length > 0) {
                        setSelectedCompetitionId(competitions[0]._id);
                    } else {
                        setLoading(false);
                    }
                } else {
                    console.warn("Deporte 'FÚTBOL' no encontrado en la base de datos.");
                    setLoading(false);
                }
            } catch (e) {
                console.error("Error al cargar datos iniciales de Fútbol:", e);
                setLoading(false);
            }
        }
        loadInitialData();
    }, []); 


    useEffect(() => {
        if (selectedCompetitionId) {
            loadCompetitionData(selectedCompetitionId);
        }
    }, [selectedCompetitionId, loadCompetitionData]);


    return (
        <View style={styles.fullContainer}>
            <FixedHeader />
            <TouchableOpacity 
                style={[
                    headerStyles.menuIcon, 
                    { zIndex: 1001 },
                    isMenuOpen && headerStyles.menuIconBackgroundActive 
                ]} 
                onPress={toggleMenu}
            >
                <Text style={[
                    headerStyles.menuIconText, 
                    isMenuOpen && headerStyles.menuIconTextActive 
                ]}>☰</Text> 
            </TouchableOpacity>
            
            {isMenuOpen && (
                <Admin_GlobalMenu 
                    navigation={navigation} 
                    onClose={() => setIsMenuOpen(false)}
                />
            )}
            
            {availableCompetitions.length === 0 && !loading ? (
                <Text style={styles.noDataMessage}>No hay competiciones de Fútbol disponibles.</Text>
            ) : (
                <ScrollView contentContainerStyle={styles.container}>
                    <Text style={styles.sectionTitle}>Seleccionar Competición</Text>
                    <CompetitionSelector
                        competitions={availableCompetitions}
                        selectedId={selectedCompetitionId}
                        onSelect={setSelectedCompetitionId}
                    />

                    <Text style={styles.sectionTitle}>Clasificación</Text>
                    {loading ? <ActivityIndicator size="small" color="#0084C9" /> : <RankingTable ranking={rankingData} />}
                    
                    <Text style={styles.sectionTitle}>Jornadas y Partidos</Text>
                    {loading ? <ActivityIndicator size="small" color="#0084C9" /> : (
                        <MatchCalendar 
                            matches={matchesData} 
                            onDataUpdated={handleDataUpdate} 
                        />
                    )}

                    {selectedCompetitionId && (
                        <View style={styles.adminButtons}>
                            <TouchableOpacity 
                                style={styles.adminButton} 
                                onPress={() => setIsMatchFormVisible(true)} 
                            >
                                <Text style={styles.buttonText}>+ Programar Nuevo Partido</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </ScrollView>
                
            )}
            {loading && availableCompetitions.length > 0 && <ActivityIndicator size="large" color="#0084C9" style={styles.loadingIndicatorOverlay} />}


            <Modal
                animationType="slide"
                transparent={true}
                visible={isMatchFormVisible}
                onRequestClose={() => setIsMatchFormVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <MatchForm
                            competitionId={selectedCompetitionId} 
                            onMatchScheduled={handleDataUpdate}
                        />
                        <TouchableOpacity style={styles.closeButton} onPress={() => setIsMatchFormVisible(false)}>
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
    fullContainer: { flex: 1, backgroundColor: "#ffffffff" },
    container: {
        paddingTop: 120, 
        paddingHorizontal: 15,
        paddingBottom: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0084C9',
        marginTop: 20,
        marginBottom: 10,
    },
    loadingIndicatorOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        zIndex: 1000,
    },
    noDataMessage: {
        textAlign: 'center',
        marginTop: 150,
        fontSize: 18,
        color: '#555',
    },
    adminButtons: {
        marginTop: 20,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    adminButton: {
        backgroundColor: '#4CAF50',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
    },
    closeButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#FF3B30',
        borderRadius: 8,
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});