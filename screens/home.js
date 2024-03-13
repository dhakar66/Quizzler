import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import Title from "../components/title";
import React from "react";

function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Title textHolder="QUIZZLER" />
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: "https://cdn3d.iconscout.com/3d/premium/thumb/multiple-choice-6652304-5504813.png?f=webp",
          }}
          style={styles.imageHolder}
          resizeMode="contain"
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Quiz")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  imageHolder: {
    height: 400,
    width: 400,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    height: "100%",
  },
  button: {
    padding: 20,
    backgroundColor: "#457b9d",
    width: "100%",
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "600",
    color: "white",
  },
});
