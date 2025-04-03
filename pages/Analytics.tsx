import { View, Text, SafeAreaView, ScrollView, FlatList } from "react-native";
import { Header } from "../components/Header";
import Thumbnail from "../components/Thumbnail";
import Tabs from "../components/Tabs";
import Stats from "../components/Stats";
import { StackNavigationProp } from "@react-navigation/stack";
import { useRef, useState } from "react";
import TabsContent from "components/TabsContent";

type RootStackParamList = {
  Form: undefined;
};
type AnalyticsProps = {
  navigation: StackNavigationProp<RootStackParamList, "Form">;
};

export default function Analytics({ navigation }: AnalyticsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Обзор", "Зрители", "Вовлеченность"];
  const [isTabPressed, setIsTabPressed] = useState(false);
  const flatListRef = useRef<FlatList<any>>(null);

  return (
    <SafeAreaView className="flex-1">
      <Header navigation={navigation} />

      <ScrollView stickyHeaderIndices={[1]} showsVerticalScrollIndicator={false}>
        <View className="p-4 py-2">
          <Thumbnail />

          

          <Stats />
        </View>

        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} setIsTabPressed={setIsTabPressed} flatListRef={flatListRef} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <TabsContent setActiveTab={setActiveTab} tabs={tabs} isTabPressed={isTabPressed} flatListRef={flatListRef} />
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}
