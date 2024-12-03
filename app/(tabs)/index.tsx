import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState, useRef } from "react";
import Calendar from "@/components/Calendar";
import dayjs from "dayjs";
import Habit from "@/components/Habit";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import CloseIcon from "@/components/CloseIcon";
import MyButton from "@/components/MyButton";
import MyDropdown from "@/components/MyDropdown";
import TimeRangePicker from "@/components/TimePicker";

export default function Home() {
  const [selectedValue, setSelectedValue] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(
    dayjs().format("D")
  );
  const [calendar, setCalendar] = useState<{ date: string; day: string }[]>([]);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [selectedHabit, setSelectedHabit] = useState<{
    name: string;
    color: string;
    startTime: string;
    endTime: string;
    completed?: boolean;
  } | null>(null);
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(
    new Date(new Date().getTime() + 60000)
  );
  const [selectedReminder, setSelectedReminder] = useState<{
    label: string;
    value: string;
  } | null>(null);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints: string[] = ["50%"];

  const options = [
    { label: "Daily", value: "day" },
    { label: "Weekly", value: "week" },
    { label: "Monthly", value: "month" },
  ];

  const reminders = [
    { label: "10 min", value: "10" },
    { label: "15 min", value: "15" },
    { label: "30 min", value: "30" },
    { label: "1 hour", value: "1" },
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

  const handleHabitPress = (habit: {
    name: string;
    color: string;
    startTime: string;
    endTime: string;
    completed?: boolean;
  }) => {
    setSelectedHabit(habit);
    const [startHour, startMinute] = habit.startTime.split(':');
    const [endHour, endMinute] = habit.endTime.split(':');
    
    const newStartTime = new Date();
    newStartTime.setHours(parseInt(startHour), parseInt(startMinute));
    
    const newEndTime = new Date();
    newEndTime.setHours(parseInt(endHour), parseInt(endMinute));
    
    setStartTime(newStartTime);
    setEndTime(newEndTime);
    setIsEditOpen(true);
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
    setIsEditOpen(false);
    setSelectedHabit(null);
  };

  const handleSave = () => {
    const updatedHabit = {
      ...selectedHabit!,
      startTime: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
      endTime: endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
      reminder: selectedReminder?.value
    };
    console.log('Habit updated:', updatedHabit);
    closeBottomSheet();
  };

  const handleComplete = () => {
    if (selectedHabit) {
      const updatedHabit = {
        ...selectedHabit,
        completed: true
      };
      console.log('Habit completed:', updatedHabit);
      closeBottomSheet();
    }
  };

  const EditHabitView = () => {
    if (!selectedHabit) return null;

    return (
      <View style={{ padding: 20, flexDirection: "column", flexGrow: 1 }}>
        <View style={styles.sheetContainer}>
          <Text style={styles.title}>{selectedHabit.name}</Text>
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
          <MyDropdown
            label="Reminder"
            options={reminders}
            selectedValue={selectedReminder}
            setSelectedValue={setSelectedReminder}
          />
          <TimeRangePicker
            startTime={startTime}
            endTime={endTime}
            setStartTime={setStartTime}
            setEndTime={setEndTime}
          />
        </View>
        <View style={{ width: 'auto', alignSelf: 'center', marginTop: 10 }}>
          <MyButton 
            label="Complete" 
            onPress={handleComplete} 
            outlined={true} 
          />
        </View>
        <View style={{ width: 'auto', alignSelf: 'center', marginTop: 10, marginBottom: 10 }}>
          <MyButton 
            label="Save changes" 
            onPress={handleSave} 
            outlined={false} 
          />
        </View>
      </View>
    );
  };

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
          onPress={() => handleHabitPress({
            name: "Run",
            color: habits.run.color,
            startTime: "9:00",
            endTime: "10:00"
          })}
        />
        <Habit
          name="Read"
          color={habits.read.color}
          startTime="12:00"
          endTime="14:00"
          onPress={() => handleHabitPress({
            name: "Read",
            color: habits.read.color,
            startTime: "12:00",
            endTime: "14:00"
          })}
        />
        <Habit
          name="Drink water"
          color={habits.water.color}
          startTime="14:00"
          endTime="14:15"
          onPress={() => handleHabitPress({
            name: "Drink water",
            color: habits.water.color,
            startTime: "14:00",
            endTime: "14:15"
          })}
        />
      </View>
      {isEditOpen && <View style={styles.overlay} />}
      {isEditOpen && (
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          enableHandlePanningGesture={false}
          enableDynamicSizing={false}
          handleIndicatorStyle={{ backgroundColor: "transparent" }}
          onClose={() => setIsEditOpen(false)}
        >
          <BottomSheetView style={{ flex: 1 }}>
            <EditHabitView />
          </BottomSheetView>
        </BottomSheet>
      )}
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
  mainContainer: {
    marginTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    marginBottom: 10,
    gap: 10,
    paddingHorizontal: 10,
  }
});