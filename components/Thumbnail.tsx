import { useID } from "contexts/IdContext";
import { getRowById } from "sqlite/queries/crud";
import { statsInitial } from "sqlite/tables/stats";
import { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";

export default function Thumbnail() {
  const [stats, setStats] = useState(statsInitial);
  const { id } = useID();
  useEffect(() => {
    const fetchRowByID = async () => {
      const stats = await getRowById("stats", id);
      setStats(stats as typeof statsInitial);
    };
    fetchRowByID();
  }, []);

  return (
    <>
      <View className="mb-2 flex items-center justify-center">
        <View className="relative">
          <Image
            source={stats.picture ? { uri: stats.picture } : require("../assets/thumbnail.png")}
            style={{ width: 80, height: 114 }}
            className="rounded-md"
          />
          <View className="absolute bottom-0 left-0 right-0 px-1 pb-2">
            <Text className="text-center font-bold text-white">{stats?.video_duration || 0}</Text>
          </View>
        </View>
      </View>
      <View className="mb-5 flex items-center justify-center">
        <Text className="text-sm text-gray-600">Опубликовано {stats?.publish_date || 0}</Text>
      </View>
    </>
  );
}
