import React, { useEffect, useRef } from "react";
import { View, Text, FlatList, TouchableOpacity, Button } from "react-native";
import { retrieveDecks } from "../Redux/actions/retrieveDecks/retrieveDecks";
import { connect } from "react-redux";
import { setCurrentDeckTitle } from "../Redux/actions/setCurrentDeckTitle/setCurrentDeckTitle";
import { triggerLocalNotificationHandler } from "../utils/api";


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

const Decks = ({ navigation, dispatch, decks }) => {
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      
      dispatch(retrieveDecks());
    }
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        title="Trigger Local Notification"
        onPress={triggerLocalNotificationHandler}
      />
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
