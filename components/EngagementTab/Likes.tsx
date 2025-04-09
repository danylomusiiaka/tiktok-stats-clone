import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useCallback, useState } from "react";
import Headline from "components/Headline";
import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import { useID } from "contexts/IdContext";
import { getRowById } from "sqlite/queries/crud";
import { statsInitial } from "sqlite/tables/stats";
import Play from "react-native-vector-icons/FontAwesome5";
import LikesGraph from "./LikesGraph";
import { useTranslation } from "react-i18next";
import { likesGraphInitial } from "sqlite/tables/likesGraph";

export default function Coef() {
  const [picture, setPicture] = useState("");
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { id } = useID();
  const [likesGraph, setLikesGraph] = useState({ ...likesGraphInitial, points: [90, 70, 20, 1] });

  const fetchRowByID = async () => {
    const data = (await getRowById("stats", id)) as typeof statsInitial;
    setPicture(data.picture);
    const likesGraphData = (await getRowById("likesGraph", id)) as typeof likesGraphInitial;

    if (likesGraphData.points) {
      const points = likesGraphData.points
        .split(",")
        .map((point) => point.trim())
        .filter((point) => point !== "")
        .map((point) => Number(point));

      setLikesGraph({
        ...likesGraphData,
        points: points,
      });
    } else {
      setLikesGraph({
        ...likesGraphData,
        points: [90, 70, 20, 1],
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchRowByID();
    }, [])
  );

  return (
    <TouchableOpacity activeOpacity={1} onLongPress={() => navigation.navigate("LikesGraphForm")}>
      <Headline>{t("engagement.likes_title")}</Headline>
      <Text className="mb-5 text-[14px] text-[#878788]">{t("engagement.likes_desc", { time: likesGraph.featured_time || "0:00" })}</Text>
      <View className="flex w-full items-center justify-center">
        <View className="relative mb-3 rounded-md" style={{ width: 170, height: 265 }}>
          <Image
            source={picture ? { uri: picture } : require("../../assets/thumbnail.png")}
            style={{ width: 170, height: 265 }}
            className="absolute rounded-[0.3rem]"
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
            style={{ position: "absolute", top: "50%", left: "50%", transform: [{ translateX: -10 }, { translateY: -17 }] }}
          />
        </View>
      </View>
      <LikesGraph dataPoints={likesGraph.points} video_time={likesGraph.video_time} />
    </TouchableOpacity>
  );
}
