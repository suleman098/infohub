"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig"; // Firebase config
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig"; // Assuming Firestore is initialized

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Retrieve user details from Firestore
        const userRef = doc(db, "users", firebaseUser.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          setUser({
            email: firebaseUser.email,
            firstName: userDoc.data().firstName,
            lastName: userDoc.data().lastName,
            uid: firebaseUser.uid,
          });
        }
      } else {
        setUser(null);
      }
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  const updateUserDetails = (userData) => {
    setUser(userData);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        updateUserDetails,
        selectedPreferences,
        setSelectedPreferences,
        showModal,
        setShowModal,
        openModal,
        closeModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
