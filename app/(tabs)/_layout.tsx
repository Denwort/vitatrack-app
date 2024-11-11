import TabBar from "@/components/TabBar";
import { Tabs } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function TabLayout() {
  return (
    <SafeAreaProvider>
      <Tabs
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <TabBar {...props} />}
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="reports" />
        <Tabs.Screen name="addHabit" />
        <Tabs.Screen name="friends" />
        <Tabs.Screen name="settings" />
      </Tabs>
    </SafeAreaProvider>
  );
}
