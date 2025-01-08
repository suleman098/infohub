"use client";
import { useEffect } from "react";
import React, { useState } from "react";
import { useAppContext } from "@/app/context/AppContext";
import { updateUserDetailsInFirestore } from "@/app/firebase/ auth";
function UserDetails() {
  const { user, updateUserDetails } = useAppContext();
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    try {
      await updateUserDetailsInFirestore(user.uid, firstName, lastName);
      updateUserDetails({ ...user, firstName, lastName });
      setSuccess(true);
    } catch (error) {
      console.error("Error updating user details:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card bg-white border-2 border-gray-300 shadow-xl w-96 p-6">
        <form onSubmit={handleSubmit} className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-black">User Details</h2>

          <div className="mb-4">
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input input-bordered input-success w-full bg-white text-black"
              placeholder="Enter your first name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input input-bordered input-success w-full bg-white text-black"
              placeholder="Enter your last name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="input input-bordered input-success w-full bg-gray-200 text-gray-500 cursor-not-allowed"
              placeholder="Email is not editable"
            />
          </div>
          <button
            type="submit"
            className="flex items-center justify-center space-x-2 text-black btn btn-outline w-full mb-4"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Details"}
          </button>
          {success && (
            <p className="text-green-500 text-sm">Details updated successfully!</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default UserDetails;