import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'; // ScrollView eliminado
import GlobalMenu from '../../components/GlobalMenu';

const FixedHeader = () => (
    <View style={headerStyles.headerContainer}>
        {/* LOGO */}
        <Image 
            style={headerStyles.logo} 
            source={require('../../../assets/unite!.png')}
        />
        <Text style={headerStyles.title}>BALONMANO</Text>

    </View>
);

export default function BalonmanoScreen({ navigation }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false); 
    
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    return (
        <View style={styles.container}>
            {/* 1. CABECERA FIJA (Solo Logo) */}
            <FixedHeader />

            {/* 2. ✅ BOTÓN HAMBURGUESA FLOTANTE: INDEPENDIENTE, con Z-INDEX superior (1001) */}
            <TouchableOpacity 
                style={[
                    headerStyles.menuIcon, 
                    { zIndex: 1001 }, // Z-INDEX más alto que GlobalMenu (999)
                    isMenuOpen && headerStyles.menuIconBackgroundActive 
                ]} 
                onPress={toggleMenu}
            >
                <Text style={[
                    headerStyles.menuIconText, 
                    isMenuOpen && headerStyles.menuIconTextActive 
                ]}>☰</Text> 
            </TouchableOpacity>
            
            {/* 3. RENDERIZAR MENÚ (zIndex: 999) */}
            {isMenuOpen && (
                <GlobalMenu 
                    navigation={navigation} 
                    onClose={() => setIsMenuOpen(false)}
                />
            )}
        </View>
    );
}

const headerStyles = StyleSheet.create({
    headerContainer: {
        height: 100, 
        width: '100%',
        backgroundColor: '#ffffffff', 
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'flex-start', 
        paddingTop: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1, 
        borderBottomColor: '#eee',
        zIndex: 10, 
        // HACEMOS LA CABECERA ABSOLUTA PARA QUE PERMANEZCA FIJA
        position: 'absolute',
        top: 0,
        reight: 0,
    },
    // ✅ ÍCONO AHORA ES ABSOLUTO Y SEPARADO DEL HEADER CONTAINER
    menuIcon: {
        position: 'absolute', // Clave para flotar
        top: 45, // Ajuste para que se vea bien en el header
        right: 10,
        padding: 5,
        borderRadius: 5,
    },
    menuIconText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#0084C9', // Color predeterminado (azul)
    },
    menuIconBackgroundActive: {
        backgroundColor: '#0084C9', 
    },
    menuIconTextActive: {
        color: 'white', 
    },
    logo: {
        width: 300, 
        height: 80, 
        resizeMode: 'contain',
        // Ajustar la posición para evitar el ícono de hamburguesa
        marginLeft: 55, 
    },
    title: {
      position: 'absolute',
      fontSize: 50,
      marginBottom: 10,
      textAlign: "center",
      color: "#0084C9",
      fontWeight: 'bold',
      left: '50%', // Mueve el punto de inicio del elemento al centro horizontal del contenedor padre
      transform: 'translateX(-50%)', // Mueve el elemento hacia la izquierda el 50% de SU PROPIO ancho
  },
});


const styles = StyleSheet.create({
    
    container: {
    flex: 1,
    paddingTop: 120,
    paddingHorizontal: 20,
    paddingBottom:10,
    backgroundColor: "#ffffffff",
},
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
    color: "#0084C9",
  }
});