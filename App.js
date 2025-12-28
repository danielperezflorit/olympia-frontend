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

import Referee_HomeScreen from "./src/screens/Referee/Referee_HomeScreen";
import Referee_FutbolScreen from "./src/screens/Referee/Sports/Referee_FutbolScreen";
import Referee_PadelScreen from "./src/screens/Referee/Sports/Referee_PadelScreen";
import Referee_BasquetScreen from "./src/screens/Referee/Sports/Referee_BasquetScreen";
import Referee_BalonmanoScreen from "./src/screens/Referee/Sports/Referee_BalonmanoScreen";

import Captain_HomeScreen from "./src/screens/Captain/Captain_HomeScreen";
import Captain_TeamsScreen from "./src/screens/Captain/Gestion/Captain_TeamsScreen";
import Captain_FutbolScreen from "./src/screens/Captain/Sports/Captain_FutbolScreen";
import Captain_PadelScreen from "./src/screens/Captain/Sports/Captain_PadelScreen";
import Captain_BasquetScreen from "./src/screens/Captain/Sports/Captain_BasquetScreen";
import Captain_BalonmanoScreen from "./src/screens/Captain/Sports/Captain_BalonmanoScreen";

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
      <Tab.Screen 
        name="Admin_Competitions" 
        component={Admin_CompetitionsScreen} 
        options={{ tabBarButton: () => null }} />
      <Tab.Screen 
        name="Admin_Futbol" 
        component={Admin_FutbolScreen} 
        options={{ tabBarButton: () => null }} />
      <Tab.Screen 
        name="Admin_Padel" 
        component={Admin_PadelScreen} 
        options={{ tabBarButton: () => null }} />
      <Tab.Screen 
        name="Admin_Basquet" 
        component={Admin_BasquetScreen} 
        options={{ tabBarButton: () => null }} />
      <Tab.Screen 
        name="Admin_Balonmano" 
        component={Admin_BalonmanoScreen} 
        options={{ tabBarButton: () => null }} />
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
      <Tab.Screen 
        name="User_Futbol" 
        component={User_FutbolScreen} 
        options={{ tabBarButton: () => null }} />
      <Tab.Screen 
        name="User_Padel" 
        component={User_PadelScreen} 
        options={{ tabBarButton: () => null }} />
      <Tab.Screen 
        name="User_Basquet" 
        component={User_BasquetScreen} 
        options={{ tabBarButton: () => null }} />
      <Tab.Screen 
        name="User_Balonmano" 
        component={User_BalonmanoScreen} 
        options={{ tabBarButton: () => null }} />
    </Tab.Navigator>
  );
}

function RefereeTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Referee_Home"
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
        name="Referee_Home" 
        component={Referee_HomeScreen}
        options={{ tabBarIcon: ({ size }) => <Image source={HomeIcon} style={{ width: size, height: size }} /> }}
      />
      <Tab.Screen 
        name="Referee_Futbol" 
        component={Referee_FutbolScreen} 
        options={{ tabBarButton: () => null }} />
      <Tab.Screen 
        name="Referee_Padel" 
        component={Referee_PadelScreen} 
        options={{ tabBarButton: () => null }} />
      <Tab.Screen 
        name="Referee_Basquet" 
        component={Referee_BasquetScreen} 
        options={{ tabBarButton: () => null }} />
      <Tab.Screen 
        name="Referee_Balonmano" 
        component={Referee_BalonmanoScreen} 
        options={{ tabBarButton: () => null }} />
    </Tab.Navigator>
  );
}

function CaptainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Captain_Home"
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
        name="Captain_Home" 
        component={Captain_HomeScreen}
        options={{ tabBarIcon: ({ size }) => <Image source={HomeIcon} style={{ width: size, height: size }} /> }}
      />
      <Tab.Screen 
        name="Captain_Teams" 
        component={Captain_TeamsScreen}
        options={{ tabBarIcon: ({ size }) => <Image source={TeamIcon} style={{ width: size, height: size }} /> }}
      />
      <Tab.Screen 
        name="Captain_Futbol" 
        component={Captain_FutbolScreen} 
        options={{ tabBarButton: () => null }} />
      <Tab.Screen 
        name="Captain_Padel" 
        component={Captain_PadelScreen} 
        options={{ tabBarButton: () => null }} />
      <Tab.Screen 
        name="Captain_Basquet" 
        component={Captain_BasquetScreen} 
        options={{ tabBarButton: () => null }} />
      <Tab.Screen 
        name="Captain_Balonmano" 
        component={Captain_BalonmanoScreen} 
        options={{ tabBarButton: () => null }} />
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
        { userRole === null ? (
          <AuthStack />
        ) : userRole === 'Admin' ? (
          <AdminTabs />
        ) : userRole == 'user' ? (
          <UserTabs />
        ) : userRole == 'referee' ? (
          <RefereeTabs />
        ): (
          <CaptainTabs />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}