import { TextInput, Text, TouchableOpacity, View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { createTable } from "sqlite/queries/table_crud";
import { insertInto, getRowById } from "sqlite/queries/crud";
import { viewersPlacesInitial, viewersPlacesTableStructure } from "sqlite/tables/viewersPlaces";
import { useID } from "contexts/IdContext";
import { Header } from "components/Header";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export default function ViewersPlacesForm() {
  const [prevviewersPlaces, setPrevviewersPlaces] = useState(viewersPlacesInitial);
  const [viewersPlaces, setviewersPlaces] = useState(viewersPlacesInitial);
  const { id } = useID();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const submitForm = async () => {
    try {
      const cleanedQueryValues = viewersPlaces.query_values.filter((pair) => pair.name.trim() !== "" || pair.value.trim() !== "");

      const cleanedData = {
        id: id,
        query_values: cleanedQueryValues,
      };

      if (JSON.stringify(cleanedData) === JSON.stringify(prevviewersPlaces) || !cleanedQueryValues.length) return;

      const stringifiedData = {
        id: id,
        query_values: JSON.stringify(cleanedQueryValues),
      };

      await insertInto("viewersPlaces", stringifiedData);
      setPrevviewersPlaces(cleanedData);
    } catch (error) {
      console.error("Database error:", error);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      submitForm();
    }, 800);

    return () => clearTimeout(handler);
  }, [viewersPlaces]);

  useEffect(() => {
    createTable("viewersPlaces", viewersPlacesTableStructure);
  }, []);

  useEffect(() => {
    const fetchviewersPlaces = async () => {
      if (id) {
        const query = (await getRowById("viewersPlaces", id)) as Record<string, string>;
        if (query) {
          const parsedData = {
            id: query.id,
            query_values: JSON.parse(query.query_values),
          };
          setviewersPlaces(parsedData);
        } else {
          setviewersPlaces({
            id: id,
            query_values: [{ name: "", value: "" }],
          });
        }
      }
    };
    fetchviewersPlaces();
  }, [id]);

  const updatePair = (index: number, key: "name" | "value", text: string) => {
    const newPairs = [...viewersPlaces.query_values];
    newPairs[index] = { ...newPairs[index], [key]: text };
    setviewersPlaces({ ...viewersPlaces, query_values: newPairs });
  };

  const addPair = () => {
    const currentviewersPlaces = viewersPlaces || viewersPlacesInitial;
    setviewersPlaces({ ...currentviewersPlaces, query_values: [...currentviewersPlaces.query_values, { name: "", value: "" }] });
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <SafeAreaView>
        <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
          <Header>Места</Header>
          <View className="flex p-3 pt-4">
            {viewersPlaces?.query_values?.map((pair, index) => (
              <View key={index} className="mb-4">
                <Text className="text-xl">Назва</Text>
                <TextInput
                  value={pair.name}
                  className="h-13 my-2 w-full rounded-md border border-gray-400 p-3 text-[16px]"
                  onChangeText={(text) => updatePair(index, "name", text)}
                  placeholder="напр. Украина"
                />
                <Text className="text-xl">Значення</Text>
                <View className="flex-row items-center">
                  <TextInput
                    value={pair.value}
                    className="h-13 my-2 flex-1 rounded border border-gray-400 p-3 text-[16px]"
                    onChangeText={(text) => updatePair(index, "value", text)}
                    placeholder="напр. 83"
                  />
                  <Text className="ml-2 text-xl">%</Text>
                </View>
              </View>
            ))}
            <TouchableOpacity className="mb-4 flex items-center justify-center rounded-md bg-green-500 py-4" onPress={addPair}>
              <Text className="text-lg font-semibold color-white">Додати місце</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="mt-4 flex items-center justify-center rounded-md bg-gray-500 py-4"
              onPress={async () => {
                await submitForm();
                navigation.navigate("FrequentWordsForm");
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
