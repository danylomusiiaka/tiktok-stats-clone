import Heart from "react-native-vector-icons/FontAwesome";
import PlayButton from "react-native-vector-icons/FontAwesome5";
import Bookmark from "react-native-vector-icons/Ionicons";
import { Image, Text, View } from "react-native";
import Divider from "./Divider";

export default function Stats() {
  return (
    <View className="mx-5 flex-row items-center justify-between">
      {/* Play */}
      <View className="flex items-center justify-center">
        <PlayButton name="play" size={16} color="#A1A1A1" />
        <Text className="mt-3.5 text-base font-medium">563К</Text>
      </View>

      <Divider />
      {/* Heart */}
      <View className="flex items-center justify-center">
        <Heart name="heart" size={16} color="#A1A1A1" />
        <Text className="mt-3 text-base font-medium">59К</Text>
      </View>

      <Divider />

      {/* Comment */}
      <View className="flex items-center justify-center">
        <Image source={require("../assets/comment.png")} style={{ width: 24, height: 22 }} />
        <Text className="mt-1.5 text-base font-medium">942</Text>
      </View>

      <Divider />

      {/* Share */}
      <View className="flex items-center justify-center">
        <Image source={require("../assets/share.png")} style={{ width: 22, height: 22 }} />
        <Text className="mt-2 text-base font-medium">39К</Text>
      </View>

      <Divider />

      {/* Bookmark */}
      <View className="flex items-center justify-center">
        <Bookmark name="bookmark" size={18} color="#A1A1A1" />
        <Text className="mt-2.5 text-base font-medium">5,021</Text>
      </View>
    </View>
  );
}
