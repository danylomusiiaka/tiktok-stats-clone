import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { StackNavigationProp } from "@react-navigation/stack";
import Plus from "react-native-vector-icons/Entypo";
import Clock from "react-native-vector-icons/FontAwesome6";
import Chevron from "react-native-vector-icons/Ionicons";
import { useID } from "contexts/IdContext";
import uuid from "react-native-uuid";

type RootStackParamList = {
  StatsForm: undefined;
  Analytics: undefined;
};
type StartPageProps = {
  navigation: StackNavigationProp<RootStackParamList>;
};

export default function StartPage({ navigation }: StartPageProps) {
  const { setId } = useID();

  return (
    <SafeAreaView className="p-4">
      <TouchableOpacity
        className="mt-2 flex-row items-center justify-center rounded-md bg-green-600 py-4"
        onPress={() => {
          navigation.navigate("StatsForm");
          const newId = uuid.v4();
          setId(newId);
        }}
      >
        <Plus name="plus" size={25} color="white" />
        <Text className="ml-2 text-xl  font-semibold color-white">Створити аналіз відео</Text>
      </TouchableOpacity>
      <View className="my-5 border border-b border-gray-300"></View>
      <View className="mt-4 flex-row items-center">
        <Clock name="clock-rotate-left" size={25} />
        <Text className="m-2 mt-0 text-2xl">Історія створення</Text>
      </View>
      <TouchableOpacity
        className="mt-2 flex-row items-center justify-between rounded-md border-2 border-gray-300 "
        onPress={() => {
          navigation.navigate("Analytics");
        }}
      >
        <View className="flex-row items-center">
          <Image source={require("../assets/thumbnail.png")} style={{ width: 80, height: 80 }} className="rounded-md" />
          <Text className="ml-2 text-lg text-gray-400">Створено 23.04.2025</Text>
        </View>
        <Chevron name="chevron-forward" size={30} color="#9ca3af"></Chevron>
      </TouchableOpacity>

      <StatusBar />
    </SafeAreaView>
  );
}
