import React, {useState, useEffect, useCallback} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Modal } from 'react-native';
import GlobalMenu from '../../components/GlobalMenu';

// SERVICIOS (Asumimos que están implementados y funcionan)
import { fetchSportIdByName } from '../../services/sportService';
import { fetchCompetitionsBySportId } from '../../services/competitionService';
import { fetchCompetitionRanking } from '../../services/teamService';
import { fetchMatchesByCompetitionId } from '../../services/matchService';

// COMPONENTES DE UI Y ADMINISTRACIÓN
import CompetitionSelector from '../../components/Competition/CompetitionSelector';
import RankingTable from '../../components/Competition/RankingTable';
import MatchCalendar from '../../components/Match/MatchCalendar'; 
import MatchForm from '../../components/Match/MatchForm'; // Formulario para crear partido

// --- Componentes de Encabezado ---
const FixedHeader = () => (
    <View style={headerStyles.headerContainer}>
        <Image 
            style={headerStyles.logo} 
            source={require('../../../assets/unite!.png')}
        />
        <Text style={headerStyles.title}>FÚTBOL</Text>
    </View>
);

export default function FutbolScreen({ navigation }) {
    // --- ESTADOS DE DATOS ---
    const [isMenuOpen, setIsMenuOpen] = useState(false); 
    const [availableCompetitions, setAvailableCompetitions] = useState([]);
    const [selectedCompetitionId, setSelectedCompetitionId] = useState(null);
    const [rankingData, setRankingData] = useState([]);
    const [matchesData, setMatchesData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // --- ESTADOS DE MODAL ---
    const [isMatchFormVisible, setIsMatchFormVisible] = useState(false); 
    
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // [FUNCIÓN CLAVE] Recarga el Ranking y los Partidos de la competición actual
    const loadCompetitionData = useCallback(async (competitionId) => {
        if (!competitionId) {
            setRankingData([]);
            setMatchesData([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            // Carga simultánea de datos
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

    // [FUNCIÓN CLAVE] Se llama después de Programar o Registrar un Resultado
    const handleDataUpdate = () => {
        setIsMatchFormVisible(false); // Cierra el modal de programación (si aplica)
        // Recarga los datos de la competición seleccionada
        loadCompetitionData(selectedCompetitionId); 
    };

    // [EFECTO 1] Carga Inicial: Busca el ID del deporte y sus competiciones
    useEffect(() => {
        async function loadInitialData() {
            setLoading(true);
            try {
                // Asumimos que el nombre del deporte es "FÚTBOL"
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


    // [EFECTO 2] Carga de Datos de Competición: Se dispara al cambiar selectedCompetitionId
    useEffect(() => {
        if (selectedCompetitionId) {
            loadCompetitionData(selectedCompetitionId);
        }
    }, [selectedCompetitionId, loadCompetitionData]);


    return (
        <View style={styles.fullContainer}>
            <FixedHeader />
            {/* Botón de Menú */}
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
                <GlobalMenu 
                    navigation={navigation} 
                    onClose={() => setIsMenuOpen(false)}
                />
            )}
            
            {/* Manejo de Contenido y Carga */}
            {availableCompetitions.length === 0 && !loading ? (
                <Text style={styles.noDataMessage}>No hay competiciones de Fútbol disponibles.</Text>
            ) : (
                <ScrollView contentContainerStyle={styles.container}>
                    {/* A. Selector de Competición */}
                    <Text style={styles.sectionTitle}>Seleccionar Competición</Text>
                    <CompetitionSelector
                        competitions={availableCompetitions}
                        selectedId={selectedCompetitionId}
                        onSelect={setSelectedCompetitionId}
                    />

                    {/* B. Clasificación */}
                    <Text style={styles.sectionTitle}>Clasificación</Text>
                    {loading ? <ActivityIndicator size="small" color="#0084C9" /> : <RankingTable ranking={rankingData} />}
                    
                    {/* C. Calendario de Partidos */}
                    <Text style={styles.sectionTitle}>Jornadas y Partidos</Text>
                    {loading ? <ActivityIndicator size="small" color="#0084C9" /> : (
                        <MatchCalendar 
                            matches={matchesData} 
                            onDataUpdated={handleDataUpdate} // Permite a MatchCalendar recargar datos tras registrar resultado
                        />
                    )}

                    {/* D. BOTÓN DE ADMINISTRACIÓN (Programar Partido) */}
                    {selectedCompetitionId && (
                        <View style={styles.adminButtons}>
                            <TouchableOpacity 
                                style={styles.adminButton} 
                                onPress={() => setIsMatchFormVisible(true)} // Abre el modal de MatchForm
                            >
                                <Text style={styles.buttonText}>+ Programar Nuevo Partido</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </ScrollView>
                
            )}
            {/* Overlay de Carga */}
            {loading && availableCompetitions.length > 0 && <ActivityIndicator size="large" color="#0084C9" style={styles.loadingIndicatorOverlay} />}


            {/* 🔴 MODAL PARA PROGRAMAR PARTIDOS (MatchForm) 🔴 */}
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
                            onMatchScheduled={handleDataUpdate} // Recarga y cierra el modal
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

// --- Estilos ---
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
    // --- ESTILOS DE ADMINISTRACIÓN ---
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