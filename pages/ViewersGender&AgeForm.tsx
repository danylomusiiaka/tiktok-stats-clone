import { TextInput, Text, Keyboard, TouchableOpacity, View, ScrollView, Button, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { createTable, getAllTables } from "sqlite/queries/table_crud";
import { getAllRows, insertInto, getRowById, deleteAllRows } from "sqlite/queries/crud";
import { useID } from "contexts/IdContext";
import Chevron from "react-native-vector-icons/Ionicons";
import { viewersGenderAgeInitial, viewersGenderAgeTableStructure } from "sqlite/tables/viewersGenderAge";

type RootStackParamList = {
  Analytics: undefined;
  ViewersPlacesForm: undefined;
};

type FormProps = {
  navigation: StackNavigationProp<RootStackParamList>;
};

export default function ViewersGenderAgeForm({ navigation }: FormProps) {
  const [prevviewersGenderAge, setPrevviewersGenderAge] = useState(viewersGenderAgeInitial);
  const [viewersGenderAge, setviewersGenderAge] = useState(viewersGenderAgeInitial);
  const { id } = useID();

  const submitForm = async () => {
    try {
      if (JSON.stringify(viewersGenderAge) === JSON.stringify(prevviewersGenderAge)) return;
      await insertInto("viewersGenderAge", { ...viewersGenderAge, id: id });
      setPrevviewersGenderAge(viewersGenderAge);
    } catch (error) {
      console.error("Database error:", error);
    }
  };

  useEffect(() => {
    createTable("viewersGenderAge", viewersGenderAgeTableStructure);
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      submitForm();
    }, 800);
    return () => clearTimeout(handler);
  }, [viewersGenderAge]);

  useEffect(() => {
    const fetchMetricsRow = async () => {
      if (id) {
        const metrics = await getRowById("viewersGenderAge", id);
        setviewersGenderAge(metrics as typeof viewersGenderAgeInitial);
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
            <Text className="ml-2 text-3xl font-semibold">Пол и возраст зрителей</Text>
          </View>
          <View className="flex p-3 pt-0">
            <Text className="mt-3 text-xl">Мужской</Text>
            <View className="flex-row items-center">
              <TextInput
                value={viewersGenderAge?.men}
                className="h-13 my-2 flex-1 rounded-md border border-gray-400 p-3 text-[16px]"
                onChangeText={(value) => setviewersGenderAge({ ...viewersGenderAge, men: value })}
                placeholder="напр. 89"
              />
              <Text className="ml-2 text-xl">%</Text>
            </View>
            <Text className="text-xl">Женский</Text>
            <View className="flex-row items-center">
              <TextInput
                value={viewersGenderAge?.women}
                className="h-13 my-2 flex-1 rounded border border-gray-400 p-3 text-[16px]"
                onChangeText={(value) => setviewersGenderAge({ ...viewersGenderAge, women: value })}
                placeholder="напр. 23"
              />
              <Text className="ml-2 text-xl">%</Text>
            </View>
            <Text className="text-xl">Другое</Text>
            <View className="flex-row items-center">
              <TextInput
                value={viewersGenderAge?.other}
                className="h-13 my-2 flex-1 rounded border border-gray-400 p-3 text-[16px]"
                onChangeText={(value) => setviewersGenderAge({ ...viewersGenderAge, other: value })}
                placeholder="напр. 3"
              />
              <Text className="ml-2 text-xl">%</Text>
            </View>

            <View className="my-3 flex-row items-center">
              <Text className="mr-2 text-2xl font-medium">Возраст</Text>
              <View style={{ flex: 1, height: 2, backgroundColor: "#D1D5DB" }} />
            </View>
            <Text className="text-xl">18 - 24</Text>
            <View className="flex-row items-center">
              <TextInput
                value={viewersGenderAge?.age_18_24}
                className="h-13 my-2 flex-1 rounded border border-gray-400 p-3 text-[16px]"
                onChangeText={(value) => setviewersGenderAge({ ...viewersGenderAge, age_18_24: value })}
                placeholder="напр. 24"
              />
              <Text className="ml-2 text-xl">%</Text>
            </View>
            <Text className="text-xl">25 - 34</Text>
            <View className="flex-row items-center">
              <TextInput
                value={viewersGenderAge?.age_25_34}
                className="h-13 my-2 flex-1 rounded border border-gray-400 p-3 text-[16px]"
                onChangeText={(value) => setviewersGenderAge({ ...viewersGenderAge, age_25_34: value })}
                placeholder="напр. 23"
              />
              <Text className="ml-2 text-xl">%</Text>
            </View>
            <Text className="text-xl">35 - 44</Text>
            <View className="flex-row items-center">
              <TextInput
                value={viewersGenderAge?.age_35_44}
                className="h-13 my-2 flex-1 rounded border border-gray-400 p-3 text-[16px]"
                onChangeText={(value) => setviewersGenderAge({ ...viewersGenderAge, age_35_44: value })}
                placeholder="напр. 42.42"
              />
              <Text className="ml-2 text-xl">%</Text>
            </View>
            <Text className="text-xl">45 - 54</Text>
            <View className="flex-row items-center">
              <TextInput
                value={viewersGenderAge?.age_45_54}
                className="h-13 my-2 flex-1 rounded border border-gray-400 p-3 text-[16px]"
                onChangeText={(value) => setviewersGenderAge({ ...viewersGenderAge, age_45_54: value })}
                placeholder="напр. 32"
              />
              <Text className="ml-2 text-xl">%</Text>
            </View>
            <Text className="text-xl">55+</Text>
            <View className="flex-row items-center">
              <TextInput
                value={viewersGenderAge?.age_more_55}
                className="h-13 my-2 flex-1 rounded border border-gray-400 p-3 text-[16px]"
                onChangeText={(value) => setviewersGenderAge({ ...viewersGenderAge, age_more_55: value })}
                placeholder="напр. 32"
              />
              <Text className="ml-2 text-xl">%</Text>
            </View>

            <TouchableOpacity
              className="mt-4 flex items-center justify-center rounded-md bg-gray-500 py-4"
              onPress={async () => {
                await submitForm();
                navigation.navigate("ViewersPlacesForm");
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
            <Button
              title="Get all from viewersGenderAge"
              onPress={() => {
                getAllRows("viewersGenderAge");
              }}
            />
            <Button title="Delete all from viewersGenderAge" onPress={() => deleteAllRows("viewersGenderAge")} />
            <Button title="Get all tables" onPress={() => getAllTables()} />
          </View>
        </ScrollView>
        <StatusBar />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
