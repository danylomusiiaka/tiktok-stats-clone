import { StatusBar } from "expo-status-bar";
import { Button, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Analytics: undefined;
};
type FormProps = {
  navigation: StackNavigationProp<RootStackParamList, "Analytics">;
};

export function Form({ navigation }: FormProps) {
  return (
    <SafeAreaView>
      <View className="p-4">
        <Button title="Go to Second Screen" onPress={() => navigation.navigate("Analytics")} />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
