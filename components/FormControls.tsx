import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export default function FormControls({ submitForm, nextPage }: { submitForm: () => Promise<void>; nextPage: keyof RootStackParamList }) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <>
      <TouchableOpacity
        className="mt-4 flex items-center justify-center rounded-md bg-gray-500 py-4"
        onPress={async () => {
          await submitForm();
          navigation.navigate(nextPage);
        }}
      >
        <Text className="text-lg font-semibold color-white">Наступна форма</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="mt-2 flex items-center justify-center rounded-md bg-blue-500 py-4"
        onPress={async () => {
          await submitForm();
          navigation.navigate("Analytics");
        }}
      >
        <Text className="text-lg font-semibold color-white">Переглянути попередній вигляд</Text>
      </TouchableOpacity>
    </>
  );
}
