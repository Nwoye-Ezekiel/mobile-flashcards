import React, { useEffect, useRef } from "react";
import { View, FlatList } from "react-native";
import { retrieveDecks } from "../Redux/actions/retrieveDecks/retrieveDecks";
import { connect } from "react-redux";
import DeckCard from "./DeckCard";

const Decks = ({ navigation, dispatch, decks }) => {
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted.current) dispatch(retrieveDecks());
    return () => (isMounted.current = false);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
