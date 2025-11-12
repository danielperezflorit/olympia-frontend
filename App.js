import React from "react";
import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UsersScreen from "./src/screens/UsersScreen";
import HomeScreen from "./src/screens/HomeScreen";
import TeamsScreen from "./src/screens/TeamsScreen";
import FutbolScreen from "./src/screens/FutbolScreen";
import PadelScreen from "./src/screens/PadelScreen";
import BasquetScreen from "./src/screens/BasquetScreen";
import BalonmanoScreen from "./src/screens/BalonmanoScreen";

const TeamIcon = require('./assets/icons/team.jpg');
const UserIcon = require('./assets/icons/user.jpg');
const HomeIcon = require('./assets/icons/home.jpg');

const Tab = createBottomTabNavigator();

const linking = {
  prefixes:'http://localhost:8081', // Añade aquí tu propio dominio si tienes uno
  config: {
    screens: {
      Home: 'Home',           
      Usuarios: 'Usuarios',   
      Teams: 'Teams',         
      Futbol: 'Futbol',       
      Padel: 'Padel',         
      Basquet: 'Basquet',     
      Balonmano: 'Balonmano', 
    },
  },
};

export default function App() {
  return (
    <NavigationContainer 
      linking={linking}
      fallback={<Text>Cargando...</Text>} 
    >

      <Tab.Navigator
        initialRouteName="Home" // Home pantalla inicial
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: "#43ff4cff",
          tabBarInactiveTintColor: "#ffffffff",
          tabBarStyle: {
            display: 'none',
          },
        })}
      > 

        <Tab.Screen 
          name="Usuarios" 
          component={UsersScreen} 
          options={{ // ⬅️ Usa la prop options
            headerShown: false,
            tabBarIcon: ({size }) => ( // ⬅️ Define la función tabBarIcon
              <Image 
                source={UserIcon} // ⬅️ Usa la imagen importada
                style={{ width: size, height: size, }} // ⬅️ Usa size y color
              />
            ),
          }}
        />
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options ={{
            headerShown: false,
            tabBarIcon: ({size }) => ( // ⬅️ Define la función tabBarIcon
              <Image
                source={HomeIcon} // ⬅️ Usa la imagen importada
                style={{ width: size, height: size, }} // ⬅️ Usa size y color
              />
            ),
          }}
          />
        <Tab.Screen 
          name="Teams" 
          component={TeamsScreen}
          options ={{
            headerShown: false,
            tabBarIcon: ({size }) => ( // ⬅️ Define la función tabBarIcon
              <Image
                source={TeamIcon} // ⬅️ Usa la imagen importada
                style={{ width: size, height: size, }} // ⬅️ Usa size y color
              />
            ),
          }}
          />
          <Tab.Screen 
          name="Futbol" // El nombre de la ruta que usas en navigation.navigate('Futbol')
          component={FutbolScreen}
          options={{
            headerShown: false, // Probablemente quieras ver un encabezado en esta pantalla
            tabBarButton: () => null, // Esto oculta el ícono en la barra inferior (Tab Bar)
          }}
        />
        <Tab.Screen 
          name="Padel" // El nombre de la ruta que usas en navigation.navigate('Futbol')
          component={PadelScreen}
          options={{
            headerShown: false, // Probablemente quieras ver un encabezado en esta pantalla
            tabBarButton: () => null, // Esto oculta el ícono en la barra inferior (Tab Bar)
          }}
        />
        <Tab.Screen 
          name="Basquet" // El nombre de la ruta que usas en navigation.navigate('Futbol')
          component={BasquetScreen}
          options={{
            headerShown: false, // Probablemente quieras ver un encabezado en esta pantalla
            tabBarButton: () => null, // Esto oculta el ícono en la barra inferior (Tab Bar)
          }}
        />
        <Tab.Screen 
          name="Balonmano" // El nombre de la ruta que usas en navigation.navigate('Futbol')
          component={BalonmanoScreen}
          options={{
            headerShown: false, // Probablemente quieras ver un encabezado en esta pantalla
            tabBarButton: () => null, // Esto oculta el ícono en la barra inferior (Tab Bar)
          }}
        />
               
      </Tab.Navigator>
    </NavigationContainer>
  );
}
