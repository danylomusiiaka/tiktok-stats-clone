import { TextInput, Text, TouchableOpacity, View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { createTable } from "sqlite/queries/table_crud";
import { insertInto, getRowById } from "sqlite/queries/crud";
import { trafficOriginInitial, trafficOriginTableStructure } from "sqlite/tables/trafficOrigin";
import { useID } from "contexts/IdContext";
import { Header } from "components/Header";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export default function TraficOriginForm() {
  const [prevtrafficOrigin, setPrevTrafficOrigin] = useState(trafficOriginInitial);
  const [trafficOrigin, setTrafficOrigin] = useState(trafficOriginInitial);
  const { id } = useID();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const submitForm = async () => {
    try {
      if (JSON.stringify(trafficOrigin) === JSON.stringify(prevtrafficOrigin) || !trafficOrigin) return;
      await insertInto("trafficOrigin", { ...trafficOrigin, id: id });
      setPrevTrafficOrigin(trafficOrigin);
    } catch (error) {
      console.error("Database error:", error);
    }
  };

  useEffect(() => {
    createTable("trafficOrigin", trafficOriginTableStructure);
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      submitForm();
    }, 800);

    return () => clearTimeout(handler);
  }, [trafficOrigin]);

  useEffect(() => {
    const fetchtrafficOriginRow = async () => {
      if (id) {
        const trafficOrigin = await getRowById("trafficOrigin", id);
        setTrafficOrigin(trafficOrigin as typeof trafficOriginInitial);
      }
    };
    fetchtrafficOriginRow();
  }, [id]);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <SafeAreaView>
        <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
          <Header>Источники трафика</Header>

          <View className="flex p-3 pt-0">
            <Text className="mt-3 text-xl">Рекомендуем</Text>
            <View className="flex-row items-center">
              <TextInput
                value={trafficOrigin?.recommend}
                className="h-13 my-2 flex-1 rounded border border-gray-400 p-3 text-[16px]"
                onChangeText={(value) => setTrafficOrigin({ ...trafficOrigin, recommend: value })}
                placeholder="напр. 83"
              />
              <Text className="ml-2 text-xl">%</Text>
            </View>
            <Text className="text-xl">Другое</Text>
            <View className="flex-row items-center">
              <TextInput
                value={trafficOrigin?.other}
                className="h-13 my-2 flex-1 rounded border border-gray-400 p-3 text-[16px]"
                onChangeText={(value) => setTrafficOrigin({ ...trafficOrigin, other: value })}
                placeholder="напр. 24"
              />
              <Text className="ml-2 text-xl">%</Text>
            </View>
            <Text className="text-xl">Личный профиль</Text>
            <View className="flex-row items-center">
              <TextInput
                value={trafficOrigin?.personal_profile}
                className="h-13 my-2 flex-1 rounded border border-gray-400 p-3 text-[16px]"
                onChangeText={(value) => setTrafficOrigin({ ...trafficOrigin, personal_profile: value })}
                placeholder="напр. 21"
              />
              <Text className="ml-2 text-xl">%</Text>
            </View>
            <Text className="text-xl">Звук</Text>
            <View className="flex-row items-center">
              <TextInput
                value={trafficOrigin?.sound}
                className="h-13 my-2 flex-1 rounded border border-gray-400 p-3 text-[16px]"
                onChangeText={(value) => setTrafficOrigin({ ...trafficOrigin, sound: value })}
                placeholder="напр. 12"
              />
              <Text className="ml-2 text-xl">%</Text>
            </View>
            <Text className="text-xl">Поиск</Text>
            <View className="flex-row items-center">
              <TextInput
                value={trafficOrigin?.search}
                className="h-13 my-2 flex-1 rounded border border-gray-400 p-3 text-[16px]"
                onChangeText={(value) => setTrafficOrigin({ ...trafficOrigin, search: value })}
                placeholder="напр. 2"
              />
              <Text className="ml-2 text-xl">%</Text>
            </View>
            <Text className="text-xl">Подписки</Text>
            <View className="flex-row items-center">
              <TextInput
                value={trafficOrigin?.subscribers}
                className="h-13 my-2 flex-1 rounded border border-gray-400 p-3 text-[16px]"
                onChangeText={(value) => setTrafficOrigin({ ...trafficOrigin, subscribers: value })}
                placeholder="напр. 54"
              />
              <Text className="ml-2 text-xl">%</Text>
            </View>

            <TouchableOpacity
              className="mt-4 flex items-center justify-center rounded-md bg-gray-500 py-4"
              onPress={async () => {
                await submitForm();
                navigation.navigate("SearchQueriesForm");
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
    </KeyboardAvoidingView>
  );
}
