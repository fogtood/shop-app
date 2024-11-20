import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import {
  getFirestore,
  setDoc,
  getDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD3LEesfqvdWYLAU2nU2cT5Xco-8EuTu0k",
  authDomain: "shop-app-gt.firebaseapp.com",
  projectId: "shop-app-gt",
  storageBucket: "shop-app-gt.firebasestorage.app",
  messagingSenderId: "860092036595",
  appId: "1:860092036595:web:719c5cd43a2ddb5960ce86",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const signInWithGoogle = async () => {
  try {
    return await signInWithPopup(auth, googleProvider);
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const createUserDocumentFromAuth = async (
  userInfo,
  additionalInformation = {}
) => {
  if (!userInfo) return;

  const userDocRef = doc(db, "users", userInfo.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userInfo;
    const createdAt = serverTimestamp();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        avatar: userInfo?.photoURL,
        emailVerified: userInfo.emailVerified,
        ...additionalInformation,
      });
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  return userSnapshot;
};

export const fetchUserDocumentFromAuth = async (userId) => {
  if (!userId) return null;

  const userDocRef = doc(db, "users", userId);
  const userSnapshot = await getDoc(userDocRef);

  if (userSnapshot.exists()) {
    return userSnapshot.data();
  } else {
    console.error("user does not exist");
    return null;
  }
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
