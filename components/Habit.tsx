import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

interface HabitsProps {
  name: string;
  color: string;
  startTime: string;
  endTime: string;
  completed?: boolean;
  onPress?: () => void;
  onLongPress?: () => void; // Nueva prop para manejar el evento de toque prolongado
}

export default function Habit({
  name,
  color,
  startTime,
  endTime,
  completed = false,
  onPress,
  onLongPress, // Se recibe la nueva prop
}: HabitsProps) {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: color }]}
      onPress={onPress}
      onLongPress={onLongPress} // Se agrega el evento de toque prolongado
      activeOpacity={0.7}
    >
      <View style={styles.leftContent}>
        <Text
          style={[
            styles.text,
            completed && styles.completedText,
          ]}
        >
          {name}
        </Text>
        {completed && (
          <View style={styles.checkContainer}>
            <View style={styles.checkMark} />
          </View>
        )}
      </View>
      <Text
        style={[
          styles.text,
          completed && styles.completedText,
        ]}
      >
        {`${startTime} - ${endTime}`}
      </Text>
    </TouchableOpacity>
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
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  text: {
    fontSize: 20,
    fontFamily: "Poppins-Medium",
  },
  completedText: {
    textDecorationLine: "line-through",
    opacity: 0.7,
  },
  checkContainer: {
    backgroundColor: "white",
    borderRadius: 50,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  checkMark: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "black",
  },
});