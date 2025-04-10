import { View, Text, TouchableOpacity } from "react-native";
import Headline from "../Headline";
import { useID } from "contexts/IdContext";
import { useCallback, useState } from "react";
import { viewersPlacesInitial } from "sqlite/tables/viewersPlaces";
import { getRowById } from "sqlite/operations/crud";
import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

export default function PlacesOfViewers() {
  const [viewersPlaces, setViewersPlaces] = useState(viewersPlacesInitial);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { t } = useTranslation();
  const { id } = useID();

  const fetchRowByID = async () => {
    const data = (await getRowById("viewersPlaces", id)) as Record<string, string>;
    const parsedData = {
      id: data.id,
      query_values: JSON.parse(data.query_values),
    };
    setViewersPlaces(parsedData as typeof viewersPlacesInitial);
  };

  useFocusEffect(
    useCallback(() => {
      fetchRowByID();
    }, [])
  );
  return (
    <TouchableOpacity activeOpacity={1} onLongPress={() => navigation.navigate("ViewersPlacesForm")}>
      <Headline>{t("viewers.places_title")}</Headline>
      {viewersPlaces.query_values
        .sort((a, b) => Number(b.value) - Number(a.value))
        .map((item, index) => (
          <View key={index} className="mb-4">
            <View className="mb-2 flex-row justify-between">
              <Text>{item.name || "empty"}</Text>
              <Text className="font-semibold">{parseInt(item.value || "0").toFixed(1)}%</Text>
            </View>
            <View className="h-3 overflow-hidden rounded-sm bg-gray-200">
              <View className="h-full rounded-sm bg-blue-500" style={{ width: `${parseInt(item.value)}%` }} />
            </View>
          </View>
        ))}
    </TouchableOpacity>
  );
}
