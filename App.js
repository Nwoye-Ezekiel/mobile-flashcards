import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import Decks from "./src/components/Decks";
import AddDeck from "./src/components/AddDeck";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./src/Redux/reducers";
import middleware from "./src/Redux/middlewares";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Deck from "./src/components/Deck";
import AddCard from "./src/components/AddCard";
import Quiz from "./src/components/Quiz";

const store = createStore(reducer, middleware);
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Decks"
      screenOptions={{
        tabBarActiveTintColor: "#007ACC",
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tab.Screen
        name="Decks"
        component={Decks}
        options={{
          tabBarLabel: "Decks",
          tabBarIcon: ({ focused }) => {
            return (
              <AntDesign
                name="folder1"
                size={22}
                color={focused ? "#007ACC" : "grey"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Add Deck"
        component={AddDeck}
        options={{
          tabBarLabel: "Add Deck",
          tabBarIcon: ({ focused }) => {
            return (
              <AntDesign
                name="addfolder"
                size={22}
                color={focused ? "#007ACC" : "grey"}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="BottomTabNavigator"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Deck" component={Deck} />
          <Stack.Screen name="AddCard" component={AddCard} />
          <Stack.Screen name="Quiz" component={Quiz} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  tabBarLabel: {
    marginTop: -5,
    marginBottom: 5,
    fontSize: 11,
  },
});
