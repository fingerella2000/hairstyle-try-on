
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { API_KEY, APP_ID} from "@env"

// app's Firebase configuration
const firebaseConfig = {
  // apiKey: "AIzaSyDM9WKi9aY-SQhkgTpAZCPkavpvJAoOOvc",
  apiKey: API_KEY,
  authDomain: "hairstyle-try-on-a3766.firebaseapp.com",
  projectId: "hairstyle-try-on-a3766",
  storageBucket: "hairstyle-try-on-a3766.appspot.com",
  messagingSenderId: "926616024103",
  // appId: "1:926616024103:web:321b243c9119174aa30a02",
  appId: APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
