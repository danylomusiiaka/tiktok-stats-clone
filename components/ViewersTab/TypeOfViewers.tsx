import { View, Text, Touchable, TouchableOpacity } from "react-native";
import Headline from "components/Headline";
import { useID } from "contexts/IdContext";
import { useCallback, useEffect, useState } from "react";
import { viewersInitial } from "sqlite/tables/viewers";
import { getRowById } from "sqlite/queries/crud";
import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";

export default function TypeOfViewers() {
  const [viewers, setViewers] = useState(viewersInitial);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { id } = useID();

  const fetchRowByID = async () => {
    const data = await getRowById("viewers", id);
    setViewers(data as typeof viewersInitial);
  };
  
  useFocusEffect(
    useCallback(() => {
      fetchRowByID();
    }, [])
  );

  return (
    <TouchableOpacity activeOpacity={1} onLongPress={() => navigation.navigate("ViewersForm")}>
      <Headline name="Типы зрителей" />

      <View className="mb-4">
        <View className="mb-2 flex-row justify-between">
          <Text className="font-bold">{viewers?.new_viewers || 0}%</Text>
          <Text className="font-bold">{viewers?.old_viewers || 0}%</Text>
        </View>
        <View className="h-3 flex-row overflow-hidden rounded-sm">
          <View className="h-full rounded-sm bg-blue-500" style={{ width: `${parseInt(viewers?.new_viewers)}%` }} />
          <View className="ml-0.5 h-full rounded-sm bg-blue-300" style={{ width: `${parseInt(viewers?.old_viewers)}%` }} />
        </View>

        <View className="mt-2 flex-row justify-between">
          <Text>Новые зрители</Text>
          <Text>Вернувшиеся зрители</Text>
        </View>
      </View>
      <View className="mb-4">
        <View className="mb-2 flex-row justify-between">
          <Text className="font-bold">{viewers?.not_subscribed || 0}%</Text>
          <Text className="font-bold">{viewers?.subscribed || 0}%</Text>
        </View>
        <View className="h-3 flex-row overflow-hidden rounded-sm ">
          <View className="h-full rounded-sm bg-blue-500" style={{ width: `${parseInt(viewers?.not_subscribed)}%` }} />
          <View className="ml-0.5 h-full rounded-sm bg-blue-300" style={{ width: `${parseInt(viewers?.subscribed)}%` }} />
        </View>

        <View className="mt-2 flex-row justify-between">
          <Text>Не подписанныe</Text>
          <Text>Подписчики</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
