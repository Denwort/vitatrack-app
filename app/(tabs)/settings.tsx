import MyButton from "@/components/MyButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
  const router = useRouter();

  const handlePress = async () => {
    try {
      await AsyncStorage.removeItem("user");
      console.log("User eliminado");
      router.replace("/login");
    } catch (err) {
      console.error("Error");
    }
  };

  return (
    <SafeAreaView>
      <MyButton label={"Cerrar sesion"} outlined={true} onPress={handlePress} />
    </SafeAreaView>
  );
}
