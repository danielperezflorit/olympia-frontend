import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Referee_GlobalMenu from '../../components/Referee_GlobalMenu.jsx';

const { width } = Dimensions.get('window');
const isMobile = width < 768;

const FixedHeader = () => {
    const { t } = useTranslation();
    return(
        <View style={headerStyles.headerContainer}>
            <Image 
                style={headerStyles.logo} 
                source={require('../../../assets/unite!.png')}
            />
            <Text style={headerStyles.title}>{t('home')}</Text>
        </View>
    )
}

const ImageContainer = ({ navigation, source, sportName }) => (
    <TouchableOpacity 
        style={styles.imageWrapper}
        onPress={() => {
            if (sportName === 'Futbol') {
                navigation.navigate('Referee_Futbol', { sportName: sportName }); 
            } else if (sportName === 'Padel') {
                navigation.navigate('Referee_Padel', { sportName: sportName });
            } else if (sportName === 'Basquet') {
                navigation.navigate('Referee_Basquet', { sportName: sportName });
            } else if (sportName === 'Balonmano') {
                navigation.navigate('Referee_Balonmano', { sportName: sportName });
            }
        }}
    >
        <Image style={styles.image} source={source} />
    </TouchableOpacity>
);


export default function Referee_HomeScreen({ navigation }) { 
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
                <Referee_GlobalMenu 
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
        height: isMobile ? 150 : 100, 
        width: '100%',
        backgroundColor: '#ffffff', 
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'center', 
        paddingTop: isMobile ? 30 : 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1, 
        borderBottomColor: '#eee',
        zIndex: 10, 
        position: 'absolute', 
        top: 0,
        right: 0,
    },
    menuIcon: {
        position: 'absolute', 
        top: isMobile ? 30 : 45, 
        right: 10,
        padding: 5,
        borderRadius: 5,
    },
    menuIconText: {
        fontSize: isMobile ? 24 : 30, 
        top:  isMobile ? 30 : 10,
        fontWeight: 'bold',
        color: '#0084C9',
    },
    menuIconBackgroundActive: {
        backgroundColor: '#0084C9', 
    },
    menuIconTextActive: {
        color: 'white', 
        top:  isMobile ? 30 : 10,
    },
    logo: {
        width: isMobile ? 180 : 300, 
        height: isMobile ? 60 : 80, 
        resizeMode: 'contain',
        position: 'absolute',
        left: 15,
        top: isMobile ? 40 : 10,
    },    
    title: {
        fontSize: isMobile ? 40: 50,
        color: "#0084C9",
        fontWeight: 'bold',
        textAlign: "center",
        top: isMobile? 20:0,
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
        fontSize: isMobile? 50: 100,
        fontWeight: 'bold',
        marginBottom: 100,
        color: '#0084C9',
    },
});