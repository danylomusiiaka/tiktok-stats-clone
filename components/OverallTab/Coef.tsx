import { View, Text, Image, StyleSheet } from "react-native";
import { useCallback, useState } from "react";
import Headline from "components/Headline";
import { useFocusEffect } from "@react-navigation/native";
import { useID } from "contexts/IdContext";
import { getRowById } from "sqlite/queries/crud";
import { statsInitial } from "sqlite/tables/stats";
import Play from "react-native-vector-icons/FontAwesome5";
import CoefGraph from "./CoefGraph";

export default function Coef() {
  const [picture, setPicture] = useState("");

  const { id } = useID();

  const fetchRowByID = async () => {
    const data = (await getRowById("stats", id)) as typeof statsInitial;
    setPicture(data.picture);
  };

  useFocusEffect(
    useCallback(() => {
      fetchRowByID();
    }, [])
  );

  return (
    <View>
      <Headline name="Коэффициент удержания" />
      <Text className="mb-2 text-nowrap text-[13px]">В среднем, зрители смотрели ваше видео на 90%.</Text>
      <Text className="mb-5 text-gray-500">
        Большиство зрителей прекратили смотреть это видео на отметке 0:01. Узнайте, с какого момента большинство зрителей потеряли интерес к вашему
        видео.
      </Text>
      <View className="flex w-full items-center justify-center">
        <View className="relative mb-3 rounded-md" style={{ width: 160, height: 250 }}>
          <Image
            source={picture ? { uri: picture } : require("../../assets/thumbnail.png")}
            style={{ width: 160, height: 250 }}
            className="absolute rounded-md"
          />
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: "rgba(0, 0, 0, 0.2)",
            }}
            className="rounded-md"
          />
          <Play
            name="play"
            size={30}
            color="white"
            style={{ position: "absolute", top: "50%", left: "50%", transform: [{ translateX: -15 }, { translateY: -15 }] }}
          />
        </View>
      </View>
      <CoefGraph />
    </View>
  );
}
