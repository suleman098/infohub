import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAJcsxEp8uZxlRALN3-yXnvce05C0GuKVE",
  authDomain: "infohub-83b45.firebaseapp.com",
  projectId: "infohub-83b45",
  storageBucket: "infohub-83b45.appspot.com",
  messagingSenderId: "569335732733",
  appId: "1:569335732733:web:01a815f09f1616fa396194",
  measurementId: "G-H962J454NT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app); // Export Firestore instance
