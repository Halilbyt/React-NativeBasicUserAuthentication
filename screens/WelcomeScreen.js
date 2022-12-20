import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function WelcomeScreen() {
  const [fetchMessage, setMessage] = useState("");
  const storedToken = useSelector((state) => state.token.token);

  useEffect(() => {
    axios
      .get(
        "https://react-native-dummybackend-default-rtdb.europe-west1.firebasedatabase.app/message.json?auth=" +
          storedToken[0].token
      )
      .then((response) => {
        setMessage(response.data);
      });
  }, [storedToken[0].token]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text style={styles.messageArea}>{fetchMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  messageArea: {
    marginTop: 22,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#612351",
    color: "#f1f1f1",
    fontSize: 20,
    fontWeight: "bold",
    borderRadius: 6,
  },
});
