// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'ADD-YOUR-DETAILS-HERE',
  authDomain: 'ADD-YOUR-DETAILS-HERE',
  projectId: 'ADD-YOUR-DETAILS-HERE',
  storageBucket: 'ADD-YOUR-DETAILS-HERE',
  messagingSenderId: 'ADD-YOUR-DETAILS-HERE',
  appId: 'ADD-YOUR-DETAILS-HERE',
  measurementId: 'ADD-YOUR-DETAILS-HERE',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app);

export default app
