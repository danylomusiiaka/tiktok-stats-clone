import { View, Text } from "react-native";
import Headline from "../Headline";

const trafficData = [
  { label: "18 - 24", value: 64.0 },
  { label: "25 - 34", value: 23.0 },
  { label: "35 - 44", value: 6.0 },
  { label: "45 - 54", value: 2.0 },
  { label: "55+", value: 5.0 },
];

export default function AgeOfViewers() {
  return (
    <>
      <Headline name="Возраст" infoAvaliable={false} />
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
