// Packages Imports
import { StyleSheet, ActivityIndicator, View } from "react-native";

// Constanst Imports
import { GlobalStyles } from "../constants/styles";

const CustomSuccessLoader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='small' color='#fff' />
    </View>
  );
};

export default CustomSuccessLoader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
