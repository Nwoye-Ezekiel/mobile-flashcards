import React from "react";
import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Decks from "./Decks";
import AddDeck from "./AddDeck";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
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
}

const styles = StyleSheet.create({
  tabBarLabel: {
    marginTop: -5,
    marginBottom: 5,
    fontSize: 11,
  },
});
