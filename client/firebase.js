// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import {
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
} from "firebase/app-check"
import { getAnalytics } from "firebase/analytics"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-9e8ae.firebaseapp.com",
  projectId: "mern-estate-9e8ae",
  storageBucket: "mern-estate-9e8ae.appspot.com",
  messagingSenderId: "67804467560",
  appId: "1:67804467560:web:1f97acc4db36090bd206dd",
  measurementId: "G-MKXQJXZ1T4",
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

// Create a ReCaptchaEnterpriseProvider instance using your reCAPTCHA Enterprise
// site key and pass it to initializeAppCheck().
// const appCheck = initializeAppCheck(app, {
//   provider:
//     new ReCaptchaEnterpriseProvider(/* reCAPTCHA Enterprise site key */),
//   isTokenAutoRefreshEnabled: true, // Set to true to allow auto-refresh.
// })
