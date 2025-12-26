import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, TextInput } from 'react-native';
import { Calendar } from 'react-native-calendars';

export const CalendarPicker = ({ selectedDate, onDateSelect, onClose }) => {
    const initialDateString = selectedDate.toISOString().split('T')[0];
    const [dateString, setDateString] = useState(initialDateString);

    const [hours, setHours] = useState(selectedDate.getHours().toString().padStart(2, '0'));
    const [minutes, setMinutes] = useState(selectedDate.getMinutes().toString().padStart(2, '0'));

    const handleConfirm = () => {
        const [year, month, day] = dateString.split('-').map(Number);
        const finalDate = new Date(year, month - 1, day, parseInt(hours), parseInt(minutes));
        
        onDateSelect(finalDate);
        onClose();
    };

return (
        <View style={styles.container}>
            <Text style={styles.title}>Seleccionar Fecha y Hora</Text>
            <Calendar
                minDate={new Date().toISOString().split('T')[0]} 
                markedDates={{
                    [dateString]: { selected: true, selectedColor: '#0084C9' }
                }}
                onDayPress={(day) => setDateString(day.dateString)}
                theme={{
                    selectedDayBackgroundColor: '#0084C9',
                    todayTextColor: '#0084C9',
                    arrowColor: '#0084C9',
                }}
            />

            <View style={styles.timePickerContainer}>
                <Text style={styles.timeLabel}>Hora (24h):</Text>
                <View style={styles.timeInputsRow}>
                    <TextInput
                        style={styles.timeInput}
                        keyboardType="numeric"
                        maxLength={2}
                        value={hours}
                        onChangeText={setHours}
                    />
                    <Text style={styles.timeSeparator}>:</Text>
                    <TextInput
                        style={styles.timeInput}
                        keyboardType="numeric"
                        maxLength={2}
                        value={minutes}
                        onChangeText={setMinutes}
                    />
                </View>
            </View>

            <View style={styles.buttonRow}>
                <Button title="Cancelar" onPress={onClose} color="#FF3B30" />
                <Button title="Confirmar" onPress={handleConfirm} color="#0084C9" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    timePickerContainer: {
        marginTop: 15,
        alignItems: 'center',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#eee'
    },
    timeLabel: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold'
    },
    timeInputsRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 8,
        width: 50,
        textAlign: 'center',
        fontSize: 18,
    },
    timeSeparator: {
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 10,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    }
});

export default CalendarPicker;