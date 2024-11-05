import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const RecoverPasswordScreen = ( {navigation} ) => {
  const [step, setStep] = useState(1); // Paso inicial
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSendEmail = () => {
    // Lógica para enviar el correo de recuperación aquí
    console.log('Enviar correo de recuperación a', email);
    setStep(2); // Avanza al siguiente paso
  };

  const handleVerifyCode = () => {
    // Lógica para verificar el código aquí
    console.log('Verificar código', code);
    setStep(3); // Avanza al siguiente paso
  };

  const handleResetPassword = () => {
    // Lógica para restablecer la contraseña aquí
    console.log('Restablecer la contraseña a', newPassword);
    // Aquí podrías agregar un mensaje de éxito o redirigir al usuario
    navigation.navigate('Login');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
      {step === 1 && (
        <>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Recuperar Contraseña</Text>
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
          <Button title="Enviar Correo de Recuperación" onPress={handleSendEmail} />
        </>
      )}

      {step === 2 && (
        <>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Verificar Código</Text>
          <TextInput
            style={{
              width: '100%',
              padding: 10,
              marginVertical: 10,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 5,
            }}
            placeholder="Código de Verificación"
            value={code}
            onChangeText={setCode}
            keyboardType="numeric"
          />
          <Button title="Verificar Código" onPress={handleVerifyCode} />
        </>
      )}

      {step === 3 && (
        <>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Nueva Contraseña</Text>
          <TextInput
            style={{
              width: '100%',
              padding: 10,
              marginVertical: 10,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 5,
            }}
            placeholder="Nueva Contraseña"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />
          <Button title="Restablecer Contraseña" onPress={handleResetPassword} />
        </>
      )}
    </View>
  );
};

export default RecoverPasswordScreen;
