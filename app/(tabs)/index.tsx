import MyButton from "@/components/MyButton";
import MyTextInput from "@/components/MyTextInput";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import MyDropdown from "@/components/MyDropdown";
import Calendar from "@/components/Calendar";
import dayjs from "dayjs";

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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Calendar
        calendar={calendar}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </SafeAreaView>
  );
}
