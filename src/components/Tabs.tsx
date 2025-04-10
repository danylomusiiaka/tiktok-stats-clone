import { View, Text, TouchableOpacity, Animated, Dimensions } from "react-native";
import { useRef, useEffect } from "react";
import { TabsProps } from "~/interfaces/TabsInterface";
const { width } = Dimensions.get("window");

export default function Tabs({ activeTab, setActiveTab, tabs, setIsTabPressed, flatListRef }: TabsProps) {
  const tabPositionX = useRef(new Animated.Value(0)).current;

  // Update indicator position when active tab changes
  useEffect(() => {
    Animated.spring(tabPositionX, {
      toValue: activeTab * (width / 3.3),
      tension: 50,
      friction: 8,
      useNativeDriver: true,
    }).start();
  }, [activeTab]);

  // Handle tab press
  const handleTabPress = (index: number) => {
    setIsTabPressed(true);
    setActiveTab(index);
    flatListRef.current?.scrollToOffset({
      offset: index * width,
      animated: false,
    });

    // Reset the flag after scroll completes
    setTimeout(() => {
      setIsTabPressed(false);
    }, 50);
  };

  return (
    <View className="relative flex-row border-b border-gray-200 bg-gray-100 px-4">
      {tabs.map((tab: string, index: number) => (
        <TouchableOpacity key={index} onPress={() => handleTabPress(index)} className="flex-1 items-center justify-center py-3">
          <Text className={`text-[15px] ${activeTab === index ? "text-black" : "text-gray-500"}`}>{tab}</Text>
        </TouchableOpacity>
      ))}

      {/* Animated indicator */}
      <Animated.View
        style={{
          position: "absolute",
          width: width / 3,
          height: 2,
          backgroundColor: "black",
          bottom: 0,
          left: 12,
          transform: [{ translateX: tabPositionX }],
        }}
      />
    </View>
  );
}
