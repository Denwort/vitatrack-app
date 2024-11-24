import TabBar from "@/components/TabBar";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import CloseIcon from "@/components/CloseIcon";
import { Tabs } from "expo-router";
import { useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MyButton from "@/components/MyButton";
import MyDropdown from "@/components/MyDropdown";
import MyTextInput from "@/components/MyTextInput";

export default function TabLayout() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showHabits, setShowHabits] = useState<boolean>(false);
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [selectedDuration, setSelectedDuration] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [selectedReminder, setSelectedReminder] = useState<{
    label: string;
    value: string;
  } | null>(null);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints: string[] = ["95%"];

  const habits = {
    run: {
      text: "#A36D05",
      color: "#F5D596",
    },
    read: {
      text: "#469608",
      color: "#ABE77D",
    },
    water: {
      text: "#046482",
      color: "#7DE7D4",
    },
    yoga: {
      text: "#748609",
      color: "#DAE592",
    },
  };

  const duration = [
    { label: "1 month", value: "month" },
    { label: "1 week", value: "week" },
    { label: "Undefined", value: "undefined" },
  ];
  const reminders = [
    { label: "10 min", value: "10" },
    { label: "15 min", value: "15" },
    { label: "30 min", value: "30" },
    { label: "1 hour", value: "1" },
  ];

  const handleBottomSheet = () => {
    setIsOpen(true);
    setShowHabits(true);
    setShowCreate(false);
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
    setIsOpen(false);
  };

  const handlePress = () => {
    setShowHabits(false);
    setShowCreate(true);
  };

  const handleCreate = () => {};

  const newHabitView = () => {
    return (
      <View style={{ padding: 20, flexDirection: "column", flexGrow: 1 }}>
        <View style={styles.sheetContainer}>
          <Text style={styles.title}>New habit</Text>
          <Pressable
            onPress={closeBottomSheet}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#EAEAEA" : "transparent",
              },
              styles.close,
            ]}
          >
            <CloseIcon />
          </Pressable>
        </View>
        <View style={styles.imageContainer}>
          <View style={styles.imageRow}>
            <TouchableOpacity
              style={[
                {
                  backgroundColor: habits.run.color,
                },
                styles.imagePress,
              ]}
              activeOpacity={0.7}
            >
              <Text style={[{ color: habits.run.text }, styles.imageText]}>
                Run
              </Text>
              <Image
                source={require("@/assets/images/run.png")}
                style={{ alignSelf: "flex-end" }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                {
                  backgroundColor: habits.read.color,
                },
                styles.imagePress,
              ]}
              activeOpacity={0.7}
            >
              <Text style={[{ color: habits.read.text }, styles.imageText]}>
                Read
              </Text>
              <Image
                source={require("@/assets/images/read.png")}
                style={{ alignSelf: "flex-end" }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.imageRow}>
            <TouchableOpacity
              style={[
                {
                  backgroundColor: habits.water.color,
                },
                styles.imagePress,
              ]}
              activeOpacity={0.7}
            >
              <Text style={[{ color: habits.water.text }, styles.imageText]}>
                Drink water
              </Text>
              <Image
                source={require("@/assets/images/water.png")}
                style={{ alignSelf: "flex-end" }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                {
                  backgroundColor: habits.yoga.color,
                },
                styles.imagePress,
              ]}
              activeOpacity={0.7}
            >
              <Text style={[{ color: habits.yoga.text }, styles.imageText]}>
                Yoga
              </Text>
              <Image
                source={require("@/assets/images/yoga.png")}
                style={{ alignSelf: "flex-end" }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.create}>
          <MyButton
            label="Create your habit"
            onPress={handlePress}
            outlined={false}
          />
        </View>
      </View>
    );
  };

  const createHabit = () => {
    return (
      <View style={{ padding: 20, flexDirection: "column", flexGrow: 1 }}>
        <View style={styles.sheetContainer}>
          <Text style={styles.title}>Create your habit</Text>
          <Pressable
            onPress={closeBottomSheet}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#EAEAEA" : "transparent",
              },
              styles.close,
            ]}
          >
            <CloseIcon />
          </Pressable>
        </View>
        <View style={styles.mainContainer}>
          <MyTextInput label="Name" onChangeText={setText} />
          <MyDropdown
            label="Duration"
            options={duration}
            selectedValue={selectedDuration}
            setSelectedValue={setSelectedDuration}
          />
          <MyDropdown
            label="Reminder"
            options={reminders}
            selectedValue={selectedReminder}
            setSelectedValue={setSelectedReminder}
          />
        </View>
        <View style={styles.create}>
          <MyButton
            label="Create"
            onPress={closeBottomSheet}
            outlined={false}
          />
        </View>
      </View>
    );
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <Tabs
          screenOptions={{ headerShown: false }}
          tabBar={(props) => (
            <TabBar {...props} onAddHabitPress={handleBottomSheet} />
          )}
        >
          <Tabs.Screen name="index" />
          <Tabs.Screen name="reports" />
          <Tabs.Screen name="addHabit" options={{ href: null }} />
          <Tabs.Screen name="friends" />
          <Tabs.Screen name="settings" />
        </Tabs>
        {isOpen && <View style={styles.overlay} />}
        {isOpen && (
          <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            enableHandlePanningGesture={false}
            enableDynamicSizing={false}
            handleIndicatorStyle={{ backgroundColor: "transparent" }}
          >
            <BottomSheetView style={{ flex: 1 }}>
              {showHabits && newHabitView()}
              {showCreate && createHabit()}
            </BottomSheetView>
          </BottomSheet>
        )}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#00000070",
  },
  sheetContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontFamily: "Poppins-SemiBold",
  },
  close: {
    padding: 3,
    borderRadius: 5,
    marginBottom: 5,
  },
  imageContainer: {
    marginTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "column",
    justifyContent: "center",
    gap: 20,
  },
  mainContainer: {
    marginTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  imageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imagePress: {
    padding: 10,
    borderRadius: 10,
    height: 170,
    width: 163,
  },
  imageText: {
    fontSize: 24,
    fontFamily: "Poppins-SemiBold",
    textAlign: "left",
  },
  create: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 10,
  },
});
