import { SafeAreaView, ScrollView, FlatList, TouchableOpacity } from "react-native";
import { Header } from "../components/Header";
import Thumbnail from "../components/Thumbnail";
import Tabs from "../components/Tabs";
import Stats from "../components/Stats";
import { useRef, useState } from "react";
import TabsContent from "components/TabsContent";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export default function Analytics() {
  const [activeTab, setActiveTab] = useState(0);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const tabs = ["Обзор", "Зрители", "Вовлеченность"];
  const [isTabPressed, setIsTabPressed] = useState(false);
  const flatListRef = useRef<FlatList<any>>(null);

  return (
    <SafeAreaView className="flex-1">
      <Header/>

      <ScrollView stickyHeaderIndices={[1]} showsVerticalScrollIndicator={false}>
        <TouchableOpacity activeOpacity={1} onLongPress={() => navigation.navigate("StatsForm")} className="p-4 py-2">
          <Thumbnail />
          <Stats />
        </TouchableOpacity>

        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} setIsTabPressed={setIsTabPressed} flatListRef={flatListRef} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <TabsContent setActiveTab={setActiveTab} tabs={tabs} isTabPressed={isTabPressed} flatListRef={flatListRef} />
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}
