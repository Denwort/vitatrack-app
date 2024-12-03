import gatewayAPI from "@/api/gatewayApi";
import { DataProvider, useDataContext } from "@/context/dataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const LoadDataWrapper = ({ children }: { children: React.ReactNode }) => {
  const { setData } = useDataContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem("user");
        if (userId) {
          const response = await gatewayAPI.getAllResponses(userId);
          setData(response);
        }
      } catch (error) {
        console.error("Error al cargar datos del Gateway:", error);
      }
    };

    fetchData();
  }, []);

  return <>{children}</>;
};

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const router = useRouter();

  const [loaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token: string | null = await AsyncStorage.getItem("user");
        setIsAuthenticated(!!token);
      } catch (err) {
        console.error("Token no encontrado");
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (loaded && !isCheckingAuth) {
      SplashScreen.hideAsync();

      if (isAuthenticated) {
        router.replace("/(tabs)");
      } else {
        router.replace("/login");
      }
    }
  }, [loaded, isCheckingAuth, isAuthenticated]);

  if (!loaded || isCheckingAuth) {
    return null;
  }

  return (
    <DataProvider>
      <LoadDataWrapper>
        <Stack>
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ headerShown: false }} />
          <Stack.Screen name="recover" options={{ headerShown: false }} />
          <Stack.Screen name="chat" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </LoadDataWrapper>
    </DataProvider>
  );
}
