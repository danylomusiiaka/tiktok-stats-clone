import { View, Text, TouchableOpacity } from "react-native";
import Headline from "../Headline";
import { useID } from "contexts/IdContext";
import { useCallback, useEffect, useState } from "react";
import { viewersPlacesInitial } from "sqlite/tables/viewersPlaces";
import { getRowById } from "sqlite/queries/crud";
import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";

export default function PlacesOfViewers() {
  const [viewersPlaces, setViewersPlaces] = useState(viewersPlacesInitial);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { id } = useID();

  const fetchRowByID = async () => {
    const data = (await getRowById("viewersPlaces", id)) as Record<string, string>;
    const parsedData = {
      id: data.id,
      query_values: JSON.parse(data.query_values),
    };
    setViewersPlaces(parsedData as typeof viewersPlacesInitial);
  };

  useFocusEffect(
    useCallback(() => {
      fetchRowByID();
    }, [])
  );
  return (
    <TouchableOpacity activeOpacity={1} onLongPress={() => navigation.navigate("ViewersPlacesForm")}>
      <Headline name="Места" />
      {viewersPlaces.query_values.map((item, index) => (
        <View key={index} className="mb-4">
          <View className="mb-2 flex-row justify-between">
            <Text className="font-semibold">{item.name}</Text>
            <Text className="font-semibold">{parseInt(item.value || "0").toFixed(1)}%</Text>
          </View>
          <View className="h-3 overflow-hidden rounded-sm bg-gray-200">
            <View className="h-full rounded-sm bg-blue-500" style={{ width: `${parseInt(item.value)}%` }} />
          </View>
        </View>
      ))}
    </TouchableOpacity>
  );
}
