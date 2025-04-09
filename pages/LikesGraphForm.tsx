import { TextInput, Text, Keyboard, TouchableOpacity, View, Button, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { createTable, getAllTables } from "sqlite/queries/table_crud";
import { getAllRows, insertInto, deleteAllRows, getRowById } from "sqlite/queries/crud";
import { likesGraphInitial, likesGraphTableStructure } from "sqlite/tables/likesGraph";
import { useID } from "contexts/IdContext";
import { Header } from "components/Header";

type RootStackParamList = {
  Analytics: undefined;
};

type FormProps = {
  navigation: StackNavigationProp<RootStackParamList>;
};

export default function LikesGraphForm({ navigation }: FormProps) {
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

          <TouchableOpacity
            className="mt-4 flex items-center justify-center rounded-md bg-gray-500 py-4"
            onPress={async () => {
              await submitForm();
              navigation.navigate("Analytics");
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
              title="Get all from likesGraph"
              onPress={() => {
                getAllRows("likesGraph");
              }}
            />
            <Button title="Delete all from likesGraph" onPress={() => deleteAllRows("likesGraph")} />
            <Button title="Get all tables" onPress={() => getAllTables()} /> */}
        </View>
      </ScrollView>
      <StatusBar />
    </SafeAreaView>
  );
}