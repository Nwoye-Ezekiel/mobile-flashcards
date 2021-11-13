import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { connect } from "react-redux";
import { addCard } from "../Redux/actions/addCard/addCard";


const AddCard = ({ navigation, dispatch, deck }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleQuestionChange = (value) => {
    setQuestion(value);
  };

  const handleAnswerChange = (value) => {
    setAnswer(value);
  };

  const isAnswerValid = (answer) => {
    return answer === "True" || answer === "False";
  };

  const handleSubmit = () => {
    let formattedAnswer = answer[0].toUpperCase() + answer.slice(1);
    dispatch(
      addCard(
        {
          question: question,
          answer: formattedAnswer,
        },
        deck
      )
    );
    if (isAnswerValid(formattedAnswer) === true) {
      navigation.navigate("Deck");
    }
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={(value) => {
          handleQuestionChange(value);
        }}
        value={question}
        placeholder="Question"
      />
      <TextInput
        style={styles.input}
        onChangeText={(value) => {
          handleAnswerChange(value);
        }}
        value={answer}
        placeholder="Answer: Enter true or false"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = ({ currentDeckTitle }) => {
  return {
    deck: currentDeckTitle,
  };
};

export default connect(mapStateToProps)(AddCard);

const styles = StyleSheet.create({
  input: {
    height: 60,
    width: "100%",
    borderWidth: 1,
    marginTop: 30,
    marginBottom: 50,
    padding: 10,
    borderRadius: 5,
    margin: "auto",
    fontSize: 16,
  },
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
