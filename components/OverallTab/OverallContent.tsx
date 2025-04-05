import { View, Text, ScrollView } from "react-native";
import { Plitki } from "./MainMetrics";
import { Graph } from "./MainMetricsGraph";
import TrafficHistory from "components/OverallTab/TrafficHistory";
import SearchTerms from "./SearchTerms";
import Icon from "react-native-vector-icons/Ionicons";
import Coef from "./Coef";

export default function Overall() {
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
          <Text className="text-lg">Хотите увеличить трафик?</Text>
          <Text className="text-gray-500">Используйте функцию продвижения, чтобы привлечь большую аудиторию.</Text>
        </View>
        <Icon name="chevron-forward" size={18} color="black" />
      </View>
    </View>
  );
}
