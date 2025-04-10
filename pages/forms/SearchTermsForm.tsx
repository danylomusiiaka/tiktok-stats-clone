import { TextInput, Text, TouchableOpacity, View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { createTable } from "sqlite/operations/table_crud";
import { insertInto, getRowById } from "sqlite/operations/crud";
import { searchQueriesInitial, searchQueriesTableStructure } from "sqlite/tables/searchTerms";
import { useID } from "contexts/IdContext";
import { Header } from "components/Header";
import FormControls from "components/FormControls";

export default function SearchQueriesForm() {
  const [prevSearchQueries, setPrevSearchQueries] = useState(searchQueriesInitial);
  const [searchQueries, setSearchQueries] = useState(searchQueriesInitial);
  const { id } = useID();

  const submitForm = async () => {
    try {
      const cleanedQueryValues = searchQueries.query_values.filter((pair) => pair.name.trim() !== "" || pair.value.trim() !== "");

      const cleanedData = {
        id: id,
        query_values: cleanedQueryValues,
      };

      if (JSON.stringify(cleanedData) === JSON.stringify(prevSearchQueries) || !searchQueries) return;

      const stringifiedData = {
        id: id,
        query_values: JSON.stringify(cleanedQueryValues),
      };

      await insertInto("searchQueries", stringifiedData);
      setPrevSearchQueries(cleanedData);
    } catch (error) {
      console.error("Database error:", error);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      submitForm();
    }, 800);

    return () => clearTimeout(handler);
  }, [searchQueries]);

  useEffect(() => {
    createTable("searchQueries", searchQueriesTableStructure);
  }, []);

  useEffect(() => {
    const fetchSearchQueries = async () => {
      if (id) {
        const query = (await getRowById("searchQueries", id)) as Record<string, string>;
        if (query) {
          const parsedData = {
            id: query.id,
            query_values: JSON.parse(query.query_values),
          };
          setSearchQueries(parsedData);
        } else {
          setSearchQueries({
            id: id,
            query_values: [{ name: "", value: "" }],
          });
        }
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
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <SafeAreaView>
        <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
          <Header>Поисковые запросы</Header>
          <View className="flex p-3 pt-4">
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
              <Text className="text-lg font-semibold color-white">Додати запит</Text>
            </TouchableOpacity>

            <FormControls submitForm={submitForm} nextPage="ViewersForm" />
          </View>
        </ScrollView>
        <StatusBar />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
