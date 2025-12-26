import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const CompetitionSelector = ({ competitions, selectedId, onSelect }) => {

    const renderItem = ({ item }) => {
        const isSelected = item._id === selectedId;
        return (
            <TouchableOpacity
                style={[styles.item, isSelected && styles.itemSelected]}
                onPress={() => onSelect(item._id)}
            >
                <Text style={[styles.text, isSelected && styles.textSelected]}>
                    {item.name}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={competitions}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                horizontal={true} 
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        height: 40,
    },
    item: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginHorizontal: 5,
        borderRadius: 20,
        backgroundColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemSelected: {
        backgroundColor: '#0084C9',
    },
    text: {
        color: '#333',
        fontWeight: 'normal',
    },
    textSelected: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default CompetitionSelector;