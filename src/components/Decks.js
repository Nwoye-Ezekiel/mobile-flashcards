import React, { useEffect, useRef } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { retrieveDecks } from "../Redux/actions/retrieveDecks/retrieveDecks";
import { connect } from "react-redux";
import DeckCard from "./DeckCard";

const Decks = ({ navigation, dispatch, decks }) => {
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted.current) dispatch(retrieveDecks());
    return () => (isMounted.current = false);
  }, []);

  return Object.keys(decks).length === 0 ? (
    <View style={styles.noDecksContainer}>
      <Text  style={styles.noDecks}>There are currently no decks created.</Text>
    </View>
  ) : (
    <View style={styles.mainContainer}>
      <FlatList
        data={Object.keys(decks)}
        renderItem={({ item }) => (
          <DeckCard
            title={decks[item].title}
            size={decks[item].questions.length}
            navigation={navigation}
            dispatch={dispatch}
          />
        )}
        keyExtractor={(index) => "key" + index}
      />
    </View>
  );
};

const mapStateToProps = ({ decks }) => {
  return {
    decks,
  };
};

export default connect(mapStateToProps)(Decks);

const styles = StyleSheet.create({
  mainContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 75,
    minHeight: "100%",
    backgroundColor: "wheat",
  },
  noDecksContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    minHeight: "100%",
    backgroundColor: "wheat",
  },
  noDecks: {
    fontSize: 23,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: -50,
  },
});
