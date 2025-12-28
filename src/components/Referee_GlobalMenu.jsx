import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { logoutUser } from '../services/userService';

const menuRoutes = [
    { name: 'Register', label: 'Registro' },
    { name: 'Login', label: 'Login' },
    { name: 'Referee_Home', label: 'Inicio' },
    { name: 'Referee_Futbol', label: 'Fútbol' },
    { name: 'Referee_Padel', label: 'Pádel' }, 
    { name: 'Referee_Basquet', label: 'Básquet' }, 
    { name: 'Referee_Balonmano', label: 'Balonmano' },
];

const Referee_GlobalMenu = ({ navigation, onClose }) => {
    
    const handleNavigate = (routeName) => {
        onClose(); 
        if (['Register','Login','Referee_Home', 'Referee_Futbol', 'Referee_Padel', 'Referee_Basquet', 'Referee_Handball'].includes(routeName)) {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: routeName }],
                })
            );
        } else {
            navigation.navigate(routeName); 
        }
    };
    const { signOut } = useContext(AuthContext);
    const handleLogout = async () => {
        try {
            await logoutUser(); 
            onClose(); 
            signOut(); 
        } catch (error) {
            Alert.alert("Error", "No se pudo cerrar sesión correctamente.");
        }
    };

    return (
        <TouchableOpacity 
            style={styles.overlay} 
            onPress={onClose} 
            activeOpacity={1}
        >
            <View style={styles.menuContainer}> 
                
                <View style={styles.topActionsContainer}>
                                    <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                                        <Text style={styles.logoutText}>← Cerrar Sesión</Text>
                                    </TouchableOpacity>
                                </View>
                
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
        zIndex: 999, 
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
    topActionsContainer: {
        marginTop: 50, 
        marginBottom: 10,
        alignItems: 'flex-start', 
    },
    logoutButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.2)', 
        borderRadius: 5,
    },
    logoutText: {
        color: '#ffdddd', 
        fontWeight: 'bold',
        fontSize: 14,
    },
    menuButtonSpace: {
        height: 20,
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

export default Referee_GlobalMenu;