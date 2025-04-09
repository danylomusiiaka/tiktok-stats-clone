import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useCallback, useState } from "react";
import Headline from "components/Headline";
import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import { useID } from "contexts/IdContext";
import { getRowById } from "sqlite/queries/crud";
import { statsInitial } from "sqlite/tables/stats";
import Play from "react-native-vector-icons/FontAwesome5";
import CoefGraph from "./CoefGraph";
import { useTranslation } from "react-i18next";
import { coefGraphInitial } from "sqlite/tables/coefGraph";

export default function Coef() {
  const [picture, setPicture] = useState("");
  const { t, i18n } = useTranslation();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { id } = useID();
  const fontSettings = i18n.language == "en" ? "font-medium text-[14px]" : "text-[14px]";

  const [coefGraph, setcoefGraph] = useState({ ...coefGraphInitial, points: [90, 70, 20, 1] });

  const fetchRowByID = async () => {
    const data = (await getRowById("stats", id)) as typeof statsInitial;
    setPicture(data.picture);

    const coefGraphData = (await getRowById("coefGraph", id)) as typeof coefGraphInitial;

    if (coefGraphData.points) {
      const points = coefGraphData.points
        .split(",")
        .map((point) => point.trim())
        .filter((point) => point !== "")
        .map((point) => Number(point));

      setcoefGraph({
        ...coefGraphData,
        points: points,
      });
    } else {
      setcoefGraph({ ...coefGraphData, points: [90, 70, 20, 1] });
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchRowByID();
    }, [])
  );
  return (
    <TouchableOpacity activeOpacity={1} onLongPress={() => navigation.navigate("CoefGraphForm")}>
      <Headline>{t("coef.title")}</Headline>
      <Text className={`mb-2 text-nowrap ${fontSettings}`}>{t("coef.h2", { percent: coefGraph.percent })}</Text>
      <Text className="mb-5 text-[14px] text-[#878788]">{t("coef.text", { time: coefGraph.featured_time })}</Text>
      <View className="flex w-full items-center justify-center">
        <View className="relative mb-3 rounded-md" style={{ width: 170, height: 270 }}>
          <Image
            source={picture ? { uri: picture } : require("../../assets/thumbnail.png")}
            style={{ width: 170, height: 270 }}
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
      <CoefGraph dataPoints={coefGraph.points} video_time={coefGraph.video_time} />
    </TouchableOpacity>
  );
}
