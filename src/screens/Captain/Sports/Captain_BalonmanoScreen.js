import React, {useState, useEffect, useCallback} from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Modal, Dimensions, Platform } from 'react-native';
import Captain_GlobalMenu from '../../../components/Captain_GlobalMenu.jsx';
import { fetchSportIdByName } from '../../../services/sportService.js';
import { fetchCompetitionsBySportId } from '../../../services/competitionService.js';
import { fetchCompetitionRanking } from '../../../services/teamService.js';
import { fetchMatchesByCompetitionId } from '../../../services/matchService.js';
import CompetitionSelector from '../../../components/Competition/CompetitionSelector.jsx';
import RankingTable from '../../../components/Competition/RankingTable.jsx';
import MatchCalendar from '../../../components/Match/MatchCalendar.jsx'; 
import MatchForm from '../../../components/Match/MatchForm.jsx';
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
        <Text style={headerStyles.title}>{t("sport.handball")}</Text>
    </View>
    );
}

export default function Captain_FutbolScreen({ navigation }) {
    const { t } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false); 
    const [availableCompetitions, setAvailableCompetitions] = useState([]);
    const [selectedCompetitionId, setSelectedCompetitionId] = useState(null);
    const [rankingData, setRankingData] = useState([]);
    const [matchesData, setMatchesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

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
                const handballId = await fetchSportIdByName("BALONMANO");
                
                if (handballId) {
                    const competitions = await fetchCompetitionsBySportId(handballId);
                    setAvailableCompetitions(competitions);

                    if (competitions.length > 0) {
                        setSelectedCompetitionId(competitions[0]._id);
                    } else {
                        setLoading(false);
                    }
                } else {
                    console.warn("Deporte 'BALONMANO' no encontrado en la base de datos.");
                    setLoading(false);
                }
            } catch (e) {
                console.error("Error al cargar datos iniciales de Balonmano:", e);
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

    useEffect(() => {
        const loadUser = async () => {
            try {
                const userData = await AsyncStorage.getItem('userInfo');
                if (userData) {
                    setCurrentUser(JSON.parse(userData));
                }
            } catch (e) {
                console.error("Error loading user info", e);
            }
        };
        loadUser();
    }, []);

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
                <Captain_GlobalMenu 
                    navigation={navigation} 
                    onClose={() => setIsMenuOpen(false)}
                />
            )}
            
            {availableCompetitions.length === 0 && !loading ? (
                <Text style={styles.noDataMessage}>{t("handball.no_data")}</Text>
            ) : (
                <ScrollView contentContainerStyle={styles.container}>
                    <Text style={styles.sectionTitle}>{t("handball.select_comp")}:</Text>
                    <CompetitionSelector
                        competitions={availableCompetitions}
                        selectedId={selectedCompetitionId}
                        onSelect={setSelectedCompetitionId}
                    />

                    <Text style={styles.sectionTitle}>{t("handball.ranking")}</Text>
                    {loading ? <ActivityIndicator size="small" color="#0084C9" /> : <RankingTable ranking={rankingData} />}
                    
                    <Text style={styles.sectionTitle}>{t("handball.calendar")}</Text>
                    {loading ? <ActivityIndicator size="small" color="#0084C9" /> : (
                        <MatchCalendar 
                            matches={matchesData} 
                            onDataUpdated={handleDataUpdate}
                            currentUser={currentUser}
                        />
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
                            <Text style={styles.closeButtonText}>{t('handball.close')}</Text>
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
        left: 15,
        top: isMobile ? 40 : 10,
    },    
    title: {
        fontSize: isMobile ? 40: 50,
        color: "#0084C9",
        fontWeight: 'bold',
        textAlign: "center",
        top: isMobile? 20:0,
    },
});

const styles = StyleSheet.create({
    fullContainer: { flex: 1, backgroundColor: "#ffffffff" },
    container: {
        paddingTop: 150, 
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