import { StyleSheet, Text, View } from "react-native";

interface HabitsProps {
  name: string;
  color: string;
  startTime: string;
  endTime: string;
}

export default function Habit({
  name,
  color,
  startTime,
  endTime,
}: HabitsProps) {
  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <Text style={styles.text}>{name}</Text>
      <Text style={styles.text}>{`${startTime} - ${endTime}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    width: 360,
    padding: 10,
  },
  text: {
    fontSize: 20,
    fontFamily: "Poppins-Medium",
  },
});
