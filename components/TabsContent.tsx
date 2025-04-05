import { useRef } from "react";
import { FlatList } from "react-native";
import Overall from "./OverallTab/OverallContent";
import { TabsContentProps } from "interfaces/TabsInterface";
import Viewers from "./ViewersTab/ViewersContent";
import Engagement from "./EngagementTab/EngagementContent";

export default function TabsContent({ setActiveTab, tabs, isTabPressed, flatListRef }: TabsContentProps) {
  const handleViewableItemsChanged = useRef(
    ({
      viewableItems,
    }: {
      viewableItems: Array<{
        index: number | null;
      }>;
    }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null && !isTabPressed) {
        setActiveTab(viewableItems[0].index);
      }
    }
  ).current;

  const renderTabContent = ({ index }: { index: number }) => {
    switch (index) {
      case 0: // Обзор
        return <Overall />;
      case 1: // Зрители
        return <Viewers />;
      case 2: // Вовлеченность
        return <Engagement />;
      default:
        return null;
    }
  };
  return (
    <FlatList
      ref={flatListRef}
      data={tabs}
      renderItem={renderTabContent}
      keyExtractor={(_, index) => index.toString()}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onViewableItemsChanged={handleViewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 50,
      }}
      scrollEnabled={!isTabPressed}
    />
  );
}
