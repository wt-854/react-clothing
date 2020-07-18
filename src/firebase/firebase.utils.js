import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCTv77hxl5LslMzrAutFUCIUiSCZxUBAmQ',
  authDomain: 'crwn-db-b229f.firebaseapp.com',
  databaseURL: 'https://crwn-db-b229f.firebaseio.com',
  projectId: 'crwn-db-b229f',
  storageBucket: 'crwn-db-b229f.appspot.com',
  messagingSenderId: '302356103705',
  appId: '1:302356103705:web:ce4bf679a661ef1dd9e088',
  measurementId: 'G-K12B7XBFW4',
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
