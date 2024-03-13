import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Title from "../components/title";

function Result({ navigation, route }) {
  const { score } = route.params;

  const renderImage =
    score > 40
      ? "https://cdn3d.iconscout.com/3d/premium/thumb/employee-celebrating-victory-5553437-4639141.png"
      : "https://cdn.pixabay.com/photo/2013/07/12/17/12/sad-151795_640.png";
  return (
    <View style={styles.container}>
      <Title textHolder="RESULT" />
      <Text style={styles.textScore}>{score}</Text>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: renderImage,
          }}
          style={styles.imageHolder}
          resizeMode="contain"
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Go To Home</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Result;

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
    paddingVertical: 60,
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
  textScore: {
    fontSize: 24,
    fontWeight: "800",
    alignSelf: "center",
  },
});
