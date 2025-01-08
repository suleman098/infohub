"use client";

import { useState } from "react";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";

function AuthForm({ type, onSubmit, buttonText, linkText, linkAction }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "Sign Up") {
      onSubmit(email, password, firstName, lastName);
    } else {
      onSubmit(email, password);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card bg-white border-2 border-gray-300 shadow-xl w-96 p-6">
        <form onSubmit={handleSubmit} className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-black">{type}</h2>

          {type === "Sign Up" && (
            <>
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
            </>
          )}

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered input-success w-full bg-white text-black"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered input-success w-full bg-white text-black"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="flex items-center justify-center space-x-2 text-black btn btn-outline w-full mb-4"
          >
            {type === "Login" ? <FaSignInAlt /> : <FaUserPlus />}
            <span>{buttonText}</span>
          </button>
        </form>
        <p className="text-center text-black">
          {linkText}{" "}
          <a
            onClick={linkAction}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            {type === "Login" ? "Sign Up" : "Login"}
          </a>
        </p>
      </div>
    </div>
  );
}

export default AuthForm;
