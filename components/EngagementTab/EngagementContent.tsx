import { View, Text, ScrollView } from "react-native";
import FrequentlyUsedWords from "./FrequentlyUsedWords";
import Likes from "./Likes";

export default function Engagement() {
  return (
    <View className="flex">
      <View className="mx-2 mt-2 w-[96vw] rounded-md bg-white p-4">
        <FrequentlyUsedWords />
      </View>
      <View className="mx-2 mt-2 w-[96vw] rounded-md bg-white p-4">
        <Likes />
      </View>
    </View>
  );
}
