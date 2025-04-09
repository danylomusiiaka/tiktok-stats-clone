import { useNavigation, NavigationProp, useFocusEffect } from "@react-navigation/native";
import { useID } from "contexts/IdContext";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { getRowById } from "sqlite/queries/crud";
import { mainMetricsGraphInitial } from "sqlite/tables/mainMetricsGraph";

export default function Graph({ dataPoints = [300, 0, 0], labels = ["359К", "239К", "119К"] }) {
  const { t } = useTranslation();
  const screenWidth = Dimensions.get("screen").width;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [mainMetricsGraph, setMainMetricsGraph] = useState({ ...mainMetricsGraphInitial, points: dataPoints, Ylabels: labels });

  const { id } = useID();
  const fetchRowByID = async () => {
    const mainMetricsGraph = (await getRowById("mainMetricsGraph", id)) as typeof mainMetricsGraphInitial;

    if (mainMetricsGraph.points && mainMetricsGraph.Ylabels) {
      const points = mainMetricsGraph.points
        .split(",")
        .map((point) => point.trim())
        .filter((point) => point !== "")
        .map((point) => Number(point));

      const yLabels = mainMetricsGraph.Ylabels.split(",")
        .map((label) => label.trim())
        .filter((label) => label !== "");

      if (points.length >= 3 && yLabels.length >= 3) {
        setMainMetricsGraph({
          ...mainMetricsGraph,
          points: points,
          Ylabels: yLabels,
        });
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchRowByID();
    }, [])
  );

  const initialWidthOffset = 55;
  const initialMarginRight = 130;
  const offsetPerPoint = 30;
  const maxPointsForAdjustment = 7;

  const pointCount = mainMetricsGraph.points.length;

  const calculateOffset = (initialValue: number, count: number) => {
    const pointsToAdjust = Math.min(count, maxPointsForAdjustment);
    return initialValue - (pointsToAdjust - 3) * offsetPerPoint;
  };

  const widthOffset = calculateOffset(initialWidthOffset, pointCount);
  const marginRight = calculateOffset(initialMarginRight, pointCount);

  const data = {
    labels: new Array(mainMetricsGraph.points.length).fill(""),
    datasets: [
      {
        data: mainMetricsGraph.points,
        color: () => `#52a0ff`,
        strokeWidth: 1.3,
      },
    ],
  };

  return (
    <TouchableOpacity activeOpacity={1} onLongPress={() => navigation.navigate("MainMetricsGraphForm")} className="mt-4">
      <View className="relative flex-row">
        <LineChart
          data={data}
          width={screenWidth + widthOffset}
          height={180}
          withDots={true}
          withShadow={true}
          withInnerLines={true}
          withVerticalLines={false}
          withOuterLines={false}
          segments={mainMetricsGraph.Ylabels.length}
          fromZero={true}
          chartConfig={{
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            decimalPlaces: 0,
            color: () => `#A1A1A1`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            propsForDots: {
              r: "2",
              strokeWidth: "1.5",
              stroke: "#52a0ff",
              fill: "#fff",
            },
            propsForBackgroundLines: {
              strokeDasharray: "2",
              stroke: "#d6d4d4",
            },
            propsForLabels: {
              color: "#A1A1A1",
            },
            fillShadowGradient: "#52a0ff",
            fillShadowGradientTo: "#ffffff",
            fillShadowGradientOpacity: 0.2,
          }}
          style={{
            paddingRight: 10,
            marginRight: marginRight,
          }}
        />

        <View className={`absolute right-0 ml-2 flex ${mainMetricsGraph.Ylabels.length == 3 ? "h-[9rem]" : "h-[9.5rem]"} justify-around`}>
          {mainMetricsGraph.Ylabels.map((item, i) => {
            return (
              <Text key={i} className="text-sm font-medium text-[#A1A1A1]">
                {item}
              </Text>
            );
          })}
        </View>

        <View className="absolute bottom-2 mx-2 w-[22rem] flex-row justify-between">
          <Text className="text-sm font-medium text-[#A1A1A1]">{mainMetricsGraph.XlabelLeft || "15 февр"}</Text>
          <Text className="text-sm font-medium text-[#A1A1A1]">{mainMetricsGraph.XlabelRight || "24 февр"}</Text>
        </View>
      </View>
      <View className="my-3 w-full rounded-lg bg-[#ebeaea] p-3 px-4">
        <Text className="text-sm text-gray-600">{t("mainMetrics.graph.description")}</Text>
      </View>
    </TouchableOpacity>
  );
}
