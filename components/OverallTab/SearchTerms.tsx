import { View, Text } from "react-native";
import Headline from "../Headline";

const trafficData = [
  { label: "marseille", value: 6.2 },
  { label: "у него больше", value: 4.6 },
  { label: "#France#Marceille Businessmen", value: 4.6 },
  { label: "marsel", value: 4.6 },
  { label: "marseilles005", value: 4.6 },
];

export default function TrafficHistory() {
  return (
    <>
      <Headline name="Поисковые запросы" />
      {trafficData.map((item, index) => (
        <View key={index} className="mb-4">
          <View className="mb-2 flex-row justify-between">
            <Text>{item.label}</Text>
            <Text className="font-bold">{item.value.toFixed(1)}%</Text>
          </View>
          <View className="h-3 overflow-hidden rounded-sm bg-gray-200">
            <View className="h-full rounded-sm bg-blue-500" style={{ width: `${item.value}%` }} />
          </View>
        </View>
      ))}
    </>
  );
}
