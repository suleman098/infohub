"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signup } from "@/app/firebase/ auth";
import AuthForm from "@/app/components/Authform";

function Signup() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSignup = async (email, password, firstName, lastName) => {
    try {
      // Call signup function to create a user
      await signup(email, password, firstName, lastName);
      router.push("/pages/login"); 
    } catch (err) {
      setError(err.message); 
    }
  };

  const handleLoginClick = () => {
    router.push("/login"); // Redirect to login page
  };

  return (
    <>

      <AuthForm
        type="Sign Up"
        onSubmit={handleSignup}
        buttonText="Sign Up"
        linkText="Already have an account?"
        linkAction={handleLoginClick}
      />
    </>
  );
}

export default Signup;
