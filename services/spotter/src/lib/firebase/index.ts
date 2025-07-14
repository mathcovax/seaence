// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import * as FirebaseApp from "firebase/app";
import * as FirebaseAuth from "firebase/auth";

declare global {
	interface Window {
		e2eFirebaseApp?: FirebaseApp.FirebaseApp;
	}
}

export function useFirebaseApp() {
	return {
		firebaseApp: window.e2eFirebaseApp ?? FirebaseApp.initializeApp({
			apiKey: "AIzaSyBi30m3j1SmMqApwnVCtRM0yHwpREbHynQ",
			authDomain: "seaence-65707.firebaseapp.com",
			projectId: "seaence-65707",
			storageBucket: "seaence-65707.firebasestorage.app",
			messagingSenderId: "529736055664",
			appId: "1:529736055664:web:61e2aa7f8dc4a0095b2db5",
		}),
	};
}

export function useFirebaseAuth() {
	return {
		GoogleAuthProvider: FirebaseAuth.GoogleAuthProvider,
		getAuth: FirebaseAuth.getAuth,
		signInWithPopup: FirebaseAuth.signInWithPopup,
		signOut: FirebaseAuth.signOut,
	};
}
