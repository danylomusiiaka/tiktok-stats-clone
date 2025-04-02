import Headline from "components/Headline";
import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export const Plitki = () => {
  const [selectedMetric, setSelectedMetric] = useState<string>("views");

  return (
    <>
      <Headline name="Основные метрики" spacing="mb-0" />
      <Text className="mb-4 text-sm text-gray-500">Обновлено 26.02.2025.</Text>

      <View className="flex flex-row flex-wrap justify-between">
        <TouchableOpacity activeOpacity={1} className={`mb-3 w-[49%] justify-between rounded-lg border-[0.5px] p-3 py-3 ${selectedMetric === "views" ? "border-blue-500 bg-[#f7f9fc]" : "border-gray-200"}`} onPress={() => setSelectedMetric("views")}>
          <Text className=" ">Просмотры видео</Text>
          <Text className="text-2xl font-bold" numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.8}>
            563858
          </Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={1} className={`mb-3 w-[49%] justify-between rounded-lg border-[0.5px] p-3 py-3.5 ${selectedMetric === "totalWatch" ? "border-blue-400 bg-[#f2f5f9]" : "border-gray-200"}`} onPress={() => setSelectedMetric("totalWatch")}>
          <Text className="">Общая продолжительность просмотра</Text>
          <Text className="text-2xl font-bold" numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.8}>
            0ч.:0мин.:0с.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={1} className={`mb-3 w-[49%] justify-between rounded-lg border-[0.5px] p-3 ${selectedMetric === "avgView" ? "border-blue-500 bg-[#f2f5f9]" : "border-gray-200"}`} onPress={() => setSelectedMetric("avgView")}>
          <Text className=" ">Среднее время просмотра</Text>
          <Text className="text-2xl font-bold" numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.8}>
            7,9 с.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={1} className={`mb-3 w-[49%] justify-between rounded-lg border-[0.5px] p-3 py-4 ${selectedMetric === "completion" ? "border-blue-500 bg-[#f2f5f9]" : "border-gray-200"}`} onPress={() => setSelectedMetric("completion")}>
          <Text className=" ">Просмотрели видео полностью</Text>
          <Text className="text-2xl font-bold" numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.8}>
            42.42%
          </Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={1} className={`mb-3 w-[49%] justify-between rounded-lg border-[0.5px] p-3 py-4 ${selectedMetric === "subscribers" ? "border-blue-500 bg-[#f2f5f9]" : "border-gray-200"}`} onPress={() => setSelectedMetric("subscribers")}>
          <Text className=" ">Новые подписчики</Text>
          <Text className="text-2xl font-bold" numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.8}>
            323
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
