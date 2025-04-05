import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Analytics from "./pages/Analytics";
import StatsForm from "./pages/StatsForm";
import MainMetricsForm from "./pages/MainMetricsForm";
import StartPage from "./pages/StartPage";
import TrafficOriginForm from "./pages/TrafficOriginForm";
import SearchQueriesForm from "./pages/SearchTermsForm";
import ViewersForm from "pages/ViewersForm";
import ViewersGenderAgeForm from "pages/ViewersGender&AgeForm";
import ViewersPlacesForm from "pages/ViewersPlacesForm";
import FrequentWordsForm from "pages/FrequentWordsForm";
import { IDProvider } from "./contexts/IdContext";
import "./global.css";
import "i18n/i18n";

const Stack = createNativeStackNavigator();

export default function App() {
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
          <Stack.Screen name="TrafficOriginForm" component={TrafficOriginForm} />
          <Stack.Screen name="SearchQueriesForm" component={SearchQueriesForm} />
          <Stack.Screen name="ViewersForm" component={ViewersForm} />
          <Stack.Screen name="ViewersGenderAgeForm" component={ViewersGenderAgeForm} />
          <Stack.Screen name="ViewersPlacesForm" component={ViewersPlacesForm} />
          <Stack.Screen name="FrequentWordsForm" component={FrequentWordsForm} />

          {/* Result of forms */}
          <Stack.Screen name="Analytics" component={Analytics} />
        </Stack.Navigator>
      </NavigationContainer>
    </IDProvider>
  );
}
