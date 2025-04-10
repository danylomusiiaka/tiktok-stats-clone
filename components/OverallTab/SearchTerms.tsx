import { View, Text, TouchableOpacity } from "react-native";
import Headline from "../Headline";
import { useID } from "contexts/IdContext";
import { useCallback, useState } from "react";
import { searchQueriesInitial } from "sqlite/tables/searchTerms";
import { getRowById } from "sqlite/operations/crud";
import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

export default function SearchTerms() {
  const [searchTerms, setSearchTerms] = useState(searchQueriesInitial);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { t } = useTranslation();
  const { id } = useID();

  const fetchRowByID = async () => {
    const data = (await getRowById("searchQueries", id)) as Record<string, string>;
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
    <TouchableOpacity activeOpacity={1} onLongPress={() => navigation.navigate("SearchQueriesForm")}>
      <Headline>{t("searchTerms.title")}</Headline>
      {searchTerms.query_values
        ?.sort((a, b) => Number(b.value) - Number(a.value))
        .map((term, index) => (
          <View key={index} className="mb-4">
            <View className="mb-2 flex-row justify-between">
              <Text>{term.name}</Text>
              <Text className="font-bold">{term.value}%</Text>
            </View>
            <View className="h-3 overflow-hidden rounded-sm bg-gray-200">
              <View className="h-full rounded-sm bg-blue-500" style={{ width: `${parseInt(term.value) || 0}%` }} />
            </View>
          </View>
        ))}
    </TouchableOpacity>
  );
}
