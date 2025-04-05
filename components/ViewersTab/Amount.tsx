import { View, Text, TouchableOpacity } from "react-native";
import Arrow from "react-native-vector-icons/FontAwesome6";
import Headline from "components/Headline";
import { useEffect, useState } from "react";
import { useID } from "contexts/IdContext";
import { viewersInitial } from "sqlite/tables/viewers";
import { getRowById } from "sqlite/queries/crud";
import { useNavigation, NavigationProp } from "@react-navigation/native";

type RootStackParamList = {
  ViewersForm: undefined;
};

export default function Amount() {
  const [viewers, setViewers] = useState(viewersInitial);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { id } = useID();

  useEffect(() => {
    const fetchRowByID = async () => {
      const data = await getRowById("viewers", id);
      setViewers(data as typeof viewersInitial);
    };
    fetchRowByID();
  }, [id]);

  return (
    <TouchableOpacity activeOpacity={1} onLongPress={() => navigation.navigate("ViewersForm")}>
      <Headline name="Всего зрителей" spacing="mb-0" />
      <Text className="text-2xl font-bold">{viewers?.total || 0}</Text>
      <View className="ml-0.5 mt-1.5 flex-row items-center">
        <Arrow className="mr-1.5" name="circle-arrow-up" size={12} color="#0673D4" />
        <Text className="mr-1.5 font-medium text-[#0673D4]">+{viewers?.compared_to || 0}</Text>
        <Text className="text-gray-400">(в сравнении с вчерашним днем)</Text>
      </View>
    </TouchableOpacity>
  );
}
