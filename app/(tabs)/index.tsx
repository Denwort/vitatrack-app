import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import Calendar from "@/components/Calendar";
import dayjs from "dayjs";
import Habit from "@/components/Habit";

export default function Home() {
  const [selectedValue, setSelectedValue] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(
    dayjs().format("D"),
  );
  const [calendar, setCalendar] = useState<{ date: string; day: string }[]>([]);

  const options = [
    { label: "Daily", value: "day" },
    { label: "Weekly", value: "week" },
    { label: "Monthly", value: "month" },
  ];

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

  useEffect(() => {
    const start: dayjs.Dayjs = dayjs().startOf("month");
    const end: dayjs.Dayjs = dayjs().endOf("month");

    const temp = [];
    let current = start;

    while (current.isBefore(end) || current.isSame(end)) {
      temp.push({
        date: current.format("D"),
        day: current.format("dd"),
      });
      current = current.add(1, "day");
    }

    setCalendar(temp);
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View style={{ height: 96 }}>
        <Calendar
          calendar={calendar}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </View>
      <View style={styles.main}>
        <Habit
          name="Run"
          color={habits.run.color}
          startTime="9:00"
          endTime="10:00"
        />
        <Habit
          name="Read"
          color={habits.read.color}
          startTime="12:00"
          endTime="14:00"
        />
        <Habit
          name="Drink water"
          color={habits.water.color}
          startTime="14:00"
          endTime="14:15"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    gap: 15,
  },
});
