import Headline from "components/Headline";
import { useID } from "contexts/IdContext";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { getRowById } from "sqlite/queries/crud";
import { mainMetricsInitial } from "sqlite/tables/mainMetricsTable";

export const Plitki = () => {
  const [selectedMetric, setSelectedMetric] = useState("views");
  const [mainMetrics, setMainMetrics] = useState(mainMetricsInitial);
  const { id } = useID();
  useEffect(() => {
    const fetchRowByID = async () => {
      const mainMetrics = await getRowById("main_metrics", id);
      setMainMetrics(mainMetrics as typeof mainMetricsInitial);
    };
    fetchRowByID();
  }, [id]);

  return (
    <>
      <Headline name="Основные метрики" spacing="mb-0" />
      <Text className="mb-4 text-sm text-gray-500">Обновлено {mainMetrics?.updated}</Text>

      <View className="flex flex-row flex-wrap justify-between">
        <TouchableOpacity
          activeOpacity={1}
          className={`mb-3 w-[49%] justify-between rounded-lg border-[0.5px] p-3 py-3 ${selectedMetric === "views" ? "border-blue-500 bg-[#f7f9fc]" : "border-gray-200"}`}
          onPress={() => setSelectedMetric("views")}
        >
          <Text className=" ">Просмотры видео</Text>
          <Text className="text-2xl font-bold" numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.8}>
            {mainMetrics?.views}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={1}
          className={`mb-3 w-[49%] justify-between rounded-lg border-[0.5px] p-3 py-3.5 ${selectedMetric === "totalWatch" ? "border-blue-400 bg-[#f2f5f9]" : "border-gray-200"}`}
          onPress={() => setSelectedMetric("totalWatch")}
        >
          <Text className="">Общая продолжительность просмотра</Text>
          <Text className="text-2xl font-bold" numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.8}>
            {mainMetrics?.total_time_viewing}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={1}
          className={`mb-3 w-[49%] justify-between rounded-lg border-[0.5px] p-3 ${selectedMetric === "avgView" ? "border-blue-500 bg-[#f2f5f9]" : "border-gray-200"}`}
          onPress={() => setSelectedMetric("avgView")}
        >
          <Text className=" ">Среднее время просмотра</Text>
          <Text className="text-2xl font-bold" numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.8}>
            {mainMetrics?.average_time_viewing}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={1}
          className={`mb-3 w-[49%] justify-between rounded-lg border-[0.5px] p-3 py-4 ${selectedMetric === "completion" ? "border-blue-500 bg-[#f2f5f9]" : "border-gray-200"}`}
          onPress={() => setSelectedMetric("completion")}
        >
          <Text className=" ">Просмотрели видео полностью</Text>
          <Text className="text-2xl font-bold" numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.8}>
            {mainMetrics?.full_video_checked}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={1}
          className={`mb-3 w-[49%] justify-between rounded-lg border-[0.5px] p-3 py-4 ${selectedMetric === "subscribers" ? "border-blue-500 bg-[#f2f5f9]" : "border-gray-200"}`}
          onPress={() => setSelectedMetric("subscribers")}
        >
          <Text className=" ">Новые подписчики</Text>
          <Text className="text-2xl font-bold" numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.8}>
            {mainMetrics?.new_subscribers}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
