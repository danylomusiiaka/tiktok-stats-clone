import { FlatList } from "react-native";

export interface TabsProps {
  setActiveTab: (index: number) => void;
  tabs: string[];
  activeTab: number;
  setIsTabPressed: (pressed: boolean) => void;
  flatListRef: React.RefObject<FlatList>;
}

export interface TabsContentProps extends Pick<TabsProps, "setActiveTab" | "tabs" | "flatListRef"> {
  isTabPressed: boolean;
}
