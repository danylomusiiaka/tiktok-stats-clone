import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import Headline from "components/Headline";
import { useID } from "contexts/IdContext";
import { useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Svg, { Path, G } from "react-native-svg";
import { getRowById } from "sqlite/queries/crud";
import { viewersGenderAgeInitial } from "sqlite/tables/viewersGenderAge";
import RingChart from "./RingChart";
import { useTranslation } from "react-i18next";

export default function Gender() {
  const [viewersGenderAge, setGenderAgeViewers] = useState(viewersGenderAgeInitial);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { t, i18n } = useTranslation();
  const { id } = useID();

  const fetchRowByID = async () => {
    const data = await getRowById("viewersGenderAge", id);
    setGenderAgeViewers(data as typeof viewersGenderAgeInitial);
  };

  const fontSettings = i18n.language == "en" ? "font-medium" : "";

  useFocusEffect(
    useCallback(() => {
      fetchRowByID();
    }, [])
  );

  const data = [
    { id: 1, label: t("viewers.men"), percentage: viewersGenderAge?.men || 0, color: "#0078D7" },
    { id: 2, label: t("viewers.women"), percentage: viewersGenderAge?.women || 0, color: "#88C0F0" },
    { id: 3, label: t("viewers.other"), percentage: viewersGenderAge?.other || 0, color: "#F0F0F0" },
  ] as RingChartData[];

  return (
    <TouchableOpacity activeOpacity={1} onLongPress={() => navigation.navigate("ViewersGenderAgeForm")}>
      <Headline infoAvaliable={false}>{t("viewers.gender_title")}</Headline>
      <RingChart data={data} />
      <View className="mt-2.5">
        {data
          .sort((a, b) => b.percentage - a.percentage)
          .map((item, index) => (
            <View key={item.id} className={`flex-row items-center pb-2 ${index !== data.length - 1 ? "border-b border-gray-100" : ""}`}>
              <View className="m-3.5 my-4 ml-0 h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
              <Text className={`flex-1 text-base ${fontSettings}`}>{item.label}</Text>
              <Text className="text-base font-semibold">{item.percentage}%</Text>
            </View>
          ))}
      </View>
    </TouchableOpacity>
  );
}
