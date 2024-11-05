import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const LoginScreen = ({ navigation, setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Lógica de autenticación aquí
    console.log('Iniciar sesión con', email, password);
    setIsAuthenticated(true);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Iniciar Sesión</Text>
      <TextInput
        style={{
          width: '100%',
          padding: 10,
          marginVertical: 10,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
        }}
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={{
          width: '100%',
          padding: 10,
          marginVertical: 10,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
        }}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Iniciar Sesión" onPress={handleLogin} />
      <Button title="Crear Cuenta" onPress={() => navigation.navigate('Register')} />
      <Button title="Recuperar Contraseña" onPress={() => navigation.navigate('RecoverPassword')} />
    </View>
  );
};

export default LoginScreen;
