import { TextInput, Text, Keyboard, TouchableOpacity, View, Button, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { createTable, getAllTables } from "sqlite/queries/table_crud";
import { getAllRows, insertInto, deleteAllRows, getRowById } from "sqlite/queries/crud";
import { statsInitial, statsTableStructure } from "sqlite/tables/statsTable";
import { useID } from "contexts/IdContext";
import Chevron from "react-native-vector-icons/Ionicons";

type RootStackParamList = {
  Analytics: undefined;
  MainMetricsForm: undefined;
};

type FormProps = {
  navigation: StackNavigationProp<RootStackParamList>;
};

export default function StatsForm({ navigation }: FormProps) {
  const [prevStats, setPrevStats] = useState(statsInitial);
  const [stats, setStats] = useState(statsInitial);
  const { id } = useID();

  const submitForm = async () => {
    try {
      if (JSON.stringify(stats) === JSON.stringify(statsInitial) || JSON.stringify(stats) === JSON.stringify(prevStats)) return;
      await insertInto("stats", { ...stats, id: id });
      setPrevStats(stats);
      Keyboard.dismiss();
    } catch (error) {
      console.error("Database error:", error);
    }
  };

  useEffect(() => {
    createTable("stats", statsTableStructure);
  }, []);

  useEffect(() => {
    const fetchStatsRow = async () => {
      if (id) {
        const stats = await getRowById("stats", id);
        setStats(stats as typeof statsInitial);
      }
    };
    fetchStatsRow();
  }, [id]);

  return (
    <SafeAreaView>
      <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center py-2 bg-gray-100">
          <TouchableOpacity
            onPress={async () => {
              await submitForm();
              navigation.goBack();
            }}
          >
            <Chevron name="chevron-back" size={25}></Chevron>
          </TouchableOpacity>
          <Text className="ml-2 text-3xl font-semibold">Загальна статистика</Text>
        </View>
        <View className="flex p-3 pt-0">
          <Text className="mt-3 text-xl">Тривалість відео</Text>
          <TextInput
            value={stats?.video_duration}
            className="h-13 my-2 w-full rounded-md border border-gray-400 p-3   text-[16px]"
            onChangeText={(value) => setStats({ ...stats, video_duration: value })}
            placeholder="напр. 8.8c"
          />
          <Text className="text-xl">Дата опублікування</Text>
          <TextInput
            value={stats?.publish_date}
            className="h-13 my-2 w-full rounded border border-gray-400 p-3  text-[16px]"
            onChangeText={(value) => setStats({ ...stats, publish_date: value })}
            placeholder="напр. 12 февр 2025, 18:25"
          />
          <Text className="text-xl">Кількість переглядів</Text>
          <TextInput
            value={stats?.views}
            className="h-13 my-2 w-full rounded border border-gray-400 p-3  text-[16px]"
            onChangeText={(value) => setStats({ ...stats, views: value })}
            placeholder="напр. 563К"
          />
          <Text className="text-xl">Кількість лайків</Text>
          <TextInput
            value={stats?.likes}
            className="h-13 my-2 w-full rounded border border-gray-400 p-3  text-[16px]"
            onChangeText={(value) => setStats({ ...stats, likes: value })}
            placeholder="напр. 59K"
          />
          <Text className="text-xl">Кількість коментарів</Text>
          <TextInput
            value={stats?.comments}
            className="h-13 my-2 w-full rounded border border-gray-400 p-3  text-[16px]"
            onChangeText={(value) => setStats({ ...stats, comments: value })}
            placeholder="напр. 942"
          />
          <Text className="text-xl">Кількість поділившихся</Text>
          <TextInput
            value={stats?.shares}
            className="h-13 my-2 w-full rounded border border-gray-400 p-3  text-[16px]"
            onChangeText={(value) => setStats({ ...stats, shares: value })}
            placeholder="напр. 39К"
          />
          <Text className="text-xl">Кількість збережень</Text>
          <TextInput
            value={stats?.saved}
            className="h-13 my-2 w-full rounded border border-gray-400 p-3  text-[16px]"
            onChangeText={(value) => setStats({ ...stats, saved: value })}
            placeholder="напр. 5,021"
          />
          <TouchableOpacity
            className="mt-4 flex items-center justify-center rounded-md bg-gray-500 py-4"
            onPress={async () => {
              await submitForm();
              navigation.navigate("MainMetricsForm");
            }}
          >
            <Text className="text-lg font-semibold color-white">Наступна форма</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="mt-2 flex items-center justify-center rounded-md bg-blue-500 py-4"
            onPress={async () => {
              await submitForm();
              navigation.navigate("Analytics");
            }}
          >
            <Text className="text-lg font-semibold color-white">Переглянути попередній вигляд</Text>
          </TouchableOpacity>
          
          {/* Admin Buttons */}
          {/* <Button
            title="Get all from stats"
            onPress={() => {
              getAllRows("stats");
            }}
          />
          <Button title="Delete all from stats" onPress={() => deleteAllRows("stats")} />
          <Button title="Get all tables" onPress={() => getAllTables()} /> */}
        </View>
      </ScrollView>
      <StatusBar />
    </SafeAreaView>
  );
}
