import { View, Text, TouchableOpacity } from "react-native";
import { useID } from "~/contexts/IdContext";
import { useCallback, useEffect, useState } from "react";
import { searchQueriesInitial } from "~/sqlite/tables/searchTerms";
import { getRowById } from "~/sqlite/operations/crud";
import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import Info from "react-native-vector-icons/Feather";
import Chevron from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";

export default function FrequentlyUsedWords() {
  const [searchTerms, setSearchTerms] = useState(searchQueriesInitial);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { t } = useTranslation();
  const { id } = useID();

  const fetchRowByID = async () => {
    const data = (await getRowById("frequentWords", id)) as Record<string, string>;
    const parsedData = {
      id: data.id,
      query_values: JSON.parse(data.query_values),
    };
    setSearchTerms(parsedData);
  };

  useFocusEffect(
    useCallback(() => {
      fetchRowByID();
    }, [])
  );

  return (
    <TouchableOpacity activeOpacity={1} onLongPress={() => navigation.navigate("FrequentWordsForm")}>
      <View className={`mb-4 flex-row items-center`}>
        <Text className="mr-1.5 mt-2 text-[17px] font-bold">{t("engagement.most_words")}</Text>
        <Info name="info" size={14} color="#90959e" className="mt-2" />
      </View>
      {searchTerms.query_values?.map((term, index) => (
        <View key={index} className="mb-4">
          <View className="mb-2 flex-row justify-between">
            <Text>{term.name || "empty"}</Text>
            <View className="flex-row items-center">
              <Text className="font-bold">{term.value || 0}</Text>
              <Chevron name="chevron-forward" size={14} color="black" />
            </View>
          </View>
          <View className="h-3 overflow-hidden rounded-sm bg-gray-200">
            <View className="h-full rounded-sm bg-blue-500" style={{ width: `${100}%` }} />
          </View>
        </View>
      ))}
    </TouchableOpacity>
  );
}
