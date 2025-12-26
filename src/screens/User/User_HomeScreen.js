import React, { useState } from 'react';
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import User_GlobalMenu from '../../components/User_GlobalMenu.jsx';

const FixedHeader = () => (
    <View style={headerStyles.headerContainer}>
        <Image 
            style={headerStyles.logo} 
            source={require('../../../assets/unite!.png')}
        />
        <Text style={headerStyles.title}>Home</Text>
    </View>
);


const ImageContainer = ({ navigation, source, sportName }) => (
    <TouchableOpacity 
        style={styles.imageWrapper}
        onPress={() => {
            if (sportName === 'Futbol') {
                navigation.navigate('User_Futbol', { sportName: sportName }); 
            } else if (sportName === 'Padel') {
                navigation.navigate('User_Padel', { sportName: sportName });
            } else if (sportName === 'Basquet') {
                navigation.navigate('User_Basquet', { sportName: sportName });
            } else if (sportName === 'Balonmano') {
                navigation.navigate('User_Balonmano', { sportName: sportName });
            }
        }}
    >
        <Image style={styles.image} source={source} />
    </TouchableOpacity>
);


export default function User_HomeScreen({ navigation }) { 
    const [isMenuOpen, setIsMenuOpen] = useState(false); 

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <View style={styles.fullScreen}>
            <FixedHeader />
            <TouchableOpacity 
                style={[
                    headerStyles.menuIcon, 
                    { zIndex: 1001 },
                    isMenuOpen && headerStyles.menuIconBackgroundActive 
                ]} 
                onPress={toggleMenu}
            >
                <Text style={[
                    headerStyles.menuIconText, 
                    isMenuOpen && headerStyles.menuIconTextActive 
                ]}>☰</Text> 
            </TouchableOpacity>
            
            {isMenuOpen && (
                <User_GlobalMenu 
                    navigation={navigation} 
                    onClose={() => setIsMenuOpen(false)}
                />
            )}

            <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.screen}>

                <Text style={styles.title}>OLYMPIA</Text>

                <ImageContainer navigation={navigation} source={require('../../../assets/sports/futbol.jpg')} sportName="Futbol"/>
                <ImageContainer navigation={navigation} source={require('../../../assets/sports/padel.jpg')} sportName="Padel"/>
                <ImageContainer navigation={navigation} source={require('../../../assets/sports/handball.jpg')} sportName="Balonmano"/>
                <ImageContainer navigation={navigation} source={require('../../../assets/sports/basquet.jpg')} sportName="Basquet"/>

            </ScrollView>
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
        position: 'absolute',
        top: 0,
        reight: 0,
    },
    menuIcon: {
        position: 'absolute', 
        top: 45, 
        right: 10,
        padding: 5,
        borderRadius: 5,
    },
    menuIconText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#0084C9', 
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
        marginLeft: 55, 
    },
    title: {
      position: 'absolute',
      fontSize: 50,
      marginBottom: 10,
      textAlign: "center",
      color: "#0084C9",
      fontWeight: 'bold',
      left: '50%', 
      transform: 'translateX(-50%)', 
  },
});


const styles = StyleSheet.create({
    fullScreen: {
        flex: 1, 
        backgroundColor: "#ffffffff",
    },
    screen:{
        flex: 1,
    },
    scrollContainer: {
        paddingTop: 100, 
        paddingBottom: 50, 
        alignItems: 'center', 
        backgroundColor: "#ffffffff",
    },
    imageWrapper: {
        width: 320,   
        height: 180,  
        borderRadius: 50, 
        overflow: 'hidden', 
        marginBottom: 20, 
        backgroundColor: '#ffffffff', 
        borderWidth: 1, 
        borderColor: '#ddd',
    },
    image: {
        width: '100%', 
        height: '100%', 
        resizeMode: 'cover',
    },
    title: {
        paddingTop:200,
        fontSize: 100,
        fontWeight: 'bold',
        marginBottom: 100,
        color: '#0084C9',
    },
});