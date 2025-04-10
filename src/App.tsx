import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Analytics from "./screens/Analytics";
import StartPage from "./screens/StartPage";
import StatsForm from "./screens/forms/StatsForm";
import MainMetricsForm from "./screens/forms/MainMetricsForm";
import MainMetricsGraphForm from "~/screens/forms/MainMetricsGraphForm";
import CoefGraphForm from "~/screens/forms/CoefGraphForm";
import TrafficOriginForm from "./screens/forms/TrafficOriginForm";
import SearchQueriesForm from "./screens/forms/SearchTermsForm";
import ViewersForm from "~/screens/forms/ViewersAmount&TypeForm";
import ViewersGenderAgeForm from "~/screens/forms/ViewersGender&AgeForm";
import ViewersPlacesForm from "~/screens/forms/ViewersPlacesForm";
import FrequentWordsForm from "~/screens/forms/FrequentWordsForm";
import LikesGraphForm from "~/screens/forms/LikesGraphForm";
import { IDProvider } from "./contexts/IdContext";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { registerRootComponent } from "expo";
import * as SQLite from "expo-sqlite";
import "./global.css";
import "~/i18n/i18n";

const Stack = createNativeStackNavigator();

const db = SQLite.openDatabaseSync("myDatabase.db");

registerRootComponent(App);

export default function App() {
  useDrizzleStudio(db);
  return (
    <IDProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartPage"
          screenOptions={{
            headerShown: false,
          }}
        >
          {/* Starting from here */}
          <Stack.Screen name="StartPage" component={StartPage} />

          {/* Forms */}
          <Stack.Screen name="StatsForm" component={StatsForm} />

          <Stack.Screen name="MainMetricsForm" component={MainMetricsForm} />
          <Stack.Screen name="MainMetricsGraphForm" component={MainMetricsGraphForm} />
          <Stack.Screen name="CoefGraphForm" component={CoefGraphForm} />
          <Stack.Screen name="TrafficOriginForm" component={TrafficOriginForm} />
          <Stack.Screen name="SearchQueriesForm" component={SearchQueriesForm} />

          <Stack.Screen name="ViewersForm" component={ViewersForm} />
          <Stack.Screen name="ViewersGenderAgeForm" component={ViewersGenderAgeForm} />
          <Stack.Screen name="ViewersPlacesForm" component={ViewersPlacesForm} />

          <Stack.Screen name="FrequentWordsForm" component={FrequentWordsForm} />
          <Stack.Screen name="LikesGraphForm" component={LikesGraphForm} />

          {/* Result of forms */}
          <Stack.Screen name="Analytics" component={Analytics} />
        </Stack.Navigator>
      </NavigationContainer>
    </IDProvider>
  );
}
