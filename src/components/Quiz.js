import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import CardFlip from "react-native-card-flip";
import { clearNotification, setNotification } from "../utils/api";
import Result from "./Result";

const Quiz = ({ navigation, decks, title }) => {
  const [next, setNext] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [percentage, setPercentage] = useState(false);
  const [flip, setFlip] = useState(false);
  const [numberOfQuestions] = useState(decks[title].questions.length);
  const isMounted = useRef(true);

  let flipcard;

  useEffect(() => {
    return () => (isMounted.current = false);
  }, []);

  useEffect(() => {
    if (isMounted.current)
      setPercentage(((score / numberOfQuestions) * 100).toFixed(2));
  }, [score]);

  useEffect(() => {
    if (isMounted.current) {
      if (showResult) clearNotification().then(() => setNotification());
    }
  }, [showResult]);

  const handleOption = (option) => {
    if (flip) {
      flipcard.flip();
      setFlip(false);
    }

    if (next + 1 === numberOfQuestions) {
      if (option === decks[title].questions[next].answer) setScore(score + 1);
      setShowResult(true);
    } else {
      if (option === decks[title].questions[next].answer) setScore(score + 1);
      setNext(next + 1);
    }
  };

  const handleQuit = () => {
    navigation.navigate("Decks");
  };

  const handleRestartQuiz = () => {
    setScore(0);
    setNext(0);
    setShowResult(false);
    setPercentage(0);
  };

  const handleFlip = () => {
    flipcard.flip();
    setFlip(!flip);
  };

  return (
    <View>
      {showResult && (
        <Result
          percentage={percentage}
          score={score}
          numberOfQuestions={numberOfQuestions}
          restartQuiz={handleRestartQuiz}
          quit={handleQuit}
        />
      )}
      {!showResult &&
        (numberOfQuestions === 0 ? (
          <Text>No Questions Available!</Text>
        ) : (
          <View>
            <Text>
              {next + 1}/{numberOfQuestions}
            </Text>
            <View>
              <CardFlip
                ref={(card) => (flipcard = card)}
                style={styles.card}
                perspective={500}
              >
                <TouchableOpacity style={styles.face}>
                  <Text>{decks[title].questions[next].question}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.back}>
                  <Text>{decks[title].questions[next].answer}</Text>
                </TouchableOpacity>
              </CardFlip>
            </View>
            <Text onPress={handleFlip}>Answer</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleOption("True")}
            >
              <Text style={styles.buttonText}>Correct</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleOption("False")}
            >
              <Text style={styles.buttonText}>Incorrect</Text>
            </TouchableOpacity>
          </View>
        ))}
    </View>
  );
};

const mapStateToProps = ({ decks, currentDeckTitle }) => {
  return {
    decks,
    title: currentDeckTitle,
  };
};

export default connect(mapStateToProps)(Quiz);

const styles = StyleSheet.create({
  card: {
    position: "relative",
    marginRight: 20,
    marginLeft: 20,
    height: 100,
    padding: 20,
    borderWidth: 2,
  },
  face: {
    height: "100%",
    backgroundColor: "#DADADA",
  },
  back: {
    height: "100%",
    backgroundColor: "#FFF0F0",
  },
  cardText: {
    color: "black",
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
