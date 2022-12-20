import { useState } from "react";
import AuthContent from "../components/Authentication/AuthContent";
import { createUser } from "../utils/auth";
import LoadingOverlay from "../components/Interfaces/LoadingOverlay";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { authenticate } from "../store/tokenSlice";

function SignupScreen() {
  const dispatch = useDispatch();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const responsePayload = await createUser(email, password);
      dispatch(authenticate({ token: responsePayload }));
    } catch (err) {
      Alert.alert(
        "Ops.. Somethink went wrong",
        "Please check your internet or connection !"
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating User.." />;
  }
  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
