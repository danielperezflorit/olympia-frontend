import React, { useState, useMemo, createContext } from "react";
import { Image, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from './src/context/AuthContext';

import Admin_UsersScreen from "./src/screens/Admin/Gestion/Admin_UsersScreen";
import Admin_HomeScreen from "./src/screens/Admin/Admin_HomeScreen";
import Admin_UniversitiesScreen from "./src/screens/Admin/Gestion/Admin_UniversitiesScreen";
import Admin_CompetitionsScreen from "./src/screens/Admin/Gestion/Admin_CompetitionsScreen";
import Admin_TeamsScreen from "./src/screens/Admin/Gestion/Admin_TeamsScreen";
import Admin_FutbolScreen from "./src/screens/Admin/Sports/Admin_FutbolScreen";
import Admin_PadelScreen from "./src/screens/Admin/Sports/Admin_PadelScreen";
import Admin_BasquetScreen from "./src/screens/Admin/Sports/Admin_BasquetScreen";
import Admin_BalonmanoScreen from "./src/screens/Admin/Sports/Admin_BalonmanoScreen";

import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";

import User_HomeScreen from "./src/screens/User/User_HomeScreen";
import User_FutbolScreen from "./src/screens/User/Sports/User_FutbolScreen";
import User_PadelScreen from "./src/screens/User/Sports/User_PadelScreen";
import User_BasquetScreen from "./src/screens/User/Sports/User_BasquetScreen";
import User_BalonmanoScreen from "./src/screens/User/Sports/User_BalonmanoScreen";

const TeamIcon = require('./assets/icons/team.jpg');
const UserIcon = require('./assets/icons/user.jpg');
const HomeIcon = require('./assets/icons/home.jpg');

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

function AdminTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Admin_Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#43ff4cff",
        tabBarInactiveTintColor: "#ffffff",
        tabBarStyle: { display: 'none' }, 
      }}
    >
      <Tab.Screen 
        name="Login" 
        component={LoginScreen}
        options={{ tabBarIcon: ({ size }) => <Image source={HomeIcon} style={{ width: size, height: size }} /> }}
      />
      <Tab.Screen 
        name="Register" 
        component={RegisterScreen}
        options={{ tabBarIcon: ({ size }) => <Image source={HomeIcon} style={{ width: size, height: size }} /> }}
      />
      <Tab.Screen 
        name="Admin_Home" 
        component={Admin_HomeScreen}
        options={{ tabBarIcon: ({ size }) => <Image source={HomeIcon} style={{ width: size, height: size }} /> }}
      />
      <Tab.Screen 
        name="Admin_Users" 
        component={Admin_UsersScreen}
        options={{ tabBarIcon: ({ size }) => <Image source={UserIcon} style={{ width: size, height: size }} /> }}
      />
      <Tab.Screen 
        name="Admin_Universities" 
        component={Admin_UniversitiesScreen}
        options={{ tabBarIcon: ({ size }) => <Image source={UserIcon} style={{ width: size, height: size }} /> }}
      />
      <Tab.Screen 
        name="Admin_Teams" 
        component={Admin_TeamsScreen}
        options={{ tabBarIcon: ({ size }) => <Image source={TeamIcon} style={{ width: size, height: size }} /> }}
      />
      <Tab.Screen name="Admin_Competitions" component={Admin_CompetitionsScreen} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="Admin_Futbol" component={Admin_FutbolScreen} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="Admin_Padel" component={Admin_PadelScreen} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="Admin_Basquet" component={Admin_BasquetScreen} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="Admin_Balonmano" component={Admin_BalonmanoScreen} options={{ tabBarButton: () => null }} />
    </Tab.Navigator>
  );
}

function UserTabs() {
  return (
    <Tab.Navigator
      initialRouteName="User_Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#43ff4cff",
        tabBarInactiveTintColor: "#ffffff",
        tabBarStyle: { display: 'none' },
      }}
    >
      <Tab.Screen 
        name="Login" 
        component={LoginScreen}
        options={{ tabBarIcon: ({ size }) => <Image source={HomeIcon} style={{ width: size, height: size }} /> }}
      />
      <Tab.Screen 
        name="Register" 
        component={RegisterScreen}
        options={{ tabBarIcon: ({ size }) => <Image source={HomeIcon} style={{ width: size, height: size }} /> }}
      />
      <Tab.Screen 
        name="User_Home" 
        component={User_HomeScreen}
        options={{ tabBarIcon: ({ size }) => <Image source={HomeIcon} style={{ width: size, height: size }} /> }}
      />
      <Tab.Screen name="User_Futbol" component={User_FutbolScreen} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="User_Padel" component={User_PadelScreen} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="User_Basquet" component={User_BasquetScreen} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="User_Balonmano" component={User_BalonmanoScreen} options={{ tabBarButton: () => null }} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [userRole, setUserRole] = useState(null); 

  const authContext = useMemo(() => ({
    signIn: (rol) => { setUserRole(rol); },
    signOut: () => { setUserRole(null); }, 
  }), []);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer fallback={<Text>Cargando...</Text>}>
        {userRole === null ? (
          <AuthStack />
        ) : userRole === 'Admin' ? (
          <AdminTabs />
        ) : (
          <UserTabs />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}