import AuthContent from "../components/Authentication/AuthContent";
import { useState } from "react";
import { login } from "../utils/auth";
import LoadingOverlay from "../components/Interfaces/LoadingOverlay";
import { Alert } from "react-native";
import { authenticateUser } from "../store/tokenSlice";
import { useDispatch } from "react-redux";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const dispatch = useDispatch();

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      dispatch(authenticateUser({ tokenId: token }));
    } catch (err) {
      Alert.alert(
        "Authentication failed !",
        "Could not log in please chekc your passwort or email adress !"
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging.." />;
  }

  return <AuthContent onAuthenticate={loginHandler} isLogin />;
}

export default LoginScreen;
