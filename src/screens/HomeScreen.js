import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>

      <Image style={styles.logo} source={require('../../assets/unite!.png')}/>
      
      <Text style={styles.title}>OLYMPIA</Text>
      <Text style={styles.title}>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#ffffffff",
  },

  logo:{
    position: 'absolute', 
    top: 50,
    left: 20,
    alignitems: 'center',
  },

  title: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0084C9',
  }
});
