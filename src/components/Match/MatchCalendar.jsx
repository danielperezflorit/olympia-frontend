import React, { useState } from 'react'; // Añadido useState
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import MatchResultForm from './MatchResultForm'; // Asegúrate de que la ruta sea correcta

const MatchCalendar = ({ matches, onDataUpdated }) => {
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [isResultModalVisible, setIsResultModalVisible] = useState(false);

    if (!matches || matches.length === 0) {
        return <Text style={styles.message}>No hay partidos programados.</Text>;
    }

    const openResultForm = (match) => {
        setSelectedMatch(match);
        setIsResultModalVisible(true);
    };

    const renderMatchItem = ({ item }) => {
        const teamLocalName = item.teamLocal?.name || 'Equipo Local';
        const teamVisitorName = item.teamVisitor?.name || 'Equipo Visitante';
        const matchDate = new Date(item.date);
        const now = new Date();
        
        const isPlayed = item.isPlayed || item.scoreLocal != 0 || item.scoreVisitor != 0;
        const isPast = matchDate < now; // ¿Ya pasó la fecha/hora?

        return (
                <View style={styles.matchCard}>
                    <Text style={styles.dateText}>
                    {matchDate.toLocaleDateString()} - {matchDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                
                    <View style={styles.mainRow}>
                    {/* Contenedor Local - Alineado a la izquierda */}
                    <View style={styles.sideContainer}>
                        <Text style={[styles.teamText, styles.textLeft]} numberOfLines={1}>
                            {teamLocalName}
                        </Text>
                    </View>

                    {/* Contenedor Marcador - Centro absoluto */}
                    <View style={styles.scoreContainer}>
                        {isPlayed ? (
                            <Text style={styles.scoreText}>{item.scoreLocal} - {item.scoreVisitor}</Text>
                        ) : (
                            <Text style={styles.vsText}>vs</Text>
                        )}
                    </View>

                    {/* Contenedor Visitante - Alineado a la derecha del todo */}
                    <View style={styles.sideContainer}>
                        <Text style={[styles.teamText, styles.textRight]} numberOfLines={1}>
                            {teamVisitorName}
                        </Text>
                    </View>
                </View>

                {/* BOTÓN CONDICIONAL: Solo si ya pasó la fecha o ya tiene resultado */}
                {(isPast || isPlayed) && (
                    <TouchableOpacity 
                        style={styles.resultButton} 
                        onPress={() => openResultForm(item)}
                    >
                        <Text style={styles.resultButtonText}>
                            {isPlayed ? "Editar Resultado" : "Registrar Resultado"}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={matches}
                renderItem={renderMatchItem}
                keyExtractor={(item) => item._id}
            />

            {/* Modal para el formulario de resultados */}
            <Modal visible={isResultModalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {selectedMatch && (
                            <MatchResultForm 
                                match={selectedMatch}
                                onResultSubmitted={() => {
                                    setIsResultModalVisible(false);
                                    onDataUpdated(); // Recarga los datos en FutbolScreen
                                }}
                                onClose={() => setIsResultModalVisible(false)}
                            />
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginBottom: 30,
    },
    listTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    mt20: {
        marginTop: 20,
    },
    matchCard: {
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        marginBottom: 10,
        width: '100%',
    },
    dateText: {
        fontSize: 12,
        color: '#777',
        marginBottom: 5,
        textAlign: 'center',
    },
    resultContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    upcomingContainer: {
        alignItems: 'center',
    },
    teamText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',},
    scoreText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0084C9',
    },
    upcomingTime: {
        fontSize: 14,
        color: '#0084C9',
        marginTop: 5,
    },
    message: {
        textAlign: 'center',
        marginTop: 15,
        color: '#777',
    },
    subMessage: {
        textAlign: 'center',
        marginTop: 5,
        color: '#aaa',
        fontStyle: 'italic',
    },
    mainRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    vsText: { 
        fontSize: 14, 
        color: '#888', 
        fontWeight: 'bold' 
    },
    resultButton: {
        backgroundColor: '#0084C9',
        padding: 8,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
    },
    resultButtonText: { 
        color: 'white', 
        fontWeight: 'bold', 
        fontSize: 13 
    },
    modalOverlay: {
        flex: 1, 
        backgroundColor: 'rgba(0,0,0,0.5)', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    modalContent: {
        width: '90%', 
        backgroundColor: 'white', 
        borderRadius: 10, 
        padding: 10
    },
    teamContainer: {
        flex: 1,
    },
    scoreContainer: {
        width: 100, 
        alignItems: 'center',
        justifyContent: 'center',
    },
    textLeft: {
        textAlign: 'left',
    },
    textRight: {
        textAlign: 'right',
    },
    sideContainer: {
        flex: 1, // Esto obliga a los contenedores laterales a expandirse hasta el marcador
    },
});

export default MatchCalendar;