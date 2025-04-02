import { View, Text, Image } from 'react-native';

export default function Thumbnail() {
  return (
    <View className="mb-2 flex items-center justify-center">
      <View className="relative">
        <Image
          source={require('../assets/thumbnail.png')}
          style={{ width: 80, height: 114 }}
          className="rounded-md"
        />
        <View className="absolute bottom-0 left-0 right-0 px-1 pb-2">
          <Text className="text-center font-bold text-white">
            8.85 с.
          </Text>
        </View>
      </View>
    </View>
  );
}
