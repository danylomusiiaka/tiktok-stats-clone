import { View, Text, TouchableOpacity } from "react-native";
import Headline from "../Headline";
import { useCallback, useEffect, useState } from "react";
import { useID } from "~/contexts/IdContext";
import { viewersGenderAgeInitial } from "~/sqlite/tables/viewersGenderAge";
import { getRowById } from "~/sqlite/operations/crud";
import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

export default function AgeOfViewers() {
  const [viewersGenderAge, setGenderAgeViewers] = useState(viewersGenderAgeInitial);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { t } = useTranslation();
  const { id } = useID();

  const fetchRowByID = async () => {
    const data = await getRowById("viewersGenderAge", id);
    setGenderAgeViewers(data as typeof viewersGenderAgeInitial);
  };

  useFocusEffect(
    useCallback(() => {
      fetchRowByID();
    }, [])
  );

  const trafficData = [
    { label: "18 - 24", value: viewersGenderAge?.age_18_24 },
    { label: "25 - 34", value: viewersGenderAge?.age_25_34 },
    { label: "35 - 44", value: viewersGenderAge?.age_35_44 },
    { label: "45 - 54", value: viewersGenderAge?.age_45_54 },
    { label: "55+", value: viewersGenderAge?.age_more_55 },
  ];

  return (
    <TouchableOpacity activeOpacity={1} onLongPress={() => navigation.navigate("ViewersGenderAgeForm")}>
      <Headline infoAvaliable={false}>{t("viewers.age_title")}</Headline>
      {trafficData
        .sort((a, b) => Number(b.value) - Number(a.value))
        .map((item, index) => (
          <View key={index} className="mb-4">
            <View className="mb-2 flex-row justify-between">
              <Text>{item?.label}</Text>
              <Text className="font-semibold">{parseInt(item?.value || "0").toFixed(1)}%</Text>
            </View>
            <View className="h-3 overflow-hidden rounded-sm bg-gray-200">
              <View className="h-full rounded-sm bg-blue-500" style={{ width: `${parseInt(item?.value) || 0}%` }} />
            </View>
          </View>
        ))}
    </TouchableOpacity>
  );
}
