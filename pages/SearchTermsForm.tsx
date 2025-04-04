import { TextInput, Text, Keyboard, TouchableOpacity, View, Button, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { createTable, getAllTables } from "sqlite/queries/table_crud";
import { getAllRows, insertInto, deleteAllRows, getRowById } from "sqlite/queries/crud";
import { searchQueriesInitial, searchQueriesTableStructure } from "sqlite/tables/searchTerms";
import { useID } from "contexts/IdContext";
import Chevron from "react-native-vector-icons/Ionicons";

type RootStackParamList = {
  Analytics: undefined;
  MainMetricsForm: undefined;
};

type FormProps = {
  navigation: StackNavigationProp<RootStackParamList>;
};

export default function SearchQueriesForm({ navigation }: FormProps) {
  const [prevSearchQueries, setPrevSearchQueries] = useState(searchQueriesInitial);
  const [searchQueries, setSearchQueries] = useState(searchQueriesInitial);
  const { id } = useID();

  const submitForm = async () => {
    try {
      if (JSON.stringify(searchQueries) === JSON.stringify(prevSearchQueries)) return;
      const stringifiedData = {
        id: id,
        query_values: JSON.stringify(searchQueries.query_values),
      };
      await insertInto("searchQueries", stringifiedData);
      setPrevSearchQueries(searchQueries);
      Keyboard.dismiss();
    } catch (error) {
      console.error("Database error:", error);
    }
  };

  useEffect(() => {
    createTable("searchQueries", searchQueriesTableStructure);
  }, []);

  useEffect(() => {
    const fetchSearchQueries = async () => {
      if (id) {
        const query = (await getRowById("searchQueries", id)) as Record<string, string>;
        const parsedData = {
          id: query.id,
          query_values: JSON.parse(query.query_values),
        };
        setSearchQueries(parsedData);
      }
    };
    fetchSearchQueries();
  }, [id]);

  const updatePair = (index: number, key: "name" | "value", text: string) => {
    const newPairs = [...searchQueries.query_values];
    newPairs[index] = { ...newPairs[index], [key]: text };
    setSearchQueries({ ...searchQueries, query_values: newPairs });
  };

  const addPair = () => {
    const currentSearchQueries = searchQueries || searchQueriesInitial;
    setSearchQueries({ ...currentSearchQueries, query_values: [...currentSearchQueries.query_values, { name: "", value: "" }] });
  };

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
            <Chevron name="chevron-back" size={25} />
          </TouchableOpacity>
          <Text className="ml-2 text-3xl font-semibold">Пошукові запити</Text>
        </View>
        <View className="flex p-3 pt-0">
          {searchQueries?.query_values?.map((pair, index) => (
            <View key={index} className="mb-4">
              <Text className="text-xl">Назва</Text>
              <TextInput
                value={pair.name}
                className="h-13 my-2 w-full rounded-md border border-gray-400 p-3 text-[16px]"
                onChangeText={(text) => updatePair(index, "name", text)}
                placeholder="Наприклад, 'Рекомендуємо'"
              />
              <Text className="text-xl">Значення</Text>
              <TextInput
                value={pair.value}
                className="h-13 my-2 w-full rounded border border-gray-400 p-3 text-[16px]"
                onChangeText={(text) => updatePair(index, "value", text)}
                placeholder="Наприклад, '89'"
              />
            </View>
          ))}
          <TouchableOpacity className="mb-4 flex items-center justify-center rounded-md bg-green-500 py-4" onPress={addPair}>
            <Text className="text-lg font-semibold color-white">Додати запит</Text>
          </TouchableOpacity>
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
        </View>

        {/* Admin Buttons */}
        {/* <Button
          title="Get all from searchQueries"
          onPress={() => {
            getAllRows("searchQueries");
          }}
        />
        <Button title="Delete all from searchQueries" onPress={() => deleteAllRows("searchQueries")} />
        <Button title="Get all tables" onPress={() => getAllTables()} /> */}
      </ScrollView>
      <StatusBar />
    </SafeAreaView>
  );
}
