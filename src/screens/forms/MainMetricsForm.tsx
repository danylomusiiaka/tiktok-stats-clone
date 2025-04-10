import { TextInput, Text, View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { createTable } from "~/sqlite/operations/table_crud";
import { insertInto, getRowById } from "~/sqlite/operations/crud";
import { useID } from "~/contexts/IdContext";
import { mainMetricsInitial, mainMetricsTableStructure } from "~/sqlite/tables/mainMetrics";
import { Header } from "~/components/Header";
import FormControls from "~/components/FormControls";

export default function MainMetricsForm() {
  const [prevmainMetrics, setPrevmainMetrics] = useState(mainMetricsInitial);
  const [mainMetrics, setmainMetrics] = useState(mainMetricsInitial);
  const { id } = useID();

  const submitForm = async () => {
    try {
      if (JSON.stringify(mainMetrics) === JSON.stringify(prevmainMetrics) || !mainMetrics) return;
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
          <Header>Основные метрики</Header>
          <View className="flex p-3 pt-0">
            <Text className="mt-3 text-xl">Обновлено</Text>
            <TextInput
              value={mainMetrics?.updated}
              className="h-13 my-2 w-full rounded-md border border-gray-400 p-3 text-[16px]"
              onChangeText={(value) => setmainMetrics({ ...mainMetrics, updated: value })}
              placeholder="напр. 26.02.2025"
            />
            <Text className="text-xl">Просмотры видео</Text>
            <TextInput
              value={mainMetrics?.views}
              className="h-13 my-2 w-full rounded border border-gray-400 p-3 text-[16px]"
              onChangeText={(value) => setmainMetrics({ ...mainMetrics, views: value })}
              placeholder="напр. 523462"
            />
            <Text className="text-xl">Общая продолжительность просмотра</Text>
            <TextInput
              value={mainMetrics?.total_time_viewing}
              className="h-13 my-2 w-full rounded border border-gray-400 p-3 text-[16px]"
              onChangeText={(value) => setmainMetrics({ ...mainMetrics, total_time_viewing: value })}
              placeholder="напр. 123ч.:16мин.:47с."
            />
            <Text className="text-xl">Среднее время просмотра</Text>
            <TextInput
              value={mainMetrics?.average_time_viewing}
              className="h-13 my-2 w-full rounded border border-gray-400 p-3 text-[16px]"
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
              className="h-13 my-2 w-full rounded border border-gray-400 p-3 text-[16px]"
              onChangeText={(value) => setmainMetrics({ ...mainMetrics, new_subscribers: value })}
              placeholder="напр. 323"
            />

            <FormControls submitForm={submitForm} nextPage="MainMetricsGraphForm" />
          </View>
        </ScrollView>
        <StatusBar />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
