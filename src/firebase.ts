// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDHLpoegwWhl_Z3ZmYWw-z62sp0mZCGjmE",
	authDomain: "react-best.firebaseapp.com",
	projectId: "react-best",
	storageBucket: "react-best.firebasestorage.app",
	messagingSenderId: "361882752377",
	appId: "1:361882752377:web:085c263bf6eef41e3d0ba8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth 서비스 연결결
export const auth = getAuth(app);
