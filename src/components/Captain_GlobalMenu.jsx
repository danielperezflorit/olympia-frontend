import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { logoutUser } from '../services/userService';

const Captain_GlobalMenu = ({ navigation, onClose }) => {
    const { t, i18n } = useTranslation();

    const menuRoutes = [
        { name: 'Register', label: t("globalmenu.register")},
        { name: 'Login', label: t("globalmenu.login") },
        { name: 'Captain_Home', label: t("globalmenu.home") },
        { name: 'Captain_Teams', label: t("globalmenu.teams") },
        { name: 'Captain_Futbol', label: t("globalmenu.football") },
        { name: 'Captain_Padel', label: t("globalmenu.paddle") }, 
        { name: 'Captain_Basquet', label: t("globalmenu.basketball") }, 
        { name: 'Captain_Balonmano', label: t("globalmenu.handball") },
    ];

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        onClose(); 
    };
    
    const handleNavigate = (routeName) => {
        onClose(); 
        if (['Registro','Login','Captain_Home', 'Captain_Teams', 'Captain_Futbol', 'Captain_Padel', 'Captain_Basquet', 'Captain_Handball'].includes(routeName)) {
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

                <View style={styles.utilityHeader}>
                    <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                        <Text style={styles.logoutText}>← {t('globalmenu.logout')}</Text>
                    </TouchableOpacity>
                        
                        <View style={styles.langToggleContainer}>
                            <TouchableOpacity 
                                style={[styles.langButton, i18n.language === 'es' && styles.langButtonActive]} 
                                onPress={() => changeLanguage('es')}
                                activeOpacity={0.8}
                            >
                                <Text style={[styles.langText, i18n.language === 'es' && styles.langTextActive]}>
                                    ES
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={[styles.langButton, i18n.language === 'en' && styles.langButtonActive]} 
                                onPress={() => changeLanguage('en')}
                                activeOpacity={0.8}
                            >
                                <Text style={[styles.langText, i18n.language === 'en' && styles.langTextActive]}>
                                    EN
                                </Text>
                            </TouchableOpacity>
                        </View>
                </View>
                
                <View style={styles.menuButtonSpace} />

                <Text style={styles.menuTitle}>{t("globalmenu.menu")} OLYMPIA</Text>

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
        width: 280, 
        height: '100%', 
        backgroundColor: '#0084C9', 
        paddingHorizontal: 20,
        position: 'absolute',
        right: 0, 
        top: 0,
        bottom: 0,
        shadowColor: "#000",
        shadowOffset: { width: -2, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    utilityHeader: {
        marginTop: 55, 
        marginBottom: 25,
        paddingHorizontal: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    logoutButton: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.15)', 
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoutText: {
        color: 'rgba(255, 255, 255, 0.9)', 
        fontWeight: '600',
        fontSize: 13,
    },
    langToggleContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, 0.15)', 
        borderRadius: 20, 
        padding: 3,
        marginTop: 15, 
    },
    langButton: {
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderRadius: 18,
        minWidth: 45, 
        alignItems: 'center',
    },
    langButtonActive: {
        backgroundColor: 'white', 
        shadowColor: "#000",
        shadowOffset: {	width: 0, height: 1 },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    langText: {
        color: 'rgba(255, 255, 255, 0.7)', 
        fontWeight: 'bold',
        fontSize: 12,
    },
    langTextActive: {
        color: '#0084C9', 
        fontWeight: '800', 
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

export default Captain_GlobalMenu;