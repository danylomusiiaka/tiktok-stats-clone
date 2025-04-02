import { View, Text } from "react-native";
import Headline from "../Headline";

const trafficData = [
  { label: "Россия", value: 43.4 },
  { label: "Украина", value: 17.8 },
  { label: "Другое", value: 12.6 },
  { label: "Казахстан", value: 7.5 },
  { label: "Беларусь", value: 4.4 },
  { label: "Соединенные Штаты", value: 3.7 },
];

export default function AgeOfViewers() {
  return (
    <>
      <Headline name="Места" />
      {trafficData.map((item, index) => (
        <View key={index} className="mb-4">
          <View className="mb-2 flex-row justify-between">
            <Text className="font-semibold">{item.label}</Text>
            <Text className="font-semibold">{item.value.toFixed(1)}%</Text>
          </View>
          <View className="h-3 overflow-hidden rounded-sm bg-gray-200">
            <View className="h-full rounded-sm bg-blue-500" style={{ width: `${item.value}%` }} />
          </View>
        </View>
      ))}
    </>
  );
}
