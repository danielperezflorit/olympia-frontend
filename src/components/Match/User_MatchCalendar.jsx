import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';

const User_MatchCalendar = ({ matches }) => {
    const { t } = useTranslation();

    if (!matches || matches.length === 0) {
        return <Text style={styles.message}>No hay partidos programados.</Text>;
    }

     const groupedMatches = matches.reduce((acc, match) => {
        const day = match.matchday || 1; 
        if (!acc[day]) {
            acc[day] = [];
        }
        acc[day].push(match);
        return acc;
    }, {});

    const sortedMatchdays = Object.keys(groupedMatches).sort((a, b) => Number(a) - Number(b));

    const renderMatchItem = ({ item }) => {
        const teamLocalName = item.teamLocal?.name || t("matchcalendar.home_team");
        const teamVisitorName = item.teamVisitor?.name ||  t("matchcalendar.away_team");
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
           {sortedMatchdays.map((day) => (
                <View key={day} style={styles.matchdayContainer}>
                    
                    <View style={styles.matchdayHeader}>
                        <Text style={styles.matchdayTitle}>
                            {t('matchcalendar.matchday') || "Jornada"} {day}
                        </Text>
                    </View>

                    {groupedMatches[day].map((match) => (
                        <View key={match._id}>
                            {renderMatchItem({ item: match })}
                        </View>
                    ))}
                </View>
            ))}

    
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
        position: 'relative'
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'center', // Centrado para la fecha
        alignItems: 'center',
        marginBottom: 5,
        position: 'relative',
    },
    dateText: {
        fontSize: 12,
        color: '#777',
        marginBottom: 5,
        textAlign: 'center',
    },
    historyIconBtn: {
        position: 'absolute',
        right: 0,
        top: -5,
        padding: 5,
        backgroundColor: '#e1f5fe',
        borderRadius: 15,
    },
    historyIconText: {
        fontSize: 16,
    },
    historyTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0084C9',
        marginBottom: 15,
        textAlign: 'center',
    },
    historyItem: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 8,
        marginBottom: 8,
        borderLeftWidth: 4,
        borderLeftColor: '#0084C9',
    },
    historyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    historyAction: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333',
    },
    historyDate: {
        fontSize: 10,
        color: '#666',
    },
    historyChangeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    historyOld: {
        fontSize: 14,
        color: '#888',
        textDecorationLine: 'line-through',
    },
    historyNew: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0084C9',
    },
    arrow: {
        fontSize: 16,
        color: '#333',
        marginHorizontal: 5,
    },
    noHistoryText: {
        textAlign: 'center',
        color: '#777',
        fontStyle: 'italic',
        marginVertical: 10,
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
        padding: 20,
        position: 'relative',
    },
    closeIconBtn: {
        position: 'absolute', 
        top: 10,              
        right: 10,            
        zIndex: 1,            
        padding: 5            
    },
    closeIconText: {
        fontSize: 24,         
        color: '#FF3B30',     
        fontWeight: 'bold',
        lineHeight: 24 
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
    matchdayContainer: {
        marginBottom: 20,
    },
    matchdayHeader: {
        backgroundColor: '#e0e0e0',
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginBottom: 10,
        alignItems: 'center'
    },
    matchdayTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default User_MatchCalendar;