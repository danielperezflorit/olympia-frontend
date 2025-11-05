import React from "react";
import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UsersScreen from "./src/screens/UsersScreen";
import HomeScreen from "./src/screens/HomeScreen";
import TeamsScreen from "./src/screens/TeamsScreen";

const TeamIcon = require('./assets/icons/team.jpg');
const UserIcon = require('./assets/icons/user.jpg');
const HomeIcon = require('./assets/icons/home.jpg');

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home" // Home pantalla inicial
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: "#43ff4cff",  // Color del texto cuando está seleccionado
          tabBarInactiveTintColor: "#ffffffff",   // Color del texto cuando no está seleccionado
          tabBarStyle: {
            display: "flex", 
            backgroundColor: "#0084C9"             // Estilo de la barra
          },
        })}
      > 
        
        <Tab.Screen 
          name="Usuarios" 
          component={UsersScreen} 
          options={{ // ⬅️ Usa la prop options
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
            tabBarIcon: ({size }) => ( // ⬅️ Define la función tabBarIcon
              <Image
                source={TeamIcon} // ⬅️ Usa la imagen importada
                style={{ width: size, height: size, }} // ⬅️ Usa size y color
              />
            ),
          }}
          />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
