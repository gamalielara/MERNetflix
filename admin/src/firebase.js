// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYowz5QrfL_AhaEt2oRUy1lv1W36A5ad4",
  authDomain: "mernetflix-7511a.firebaseapp.com",
  projectId: "mernetflix-7511a",
  storageBucket: "mernetflix-7511a.appspot.com",
  messagingSenderId: "173072214827",
  appId: "1:173072214827:web:3de97c81295d950b03b36e",
  measurementId: "G-47FMRLVKWG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const storage = getStorage();
export default storage;
