import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './login';
import RegisterScreen from './register'; // Asegúrate de que la ruta sea correcta
import RecoverPasswordScreen from './recover';
import TabsScreen from './(tabs)/_layout';

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

const Stack = createNativeStackNavigator();

export default function App() {

  const [loaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }




  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Login">
              {(props) => <LoginScreen {...props} setIsAuthenticated={setIsAuthenticated} />}
            </Stack.Screen>
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="RecoverPassword" component={RecoverPasswordScreen} />
            
          </>
        ) : (
          <Stack.Screen
            name="Home"
            component={TabsScreen}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
