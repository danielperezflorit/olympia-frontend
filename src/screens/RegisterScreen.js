import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    StyleSheet, 
    Image, 
    Alert,
    ActivityIndicator,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { Picker } from "@react-native-picker/picker";
import { addUser } from '../services/userService'; 
import { fetchUniversities } from '../services/universityService';
import { fetchTeams } from '../services/teamService';

export default function RegisterScreen({ navigation }) {
    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [availableUniversities, setAvailableUniversities] = useState([]);
    const [selectedUniversity, setSelectedUniversity] = useState("");
    
    const [availableTeams, setAvailableTeams] = useState([]); 
    const [selectedTeam, setSelectedTeam] = useState(""); 
    
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function loadData() {
            try {
                const universities = await fetchUniversities();
                setAvailableUniversities(universities);

                const teams = await fetchTeams();
                setAvailableTeams(teams);
            } catch (error) {
                console.error("Error cargando datos:", error);
                Alert.alert("Error", "No se pudieron cargar las listas de universidades o equipos");
            }
        }
        loadData();
    }, []);

    const handleRegister = async () => {
        if (!name || !mail || !password || !confirmPassword) {
            Alert.alert('Campos incompletos', 'Por favor rellena todos los campos de texto.');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden.');
            return;
        }

        if (!selectedUniversity || !selectedTeam) {
             Alert.alert('Faltan datos', 'Por favor selecciona una Universidad y un Equipo.');
             return;
        }

        setLoading(true);

        try {
            const newUser = {
                name: name,
                mail: mail,
                password: password,
                type: 'user',
                university: selectedUniversity || undefined,
                team: selectedTeam || undefined
            };

            await addUser(newUser);

            Alert.alert(
                'Registro Exitoso', 
                'Tu cuenta ha sido creada. Ahora puedes iniciar sesión.',
                [
                    { text: "Ir al Login", onPress: () => navigation.navigate('Login') }
                ]
            );

        } catch (error) {
            console.error(error);
            const msg = error.response?.data?.message || 'No se pudo crear el usuario.';
            Alert.alert('Error en el registro', msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                
                <View style={styles.logoContainer}>
                    <Image 
                        source={require('../../assets/unite!.png')} 
                        style={styles.logo}
                    />
                    <Text style={styles.appTitle}>OLYMPIA</Text>
                    <Text style={styles.subtitle}>Crea tu cuenta nueva</Text>
                </View>

                <View style={styles.formContainer}>
                    
                    <Text style={styles.label}>Nombre Completo</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ej. Daniel García"
                        placeholderTextColor="#aaa"
                        value={name}
                        onChangeText={setName}
                    />

                    <Text style={styles.label}>Correo Electrónico</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="ejemplo@estudiantat.upc.edu"
                        placeholderTextColor="#aaa"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={mail}
                        onChangeText={setMail}
                    />

                    <Text style={styles.label}>Contraseña</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Mínimo 6 caracteres"
                        placeholderTextColor="#aaa"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />

                    <Text style={styles.label}>Confirmar Contraseña</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Repite tu contraseña"
                        placeholderTextColor="#aaa"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />

                    <Text style={styles.label}>Seleccionar Universidad</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={selectedUniversity}
                            onValueChange={(itemValue) => setSelectedUniversity(itemValue)}
                            style={styles.picker} 
                        >
                            <Picker.Item label="--- Seleccione una universidad ---" value="" color="#aaa" />
                            {availableUniversities.map(uni => (
                                <Picker.Item key={uni._id} label={uni.name} value={uni._id} />
                            ))}
                        </Picker>
                    </View>

                    <Text style={styles.label}>Seleccionar Equipo</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={selectedTeam}
                            onValueChange={(itemValue) => setSelectedTeam(itemValue)}
                        >
                            <Picker.Item label="--- Seleccione un equipo ---" value="" color="#aaa"/>
                            {availableTeams.map(team => (
                                <Picker.Item key={team._id} label={team.name} value={team._id} />
                            ))}
                        </Picker>
                    </View>

                    <TouchableOpacity 
                        style={styles.registerButton} 
                        onPress={handleRegister}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.registerButtonText}>Registrarse</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.loginLink}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.loginText}>
                            ¿Ya tienes cuenta? <Text style={styles.loginTextBold}>Inicia Sesión</Text>
                        </Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#ffffffff',
        justifyContent: 'center',
        paddingHorizontal: 30,
        paddingVertical: 40,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    logo: {
        width: 250,
        height: 70,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    appTitle: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#0084C9',
        letterSpacing: 2,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
    },
    formContainer: {
        width: '100%',
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 8,
        fontWeight: '600',
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#0084C9',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
        color: '#000',
        backgroundColor: '#f9f9f9',
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#0084C9',
        borderRadius: 10,
        marginBottom: 15,
        backgroundColor: '#f9f9f9',
        justifyContent: 'center', 
        height: Platform.OS === 'android' ? 50 : undefined, 
    },
    registerButton: {
        width: '100%',
        height: 55,
        backgroundColor: '#0084C9',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    registerButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginLink: {
        marginTop: 20,
        alignItems: 'center',
        marginBottom: 20,
    },
    loginText: {
        color: '#666',
        fontSize: 14,
    },
    loginTextBold: {
        color: '#0084C9',
        fontWeight: 'bold',
    },
});