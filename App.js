import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store/store";
import IconButton from "./components/Interfaces/IconButton";
import { logout } from "./store/tokenSlice";
import { useEffect } from "react";
import { authenticateUser } from "./store/tokenSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#A555EC" },
        headerTintColor: "white",
        contentStyle: { backgroundColor: "#D09CFA" },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const dispatch = useDispatch();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#A555EC" },
        headerTintColor: "white",
        contentStyle: { backgroundColor: "#D09CFA" },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: () => {
            return (
              <IconButton
                icon="log-out"
                color="#f1f1f1"
                size={30}
                onPress={() => dispatch(logout())}
              />
            );
          },
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authStore = useSelector((state) => state.token.token);

  return (
    <NavigationContainer>
      {!authStore[0].isAuthenticated && <AuthStack />}
      {authStore[0].isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchToken() {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        dispatch(authenticateUser({ tokenId: token }));
      }
    }

    fetchToken();
  }, []);

  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        <Root />
      </Provider>
    </>
  );
}
