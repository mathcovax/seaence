// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import type { FirebaseApp } from "firebase/app";

declare global {
	interface Window {
		e2eFirebaseApp?: FirebaseApp;
	}
}
export async function useFirebaseApp() {
	const { initializeApp } = await import("firebase/app");

	return {
		firebaseApp: window.e2eFirebaseApp ?? initializeApp({
			apiKey: "AIzaSyBi30m3j1SmMqApwnVCtRM0yHwpREbHynQ",
			authDomain: "seaence-65707.firebaseapp.com",
			projectId: "seaence-65707",
			storageBucket: "seaence-65707.firebasestorage.app",
			messagingSenderId: "529736055664",
			appId: "1:529736055664:web:61e2aa7f8dc4a0095b2db5",
		}),
	};
}

export async function useFirebaseAuth() {
	const { GoogleAuthProvider, getAuth, signInWithPopup, signOut } = await import("firebase/auth");

	return {
		GoogleAuthProvider,
		getAuth,
		signInWithPopup,
		signOut,
	};
}
