import { View, Text } from 'react-native'
import Arrow from "react-native-vector-icons/FontAwesome6";
import Headline from 'components/Headline';

export default function Amount() {
  return (
    <>
      <Headline name="Всего зрителей" spacing="mb-0" />
      <Text className="text-2xl font-bold">521.3K</Text>
      <View className="ml-0.5 mt-1.5 flex-row items-center">
        <Arrow className="mr-1.5" name="circle-arrow-up" size={12} color="#0673D4" />
        <Text className="mr-1.5 font-medium text-[#0673D4]">+548</Text>
        <Text className="text-gray-400">(в сравнении с вчерашним днем)</Text>
      </View>
    </>
  );
}