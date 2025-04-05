import { TextInput, Text, Keyboard, TouchableOpacity, View, Button, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { createTable, getAllTables } from "sqlite/queries/table_crud";
import { getAllRows, insertInto, deleteAllRows, getRowById } from "sqlite/queries/crud";
import { frequentWordsInitial, frequentWordsTableStructure } from "sqlite/tables/frequentWords";
import { useID } from "contexts/IdContext";
import { Header } from "components/Header";

type RootStackParamList = {
  Analytics: undefined;
  ViewersForm: undefined;
};

type FormProps = {
  navigation: StackNavigationProp<RootStackParamList>;
};

export default function FrequentWordsForm({ navigation }: FormProps) {
  const [prevfrequentWords, setPrevfrequentWords] = useState(frequentWordsInitial);
  const [frequentWords, setfrequentWords] = useState(frequentWordsInitial);
  const { id } = useID();

  const submitForm = async () => {
    try {
      if (JSON.stringify(frequentWords) === JSON.stringify(prevfrequentWords) || !frequentWords) return;
      const stringifiedData = {
        id: id,
        query_values: JSON.stringify(frequentWords.query_values),
      };
      await insertInto("frequentWords", stringifiedData);
      setPrevfrequentWords(frequentWords);
    } catch (error) {
      console.error("Database error:", error);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      submitForm();
    }, 800);

    return () => clearTimeout(handler);
  }, [frequentWords]);

  useEffect(() => {
    createTable("frequentWords", frequentWordsTableStructure);
  }, []);

  useEffect(() => {
    const fetchfrequentWords = async () => {
      if (id) {
        const query = (await getRowById("frequentWords", id)) as Record<string, string>;
        if (query) {
          const parsedData = {
            id: query.id,
            query_values: JSON.parse(query.query_values),
          };
          setfrequentWords(parsedData);
        } else {
          setfrequentWords({
            id: id,
            query_values: [{ name: "", value: "" }],
          });
        }
      }
    };
    fetchfrequentWords();
  }, [id]);

  const updatePair = (index: number, key: "name" | "value", text: string) => {
    const newPairs = [...frequentWords.query_values];
    newPairs[index] = { ...newPairs[index], [key]: text };
    setfrequentWords({ ...frequentWords, query_values: newPairs });
  };

  const addPair = () => {
    const currentfrequentWords = frequentWords || frequentWordsInitial;
    setfrequentWords({ ...currentfrequentWords, query_values: [...currentfrequentWords.query_values, { name: "", value: "" }] });
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <SafeAreaView>
        <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
          <Header>Самые частые слова в комментариях</Header>
          <View className="flex p-3 pt-4">
            {frequentWords?.query_values?.map((pair, index) => (
              <View key={index} className="mb-4">
                <Text className="text-xl">Назва</Text>
                <TextInput
                  value={pair.name}
                  className="h-13 my-2 w-full rounded-md border border-gray-400 p-3 text-[16px]"
                  onChangeText={(text) => updatePair(index, "name", text)}
                  placeholder="напр. просто имба"
                />
                <Text className="text-xl">Значення</Text>

                <TextInput
                  value={pair.value}
                  className="h-13 my-2 flex-1 rounded border border-gray-400 p-3 text-[16px]"
                  onChangeText={(text) => updatePair(index, "value", text)}
                  placeholder="напр. 3"
                />
              </View>
            ))}
            <TouchableOpacity className="mb-4 flex items-center justify-center rounded-md bg-green-500 py-4" onPress={addPair}>
              <Text className="text-lg font-semibold color-white">Додати слово</Text>
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
            title="Get all from frequentWords"
            onPress={() => {
              getAllRows("frequentWords");
            }}
          />
          <Button title="Delete all from frequentWords" onPress={() => deleteAllRows("trafficOrigin")} />
          <Button title="Get all tables" onPress={() => getAllTables()} /> */}
        </ScrollView>
        <StatusBar />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
