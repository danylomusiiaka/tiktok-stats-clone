import { TextInput, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { createTable } from "~/sqlite/operations/table_crud";
import { insertInto, getRowById } from "~/sqlite/operations/crud";
import { mainMetricsGraphInitial, mainMetricsGraphTableStructure } from "~/sqlite/tables/mainMetricsGraph";
import { useID } from "~/contexts/IdContext";
import { Header } from "~/components/Header";
import FormControls from "~/components/FormControls";

export default function MainMetricsGraphForm() {
  const [prevmainMetricsGraph, setPrevmainMetricsGraph] = useState(mainMetricsGraphInitial);
  const [mainMetricsGraph, setmainMetricsGraph] = useState(mainMetricsGraphInitial);
  const { id } = useID();

  const submitForm = async () => {
    try {
      if (JSON.stringify(mainMetricsGraph) === JSON.stringify(prevmainMetricsGraph) || !mainMetricsGraph) return;
      await insertInto("mainMetricsGraph", { ...mainMetricsGraph, id: id });
      setPrevmainMetricsGraph(mainMetricsGraph);
    } catch (error) {
      console.error("Database error:", error);
    }
  };

  useEffect(() => {
    createTable("mainMetricsGraph", mainMetricsGraphTableStructure);
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      submitForm();
    }, 800);

    return () => clearTimeout(handler);
  }, [mainMetricsGraph]);

  useEffect(() => {
    const fetchmainMetricsGraphRow = async () => {
      if (id) {
        const mainMetricsGraph = await getRowById("mainMetricsGraph", id);
        setmainMetricsGraph(mainMetricsGraph as typeof mainMetricsGraphInitial);
      }
    };
    fetchmainMetricsGraphRow();
  }, [id]);

  return (
    <SafeAreaView>
      <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
        <Header>График основных метрик</Header>

        <View className="flex p-3 pt-0">
          <Text className="mt-3 text-xl">Значення по вісі Y (через кому!)</Text>
          <TextInput
            value={mainMetricsGraph?.Ylabels}
            className="h-13 my-2 flex-1 rounded border border-gray-400 p-3 text-[16px]"
            onChangeText={(value) => setmainMetricsGraph({ ...mainMetricsGraph, Ylabels: value })}
            placeholder="напр. 359К, 239К, 119К"
          />
          <Text className="text-xl">Дата від</Text>
          <TextInput
            value={mainMetricsGraph?.XlabelLeft}
            className="h-13 my-2 flex-1 rounded border border-gray-400 p-3 text-[16px]"
            onChangeText={(value) => setmainMetricsGraph({ ...mainMetricsGraph, XlabelLeft: value })}
            placeholder="напр. 15 февр"
          />
          <Text className="text-xl">до</Text>
          <TextInput
            value={mainMetricsGraph?.XlabelRight}
            className="h-13 my-2 flex-1 rounded border border-gray-400 p-3 text-[16px]"
            onChangeText={(value) => setmainMetricsGraph({ ...mainMetricsGraph, XlabelRight: value })}
            placeholder="напр. 24 февр"
          />
          <Text className="text-xl">Точки (через кому!)</Text>
          <TextInput
            value={mainMetricsGraph?.points}
            className="h-13 my-2 flex-1 rounded border border-gray-400 p-3 text-[16px]"
            onChangeText={(value) => setmainMetricsGraph({ ...mainMetricsGraph, points: value })}
            placeholder="напр. 100, 21, 45, 65"
          />

          <FormControls submitForm={submitForm} nextPage="CoefGraphForm" />
        </View>
      </ScrollView>
      <StatusBar />
    </SafeAreaView>
  );
}
