import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { StackNavigationProp } from "@react-navigation/stack";
import Plus from "react-native-vector-icons/Entypo";
import Clock from "react-native-vector-icons/FontAwesome6";
import Chevron from "react-native-vector-icons/Ionicons";
import { useID } from "contexts/IdContext";
import uuid from "react-native-uuid";
import { useEffect, useState, useCallback } from "react";
import { deleteRowById, getAllRows } from "sqlite/queries/crud";
import { statsInitial } from "sqlite/tables/stats";
import { useFocusEffect } from "@react-navigation/native";

type RootStackParamList = {
  StatsForm: undefined;
  Analytics: undefined;
};
type StartPageProps = {
  navigation: StackNavigationProp<RootStackParamList>;
};

export default function StartPage({ navigation }: StartPageProps) {
  const { setId } = useID();

  const [history, setHistory] = useState([statsInitial]);

  const fetchRowByID = async () => {
    try {
      const data = (await getAllRows("stats")) as (typeof statsInitial)[];

      if (!data || data.length === 0) {
        setHistory([]);
        return;
      }

      const sortedByDate = data.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());

      const formattedData = sortedByDate.map((item) => ({
        ...item,
        lastUpdated: `${new Date(item.lastUpdated).toLocaleDateString("uk-UA", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        })} ${new Date(item.lastUpdated).toLocaleTimeString("uk-UA", {
          hour: "2-digit",
          minute: "2-digit",
        })}`,
      }));

      setHistory(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setHistory([]);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchRowByID();
    }, [])
  );

  const handleDeleteItem = async (id: string) => {
    try {
      const success = await deleteRowById(id);
      if (success) {
        console.log("Item deleted:", id);
        setHistory(history.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <SafeAreaView className="p-4">
      <ScrollView className="h-full">
        <TouchableOpacity
          className="mt-2 flex-row items-center justify-center rounded-md bg-green-600 py-4"
          onPress={() => {
            const newId = uuid.v4().toString();
            console.log("Creating new analysis with ID:", newId);
            setId(newId);
            navigation.navigate("StatsForm");
          }}
        >
          <Plus name="plus" size={25} color="white" />
          <Text className="ml-2 text-xl font-semibold text-white">Створити аналіз відео</Text>
        </TouchableOpacity>
        <View className="my-5 border border-b border-gray-300"></View>
        <View className="mt-4 flex-row items-center">
          <Clock name="clock-rotate-left" size={25} />
          <Text className="m-2 mt-0 text-2xl">Історія створення</Text>
        </View>
        {history.length !== 0 && <Text className="text-sm text-gray-400">* Для видалення окремого елементу зажми його</Text>}
        {history.length === 0 && <Text className="mt-4 text-lg">Історія створення аналізу відео пуста</Text>}
        {history.map((item) => (
          <TouchableOpacity
            key={item.id}
            className="mt-4 flex-row items-center justify-between rounded-md border-2 border-gray-300"
            onPress={() => {
              console.log("Selected item:", item.id);
              setId(item.id);
              navigation.navigate("StatsForm");
            }}
            onLongPress={() => handleDeleteItem(item.id)}
          >
            <View className="flex-row items-center">
              <Image source={item.picture ? { uri: item.picture } : undefined} style={{ width: 80, height: 80 }} className="rounded-md" />
              <View className="flex">
                <Text className="mb-1.5 ml-2 text-gray-400">Останнє редагування</Text>
                <Text className="ml-2 text-gray-400">{item.lastUpdated}</Text>
              </View>
            </View>
            <Chevron name="chevron-forward" size={30} color="#9ca3af"></Chevron>
          </TouchableOpacity>
        ))}

        <StatusBar />
      </ScrollView>
    </SafeAreaView>
  );
}
