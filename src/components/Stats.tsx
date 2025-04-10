import Heart from "react-native-vector-icons/FontAwesome";
import PlayButton from "react-native-vector-icons/FontAwesome5";
import Bookmark from "react-native-vector-icons/Ionicons";
import { Image, Text, View } from "react-native";
import { useCallback, useState } from "react";
import { getRowById } from "~/sqlite/operations/crud";
import { statsInitial } from "~/sqlite/tables/stats";
import { useID } from "~/contexts/IdContext";
import { useFocusEffect } from "@react-navigation/native";

export default function Stats() {
  const [stats, setStats] = useState(statsInitial);
  const { id } = useID();
  const fetchRowByID = async () => {
    const stats = await getRowById("stats", id);
    setStats(stats as typeof statsInitial);
  };

  useFocusEffect(
    useCallback(() => {
      fetchRowByID();
    }, [])
  );

  return (
    <View className="mx-5 flex-row items-center justify-between">
      {/* Play */}
      <View className="flex items-center justify-center">
        <PlayButton name="play" size={16} color="#A1A1A1" />
        <Text className="mt-3.5 text-base font-medium">{stats?.views || 0}</Text>
      </View>
      <View className="h-8 border-r border-gray-200" />

      {/* Heart */}
      <View className="flex items-center justify-center">
        <Heart name="heart" size={16} color="#A1A1A1" />
        <Text className="mt-3 text-base font-medium">{stats?.likes || 0}</Text>
      </View>
      <View className="h-8 border-r border-gray-200" />

      {/* Comment */}
      <View className="flex items-center justify-center">
        <Image source={require("../../assets/comment.png")} style={{ width: 24, height: 22 }} />
        <Text className="mt-1.5 text-base font-medium">{stats?.comments || 0}</Text>
      </View>
      <View className="h-8 border-r border-gray-200" />

      {/* Share */}
      <View className="flex items-center justify-center">
        <Image source={require("../../assets/share.png")} style={{ width: 22, height: 22 }} />
        <Text className="mt-2 text-base font-medium">{stats?.shares || 0}</Text>
      </View>
      <View className="h-8 border-r border-gray-200" />

      {/* Bookmark */}
      <View className="flex items-center justify-center">
        <Bookmark name="bookmark" size={18} color="#A1A1A1" />
        <Text className="mt-2.5 text-base font-medium">{stats?.saved || 0}</Text>
      </View>
    </View>
  );
}
