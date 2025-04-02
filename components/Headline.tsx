import { Text, View } from "react-native";
import Info from "react-native-vector-icons/Feather";

export default function Headline({ name, spacing = "mb-4", infoAvaliable = true }: { name: string; spacing?: string; infoAvaliable?: boolean }) {
  return (
    <View className={`flex-row items-center ${spacing}`}>
      <Text className="mr-1.5 mt-2 text-xl font-bold">{name}</Text>
      {infoAvaliable && <Info name="info" size={14} color="#90959e" className="mt-2" />}
    </View>
  );
}
