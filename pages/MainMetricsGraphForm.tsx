import { TextInput, Text, TouchableOpacity, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { createTable } from "sqlite/queries/table_crud";
import { insertInto, getRowById } from "sqlite/queries/crud";
import { mainMetricsGraphInitial, mainMetricsGraphTableStructure } from "sqlite/tables/mainMetricsGraph";
import { useID } from "contexts/IdContext";
import { Header } from "components/Header";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export default function MainMetricsGraphForm() {
  const [prevmainMetricsGraph, setPrevmainMetricsGraph] = useState(mainMetricsGraphInitial);
  const [mainMetricsGraph, setmainMetricsGraph] = useState(mainMetricsGraphInitial);
  const { id } = useID();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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
        </View>
      </ScrollView>
      <StatusBar />
    </SafeAreaView>
  );
}
