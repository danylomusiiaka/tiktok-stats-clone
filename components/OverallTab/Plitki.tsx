import { NavigationProp, useNavigation } from "@react-navigation/native";
import Headline from "components/Headline";
import { useID } from "contexts/IdContext";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { getRowById } from "sqlite/queries/crud";
import { mainMetricsInitial, mainMetricsLabelMapping } from "sqlite/tables/mainMetrics";

export const Plitki = () => {
  const [selectedMetric, setSelectedMetric] = useState("views");
  const [mainMetrics, setMainMetrics] = useState(mainMetricsInitial);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { id } = useID();
  useEffect(() => {
    const fetchRowByID = async () => {
      const mainMetrics = await getRowById("main_metrics", id);
      setMainMetrics(mainMetrics as typeof mainMetricsInitial);
    };
    fetchRowByID();
  }, [id]);

  return (
    <TouchableOpacity activeOpacity={1} onLongPress={() => navigation.navigate("MainMetricsForm")}>
      <Headline name="Основные метрики" spacing="mb-0" />
      <Text className="mb-4 text-sm text-gray-500">Обновлено {mainMetrics?.updated}</Text>
      <View className="flex flex-row flex-wrap justify-between">
        {Object.entries(mainMetrics || mainMetricsInitial)
          .filter(([key]) => key !== "id" && key !== "updated")
          .map(([key, value]) => (
            <TouchableOpacity
              key={key}
              activeOpacity={1}
              className={`mb-3 w-[49%] justify-between rounded-lg border-[0.5px] p-3 py-3 ${selectedMetric === key ? "border-blue-500 bg-[#f7f9fc]" : "border-gray-200"}`}
              onPress={() => setSelectedMetric(key)}
            >
              <Text>{mainMetricsLabelMapping[key]}</Text>
              <Text className="text-2xl font-bold" numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.8}>
                {value || 0}
              </Text>
            </TouchableOpacity>
          ))}
      </View>
    </TouchableOpacity>
  );
};
