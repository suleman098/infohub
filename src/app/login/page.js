"use client";

import { useRouter } from "next/navigation";
import AuthForm from "@/app/components/Authform";
import { login } from "@/app/firebase/ auth";
import { useState } from "react";
import { useAppContext } from "@/app/context/AppContext"; // Import context
import toast from "react-hot-toast";

function Login() {
  const [error, setError] = useState("");
  const { updateUserDetails } = useAppContext(); // Destructure updateUser from context
  const router = useRouter();

  const handleLogin = async (email, password) => {
    try {
      // Attempt to log in the user
      const user = await login(email, password);

      // Check if additional user data is available and update context
      updateUserDetails({
        email: user.email,
        firstName: user.firstName || "Unknown", // Default if undefined
        lastName: user.lastName || "Unknown", // Default if undefined
      });

      // Display success notification
      toast.success("Logged in successfully!");

      // Navigate to the desired page
      router.push("/pages/foryou");
    } catch (err) {
      // Log the actual error to the console for debugging
      console.error("Login error:", err);

      // Display an error notification
      toast.error(`Login failed: ${err.message}`);

      // Update the local state for error handling if needed
      setError(err.message);
    }
  };

  const handleSignupClick = () => {
    router.push("/pages/signup");
  };

  return (
    <>
      <AuthForm
        type="Login"
        onSubmit={handleLogin}
        buttonText="Login"
        linkText="Don't have an account?"
        linkAction={handleSignupClick}
      />
    </>
  );
}

export default Login;
