import { View } from "react-native";
import Amount from "./Amount";
import TypeOfViewers from "./TypeOfViewers";
import GenderCharts from "./GenderCharts";
import AgeOfViewers from "./AgeOfViewers";
import PlacesOfViewers from "./PlacesOfViewers";

export default function Viewers() {
  return (
    <View className="ml-3 flex">
      <View className="ml-2 mt-2 w-[96vw] rounded-md bg-white p-4 pt-2">
        <Amount />
      </View>
      <View className="ml-2 mt-2 w-[96vw] rounded-md bg-white p-4 pt-2">
        <TypeOfViewers />
      </View>
      <View className="ml-2 mt-2 w-[96vw] rounded-md bg-white p-4 pt-2">
        <GenderCharts />
      </View>
      <View className="ml-2 mt-2 w-[96vw] rounded-md bg-white p-4 pt-2">
        <AgeOfViewers />
      </View>
      <View className="ml-2 mt-2 w-[96vw] rounded-md bg-white p-4 pt-2">
        <PlacesOfViewers />
      </View>
    </View>
  );
}
