import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { updateMatchResult } from '../../services/matchService'; 

const MatchResultForm = ({ match, onResultSubmitted, onClose }) => {
    const { t } = useTranslation();
    const [scoreLocal, setScoreLocal] = useState(match.scoreLocal ? String(match.scoreLocal) : '0');
    const [scoreVisitor, setScoreVisitor] = useState(match.scoreVisitor ? String(match.scoreVisitor) : '0');
    const [loading, setLoading] = useState(false);

    const teamLocalName = match.teamLocal.name || t("matchresultform.home_team");
    const teamVisitorName = match.teamVisitor.name || t("matchresultform.away_team");

    const handleSubmit = async () => {
        const finalScoreLocal = parseInt(scoreLocal, 10);
        const finalScoreVisitor = parseInt(scoreVisitor, 10);

        if (isNaN(finalScoreLocal) || isNaN(finalScoreVisitor) || finalScoreLocal < 0 || finalScoreVisitor < 0) {
            Alert.alert("Error", "Por favor, introduce puntuaciones válidas (números positivos).");
            return;
        }

        setLoading(true);

        try {
            await updateMatchResult(match._id, finalScoreLocal, finalScoreVisitor);
            
            Alert.alert("Éxito", "Resultado registrado y clasificación actualizada.");
            onResultSubmitted();
        } catch (e) {
            console.error("Error submitting result:", e);
            Alert.alert("Error", "No se pudo registrar el resultado. Verifique la conexión.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.formContainer}>
            <Text style={styles.title}>{t('matchresultform.add_result')}</Text>
            <Text style={styles.subtitle}>{t('matchresultform.match')}: {teamLocalName} vs {teamVisitorName}</Text>
            
            <View style={styles.inputRow}>
                <Text style={styles.teamLabel}>{teamLocalName}:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setScoreLocal}
                    value={scoreLocal}
                    keyboardType="numeric"
                    placeholder= {t("matchresultform.home_team_result")}
                />
            </View>

            <View style={styles.inputRow}>
                <Text style={styles.teamLabel}>{teamVisitorName}:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setScoreVisitor}
                    value={scoreVisitor}
                    keyboardType="numeric"
                    placeholder={t("matchresultform.away_team_result")}
                />
            </View>

            <Button
                title={loading ? t("matchresultform.sending") : t('matchresultform.save_result')}
                onPress={handleSubmit}
                disabled={loading}
            />
            
            <View style={styles.closeButtonContainer}>
                <Button title={t('matchresultform.close')} onPress={onClose} color="#FF3B30" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        width: '100%',
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        color: '#555',
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    teamLabel: {
        fontSize: 16,
        fontWeight: '600',
        width: '40%',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        width: '55%',
        textAlign: 'center',
    },
    closeButtonContainer: {
        marginTop: 15,
    }
});

export default MatchResultForm;