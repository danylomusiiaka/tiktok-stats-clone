import { TextInput, Text, Keyboard, TouchableOpacity, View, Button, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { createTable, getAllTables } from "sqlite/queries/table_crud";
import { getAllRows, insertInto, deleteAllRows, getRowById } from "sqlite/queries/crud";
import { trafficOriginInitial, trafficOriginTableStructure } from "sqlite/tables/trafficOrigin";
import { useID } from "contexts/IdContext";
import Chevron from "react-native-vector-icons/Ionicons";

type RootStackParamList = {
  Analytics: undefined;
  SearchQueriesForm: undefined;
};

type FormProps = {
  navigation: StackNavigationProp<RootStackParamList>;
};

export default function TraficOriginForm({ navigation }: FormProps) {
  const [prevtrafficOrigin, setPrevTrafficOrigin] = useState(trafficOriginInitial);
  const [trafficOrigin, setTrafficOrigin] = useState(trafficOriginInitial);
  const { id } = useID();

  const submitForm = async () => {
    try {
      if (JSON.stringify(trafficOrigin) === JSON.stringify(prevtrafficOrigin)) return;
      await insertInto("trafficOrigin", { ...trafficOrigin, id: id });
      setPrevTrafficOrigin(trafficOrigin);
      Keyboard.dismiss();
    } catch (error) {
      console.error("Database error:", error);
    }
  };

  useEffect(() => {
    createTable("trafficOrigin", trafficOriginTableStructure);
  }, []);

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
    <SafeAreaView>
      <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center bg-gray-100 py-2">
          <TouchableOpacity
            onPress={async () => {
              await submitForm();
              navigation.goBack();
            }}
          >
            <Chevron name="chevron-back" size={25}></Chevron>
          </TouchableOpacity>
          <Text className="ml-2 text-3xl font-semibold">Источники трафика</Text>
        </View>
        <View className="flex p-3 pt-0">
          <Text className="mt-3 text-xl">Рекомендуем</Text>
          <TextInput
            value={trafficOrigin?.recommend}
            className="h-13 my-2 w-full rounded-md border border-gray-400 p-3   text-[16px]"
            onChangeText={(value) => setTrafficOrigin({ ...trafficOrigin, recommend: value })}
            placeholder="напр. 89"
          />
          <Text className="text-xl">Другое</Text>
          <TextInput
            value={trafficOrigin?.other}
            className="h-13 my-2 w-full rounded border border-gray-400 p-3  text-[16px]"
            onChangeText={(value) => setTrafficOrigin({ ...trafficOrigin, other: value })}
            placeholder="напр. 24"
          />
          <Text className="text-xl">Личный профиль</Text>
          <TextInput
            value={trafficOrigin?.personal_profile}
            className="h-13 my-2 w-full rounded border border-gray-400 p-3  text-[16px]"
            onChangeText={(value) => setTrafficOrigin({ ...trafficOrigin, personal_profile: value })}
            placeholder="напр. 21"
          />
          <Text className="text-xl">Звук</Text>
          <TextInput
            value={trafficOrigin?.sound}
            className="h-13 my-2 w-full rounded border border-gray-400 p-3  text-[16px]"
            onChangeText={(value) => setTrafficOrigin({ ...trafficOrigin, sound: value })}
            placeholder="напр. 13"
          />
          <Text className="text-xl">Поиск</Text>
          <TextInput
            value={trafficOrigin?.search}
            className="h-13 my-2 w-full rounded border border-gray-400 p-3  text-[16px]"
            onChangeText={(value) => setTrafficOrigin({ ...trafficOrigin, search: value })}
            placeholder="напр. 2"
          />
          <Text className="text-xl">Подписки</Text>
          <TextInput
            value={trafficOrigin?.subscribers}
            className="h-13 my-2 w-full rounded border border-gray-400 p-3  text-[16px]"
            onChangeText={(value) => setTrafficOrigin({ ...trafficOrigin, subscribers: value })}
            placeholder="напр. 54"
          />

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

          {/* Admin Buttons */}
          {/* <Button
            title="Get all from trafficOrigin"
            onPress={() => {
              getAllRows("trafficOrigin");
            }}
          />
          <Button title="Delete all from trafficOrigin" onPress={() => deleteAllRows("trafficOrigin")} />
          <Button title="Get all tables" onPress={() => getAllTables()} /> */}
        </View>
      </ScrollView>
      <StatusBar />
    </SafeAreaView>
  );
}
