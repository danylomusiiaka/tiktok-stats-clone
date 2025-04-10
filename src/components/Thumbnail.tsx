import { useID } from "~/contexts/IdContext";
import { getRowById } from "~/sqlite/operations/crud";
import { statsInitial } from "~/sqlite/tables/stats";
import { useCallback, useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

export default function Thumbnail() {
  const { t } = useTranslation();
  const [stats, setStats] = useState(statsInitial);
  const { id } = useID();
  const fetchRowByID = async () => {
    const stats = await getRowById("stats", id);
    setStats(stats as typeof statsInitial);
  };

  useFocusEffect(
    useCallback(() => {
      fetchRowByID();
    }, [])
  );

  return (
    <>
      <View className="mb-2 flex items-center justify-center">
        <View className="relative">
          <Image
            source={stats?.picture ? { uri: stats.picture } : require("../../assets/thumbnail.png")}
            style={{ width: 80, height: 114 }}
            className="rounded-md"
          />
          <View className="absolute bottom-0 left-0 right-0 px-1 pb-2">
            <Text className="text-center font-medium text-white">{stats?.video_duration || 0}</Text>
          </View>
        </View>
      </View>
      <View className="mb-5 flex items-center justify-center">
        <Text className="text-sm text-gray-600">{t("header.published", { publish_date: stats?.publish_date || 0 })}</Text>
      </View>
    </>
  );
}
