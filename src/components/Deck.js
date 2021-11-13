import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { deleteDeck } from "../Redux/actions/deleteDeck/deleteDeck";

const Deck = ({ navigation, decks, title, dispatch }) => {
  const [numberOfCards, setNumberOfCards] = useState(0);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  //wait for redux to be updated to prevent error
  useEffect(() => {
    if (isMounted.current) {
      if (Object.keys(decks).includes(title)) {
        setNumberOfCards(decks[title].questions.length);
      }
    }
  }, [decks]);

  useEffect(() => {
    if (isMounted.current) {
      navigation.setOptions({ title: title });
    }
  }, []);

  const handleDeleteDeck = () => {
    dispatch(deleteDeck(title));
    navigation.navigate("Decks");
  };

  return (
    <View>
      <Text>{title}</Text>
      <Text>{numberOfCards} Cards</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AddCard")}
      >
        <Text style={styles.buttonText}>Add Card</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Quiz")}
      >
        <Text style={styles.buttonText}>Start Quiz</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleDeleteDeck}>
        <Text style={styles.buttonText}>Delete Deck</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = ({ decks, currentDeckTitle }) => {
  return {
    decks,
    title: currentDeckTitle,
  };
};

export default connect(mapStateToProps)(Deck);

const styles = StyleSheet.create({
  button: {
    width: "100%",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#007ACC",
    borderRadius: 5,
    height: 60,
    marginTop: 5,
    marginBottom: 5,
  },
  resetButton: {
    backgroundColor: "tomato",
    height: 60,
    color: "black",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
