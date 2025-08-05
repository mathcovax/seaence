/* eslint-disable */
//@ts-nocheck

export function evalGetUserIdToken() {
  	return firebase.auth().currentUser.getIdToken() as string;
}
