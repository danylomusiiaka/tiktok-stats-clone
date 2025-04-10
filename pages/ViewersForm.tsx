import { TextInput, Text, TouchableOpacity, View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { createTable } from "sqlite/queries/table_crud";
import { insertInto, getRowById } from "sqlite/queries/crud";
import { useID } from "contexts/IdContext";
import { viewersInitial, viewersTableStructure } from "sqlite/tables/viewers";
import { Header } from "components/Header";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export default function ViewersForm() {
  const [prevviewers, setPrevviewers] = useState(viewersInitial);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [viewers, setviewers] = useState(viewersInitial);
  const { id } = useID();

  const submitForm = async () => {
    try {
      if (JSON.stringify(viewers) === JSON.stringify(prevviewers) || !viewers) return;
      await insertInto("viewers", { ...viewers, id: id });
      setPrevviewers(viewers);
    } catch (error) {
      console.error("Database error:", error);
    }
  };

  useEffect(() => {
    createTable("viewers", viewersTableStructure);
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      submitForm();
    }, 800);
    return () => clearTimeout(handler);
  }, [viewers]);

  useEffect(() => {
    const fetchMetricsRow = async () => {
      if (id) {
        const metrics = await getRowById("viewers", id);
        setviewers(metrics as typeof viewersInitial);
      }
    };
    fetchMetricsRow();
  }, [id]);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <SafeAreaView>
        <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
          <Header>Зрители</Header>

          <View className="flex p-3 pt-0">
            <Text className="mt-3 text-xl">Всего зрителей</Text>
            <TextInput
              value={viewers?.total}
              className="h-13 my-2 w-full rounded-md border border-gray-400 p-3 text-[16px]"
              onChangeText={(value) => setviewers({ ...viewers, total: value })}
              placeholder="напр. 523462"
            />
            <Text className="text-xl">В сравнении с вчерашним днем</Text>
            <TextInput
              value={viewers?.compared_to}
              className="h-13 my-2 w-full rounded border border-gray-400 p-3 text-[16px]"
              onChangeText={(value) => setviewers({ ...viewers, compared_to: value })}
              placeholder="напр. 523"
            />
            <View className="my-5 flex-row items-center">
              <Text className="mr-2 text-2xl font-medium">Типы зрителей</Text>
              <View style={{ flex: 1, height: 2, backgroundColor: "#D1D5DB" }} />
            </View>
            <Text className="text-xl">Новые зрители</Text>
            <View className="flex-row items-center">
              <TextInput
                value={viewers?.new_viewers}
                className="h-13 my-2 flex-1 rounded border border-gray-400 p-3 text-[16px]"
                onChangeText={(value) => setviewers({ ...viewers, new_viewers: value })}
                placeholder="напр. 83"
              />
              <Text className="ml-2 text-xl">%</Text>
            </View>
            <Text className="text-xl">Вернувшиеся зрители</Text>
            <View className="flex-row items-center">
              <TextInput
                value={viewers?.old_viewers}
                className="h-13 my-2 flex-1 rounded border border-gray-400 p-3 text-[16px]"
                onChangeText={(value) => setviewers({ ...viewers, old_viewers: value })}
                placeholder="напр. 27"
              />
              <Text className="ml-2 text-xl">%</Text>
            </View>
            <Text className="text-xl">Не подписанные</Text>
            <View className="flex-row items-center">
              <TextInput
                value={viewers?.not_subscribed}
                className="h-13 my-2 flex-1 rounded border border-gray-400 p-3 text-[16px]"
                onChangeText={(value) => setviewers({ ...viewers, not_subscribed: value })}
                placeholder="напр. 90"
              />
              <Text className="ml-2 text-xl">%</Text>
            </View>
            <Text className="text-xl">Подписчики</Text>
            <View className="flex-row items-center">
              <TextInput
                value={viewers?.subscribed}
                className="h-13 my-2 flex-1 rounded border border-gray-400 p-3 text-[16px]"
                onChangeText={(value) => setviewers({ ...viewers, subscribed: value })}
                placeholder="напр. 10"
              />
              <Text className="ml-2 text-xl">%</Text>
            </View>
            <TouchableOpacity
              className="mt-4 flex items-center justify-center rounded-md bg-gray-500 py-4"
              onPress={async () => {
                await submitForm();
                navigation.navigate("ViewersGenderAgeForm");
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
