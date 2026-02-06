import React from 'react';
import { useTranslation } from 'react-i18next'
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const RankingTable = ({ ranking }) => {
    const { t } = useTranslation();

    if (!ranking || ranking.length === 0) {
        return <Text style={styles.message}>No hay equipos registrados en esta clasificación.</Text>;
    }

    return (
        <ScrollView horizontal style={styles.scrollView}>
            <View>
                <View style={[styles.row, styles.header]}>
                    <Text style={[styles.cell, styles.colPos]}>#</Text>
                    <Text style={[styles.cell, styles.colName]}>{t('team')}</Text>
                    <Text style={[styles.cell, styles.colStats]}>{t('ranking_table.played')}</Text>
                    <Text style={[styles.cell, styles.colStats]}>{t('ranking_table.won')}</Text>
                    <Text style={[styles.cell, styles.colStats]}>{t('ranking_table.drawn')}</Text>
                    <Text style={[styles.cell, styles.colStats]}>{t('ranking_table.lost')}</Text>
                    <Text style={[styles.cell, styles.colPoints]}>{t('ranking_table.points')}</Text>
                </View>

                {ranking.map((team, index) => (
                    <View key={team._id} style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
                        <Text style={[styles.cell, styles.colPos]}>{index + 1}</Text>
                        <Text style={[styles.cell, styles.colName]}>{team.name}</Text>
                        <Text style={[styles.cell, styles.colStats]}>{team.matches || 0}</Text>
                        <Text style={[styles.cell, styles.colStats]}>{team.wins || 0}</Text>
                        <Text style={[styles.cell, styles.colStats]}>{team.draws || 0}</Text>
                        <Text style={[styles.cell, styles.colStats]}>{team.loses || 0}</Text>
                        <Text style={[styles.cell, styles.colPoints, styles.pointsText]}>{team.points || 0}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        mmarginBottom: 20, 
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    header: {
        backgroundColor: '#0084C9',
        borderBottomColor: '#005f93',
    },
    evenRow: {
        backgroundColor: '#f9f9f9',
    },
    oddRow: {
        backgroundColor: '#ffffff',
    },
    cell: {
        paddingVertical: 10,
        paddingHorizontal: 8,
        fontSize: 14,
        textAlign: 'center',
    },
    colPos: {
        width: 30, 
        fontWeight: 'bold',
        color: 'white',
    },
    colName: {
        width: 150, 
        textAlign: 'left',
        fontWeight: 'bold',
    },
    colStats: {
        width: 50, 
    },
    colPoints: {
        width: 60, 
        fontWeight: 'bold',
    },
    pointsText: {
        color: '#0084C9',
    },
    message: {
        textAlign: 'center',
        marginTop: 15,
        color: '#777',
    },
});

export default RankingTable;