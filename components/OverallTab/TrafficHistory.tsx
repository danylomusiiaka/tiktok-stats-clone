import { View, Text } from "react-native";
import Headline from "../Headline";

const trafficData = [
  { label: "Рекомендуем", value: 89.6 },
  { label: "Другое", value: 6.1 },
  { label: "Личный профиль", value: 4.3 },
  { label: "Звук", value: 0.0 },
  { label: "Поиск", value: 0.0 },
  { label: "Подписки", value: 0.0 },
];

export default function TrafficHistory() {
  return (
    <>
      <Headline name="Источники трафика" />
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
