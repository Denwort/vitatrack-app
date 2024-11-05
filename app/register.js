import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const RegisterScreen = ( {navigation} ) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleRegister = () => {
    // Lógica de registro aquí
    console.log('Crear cuenta con', name, email, password);
    navigation.navigate('Login');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Crear Cuenta</Text>
      <TextInput
        style={{
          width: '100%',
          padding: 10,
          marginVertical: 10,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
        }}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
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
      <Button title="Registrar" onPress={handleRegister} />
    </View>
  );
};

export default RegisterScreen;
