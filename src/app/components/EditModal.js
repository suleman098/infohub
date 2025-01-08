"use client";

import { useAppContext } from "@/app/context/AppContext";
import { useState, useEffect } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@/app/firebase/firebaseConfig";
import toast from "react-hot-toast";
import Modal from "@/app/components/Modal";

function EditModal() {
  const {
    user,
    selectedPreferences,
    setSelectedPreferences,
    showModal,
    setShowModal,
  } = useAppContext();
  const [tempPreferences, setTempPreferences] = useState([]);

  const categories = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];

  useEffect(() => {
    setTempPreferences(selectedPreferences);
  }, [selectedPreferences]);

  const handleCategoryClick = (category) => {
    setTempPreferences((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const handleSavePreferences = async () => {
    setSelectedPreferences(tempPreferences);
    if (user) {
      const userDoc = doc(db, "users", user.uid);
      try {
        await updateDoc(userDoc, { preferences: tempPreferences });
        toast.success("Preferences saved successfully!");
        setShowModal(false);
      } catch (error) {
        toast.error("Failed to save preferences. Please try again.");
        console.error("Error updating preferences:", error);
      }
    }
  };

  const handleModalClose = () => {
    setTempPreferences(selectedPreferences);
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <Modal onClose={handleModalClose}>
      <h2 className="text-lg mb-4">Select Your Preferences:</h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`btn btn-outline ${
              tempPreferences.includes(category) ? "btn-success" : ""
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      <button onClick={handleSavePreferences} className="btn btn-primary mt-4">
        Done
      </button>
    </Modal>
  );
}

export default EditModal;
