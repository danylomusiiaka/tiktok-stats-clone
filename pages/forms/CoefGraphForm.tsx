import { TextInput, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { createTable } from "sqlite/operations/table_crud";
import { insertInto, getRowById } from "sqlite/operations/crud";
import { coefGraphInitial, coefGraphTableStructure } from "sqlite/tables/coefGraph";
import { useID } from "contexts/IdContext";
import { Header } from "components/Header";
import FormControls from "components/FormControls";

export default function CoefGraphForm() {
  const [prevcoefGraph, setPrevcoefGraph] = useState(coefGraphInitial);
  const [coefGraph, setcoefGraph] = useState(coefGraphInitial);
  const { id } = useID();

  const submitForm = async () => {
    try {
      if (JSON.stringify(coefGraph) === JSON.stringify(prevcoefGraph) || !coefGraph) return;
      await insertInto("coefGraph", { ...coefGraph, id: id });
      setPrevcoefGraph(coefGraph);
    } catch (error) {
      console.error("Database error:", error);
    }
  };

  useEffect(() => {
    createTable("coefGraph", coefGraphTableStructure);
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      submitForm();
    }, 800);

    return () => clearTimeout(handler);
  }, [coefGraph]);

  useEffect(() => {
    const fetchcoefGraphRow = async () => {
      if (id) {
        const coefGraph = await getRowById("coefGraph", id);
        setcoefGraph(coefGraph as typeof coefGraphInitial);
      }
    };
    fetchcoefGraphRow();
  }, [id]);

  return (
    <SafeAreaView>
      <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
        <Header>График коэффициента удержания</Header>

        <View className="flex p-3 pt-3">
          <Text className="text-xl">Смотрели ваше видео на</Text>
          <View className="flex-row items-center">
            <TextInput
              value={coefGraph?.percent}
              className="h-13 my-2 flex-1 rounded border border-gray-400 p-3 text-[16px]"
              onChangeText={(value) => setcoefGraph({ ...coefGraph, percent: value })}
              placeholder="напр. 83"
            />
            <Text className="ml-2 text-xl">%</Text>
          </View>
          <Text className="text-xl">Большинство поставили прекратили смотреть на</Text>
          <TextInput
            value={coefGraph?.featured_time}
            className="h-13 my-2 flex-1 rounded border border-gray-400 p-3 text-[16px]"
            onChangeText={(value) => setcoefGraph({ ...coefGraph, featured_time: value })}
            placeholder="напр. 0:01"
          />
          <Text className="text-xl">Тривалість відео</Text>
          <TextInput
            value={coefGraph?.video_time}
            className="h-13 my-2 flex-1 rounded border border-gray-400 p-3 text-[16px]"
            onChangeText={(value) => setcoefGraph({ ...coefGraph, video_time: value })}
            placeholder="напр. 00:09"
          />
          <Text className="text-xl">Точки (через кому!)</Text>
          <TextInput
            value={coefGraph?.points}
            className="h-13 my-2 flex-1 rounded border border-gray-400 p-3 text-[16px]"
            onChangeText={(value) => setcoefGraph({ ...coefGraph, points: value })}
            placeholder="напр. 100, 21, 45, 65"
          />

          <FormControls submitForm={submitForm} nextPage="TrafficOriginForm" />
        </View>
      </ScrollView>
      <StatusBar />
    </SafeAreaView>
  );
}
