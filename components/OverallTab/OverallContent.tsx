import { View, Text } from "react-native";
import { Plitki } from "./MainMetrics";
import { Graph } from "./MainMetricsGraph";
import TrafficHistory from "components/OverallTab/TrafficHistory";
import SearchTerms from "./SearchTerms";
import Icon from "react-native-vector-icons/Ionicons";
import Coef from "./Coef";
import { useTranslation } from "react-i18next";

export default function Overall() {
  const { t } = useTranslation();

  return (
    <View className="flex">
      <View className="ml-2 mt-2 w-[96vw] rounded-md bg-white p-4">
        <Plitki />
        <Graph />
      </View> 
      <View className="ml-2 mt-2 w-[96vw] rounded-md bg-white p-4">
        <Coef />
      </View>
      <View className="ml-2 mt-2 w-[96vw] rounded-md bg-white p-4">
        <TrafficHistory />
      </View>
      <View className="ml-2 mt-2 w-[96vw] rounded-md bg-white p-4">
        <SearchTerms />
      </View>
      <View className="ml-2 mt-2 w-[96vw] flex-row items-center justify-between rounded-md bg-white p-4">
        <View>
          <Text className="text-lg">{t("recomendationAlert.h2")}</Text>
          <Text className="text-gray-500">{t("recomendationAlert.text")}</Text>
        </View>
        <Icon name="chevron-forward" size={18} color="black" />
      </View>
    </View>
  );
}
