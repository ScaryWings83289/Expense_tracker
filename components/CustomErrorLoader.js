// Packages Imports
import { StyleSheet, Text, View } from "react-native";

// Components Imports
import CustomButton from "./CustomButton";

// Constants Imports
import { GlobalStyles } from "../constants/styles";

const CustomErrorLoader = ({ message, onConfirm }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occurred!</Text>
      <Text style={styles.text}>{message}</Text>
      <CustomButton onPress={onConfirm}>Okay</CustomButton>
    </View>
  );
};

export default CustomErrorLoader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
