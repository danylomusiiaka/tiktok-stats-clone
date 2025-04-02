import Headline from "components/Headline";
import { View, Text } from "react-native";
import Svg, { Path, G } from "react-native-svg";

export default function GenderDistributionChart() {
  const data = [
    { id: 1, label: "Мужской", percentage: 85, color: "#0078D7" },
    { id: 2, label: "Женский", percentage: 15, color: "#88C0F0" },
    { id: 3, label: "Другое", percentage: 1, color: "#F0F0F0" },
  ];

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
    const arcAngle = item.percentage * 1.8; // 180 градусів * процент / 100

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
    <View>
      <Headline name="Пол" infoAvaliable={false} />

      <View className="mb-5 items-center">
        <Svg height={center + strokeWidth} width={viewBox} viewBox={`0 0 ${viewBox} ${center + strokeWidth / 2}`}>
          <G>
            {segments.map((segment) => (
              <Path key={segment.id} d={segment.path} stroke={segment.color} strokeWidth={strokeWidth} fill="none" />
            ))}
          </G>
        </Svg>
      </View>

      <View className="mt-2.5">
        {data.map((item, index) => (
          <View key={item.id} className={`flex-row items-center ${index !== data.length - 1 ? "border-b border-gray-200 pb-2" : ""}`}>
            <View className="m-3.5 my-5 ml-0 h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
            <Text className="flex-1 text-base font-semibold">{item.label}</Text>
            <Text className="text-base font-semibold">{item.percentage}%</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
