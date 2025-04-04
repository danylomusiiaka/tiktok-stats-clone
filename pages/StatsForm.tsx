import { TextInput, Text, Keyboard, TouchableOpacity, View, Button, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect, useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { createTable, getAllTables } from "sqlite/queries/table_crud";
import { insertInto, getRowById, deleteAllRows, getAllRows } from "sqlite/queries/crud";
import { statsInitial, statsTableStructure } from "sqlite/tables/stats";
import { useID } from "contexts/IdContext";
import Chevron from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";

type RootStackParamList = {
  Analytics: undefined;
  MainMetricsForm: undefined;
};

type FormProps = {
  navigation: StackNavigationProp<RootStackParamList>;
};

export default function StatsForm({ navigation }: FormProps) {
  const [prevStats, setPrevStats] = useState(statsInitial);
  const [stats, setStats] = useState(statsInitial);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { id } = useID();

  const submitForm = async () => {
    try {
      if (JSON.stringify(stats) === JSON.stringify(prevStats)) return;
      const date = new Date();
      await insertInto("stats", { ...stats, id: id, lastUpdated: date.toString() });
      setPrevStats(stats);
    } catch (error) {
      console.error("Помилка бази даних:", error);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      submitForm();
    }, 800);
    return () => clearTimeout(handler);
  }, [stats]);

  // Функція для вибору зображення з галереї
  const pickImage = async () => {
    try {
      // Запит дозволу на доступ до галереї
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        alert("Для вибору зображення необхідно надати дозвіл на доступ до галереї");
        return;
      }

      // Запуск вибору зображення
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: false,
        aspect: [9, 16],
        quality: 0.5,
      });

      if (!result.canceled && result.assets && result.assets[0].uri) {
        const imageUri = result.assets[0].uri;
        setImagePreview(imageUri);
        setStats({ ...stats, picture: imageUri });
      }
    } catch (error) {
      console.error("Помилка при виборі зображення:", error);
      alert("Не вдалося завантажити зображення");
    }
  };

  useEffect(() => {
    createTable("stats", statsTableStructure);
  }, []);

  useEffect(() => {
    const fetchStatsRow = async () => {
      if (id) {
        const statsData = (await getRowById("stats", id)) as typeof statsInitial;
        if (statsData) {
          setStats(statsData);

          if (statsData.picture) {
            setImagePreview(statsData.picture);
          }
        }
      }
    };
    fetchStatsRow();
  }, [id]);

  return (
    <SafeAreaView>
      <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center bg-gray-100 py-2">
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Chevron name="chevron-back" size={25}></Chevron>
          </TouchableOpacity>
          <Text className="ml-2 text-3xl font-semibold">Загальна статистика</Text>
        </View>
        <View className="flex p-3 pt-0">
          <Text className="mt-3 text-xl">Обкладинка відео</Text>

          {/* Превью зображення */}
          {imagePreview && <Image source={{ uri: imagePreview }} style={{ width: 80, height: 114 }} className="h-48 w-full" resizeMode="cover" />}

          {/* Кнопки для завантаження зображення */}
          <View className="my-2 flex-row justify-between">
            <TouchableOpacity className="mr-2 flex-1 items-center justify-center rounded-md bg-blue-500 py-3" onPress={pickImage}>
              <Text className="font-medium text-white">Вибрати з галереї</Text>
            </TouchableOpacity>
          </View>

          <Text className="mt-3 text-xl">Тривалість відео</Text>
          <TextInput
            value={stats?.video_duration}
            className="h-13 my-2 w-full rounded-md border border-gray-400 p-3 text-[16px]"
            onChangeText={(value) => setStats({ ...stats, video_duration: value })}
            placeholder="напр. 8.8c"
          />
          <Text className="text-xl">Дата опублікування</Text>
          <TextInput
            value={stats?.publish_date}
            className="h-13 my-2 w-full rounded border border-gray-400 p-3 text-[16px]"
            onChangeText={(value) => setStats({ ...stats, publish_date: value })}
            placeholder="напр. 12 февр 2025, 18:25"
          />
          <Text className="text-xl">Кількість переглядів</Text>
          <TextInput
            value={stats?.views}
            className="h-13 my-2 w-full rounded border border-gray-400 p-3 text-[16px]"
            onChangeText={(value) => setStats({ ...stats, views: value })}
            placeholder="напр. 563К"
          />
          <Text className="text-xl">Кількість лайків</Text>
          <TextInput
            value={stats?.likes}
            className="h-13 my-2 w-full rounded border border-gray-400 p-3 text-[16px]"
            onChangeText={(value) => setStats({ ...stats, likes: value })}
            placeholder="напр. 59K"
          />
          <Text className="text-xl">Кількість коментарів</Text>
          <TextInput
            value={stats?.comments}
            className="h-13 my-2 w-full rounded border border-gray-400 p-3 text-[16px]"
            onChangeText={(value) => setStats({ ...stats, comments: value })}
            placeholder="напр. 942"
          />
          <Text className="text-xl">Кількість поділившихся</Text>
          <TextInput
            value={stats?.shares}
            className="h-13 my-2 w-full rounded border border-gray-400 p-3 text-[16px]"
            onChangeText={(value) => setStats({ ...stats, shares: value })}
            placeholder="напр. 39К"
          />
          <Text className="text-xl">Кількість збережень</Text>
          <TextInput
            value={stats?.saved}
            className="h-13 my-2 w-full rounded border border-gray-400 p-3 text-[16px]"
            onChangeText={(value) => setStats({ ...stats, saved: value })}
            placeholder="напр. 5,021"
          />
          <TouchableOpacity
            className="mt-4 flex items-center justify-center rounded-md bg-gray-500 py-4"
            onPress={async () => {
              await submitForm();
              navigation.navigate("MainMetricsForm");
            }}
          >
            <Text className="text-lg font-semibold text-white">Наступна форма</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="mt-2 flex items-center justify-center rounded-md bg-blue-500 py-4"
            onPress={async () => {
              await submitForm();
              navigation.navigate("Analytics");
            }}
          >
            <Text className="text-lg font-semibold text-white">Переглянути попередній вигляд</Text>
          </TouchableOpacity>

          {/* Admin Buttons */}
          {/* <Button
            title="Get all from stats"
            onPress={() => {
              getAllRows("stats");
            }}
          />
          <Button title="Delete all from stats" onPress={() => deleteAllRows("stats")} />
          <Button title="Get all tables" onPress={() => getAllTables()} /> */}
        </View>
      </ScrollView>
      <StatusBar />
    </SafeAreaView>
  );
}
