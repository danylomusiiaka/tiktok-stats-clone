import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import Headline from "components/Headline";
import { useID } from "contexts/IdContext";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { View, Text, TouchableOpacity } from "react-native";
import { getRowById } from "sqlite/operations/crud";
import { mainMetricsInitial } from "sqlite/tables/mainMetrics";

export const Plitki = () => {
  const { t, i18n } = useTranslation();

  const [selectedMetric, setSelectedMetric] = useState("views");
  const [mainMetrics, setMainMetrics] = useState(mainMetricsInitial);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { id } = useID();
  const fetchRowByID = async () => {
    const mainMetrics = await getRowById("main_metrics", id);
    setMainMetrics(mainMetrics as typeof mainMetricsInitial);
  };

  const isEnglish = i18n.language === "en";
  const fontClass = isEnglish ? "font-mediumSans" : "font-sans";

  const mainMetricsLabelMapping: Record<string, string> = {
    views: t("mainMetrics.views"),
    total_time_viewing: t("mainMetrics.total_time_viewing"),
    average_time_viewing: t("mainMetrics.average_time_viewing"),
    full_video_checked: t("mainMetrics.full_video_checked"),
    new_subscribers: t("mainMetrics.new_subscribers"),
  };

  useFocusEffect(
    useCallback(() => {
      fetchRowByID();
    }, [])
  );

  return (
    <TouchableOpacity activeOpacity={1} onLongPress={() => navigation.navigate("MainMetricsForm")}>
      <Headline spacing="mb-0">{t("mainMetrics.title")}</Headline>
      <View className="mb-4 flex-row items-center">
        <Text className={`${i18n.language == "en" ? "font-medium" : "font-normal"} ${fontClass} text-base text-gray-500`}>
          {t("mainMetrics.updated")}{" "}
        </Text>
        <Text className="text-base font-medium text-gray-500">{mainMetrics?.updated}.</Text>
      </View>
      <View className="flex flex-row flex-wrap justify-between">
        {Object.entries(mainMetrics || mainMetricsInitial)
          .filter(([key]) => key !== "id" && key !== "updated")
          .map(([key, value]) => (
            <TouchableOpacity
              key={key}
              activeOpacity={1}
              className={`mb-3 w-[49%] justify-between rounded-lg border-[0.5px] p-3.5 ${selectedMetric === key ? "border-blue-500 bg-[#f7f9fc]" : "border-gray-200"}`}
              onPress={() => setSelectedMetric(key)}
            >
              <Text className={`${i18n.language == "en" ? "font-medium" : "font-normal"} ${fontClass} text-[13px]`}>
                {mainMetricsLabelMapping[key]}
              </Text>
              <Text className="my-1 text-[1.4rem] font-bold" numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.8}>
                {value || 0}
              </Text>
            </TouchableOpacity>
          ))}
      </View>
    </TouchableOpacity>
  );
};
