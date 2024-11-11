import MyButton from "@/components/MyButton";
import MyTextInput from "@/components/MyTextInput";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TextBase,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const handleRegister = () => {
    // Lógica de registro aquí
    console.log("Crear cuenta con", name, email, password);
    router.replace("/login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create your account</Text>
      <View style={styles.formContainer}>
        <MyTextInput label={"Name"} onChangeText={setName} />
        <MyTextInput label={"Email"} onChangeText={setEmail} />
        <MyTextInput label={"Password"} onChangeText={setPassword} />
        <MyTextInput label={"Confirm password"} onChangeText={setPassword2} />
        <Image source={require("@/assets/images/register-logo.png")} />
      </View>
      <MyButton
        label="Create account"
        outlined={false}
        onPress={handleRegister}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 32,
    marginTop: 20,
  },
  formContainer: {
    display: "flex",
    gap: 20,
    marginTop: 40,
    marginBottom: 30,
    alignItems: "center",
  },
});

export default RegisterScreen;
