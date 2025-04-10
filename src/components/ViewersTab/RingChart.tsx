import { View, Text } from "react-native";
import Svg, { G, Path } from "react-native-svg";

export default function RingChart({ data }: { data: RingChartData[] }) {
  // Параметри для діаграми
  const radius = 80;
  const strokeWidth = 30;
  const center = radius + strokeWidth / 2;
  const viewBox = center * 2;
  const gapInDegrees = 1; // Невеликий проміжок між сегментами

  // Функція для перетворення полярних координат у декартові
  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  // Функція для обчислення дуги для SVG
  const getArc = (startAngle: number, endAngle: number) => {
    const start = polarToCartesian(center, center, radius, endAngle);
    const end = polarToCartesian(center, center, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
    return ["M", start.x, start.y, "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(" ");
  };

  // Створення шляхів для сегментів діаграми з проміжками
  let startAngle = -90;
  const segments = data.map((item) => {
    // Обчислюємо кут сегмента на основі відсотка
    const arcAngle = Number(item.percentage) * 1.8; // 180 градусів * процент / 100

    // Додаємо проміжок, зменшуючи кут сегмента
    const adjustedStartAngle = startAngle + gapInDegrees / 2;
    const adjustedEndAngle = startAngle + arcAngle - gapInDegrees / 2;

    // Створюємо шлях з урахуванням проміжка
    const path = getArc(adjustedStartAngle, adjustedEndAngle);

    const segment = {
      ...item,
      path,
      angle: arcAngle - gapInDegrees, // Зменшуємо кут на розмір проміжка
      startAngle: adjustedStartAngle,
      endAngle: adjustedEndAngle,
    };

    // Оновлюємо початковий кут для наступного сегмента
    startAngle += arcAngle;

    return segment;
  });

  return (
    <View className="mb-5 items-center">
      <Svg height={center + strokeWidth} width={viewBox} viewBox={`0 0 ${viewBox} ${center + strokeWidth / 2}`}>
        <G>
          {segments.map((segment) => (
            <Path key={segment.id} d={segment.path} stroke={segment.color} strokeWidth={strokeWidth} fill="none" />
          ))}
        </G>
      </Svg>
    </View>
  );
}
