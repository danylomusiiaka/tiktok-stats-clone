import { View, Text } from "react-native";
import Headline from "components/Headline";

const trafficData = [
  { label: "Новые зрители", value: 97 },
  { label: "Вернувшиеся зрители", value: 3 },
  { label: "Не подписанныe", value: 80 },
  { label: "Подписчики", value: 20 },
];

export default function TypeOfViewers() {
  return (
    <View>
      <Headline name="Типы зрителей" />
      {trafficData.map((item, index) => {
        if (index % 2 !== 0) return null;
        const nextItem = trafficData[index + 1];
        return (
          <View key={index} className="mb-4">
            <View className="mb-2 flex-row justify-between">
              <Text className="font-bold">{item.value}%</Text>
              <Text className="font-bold">{nextItem?.value || 0}%</Text>
            </View>
            <View className="h-3 flex-row overflow-hidden rounded-sm ">
              <View className="h-full rounded-sm bg-blue-500" style={{ width: `${item.value }%` }} />
              <View className="ml-0.5 h-full rounded-sm bg-blue-300" style={{ width: `${nextItem?.value}%` }} />
            </View>

            <View className="mt-2 flex-row justify-between">
              <Text>{item.label}</Text>
              <Text>{nextItem?.label || ""}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}
