import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import MyTextInput from "@/components/MyTextInput";
import MyButton from "@/components/MyButton";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    console.log("Iniciar sesión con", email, password);
    const token = { email: email, password: password };

    try {
      await AsyncStorage.setItem("user", JSON.stringify(token));
      router.replace("/(tabs)");
    } catch (err) {
      console.error("Error guardando auth");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("@/assets/images/logo.png")}
        style={{
          marginTop: 40,
        }}
      />
      <Text style={styles.title}>VitaTrack</Text>
      <View style={styles.inputs}>
        <MyTextInput label={"Email"} onChangeText={setEmail} />
        <MyTextInput label={"Password"} onChangeText={setPassword} />
      </View>
      <Pressable onPress={() => router.push("/recover")}>
        <Text style={styles.forget}>Forget password?</Text>
      </Pressable>
      <View style={styles.signContainer}>
        <Text style={styles.sign}>Sign in with:</Text>
        <View style={styles.imagesContainer}>
          <Image source={require("@/assets/images/google-logo.png")} />
          <Image
            source={require("@/assets/images/apple-logo.png")}
            style={{ marginTop: 2.5 }}
          />
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <MyButton label="Log in" outlined={false} onPress={handleLogin} />
        <MyButton
          label="Create account"
          outlined={true}
          onPress={() => router.push("/register")}
        />
      </View>
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
    fontSize: 55,
    marginTop: 10,
  },
  inputs: {
    display: "flex",
    gap: 25,
    marginTop: 30,
    marginBottom: 15,
  },
  forget: {
    fontFamily: "Poppins-Medium",
    fontSize: 18,
    textDecorationLine: "underline",
  },
  signContainer: {
    marginTop: 40,
    marginBottom: 40,
  },
  sign: {
    fontFamily: "Poppins-Medium",
    fontSize: 15,
    textAlign: "center",
  },
  imagesContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  buttonsContainer: {
    display: "flex",
    gap: 12,
  },
});

export default LoginScreen;
