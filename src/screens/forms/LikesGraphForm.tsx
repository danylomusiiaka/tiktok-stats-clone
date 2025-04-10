import { TextInput, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { createTable } from "~/sqlite/operations/table_crud";
import { insertInto, getRowById } from "~/sqlite/operations/crud";
import { likesGraphInitial, likesGraphTableStructure } from "~/sqlite/tables/likesGraph";
import { useID } from "~/contexts/IdContext";
import { Header } from "~/components/Header";
import FormControls from "~/components/FormControls";

export default function LikesGraphForm() {
  const [prevlikesGraph, setPrevlikesGraph] = useState(likesGraphInitial);
  const [likesGraph, setlikesGraph] = useState(likesGraphInitial);
  const { id } = useID();

  const submitForm = async () => {
    try {
      if (JSON.stringify(likesGraph) === JSON.stringify(prevlikesGraph) || !likesGraph) return;
      await insertInto("likesGraph", { ...likesGraph, id: id });
      setPrevlikesGraph(likesGraph);
    } catch (error) {
      console.error("Database error:", error);
    }
  };

  useEffect(() => {
    createTable("likesGraph", likesGraphTableStructure);
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      submitForm();
    }, 800);

    return () => clearTimeout(handler);
  }, [likesGraph]);

  useEffect(() => {
    const fetchlikesGraphRow = async () => {
      if (id) {
        const likesGraph = await getRowById("likesGraph", id);
        setlikesGraph(likesGraph as typeof likesGraphInitial);
      }
    };
    fetchlikesGraphRow();
  }, [id]);

  return (
    <SafeAreaView>
      <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
        <Header>График лайков</Header>

        <View className="flex p-3 pt-3">
          <Text className="text-xl">Большинство поставили лайк на</Text>
          <TextInput
            value={likesGraph?.featured_time}
            className="h-13 my-2 flex-1 rounded border border-gray-400 p-3 text-[16px]"
            onChangeText={(value) => setlikesGraph({ ...likesGraph, featured_time: value })}
            placeholder="напр. 0:01"
          />
          <Text className="text-xl">Тривалість відео</Text>
          <TextInput
            value={likesGraph?.video_time}
            className="h-13 my-2 flex-1 rounded border border-gray-400 p-3 text-[16px]"
            onChangeText={(value) => setlikesGraph({ ...likesGraph, video_time: value })}
            placeholder="напр. 00:09"
          />
          <Text className="text-xl">Точки (через кому!)</Text>
          <TextInput
            value={likesGraph?.points}
            className="h-13 my-2 flex-1 rounded border border-gray-400 p-3 text-[16px]"
            onChangeText={(value) => setlikesGraph({ ...likesGraph, points: value })}
            placeholder="напр. 100, 21, 45, 65"
          />

          <FormControls submitForm={submitForm} nextPage="Analytics" />
        </View>
      </ScrollView>
      <StatusBar />
    </SafeAreaView>
  );
}
