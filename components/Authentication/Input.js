import { View, Text, TextInput, StyleSheet } from "react-native";

function Input({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
}) {
  return (
    <View style={styles.container}>
      <Text style={[styles.textLabel, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>
      <TextInput
        style={[styles.textInput, isInvalid && styles.textInputInvalid]}
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  container: {
    marginVertical: 9,
  },
  textLabel: {
    color: "#f1f1f1",
    marginBottom: 5,
  },
  labelInvalid: {
    color: "#FB2576",
  },
  textInput: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: "#D09CFA",
    borderRadius: 5,
    fontSize: 16,
  },
  textInputInvalid: {
    backgroundColor: "#FB2576",
  },
});
