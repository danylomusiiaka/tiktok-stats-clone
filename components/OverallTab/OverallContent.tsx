import { View, Text } from "react-native";
import { Plitki } from "./Plitki";
import { Graph } from "./Graph";
import TrafficHistory from "components/OverallTab/TrafficHistory";
import SearchTerms from "./SearchTerms";
import Icon from "react-native-vector-icons/Ionicons";

export default function Overall() {
  return (
    <View className="flex">
      <View className="ml-2 mt-2 w-[96vw] rounded-md bg-white p-4">
        <Plitki />
        <Graph />
      </View>
      <View className="ml-2 mt-2 w-[96vw] rounded-md bg-white p-4">
        <TrafficHistory />
      </View>
      <View className="ml-2 mt-2 w-[96vw] rounded-md bg-white p-4">
        <SearchTerms />
      </View>
      <View className="ml-2 mt-2 w-[96vw] flex-row items-center justify-between rounded-md bg-white p-4">
        <View>
          <Text className="mb-2 font-bold">Хотите увеличить трафик?</Text>
          <Text className="text-gray-500">Используйте функцию продвижения, чтобы привлечь большую аудиторию.</Text>
        </View>
        <Icon name="chevron-forward" size={18} color="black" />
      </View>
    </View>
  );
}
