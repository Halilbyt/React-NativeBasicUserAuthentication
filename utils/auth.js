import axios from "axios";

const API_KEY = "AIzaSyAZ9lv4sArCmYkBhmItV6nN4QIaQJv_mDI";

const urlAPI = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=`;

export async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  const token = response.data.idToken;

  return token;
}

export function createUser(email, password) {
  return authenticate("signUp", email, password);
}

export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}
