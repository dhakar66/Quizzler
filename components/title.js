import { StyleSheet, Text, View } from "react-native";
import React from "react";

function Title({ textHolder }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{textHolder}</Text>
    </View>
  );
}

export default Title;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
  },
  text: {
    fontSize: 36,
    fontWeight: "600",
  },
});
