import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import MyTextInput from "@/components/MyTextInput";
import MyButton from "@/components/MyButton";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import apiURL from "../api/usuariosApi";

const RecoverPasswordScreen = () => {
  const [step, setStep] = useState(1); // Paso inicial
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const router = useRouter();

  const handleSendEmail = async () => {
    console.log("Enviar correo de recuperación a", email);
    try {
      await axios.post(`${apiURL}/auth/forgot`, { correo: email });
      setStep(2); // Avanza al siguiente paso
    } catch (err) {
      console.error("Error enviando el correo de recuperación:", err);
    }
  };

  const handleVerifyCode = async () => {
    console.log("Verificar código", code);
    try {
      setStep(3);
    } catch (err) {
      console.error("Error verificando el código:", err);
    }
  };

  const handleResetPassword = async () => {
    console.log("Restablecer la contraseña a", newPassword);
    try {
      await axios.post(`${apiURL}/auth/reset`, { correo: email, codigo: code, nuevaContrasena: newPassword });
      router.push("/login");
    } catch (err) {
      console.error("Error restableciendo la contraseña:", err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {step === 1 && (
        <>
          <Text style={styles.title}>Recuperar Contraseña</Text>
          <MyTextInput
            label="Correo Electrónico"
            onChangeText={setEmail}
          />
          <MyButton
            label="Enviar Recuperación"
            outlined={false}
            onPress={handleSendEmail}
          />
        </>
      )}

      {step === 2 && (
        <>
          <Text style={styles.title}>Verificar Código</Text>
          <MyTextInput
            label="Código de Verificación"
            onChangeText={setCode}
          />
          <MyButton
            label="Verificar Código"
            outlined={false}
            onPress={handleVerifyCode}
          />
        </>
      )}

      {step === 3 && (
        <>
          <Text style={styles.title}>Nueva Contraseña</Text>
          <MyTextInput
            label="Nueva Contraseña"
            onChangeText={setNewPassword}
          />
          <MyButton
            label="Restablecer"
            outlined={false}
            onPress={handleResetPassword}
          />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 28,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
});

export default RecoverPasswordScreen;
