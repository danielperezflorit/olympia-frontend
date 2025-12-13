import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CommonActions } from '@react-navigation/native';

const menuRoutes = [
    { name: 'Home', label: 'Inicio' },
    { name: 'Usuarios', label: 'Usuarios' },
    { name: 'Universidades', label: 'Universidades' },
    { name: 'Teams', label: 'Equipos' },
    {name: 'Competitions', label: 'Competiciones' },
    { name: 'Futbol', label: 'Fútbol' },
    { name: 'Padel', label: 'Pádel' }, 
    { name: 'Basquet', label: 'Básquet' }, 
    { name: 'Balonmano', label: 'Balonmano' },
];

const GlobalMenu = ({ navigation, onClose }) => {
    
    const handleNavigate = (routeName) => {
        onClose(); 
        if (['Home', 'Usuarios', 'Universidades', 'Teams', 'Competitions', 'Futbol', 'Padel', 'Basquet', 'Handball'].includes(routeName)) {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: routeName }],
                })
            );
        } else {
            // Para las otras pantallas (Futbol, Padel, etc.) el navigate simple funciona bien.
            navigation.navigate(routeName); 
        }
    };

    return (
        // Contenedor principal que se superpone a todo
        <TouchableOpacity 
            style={styles.overlay} 
            onPress={onClose} // Cierra el menú al tocar fuera del área del menú
            activeOpacity={1}
        >
            {/* El menuContainer ya no cierra al tocar, para evitar que el toque pase al overlay */}
            <View style={styles.menuContainer}> 
                
                {/* 1. ESPACIO PARA EL BOTÓN (para evitar que se solape visualmente) */}
                <View style={styles.menuButtonSpace} />

                <Text style={styles.menuTitle}>Menú OLYMPIA</Text>

                {menuRoutes.map((route) => (
                    <TouchableOpacity
                        key={route.name}
                        style={styles.menuItem}
                        onPress={() => handleNavigate(route.name)}
                    >
                        <Text style={styles.menuText}>{route.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        zIndex: 999, // ✅ Z-Index menor que el del botón (1001)
    },
    menuContainer: {
        width: 250, 
        height: '100%', 
        backgroundColor: '#0084C9', 
        paddingHorizontal: 20,
        position: 'absolute',
        right: 0, 
        top: 0,
        bottom: 0,
    },
    menuButtonSpace: {
        height: 100,
    },
    menuTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
        paddingBottom: 10,
        borderBottomWidth: 2,
        borderBottomColor: 'white',
    },
    menuItem: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.3)',
    },
    menuText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default GlobalMenu;