import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB6dqpeuxT8qGl6T6UmdmmkgsDwuWnx9CU",
  authDomain: "tuition-app-bd.firebaseapp.com",
  projectId: "tuition-app-bd",
  storageBucket: "tuition-app-bd.appspot.com",
  messagingSenderId: "846868233555",
  appId: "1:846868233555:web:2f5dda1db5e6f0b08975a6",
  measurementId: "G-1FTQSP0MPH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
