/* eslint-disable */
//@ts-nocheck

export async function evalSetupFirebaseAuth([customToken, firebaseConfig]: any) {
	window.e2eFirebaseApp = firebase.initializeApp(firebaseConfig);

	await firebase.auth().signInWithCustomToken(customToken);
}
