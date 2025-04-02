import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Analytics } from "./pages/Analytics";
import { Form } from "./pages/Form";
import "./global.css";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MainForm"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="MainForm" component={Form} />
        <Stack.Screen name="Analytics" component={Analytics} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
