import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

function shuffleArrayOptions(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
function Quiz({ navigation }) {
  const [questions, setQuestions] = useState();
  const [ques, setQuestion] = useState(0);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  async function getQuiz() {
    setIsLoading(true);
    const response = await fetch(
      "https://opentdb.com/api.php?amount=10&type=multiple&encode=url3986"
    );
    const data = await response.json();
    // console.log(data.results[0]);
    setQuestions(data.results);
    setOptions(generateOptionsAndShuffle(data.results[0]));
    setIsLoading(false);
    // console.log(options);
  }

  useEffect(() => {
    getQuiz();
  }, []);

  function handleNextPress() {
    setQuestion(ques + 1);
    setOptions(generateOptionsAndShuffle(questions[ques + 1]));
  }
  function handleShowResult() {
    navigation.navigate("Result", {
      score: score,
    });
  }

  function generateOptionsAndShuffle(_question) {
    const options = [..._question.incorrect_answers];
    options.push(_question.correct_answer);
    shuffleArrayOptions(options);
    return options;
  }

  function handleSelectedOption(_option) {
    if (_option === questions[ques].correct_answer) {
      setScore(score + 10);
    }
    // console.log(_option === questions[ques].correct_answer);
    if (ques !== 9) {
      setQuestion(ques + 1);
      setOptions(generateOptionsAndShuffle(questions[ques + 1]));
    }
    if (ques === 9) {
      handleShowResult();
    }
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        questions && (
          <View style={styles.parentOfCondition}>
            <View style={styles.textHolder}>
              <Text style={styles.question}>
                Q. {decodeURIComponent(questions[ques].question)}
              </Text>
            </View>
            <View style={styles.options}>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => handleSelectedOption(options[0])}
              >
                <Text style={styles.optionText}>
                  {decodeURIComponent(options[0])}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => handleSelectedOption(options[1])}
              >
                <Text style={styles.optionText}>
                  {decodeURIComponent(options[1])}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => handleSelectedOption(options[2])}
              >
                <Text style={styles.optionText}>
                  {decodeURIComponent(options[2])}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => handleSelectedOption(options[3])}
              >
                <Text style={styles.optionText}>
                  {decodeURIComponent(options[3])}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.baseContainer}>
              {/* <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>skip</Text>
            </TouchableOpacity> */}
              {ques !== 9 && (
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleNextPress}
                >
                  <Text style={styles.buttonText}>SKIP</Text>
                </TouchableOpacity>
              )}

              {ques === 9 && (
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleShowResult}
                >
                  <Text style={styles.buttonText}>SHOW RESULT</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )
      )}
    </View>
  );
}

export default Quiz;

const styles = StyleSheet.create({
  container: {
    padding: 40,
    paddingTop: 60,
    paddingHorizontal: 20,
    height: "100%",
  },
  textHolder: {
    marginVertical: 16,
  },
  question: {
    fontSize: 25,
  },
  options: {
    marginVertical: 16,
    flex: 1,
  },
  optionButton: {
    backgroundColor: "#9b5de5",
    padding: 16,
    borderRadius: 12,
    marginVertical: 6,
  },
  optionText: {
    color: "white",
    fontSize: 16,
  },
  baseContainer: {
    marginBottom: 12,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#353535",
    padding: 16,
    borderRadius: 20,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "700",
    color: "white",
  },
  parentOfCondition: {
    height: "100%",
  },
  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
