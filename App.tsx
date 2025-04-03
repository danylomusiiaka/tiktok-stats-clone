import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Analytics from "./pages/Analytics";
import StatsForm from "./pages/StatsForm";
import MainMetricsForm from "./pages/MainMetricsForm";
import StartPage from "./pages/StartPage";
import { IDProvider } from "./contexts/IdContext";
import "./global.css";

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
          <Stack.Screen name="StartPage" component={StartPage} />
          <Stack.Screen name="StatsForm" component={StatsForm} />
          <Stack.Screen name="MainMetricsForm" component={MainMetricsForm} />
          <Stack.Screen name="Analytics" component={Analytics} />
        </Stack.Navigator>
      </NavigationContainer>
    </IDProvider>
  );
}
