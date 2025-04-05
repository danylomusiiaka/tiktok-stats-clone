import { TextInput, Text, Keyboard, TouchableOpacity, View, ScrollView, Button, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { createTable } from "sqlite/queries/table_crud";
import { getAllRows, insertInto, getRowById } from "sqlite/queries/crud";
import { useID } from "contexts/IdContext";
import Chevron from "react-native-vector-icons/Ionicons";
import { mainMetricsInitial, mainMetricsTableStructure } from "sqlite/tables/mainMetrics";

type RootStackParamList = {
  Analytics: undefined;
  TrafficOriginForm: undefined;
};

type FormProps = {
  navigation: StackNavigationProp<RootStackParamList>;
};

export default function MainMetricsForm({ navigation }: FormProps) {
  const [prevmainMetrics, setPrevmainMetrics] = useState(mainMetricsInitial);
  const [mainMetrics, setmainMetrics] = useState(mainMetricsInitial);
  const { id } = useID();

  const submitForm = async () => {
    try {
      if (JSON.stringify(mainMetrics) === JSON.stringify(prevmainMetrics)) return;
      await insertInto("main_metrics", { ...mainMetrics, id: id });
      setPrevmainMetrics(mainMetrics);
    } catch (error) {
      console.error("Database error:", error);
    }
  };

  useEffect(() => {
    createTable("main_metrics", mainMetricsTableStructure);
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      submitForm();
    }, 800);
    return () => clearTimeout(handler);
  }, [mainMetrics]);

  useEffect(() => {
    const fetchMetricsRow = async () => {
      if (id) {
        const metrics = await getRowById("main_metrics", id);
        setmainMetrics(metrics as typeof mainMetricsInitial);
      }
    };
    fetchMetricsRow();
  }, [id]);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <SafeAreaView>
        <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
          <View className="flex-row items-center bg-gray-100 py-2">
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Chevron name="chevron-back" size={25}></Chevron>
            </TouchableOpacity>
            <Text className="ml-2 text-3xl font-semibold">Основные метрики</Text>
          </View>
          <View className="flex p-3 pt-0">
            <Text className="mt-3 text-xl">Обновлено</Text>
            <TextInput
              value={mainMetrics?.updated}
              className="h-13 my-2 w-full rounded-md border border-gray-400 p-3  text-[16px]"
              onChangeText={(value) => setmainMetrics({ ...mainMetrics, updated: value })}
              placeholder="напр. 26.02.2025"
            />
            <Text className="text-xl">Просмотры видео</Text>
            <TextInput
              value={mainMetrics?.views}
              className="h-13 my-2 w-full rounded border border-gray-400 p-3  text-[16px]"
              onChangeText={(value) => setmainMetrics({ ...mainMetrics, views: value })}
              placeholder="напр. 523462"
            />
            <Text className="text-xl">Общая продолжительность просмотра</Text>
            <TextInput
              value={mainMetrics?.total_time_viewing}
              className="h-13 my-2 w-full rounded border border-gray-400 p-3  text-[16px]"
              onChangeText={(value) => setmainMetrics({ ...mainMetrics, total_time_viewing: value })}
              placeholder="напр. 123ч.:16мин.:47с."
            />
            <Text className="text-xl">Среднее время просмотра</Text>
            <TextInput
              value={mainMetrics?.average_time_viewing}
              className="h-13 my-2 w-full rounded border border-gray-400 p-3  text-[16px]"
              onChangeText={(value) => setmainMetrics({ ...mainMetrics, average_time_viewing: value })}
              placeholder="напр. 7.9с"
            />
            <Text className="text-xl">Полностью видео просмотрели</Text>
            <View className="flex-row items-center">
              <TextInput
                value={mainMetrics?.full_video_checked}
                className="h-13 my-2 flex-1 rounded border border-gray-400 p-3 text-[16px]"
                onChangeText={(value) => setmainMetrics({ ...mainMetrics, full_video_checked: value })}
                placeholder="напр. 42.42"
              />
              <Text className="ml-2 text-xl">%</Text>
            </View>
            <Text className="text-xl">Новые подписчики</Text>
            <TextInput
              value={mainMetrics?.new_subscribers}
              className="h-13 my-2 w-full rounded border border-gray-400 p-3  text-[16px]"
              onChangeText={(value) => setmainMetrics({ ...mainMetrics, new_subscribers: value })}
              placeholder="напр. 323"
            />

            <TouchableOpacity
              className="mt-4 flex items-center justify-center rounded-md bg-gray-500 py-4"
              onPress={async () => {
                await submitForm();
                navigation.navigate("TrafficOriginForm");
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
              title="Get all from mainMetrics"
              onPress={() => {
                getAllRows("main_metrics");
              }}
            />
            <Button title="Delete all from mainMetrics" onPress={() => deleteAllRows("main_metrics")} />
            <Button title="Get all tables" onPress={() => getAllTables()} /> */}
          </View>
        </ScrollView>
        <StatusBar />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
