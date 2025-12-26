import React, { useState, useContext } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    StyleSheet, 
    Image, 
    Alert,
    ActivityIndicator 
} from 'react-native';
import { loginUser } from '../services/userService';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { signIn } = useContext(AuthContext);

    const handleLogin = async () => {
        if (!mail || !password) {
            Alert.alert('Error', 'Por favor ingresa correo y contraseña');
            return;
        }

        setLoading(true);

        try {
            const data = await loginUser({ mail, password });
            console.log('Login exitoso:', data.user.name);
            let userType = data.user.type; 
            if (userType === 'admin') userType = 'Admin';
            signIn(userType); 

        } catch (error) {
            console.error(error);
            const msg = error.response?.data?.message || 'Hubo un problema al iniciar sesión';
            Alert.alert('Error de acceso', msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image 
                    source={require('../../assets/unite!.png')} 
                    style={styles.logo}
                />
                <Text style={styles.appTitle}>OLYMPIA</Text>
            </View>

            <View style={styles.formContainer}>
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
                    placeholder="********"
                    placeholderTextColor="#aaa"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity 
                    style={styles.loginButton} 
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.loginButtonText}>Entrar</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.registerLink}
                    onPress={() => navigation.navigate('Register')} 
                >
                    <Text style={styles.registerText}>
                        ¿No tienes cuenta? <Text style={styles.registerTextBold}>Regístrate aquí</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffffff', 
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 50,
    },
    logo: {
        width: 250,
        height: 80,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    appTitle: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#0084C9', 
        letterSpacing: 2,
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
        marginBottom: 20,
        fontSize: 16,
        color: '#000',
        backgroundColor: '#f9f9f9',
    },
    loginButton: {
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
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    registerLink: {
        marginTop: 20,
        alignItems: 'center',
    },
    registerText: {
        color: '#666',
        fontSize: 14,
    },
    registerTextBold: {
        color: '#0084C9',
        fontWeight: 'bold',
    },
});