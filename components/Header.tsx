import { NavigationProp, useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import Chevron from "react-native-vector-icons/Ionicons";

export function Header({ children }: { children: React.ReactNode }) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View className="flex-row items-center bg-gray-100 py-2">
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        onLongPress={() => navigation.navigate("StartPage")}
      >
        <Chevron name="chevron-back" size={25}></Chevron>
      </TouchableOpacity>
      <Text className="ml-2 text-3xl font-semibold">{children}</Text>
    </View>
  );
}
