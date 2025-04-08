import { View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";

const languages = [
  { label: "English", value: "en" },
  { label: "Українська", value: "ua" },
  { label: "Русский", value: "rus" },
];

export default function LanguageDropdown({ onSelectLanguage }: { onSelectLanguage: (lang: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (lang: string) => {
    setSelectedLanguage(lang);
    onSelectLanguage(lang);
    setIsOpen(false);
  };

  const getLabel = (value: string | null) => {
    return languages.find((l) => l.value === value)?.label || "Оберіть мову";
  };

  return (
    <View className="mt-4">
      <Text className="mb-1 text-base font-semibold">🌐 Вибір мови статистики</Text>
      <TouchableOpacity onPress={toggleDropdown} className="rounded-md border border-gray-400 bg-gray-100 px-4 py-3">
        <Text className="text-base text-black">{getLabel(selectedLanguage)}</Text>
      </TouchableOpacity>

      {isOpen && (
        <View className="mt-1 rounded-md border border-gray-300 bg-white">
          {languages.map((lang) => (
            <TouchableOpacity key={lang.value} onPress={() => handleSelect(lang.value)} className="px-4 py-3 hover:bg-gray-100">
              <Text className="text-black">{lang.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}
