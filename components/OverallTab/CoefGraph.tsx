import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, PanResponder, Animated } from "react-native";
import Svg, { Path, Line, Circle, Text as SvgText, Defs, LinearGradient, Stop } from "react-native-svg";

const { width } = Dimensions.get("screen");
const GRAPH_WIDTH = width - 100;
const GRAPH_HEIGHT = 60;
const SLIDER_KNOB_RADIUS = 12;

export default function ProgressGraph({ dataPoints, video_time }: { dataPoints: number[]; video_time: string }) {
  const [sliderPosition, setSliderPosition] = useState(0.3);
  const pan = useState(new Animated.ValueXY())[0];
  const video_duration = Number(video_time?.split(":")[0]) * 60 + Number(video_time?.split(":")[1]);

  // Автоматичний розподіл точок по X
  const pathPoints = dataPoints.map((yValue, index, array) => ({
    y: yValue,
    x: array.length > 1 ? index / (array.length - 1) : 0, // Розподіляємо рівномірно від 0 до 1
  }));

  const generatePath = () => {
    const absolutePoints = pathPoints.map((point) => ({
      x: point.x * GRAPH_WIDTH,
      y: (1 - point.y / 100) * GRAPH_HEIGHT, // Інверсія: 100% - вгорі, 0% - внизу
    }));

    let pathData = `M ${absolutePoints[0].x},${absolutePoints[0].y}`;

    for (let i = 1; i < absolutePoints.length; i++) {
      const cp1x = absolutePoints[i - 1].x + (absolutePoints[i].x - absolutePoints[i - 1].x) / 3;
      const cp1y = absolutePoints[i - 1].y;
      const cp2x = absolutePoints[i].x - (absolutePoints[i].x - absolutePoints[i - 1].x) / 3;
      const cp2y = absolutePoints[i].y;

      pathData += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${absolutePoints[i].x},${absolutePoints[i].y}`;
    }

    return pathData;
  };

  const formatTime = (position: number) => {
    const totalSeconds = Math.floor(position * video_duration);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const calculatePercentage = (position: number) => {
    let i = 0;
    while (i < pathPoints.length - 1 && pathPoints[i + 1].x < position) {
      i++;
    }

    if (i >= pathPoints.length - 1) {
      return pathPoints[pathPoints.length - 1].y;
    }

    const x1 = pathPoints[i].x;
    const y1 = pathPoints[i].y;
    const x2 = pathPoints[i + 1].x;
    const y2 = pathPoints[i + 1].y;

    const t = (position - x1) / (x2 - x1);
    const y = y1 + t * (y2 - y1);

    return Math.round(y); // уже в % (0-100)
  };

  const handlePositionChange = (touchX: number) => {
    let newX = touchX;
    if (newX < 0) newX = 0;
    if (newX > GRAPH_WIDTH) newX = GRAPH_WIDTH;

    pan.setValue({ x: newX, y: 0 });
    setSliderPosition(newX / GRAPH_WIDTH);
  };

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          pan.extractOffset();
        },
        onPanResponderMove: (_, gesture) => {
          let newX = gesture.dx;
          if (newX < 0) newX = 0;
          if (newX > GRAPH_WIDTH) newX = GRAPH_WIDTH;

          pan.x.setValue(newX);
          setSliderPosition(newX / GRAPH_WIDTH);
        },
        onPanResponderRelease: () => {
          pan.flattenOffset();
        },
      }),
    [pan]
  );

  useEffect(() => {
    pan.setValue({ x: sliderPosition * GRAPH_WIDTH, y: 0 });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.graphContainer}>
        <View
          style={styles.touchArea}
          onStartShouldSetResponder={() => true}
          onResponderRelease={(event) => {
            const touchX = event.nativeEvent.locationX;
            handlePositionChange(touchX);
          }}
        >
          <Svg height={GRAPH_HEIGHT} width={GRAPH_WIDTH}>
            {/* Horizontal dotted lines */}
            <Line x1="0" y1="0" x2={GRAPH_WIDTH} y2="0" stroke="#ccc" strokeDasharray="2,2" />
            <Line x1="0" y1={GRAPH_HEIGHT / 2} x2={GRAPH_WIDTH} y2={GRAPH_HEIGHT / 2} stroke="#ccc" strokeDasharray="2,2" />
            <Line x1="0" y1={GRAPH_HEIGHT} x2={GRAPH_WIDTH} y2={GRAPH_HEIGHT} stroke="#ccc" strokeDasharray="0" />

            {/* Define gradient for the fill */}
            <Defs>
              <LinearGradient id="fillGradient" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor="#52a0ff" stopOpacity="0.25" />
                <Stop offset="1" stopColor="#ffffff" stopOpacity="0.1" />
              </LinearGradient>
            </Defs>

            {/* Fill with gradient */}
            <Path d={`${generatePath()} L ${GRAPH_WIDTH},${GRAPH_HEIGHT} L 0,${GRAPH_HEIGHT} Z`} fill="url(#fillGradient)" />

            {/* Progress line */}
            <Path d={generatePath()} stroke="#52a0ff" strokeWidth="1.3" fill="none" />

            {/* Current position marker */}
            <Line x1={sliderPosition * GRAPH_WIDTH} y1="0" x2={sliderPosition * GRAPH_WIDTH} y2={GRAPH_HEIGHT} stroke="#52a0ff" strokeWidth="0.5" />

            {/* Current position point - now with solid white fill */}
            <Circle
              cx={sliderPosition * GRAPH_WIDTH}
              cy={(1 - calculatePercentage(sliderPosition) / 100) * GRAPH_HEIGHT}
              r="4"
              fill="#ffffff" // Solid white
              stroke="#52a0ff"
              strokeWidth="2"
            />
          </Svg>
        </View>

        <View style={styles.percentageMarkers}>
          <Text style={styles.percentageText}>100%</Text>
          <Text style={styles.percentageText}>50%</Text>
          <Text style={styles.percentageText}></Text>
        </View>
      </View>

      <View style={styles.sliderContainer}>
        <View
          style={styles.sliderTouchArea}
          onStartShouldSetResponder={() => true}
          onResponderRelease={(event) => {
            const touchX = event.nativeEvent.locationX;
            handlePositionChange(touchX);
          }}
        >
          <View style={styles.sliderTrack}>
            <View style={[styles.sliderTrackProgress, { width: sliderPosition * GRAPH_WIDTH }]} />
          </View>

          <Animated.View
            style={[
              styles.sliderHandle,
              {
                transform: [{ translateX: pan.x }],
                left: 0,
              },
            ]}
            {...panResponder.panHandlers}
          />
        </View>
      </View>

      <View style={styles.currentTimeContainer}>
        <Text style={styles.currentTimeText}>
          {formatTime(sliderPosition)} ({calculatePercentage(sliderPosition)}%)
        </Text>
        <Text style={styles.currentTimeText}>{video_time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "white",
    width: 360,
  },
  graphContainer: {
    flexDirection: "row",
    height: GRAPH_HEIGHT,
    marginBottom: 20,
  },
  touchArea: {
    flex: 1,
    height: GRAPH_HEIGHT,
  },
  percentageMarkers: {
    justifyContent: "space-between",
    marginLeft: 22,
  },
  percentageText: {
    fontSize: 11,
    color: "#999",
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 30,
  },
  sliderTouchArea: {
    flex: 1,
    justifyContent: "center",
    position: "relative",
  },
  sliderTrack: {
    height: 4,
    backgroundColor: "#ddd",
    borderRadius: 2,
    overflow: "hidden",
  },
  sliderTrackProgress: {
    height: 4,
    backgroundColor: "#000",
    position: "absolute",
    left: 0,
    top: 0,
  },
  sliderHandle: {
    width: SLIDER_KNOB_RADIUS * 2,
    height: SLIDER_KNOB_RADIUS * 2,
    borderRadius: SLIDER_KNOB_RADIUS,
    backgroundColor: "white",
    position: "absolute",
    top: -SLIDER_KNOB_RADIUS + 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 10,
  },
  currentTimeContainer: {
    alignItems: "center",
    marginTop: 13,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 30,
  },
  currentTimeText: {
    fontSize: 12,
    color: "#9ca3af",
  },
});
