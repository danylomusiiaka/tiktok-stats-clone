import { NavigationProp, useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import Chevron from "react-native-vector-icons/Ionicons";

export function Header() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View className="flex-row items-center justify-center  px-4 py-4">
      <TouchableOpacity className="absolute left-4 p-2" onPress={() => navigation.goBack()}>
        <Chevron name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
      <Text className="text-center text-xl font-bold">Анализ видео</Text>
    </View>
  );
}
