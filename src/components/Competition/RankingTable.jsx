import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const RankingTable = ({ ranking }) => {
    if (!ranking || ranking.length === 0) {
        return <Text style={styles.message}>No hay equipos registrados en esta clasificación.</Text>;
    }

    return (
        <ScrollView horizontal style={styles.scrollView}>
            <View>
                <View style={[styles.row, styles.header]}>
                    <Text style={[styles.cell, styles.colPos]}>#</Text>
                    <Text style={[styles.cell, styles.colName]}>EQUIPO</Text>
                    <Text style={[styles.cell, styles.colStats]}>PJ</Text>
                    <Text style={[styles.cell, styles.colStats]}>PG</Text>
                    <Text style={[styles.cell, styles.colStats]}>PE</Text>
                    <Text style={[styles.cell, styles.colStats]}>PP</Text>
                    <Text style={[styles.cell, styles.colPoints]}>PT</Text>
                </View>

                {ranking.map((team, index) => (
                    <View key={team._id} style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
                        <Text style={[styles.cell, styles.colPos]}>{index + 1}</Text>
                        <Text style={[styles.cell, styles.colName]}>{team.name}</Text>
                        <Text style={[styles.cell, styles.colStats]}>{team.matches || 0}</Text>
                        <Text style={[styles.cell, styles.colStats]}>{team.wins || 0}</Text>
                        <Text style={[styles.cell, styles.colStats]}>{team.draws || 0}</Text>
                        <Text style={[styles.cell, styles.colStats]}>{team.losses || 0}</Text>
                        <Text style={[styles.cell, styles.colPoints, styles.pointsText]}>{team.points || 0}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        maxHeight: 400, 
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