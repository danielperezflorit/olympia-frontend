import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Modal, ActivityIndicator, Platform } from 'react-native';
import { fetchTeams } from '../../services/teamService';
import { addMatch } from '../../services/matchService'; 
import { CalendarPicker } from '../Match/CalendarPicker';
import { fetchUsers } from '../../services/userService';

const MatchForm = ({ competitionId, onMatchScheduled }) => {
    const { t } = useTranslation();
    
    const [availableTeams, setAvailableTeams] = useState([]);
    const [teamLocal, setTeamLocal] = useState('');
    const [teamVisitor, setteamVisitor] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [referees, setReferees] = useState([]);
    const [selectedReferee, setSelectedReferee] = useState('');
    const [matchday, setMatchday] = useState('1');

    useEffect(() => {
        async function loadData() {
            setLoading(true)
            try {
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

                const allUsers = await fetchUsers();
                const refereesFound = allUsers.filter(u => u.type === 'referee');
                setReferees(refereesFound);

            } catch (e) {
                console.error("Error loading teams:", e);
                setError("Error al cargar la lista de equipos.");
            } finally {
                setLoading(false);
            }
        }
        if (competitionId) {
            loadData();
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

        if (!selectedReferee) {
             setError("Por favor, selecciona un árbitro.");
             return;
        }

        if (!matchday || parseInt(matchday) < 1) {
            setError("Por favor, introduce un número de jornada válido.");
            return;
        }

        setLoading(true);
        setError('');

        const newMatch = {
            competitionId: competitionId,
            referee: selectedReferee,
            teamLocal: teamLocal,
            teamVisitor: teamVisitor,
            matchday: parseInt(matchday),
            date: date.toISOString(),
            scoreLocal: 0, 
            scoreVisitor: 0,
            isPlayed: false
        };

        try {
            await addMatch(newMatch);
            onMatchScheduled(); 
        } catch (e) {
            console.error("Error creating match:", e);
            setError("Error al programar el partido. Verifique el servidor.");
        } finally {
            setLoading(false);
        }
    };

    const renderTeamSelector = (setter, currentValue) => {
        const selectedTeam = availableTeams.find(t => t._id === currentValue);
        const selectedName = selectedTeam ? selectedTeam.name : t('matchform.select_team');
        
        return (
            <View>
                <TouchableOpacity onPress={() => setter('')} style={styles.selectedDisplay}>
                    <Text style={styles.selectedDisplayText}>
                        {selectedName}
                    </Text>
                </TouchableOpacity>
                
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
            <Text style={styles.title}>{t("matchform.schedule_match")}</Text>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            
            <Text style={styles.label}>{t('matchform.select_team_local')}:</Text>
            {renderTeamSelector(setTeamLocal, teamLocal)}

            <Text style={styles.label}>{t('matchform.select_team_visitor')}:</Text>
            {renderTeamSelector(setteamVisitor, teamVisitor)}

            <Text style={styles.label}>{t('matchform.select_referee')}:</Text>
            <View style={styles.selectorContainer}>
                <ScrollView nestedScrollEnabled={true}>
                    {referees.map(ref => (
                        <TouchableOpacity
                            key={ref._id}
                            onPress={() => setSelectedReferee(ref._id)}
                            style={[
                                styles.teamItem,
                                selectedReferee === ref._id && styles.teamItemSelected,
                            ]}
                        >
                            <Text style={styles.teamText}>{ref.name} ({ref.mail})</Text>
                        </TouchableOpacity>
                    ))}
                    {referees.length === 0 && <Text style={{padding:10}}>{t("matchform.no_available_referee")}</Text>}
                </ScrollView>
            </View>

            <Text style={styles.label}>{t('matchform.matchday') || "Jornada"}:</Text>
            <TextInput
                style={styles.input}
                value={matchday}
                onChangeText={setMatchday}
                keyboardType="numeric"
                placeholder="Ej: 1"
            />

            <Text style={styles.label}>{t('matchform.date_time')}</Text>

            <TouchableOpacity
                onPress={() => setShowDatePicker(true)} 
                style={styles.datePickerButton}
            >
                <Text>{date.toLocaleString([], { day:'2-digit', month:'2-digit', year:'numeric', hour: '2-digit', minute: '2-digit' })}</Text>
            </TouchableOpacity>
            
            <Button
                title={loading ? t('matchform.scheduling_match') : t('matchform.schedule_match')}
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
                        onDateSelect={setDate} 
                        onClose={() => setShowDatePicker(false)} 
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
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        fontSize: 16,
    },
});

export default MatchForm;