import React, { useState } from "react";
import { signUpGoogle } from "../../api";
import { setUser } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

const GoogleSignIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // State to track loading

  const handleGoogleSuccess = async (response) => {
    setLoading(true); // Set loading to true when sign-in starts
    try {
      const res = await signUpGoogle(response.access_token);
      if (res?.data?.success) {
        const { token } = res.data;
        setUser(token);
        navigate("/home");
      }
    } catch (error) {
      console.error("Google sign-in error", error);
    } finally {
      setLoading(false); // Reset loading state once sign-in is complete
    }
  };

  const login = useGoogleLogin({ onSuccess: handleGoogleSuccess });

  return (
    <div className="flex flex-col items-center gap-2">
      {loading && (
          <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-blue-500"></div>
      )}
      <button
        type="button"
        onClick={() => login()}
        className="bg-[#0560FD] hover:bg-[#0b64ff] text-white font-semibold py-2 px-4 rounded flex gap-x-3 items-center"
        disabled={loading} // Disable button when loading
      >
        <svg
          className="mr-2 -ml-1 w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 488 512"
        >
          <path
            fill="currentColor"
            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
          ></path>
        </svg>
        Sign up with Google
      </button>
    </div>
  );
};

export default GoogleSignIn;
