import { SafeAreaView, ScrollView, FlatList, TouchableOpacity, View, Text, Platform } from "react-native";
import { Header } from "../components/Header";
import Thumbnail from "../components/Thumbnail";
import Tabs from "../components/Tabs";
import Stats from "../components/Stats";
import { useRef, useState } from "react";
import TabsContent from "components/TabsContent";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import Chevron from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";

export default function Analytics() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const tabs: string[] = t("header.tabs", { returnObjects: true }) as string[];
  const [isTabPressed, setIsTabPressed] = useState(false);
  const flatListRef = useRef<FlatList<any>>(null);

  return (
    <SafeAreaView className={`flex-1 ${Platform.OS == 'android' ? 'my-7' : 'my-0'}`}>
      <View className="flex-row items-center justify-center px-4 py-4">
        <TouchableOpacity className="absolute left-4 p-2" onPress={() => navigation.goBack()} onLongPress={() => navigation.navigate("StartPage")}>
          <Chevron name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-center text-xl font-bold">{t("header.title")}</Text>
      </View>

      <ScrollView stickyHeaderIndices={[1]} showsVerticalScrollIndicator={false}>
        <TouchableOpacity activeOpacity={1} onLongPress={() => navigation.navigate("StatsForm")} className="p-4 py-2">
          <Thumbnail />
          <Stats />
        </TouchableOpacity>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} setIsTabPressed={setIsTabPressed} flatListRef={flatListRef} />
        <TabsContent setActiveTab={setActiveTab} tabs={tabs} isTabPressed={isTabPressed} flatListRef={flatListRef} />
      </ScrollView>
    </SafeAreaView>
  );
}
