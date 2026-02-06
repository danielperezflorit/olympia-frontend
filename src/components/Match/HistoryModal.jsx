import React from "react";
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, ScrollView } from 'react-native';

export const HistoryModal = ({ visible, history, onClose, t }) => {
    return (
        <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={onClose}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <TouchableOpacity style={styles.closeIconBtn} onPress={onClose}>
                        <Text style={styles.closeIconText}>✕</Text>
                    </TouchableOpacity>

                    <Text style={styles.historyTitle}>{t('matchcalendar.history_title') || "Historial de Cambios"}</Text>
                    
                    {(!history || history.length === 0) ? (
                        <Text style={styles.noHistoryText}>No hay modificaciones registradas.</Text>
                    ) : (
                        <ScrollView style={{ maxHeight: 300 }}>
                            {history.slice().reverse().map((log, index) => ( 
                                <View key={index} style={styles.historyItem}>
                                    <View style={styles.historyHeader}>
                                        <Text style={styles.historyAction}>
                                            {log.action === 'Update Result' ? 'Resultado Actualizado' : log.action}
                                        </Text>
                                        <Text style={styles.historyDate}>
                                            {new Date(log.date).toLocaleString()}
                                        </Text>
                                    </View>
                                    <View style={styles.historyChangeContainer}>
                                        <Text style={styles.historyOld}>{log.oldScore}</Text>
                                        <Text style={styles.arrow}> ➔ </Text>
                                        <Text style={styles.historyNew}>{log.newScore}</Text>
                                    </View>
                                    <Text style={styles.historyUser}>Por: {log.modifiedBy?.name || 'Admin'}</Text> 
                                </View>
                            ))}
                        </ScrollView>
                    )}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
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
});