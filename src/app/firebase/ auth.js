import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { db } from "../firebase/firebaseConfig"; // Import Firestore database
import { doc, setDoc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";

export const signup = async (email, password, firstName, lastName) => {
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Add user details to Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      firstName: firstName,
      lastName: lastName,
      createdAt: new Date().toISOString(),
    });

    return user;
  } catch (error) {
    console.error("Error signing up:", error.message);
    throw error;
  }
};

// Login Function
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in:", error.message);
    throw error;
  }
};

export const updateUserDetailsInFirestore = async (uid, firstName, lastName) => {
  try {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      firstName: firstName,
      lastName: lastName,
    });
  } catch (error) {
    console.error("Error updating user details in Firestore:", error.message);
    throw error;
  }
};
