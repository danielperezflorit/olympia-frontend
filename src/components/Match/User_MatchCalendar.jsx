import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import MatchResultForm from './MatchResultForm'; 

const User_MatchCalendar = ({ matches, onDataUpdated }) => {
    const [isResultModalVisible, setIsResultModalVisible] = useState(false);

    if (!matches || matches.length === 0) {
        return <Text style={styles.message}>No hay partidos programados.</Text>;
    }


    const renderMatchItem = ({ item }) => {
        const teamLocalName = item.teamLocal?.name || 'Equipo Local';
        const teamVisitorName = item.teamVisitor?.name || 'Equipo Visitante';
        const matchDate = new Date(item.date);        
        const isPlayed = item.isPlayed || item.scoreLocal != 0 || item.scoreVisitor != 0;

        return (
                <View style={styles.matchCard}>
                    <Text style={styles.dateText}>
                    {matchDate.toLocaleDateString()} - {matchDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                
                    <View style={styles.mainRow}>
                    <View style={styles.sideContainer}>
                        <Text style={[styles.teamText, styles.textLeft]} numberOfLines={1}>
                            {teamLocalName}
                        </Text>
                    </View>

                    <View style={styles.scoreContainer}>
                        {isPlayed ? (
                            <Text style={styles.scoreText}>{item.scoreLocal} - {item.scoreVisitor}</Text>
                        ) : (
                            <Text style={styles.vsText}>vs</Text>
                        )}
                    </View>

                    <View style={styles.sideContainer}>
                        <Text style={[styles.teamText, styles.textRight]} numberOfLines={1}>
                            {teamVisitorName}
                        </Text>
                    </View>
                </View>
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
        flex: 1, 
    },
});

export default User_MatchCalendar;