import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, PanResponder, Animated } from "react-native";
import Svg, { Path, Line, Circle, Text as SvgText } from "react-native-svg";

const { width } = Dimensions.get("screen");
const GRAPH_WIDTH = width - 100;
const GRAPH_HEIGHT = 100;
const SLIDER_KNOB_RADIUS = 12;

const ProgressGraph = () => {
  const [sliderPosition, setSliderPosition] = useState(0.25); // 25% position initially
  const pan = useState(new Animated.ValueXY())[0];

  // Create control points for the path - customize these to match your graph exactly
  const pathPoints = [
    { x: 0, y: 20 }, // Start point
    { x: 0.2, y: 30 }, // Rise to peak
    { x: 0.7, y: 60 }, // Slow decline
    { x: 0.85, y: 70 }, // Near end
    { x: 1, y: 90 }, // Sharp drop at end
  ];

  // Generate SVG path string
  const generatePath = () => {
    // Convert relative points to absolute coordinates
    const absolutePoints = pathPoints.map((point) => ({
      x: point.x * GRAPH_WIDTH,
      y: point.y,
    }));

    // Create a smooth curve through the points
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

  // Convert slider position to time string (00:02, 00:09, etc.)
  const formatTime = (position) => {
    const totalSeconds = Math.floor(position * 9); // Assuming 9 seconds total like in image
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // Calculate percentage display based on path position
  const calculatePercentage = (position) => {
    // Find the y-value at the current position through interpolation
    let i = 0;
    while (i < pathPoints.length - 1 && pathPoints[i + 1].x < position) {
      i++;
    }

    if (i >= pathPoints.length - 1) {
      return Math.round((1 - pathPoints[pathPoints.length - 1].y / 100) * 100);
    }

    const x1 = pathPoints[i].x;
    const y1 = pathPoints[i].y;
    const x2 = pathPoints[i + 1].x;
    const y2 = pathPoints[i + 1].y;

    // Linear interpolation
    const t = (position - x1) / (x2 - x1);
    const y = y1 + t * (y2 - y1);

    // Convert y-value to percentage (assuming 0 is 100% and 100 is 0%)
    return Math.round((1 - y / 100) * 100);
  };

  // Function to handle position change from clicks/taps
  const handlePositionChange = (touchX) => {
    let newX = touchX;
    // Constrain to graph width
    if (newX < 0) newX = 0;
    if (newX > GRAPH_WIDTH) newX = GRAPH_WIDTH;

    pan.setValue({ x: newX, y: 0 });
    setSliderPosition(newX / GRAPH_WIDTH);
  };

  // Create pan responder for slider
  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          pan.setOffset({
            x: pan.x._value,
            y: 0,
          });
        },
        onPanResponderMove: (_, gesture) => {
          let newX = gesture.dx;
          // Constrain to graph width
          if (newX < 0) newX = 0;
          if (newX > GRAPH_WIDTH) newX = GRAPH_WIDTH;

          pan.x.setValue(newX);
          setSliderPosition(newX / GRAPH_WIDTH);
        },
        onPanResponderRelease: () => {
          pan.flattenOffset();
        },
      }),
    []
  );

  // Set initial position
  useEffect(() => {
    pan.setValue({ x: sliderPosition * GRAPH_WIDTH, y: 0 });
  }, []);

  return (
    <View style={styles.container}>
      {/* Graph section */}
      <View style={styles.graphContainer}>
        {/* Touch responder for graph area */}
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
            <Line x1="0" y1="0" x2={GRAPH_WIDTH} y2="0" stroke="#ccc" strokeDasharray="3,3" />
            <Line x1="0" y1={GRAPH_HEIGHT / 2} x2={GRAPH_WIDTH} y2={GRAPH_HEIGHT / 2} stroke="#ccc" strokeDasharray="3,3" />
            <Line x1="0" y1={GRAPH_HEIGHT} x2={GRAPH_WIDTH} y2={GRAPH_HEIGHT} stroke="#ccc" strokeDasharray="3,3" />

            {/* Progress line */}
            <Path d={generatePath()} stroke="#4a90e2" strokeWidth="2" fill="none" />

            {/* Current position marker */}
            <Line x1={sliderPosition * GRAPH_WIDTH} y1="0" x2={sliderPosition * GRAPH_WIDTH} y2={GRAPH_HEIGHT} stroke="#4a90e2" strokeWidth="1" />
            <Circle cx={sliderPosition * GRAPH_WIDTH} cy={(1 - calculatePercentage(sliderPosition) / 100) * GRAPH_HEIGHT} r="5" fill="#4a90e2" />

            {/* Fill with light blue */}
            <Path d={`${generatePath()} L ${GRAPH_WIDTH},${GRAPH_HEIGHT} L 0,${GRAPH_HEIGHT} Z`} fill="rgba(74, 144, 226, 0.1)" />
          </Svg>
        </View>

        <View style={styles.percentageMarkers}>
          <Text style={styles.percentageText}>100%</Text>
          <Text style={styles.percentageText}>50%</Text>
          <Text style={styles.percentageText}></Text>
        </View>
      </View>

      {/* Slider and time indicators */}
      <View style={styles.sliderContainer}>
        {/* Touch area for slider */}
        <View
          style={styles.sliderTouchArea}
          onStartShouldSetResponder={() => true}
          onResponderRelease={(event) => {
            const touchX = event.nativeEvent.locationX;
            handlePositionChange(touchX);
          }}
        >
          {/* Visible slider track */}
          <View style={styles.sliderTrack}>
            {/* Чорна частина слайдера (до повзунка) */}
            <View style={[styles.sliderTrackProgress, { width: sliderPosition * GRAPH_WIDTH }]} />
          </View>

          {/* Slider handle with correct shadow */}
          <Animated.View
            style={[
              styles.sliderHandle,
              {
                transform: [{ translateX: pan.x }],
                left: 0, // We control position with transform only
              },
            ]}
            {...panResponder.panHandlers}
          />
        </View>
      </View>

      {/* Current time and percentage */}
      <View style={styles.currentTimeContainer} className="text-gray-400">
        <Text style={styles.currentTimeText}>
          {formatTime(sliderPosition)} ({calculatePercentage(sliderPosition)}%)
        </Text>
        <Text style={styles.currentTimeText}>{"00:09"}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
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
    marginLeft: 10,
  },
  percentageText: {
    fontSize: 10,
    color: "#999",
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  sliderTouchArea: {
    flex: 1,
    justifyContent: "center",
    position: "relative",
  },
  sliderTrack: {
    height: 4,
    backgroundColor: "#ddd", // Сірий колір для фону (після повзунка)
    borderRadius: 2,
    overflow: "hidden", // Щоб чорна частина не виходила за межі
  },
  sliderTrackProgress: {
    height: 4,
    backgroundColor: "#000", // Чорний колір для активної частини (до повзунка)
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
    zIndex: 10, // Забезпечуємо, що повзунок завжди над іншими елементами
  },
  currentTimeContainer: {
    alignItems: "center",
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  currentTimeText: {
    fontSize: 12,
    color: "#9ca3af",
  },
});

export default ProgressGraph;
