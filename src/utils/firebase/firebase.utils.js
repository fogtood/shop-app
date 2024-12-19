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
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
const storage = getStorage(app);

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

export const updateUserProfile = async (
  userId,
  bannerFile,
  avatarFile,
  profileData
) => {
  if (!userId) return;

  const userDocRef = doc(db, "users", userId);

  try {
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
      throw new Error("User does not exist");
    }

    const updates = { ...profileData };

    if (bannerFile) {
      try {
        const bannerFilePath = `users/${userId}/banner.jpg`;
        const bannerFileRef = ref(storage, bannerFilePath);
        const bannerSnapshot = await uploadBytes(bannerFileRef, bannerFile);
        const bannerURL = await getDownloadURL(bannerSnapshot.ref);
        updates.banner = bannerURL;
      } catch (error) {
        console.error("Error uploading image:", error.message);
        throw new Error("Image upload failed.");
      }
    }

    if (avatarFile) {
      try {
        const avatarFilePath = `users/${userId}/avatar.jpg`;
        const avatarFileRef = ref(storage, avatarFilePath);
        const avatarSnapshot = await uploadBytes(avatarFileRef, avatarFile);
        const avatarURL = await getDownloadURL(avatarSnapshot.ref);
        updates.avatar = avatarURL;
      } catch (error) {
        console.error("Error uploading image:", error.message);
        throw new Error("Image upload failed.");
      }
    }

    await setDoc(userDocRef, updates, { merge: true });
  } catch (error) {
    console.error("Error updating profile:", error.message);
    throw error;
  }
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
