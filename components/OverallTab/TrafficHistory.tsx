import { View, Text } from "react-native";
import Headline from "../Headline";
import { useID } from "contexts/IdContext";
import { useEffect, useState } from "react";
import { trafficLabelMapping, trafficOriginInitial } from "sqlite/tables/trafficOrigin";
import { getRowById } from "sqlite/queries/crud";

export default function TrafficHistory() {
  const [trafficOrigin, setTrafficOrigin] = useState(trafficOriginInitial);
  const { id } = useID();

  useEffect(() => {
    const fetchRowByID = async () => {
      const data = await getRowById("trafficOrigin", id);
      setTrafficOrigin(data as typeof trafficOriginInitial);
    };
    fetchRowByID();
  }, [id]);

  return (
    <>
      <Headline name="Источники трафика" />
      {Object.entries(trafficOrigin || trafficOriginInitial)
        .filter(([key]) => key !== "id")
        .map(([key, value]) => (
          <View key={key} className="mb-4">
            <View className="mb-2 flex-row justify-between">
              <Text>{trafficLabelMapping[key]}</Text>
              <Text className="font-bold">{value}%</Text>
            </View>
            <View className="h-3 overflow-hidden rounded-sm bg-gray-200">
              <View className="h-full rounded-sm bg-blue-500" style={{ width: `${parseInt(value)}%` }} />
            </View>
          </View>
        ))}
    </>
  );
}
