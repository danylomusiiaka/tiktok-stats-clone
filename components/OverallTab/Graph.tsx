import { View, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";

export const Graph = () => {
  const data = {
    datasets: [
      {
        data: [359, 239, 119, 91, 40, 20, 2], // Зменшено до трьох точок, які відповідають підписам справа
        color: () => `#2596be`,
        strokeWidth: 1.5,
      },
    ],
  };

  return (
    <View className="mt-4">
      <View className="relative flex-row">
        {/* Графік */}
        <LineChart
          data={data}
          width={300}
          height={180}
          withDots={true}
          withShadow={true} // Увімкнено тінь
          withInnerLines={true}
          withVerticalLines={false} // Додано для прибрання вертикальних ліній
          withOuterLines={false}
          segments={3}
          chartConfig={{
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            decimalPlaces: 0,
            color: () => `#A1A1A1`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            propsForDots: {
              r: "2",
              strokeWidth: "1.5",
              stroke: "#2596be",
              fill: "#fff",
            },

            propsForBackgroundLines: {
              strokeDasharray: "4",
            },

            propsForLabels: {
              color: "#A1A1A1",
            },

            fillShadowGradient: "#2596be", // Початок тіні - блакитний
            fillShadowGradientTo: "#ffffff", // Кінець тіні - білий
            fillShadowGradientOpacity: 0.2, // Прозорість тіні
          }}
          style={{
            paddingRight: 10,
          }}
        />

        {/* Підписи значень (справа) */}
        <View className="absolute right-0 ml-2 flex h-[9rem] justify-around">
          <Text className="text-sm font-medium text-[#A1A1A1]">359K</Text>
          <Text className="text-sm font-medium text-[#A1A1A1]">239K</Text>
          <Text className="text-sm font-medium text-[#A1A1A1]">119K</Text>
        </View>
        <View className="absolute bottom-[2.0rem] left-0 right-0 ml-2  w-[22rem] border-[0.8px] border-b border-[#b9b9b9]" />

        <View className="absolute bottom-2 mx-2 w-[22rem] flex-row justify-between">
          <Text className="text-sm font-medium text-[#A1A1A1]">15 февр</Text>
          <Text className="text-sm font-medium text-[#A1A1A1]">21 февр</Text>
        </View>
      </View>
      <View className="my-3 w-full rounded-lg bg-[#ebeaea] p-3 px-4">
        <Text className="text-sm text-gray-600">На диаграмме показывается тренд данных за последние 7 дней после публикации.</Text>
      </View>
    </View>
  );
};
