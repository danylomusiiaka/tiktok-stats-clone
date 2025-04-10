import { View, Text, TouchableOpacity } from "react-native";
import Headline from "../Headline";
import { useID } from "~/contexts/IdContext";
import { useCallback, useState } from "react";
import { trafficOriginInitial } from "~/sqlite/tables/trafficOrigin";
import { getRowById } from "~/sqlite/operations/crud";
import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

export default function TrafficHistory() {
  const [trafficOrigin, setTrafficOrigin] = useState(trafficOriginInitial);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { t } = useTranslation();
  const { id } = useID();

  const fetchRowByID = async () => {
    const data = await getRowById("trafficOrigin", id);
    setTrafficOrigin(data as typeof trafficOriginInitial);
  };

  useFocusEffect(
    useCallback(() => {
      fetchRowByID();
    }, [])
  );

  const trafficLabelMapping: Record<string, string> = {
    recommend: t("trafficOrigin.recommend"),
    other: t("trafficOrigin.other"),
    personal_profile: t("trafficOrigin.personal_profile"),
    sound: t("trafficOrigin.sound"),
    search: t("trafficOrigin.search"),
    subscribers: t("trafficOrigin.subscribers"),
  };

  return (
    <TouchableOpacity activeOpacity={1} onLongPress={() => navigation.navigate("TrafficOriginForm")}>
      <Headline>{t("trafficOrigin.title")}</Headline>
      {Object.entries(trafficOrigin || trafficOriginInitial)
        .filter(([key]) => key !== "id")
        .sort(([, a], [, b]) => Number(b) - Number(a))
        .map(([key, value]) => (
          <View key={key} className="mb-4">
            <View className="mb-2 flex-row justify-between">
              <Text>{trafficLabelMapping[key]}</Text>
              <Text className="font-bold">{value || 0}%</Text>
            </View>
            <View className="h-3 overflow-hidden rounded-sm bg-gray-200">
              <View className="h-full rounded-sm bg-blue-500" style={{ width: `${parseInt(value || "0")}%` }} />
            </View>
          </View>
        ))}
    </TouchableOpacity>
  );
}
