import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Analytics from "./pages/Analytics";
import StartPage from "./pages/StartPage";
import StatsForm from "./pages/forms/StatsForm";
import MainMetricsForm from "./pages/forms/MainMetricsForm";
import MainMetricsGraphForm from "pages/forms/MainMetricsGraphForm";
import CoefGraphForm from "pages/forms/CoefGraphForm";
import TrafficOriginForm from "./pages/forms/TrafficOriginForm";
import SearchQueriesForm from "./pages/forms/SearchTermsForm";
import ViewersForm from "pages/forms/ViewersAmount&TypeForm";
import ViewersGenderAgeForm from "pages/forms/ViewersGender&AgeForm";
import ViewersPlacesForm from "pages/forms/ViewersPlacesForm";
import FrequentWordsForm from "pages/forms/FrequentWordsForm";
import LikesGraphForm from "pages/forms/LikesGraphForm";
import { IDProvider } from "./contexts/IdContext";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import * as SQLite from "expo-sqlite";
import "./global.css";
import "i18n/i18n";

const Stack = createNativeStackNavigator();

const db = SQLite.openDatabaseSync("myDatabase.db");

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
