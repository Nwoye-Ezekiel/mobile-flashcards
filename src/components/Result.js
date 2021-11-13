import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Result = ({
  score,
  restartQuiz,
  quit,
  percentage,
  numberOfQuestions,
}) => {
  return (
    <View>
      <Text>Result Statistics</Text>
      <Text>You were {percentage}% accurate</Text>

      <Text>
        You got {score}/{numberOfQuestions} questions correctly
      </Text>

      {score < numberOfQuestions / 2 ? (
        <Text>You Performed Poorly!</Text>
      ) : score === numberOfQuestions ? (
        <Text>Excellent! You got it all correctly.</Text>
      ) : (
        <Text>You perfromed well!</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={restartQuiz}>
        <Text style={styles.buttonText}>Restart Quiz</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={quit}>
        <Text style={styles.buttonText}>Quit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Result;
