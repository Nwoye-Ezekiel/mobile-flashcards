import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { setCurrentDeckTitle } from "../Redux/actions/setCurrentDeckTitle/setCurrentDeckTitle";

const DeckCard = ({ navigation, title, size, dispatch }) => {
  const handlePress = () => {
    dispatch(setCurrentDeckTitle(title));
    navigation.navigate("Deck");
  };
  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <Text>{title}</Text>
        <Text>{size} Cards</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DeckCard;
