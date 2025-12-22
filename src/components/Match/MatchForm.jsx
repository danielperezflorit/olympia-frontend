import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Modal, ActivityIndicator, Platform } from 'react-native';
import { fetchTeams } from '../../services/teamService';
import { addMatch } from '../../services/matchService'; 
import { CalendarPicker } from '../Match/CalendarPicker';

const MatchForm = ({ competitionId, onMatchScheduled }) => {
    const [availableTeams, setAvailableTeams] = useState([]);
    const [teamLocal, setTeamLocal] = useState('');
    const [teamVisitor, setteamVisitor] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        async function loadTeams() {
            setLoading(true)
            try {
                // Filtra solo los equipos de la competición actual
                const teamsData = await fetchTeams(); 
                const filteredTeams = teamsData.filter(t => {
                    const teamCompetitionId = t.competition?._id || t.competition;
                    return teamCompetitionId === competitionId;
                });                
                
                setAvailableTeams(filteredTeams);

                if (filteredTeams.length >= 2) {
                    setTeamLocal(filteredTeams[0]._id);
                    setteamVisitor(filteredTeams[1]._id);
                } else if (filteredTeams.length === 1) {
                    setTeamLocal(filteredTeams[0]._id);
                }
                if (filteredTeams.length === 0) {
                    setError("No hay equipos disponibles para esta competición.");
                }
            } catch (e) {
                console.error("Error loading teams:", e);
                setError("Error al cargar la lista de equipos.");
            } finally {
                setLoading(false);
            }
        }
        if (competitionId) {
            loadTeams();
        }
    }, [competitionId]);

    const handleSubmit = async () => {
        if (!teamLocal || !teamVisitor || teamLocal === teamVisitor) {
            setError("Por favor, selecciona dos equipos diferentes.");
            return;
        }
        if (!date || date < new Date()) {
             setError("Por favor, selecciona una fecha válida y futura.");
             return;
        }

        setLoading(true);
        setError('');

        const newMatch = {
            competitionId: competitionId,
            teamLocal: teamLocal,
            teamVisitor: teamVisitor,
            date: date.toISOString(),
            scoreLocal: 0, // Inicia con 0
            scoreVisitor: 0, // Inicia con 0
            isPlayed: false // Inicia como no jugado
        };

        try {
            await addMatch(newMatch);
            onMatchScheduled(); // Cierra el modal y recarga el calendario
        } catch (e) {
            console.error("Error creating match:", e);
            setError("Error al programar el partido. Verifique el servidor.");
        } finally {
            setLoading(false);
        }
    };

    const renderTeamSelector = (setter, currentValue) => {
        const selectedTeam = availableTeams.find(t => t._id === currentValue);
        const selectedName = selectedTeam ? selectedTeam.name : 'Selecciona un equipo...';
        
        return (
            <View>
                {/* 🔴 Muestra el equipo seleccionado actualmente 🔴 */}
                <TouchableOpacity onPress={() => setter('')} style={styles.selectedDisplay}>
                    <Text style={styles.selectedDisplayText}>
                        {selectedName}
                    </Text>
                </TouchableOpacity>
                
                {/* 🔵 Contenedor de Scroll para seleccionar opciones 🔵 */}
                <ScrollView style={styles.selectorContainer}>
                    {availableTeams.map(team => (
                        <TouchableOpacity
                            key={team._id}
                            onPress={() => setter(team._id)}
                            style={[
                                styles.teamItem,
                                currentValue === team._id && styles.teamItemSelected,
                            ]}
                        >
                            <Text style={styles.teamText}>{team.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        );
    }
    
    if (loading) {
        return <ActivityIndicator size="large" color="#0084C9" style={{padding: 20}} />;
    }

    return (
        <View style={styles.formContainer}>
            <Text style={styles.title}>Programar Partido</Text>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            
            <Text style={styles.label}>Equipo Local (A):</Text>
            {renderTeamSelector(setTeamLocal, teamLocal)}

            <Text style={styles.label}>Equipo Visitante (B):</Text>
            {renderTeamSelector(setteamVisitor, teamVisitor)}

            <Text style={styles.label}>Fecha y Hora:</Text>

            <TouchableOpacity
                onPress={() => setShowDatePicker(true)} 
                style={styles.datePickerButton}
            >
                {/* toLocaleString mostrará tanto fecha como hora elegida */}
                <Text>{date.toLocaleString([], { day:'2-digit', month:'2-digit', year:'numeric', hour: '2-digit', minute: '2-digit' })}</Text>
            </TouchableOpacity>
            
            <Button
                title={loading ? "Programando..." : "Programar Partido"}
                onPress={handleSubmit}
                disabled={loading || teamLocal === teamVisitor}
            />

            <Modal
                animationType="fade"
                transparent={true}
                visible={showDatePicker}
                onRequestClose={() => setShowDatePicker(false)}
            >
                <View style={styles.calendarOverlay}>
                    <CalendarPicker
                        selectedDate={date}
                        onDateSelect={setDate} // Llama a setDate directamente
                        onClose={() => setShowDatePicker(false)} // Cierra el modal
                    />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        width: '100%',
        padding: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        marginTop: 10,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
    },
    selectorContainer: {
        maxHeight: 100,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 15,
    },
    teamItem: {
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    teamItemSelected: {
        backgroundColor: '#e6f7ff',
    },
    teamText: {
        fontSize: 14,
    },
    datePickerButton: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 20,
        alignItems: 'center',
    },
    webDateInput: {
        // Estilos específicos para el input de texto web si es necesario
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    }
});

export default MatchForm;