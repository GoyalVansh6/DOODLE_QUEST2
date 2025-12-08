import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSignIn } from "@clerk/clerk-react"; // ✅ Clerk hook

const Login = () => {
  const navigate = useNavigate();
  const { signIn, setActive, isLoaded } = useSignIn(); // ✅ Clerk hook

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isLoaded) return; // Clerk not ready yet
    setLoading(true);

    try {
      //  Clerk sign-in attempt
      const result = await signIn.create({
        identifier: formData.email,
        password: formData.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        navigate("/"); // Redirect after login
      } else {
        setError("Login not completed. Try again.");
      }
    } catch (err) {
      setError(err.errors?.[0]?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Panel */}
      <div className="flex-1 bg-gradient-to-b from-[#3B17AB] from-25% to-[#170942] to-100% flex flex-col items-center justify-center p-8 relative">
        <h1
          className="absolute w-[330px] h-[50px] top-[40px] left-[40px] 
            font-[Orbitron] font-bold text-[30px] 
            leading-[140%] tracking-[8%] flex items-center
            bg-gradient-to-r from-[#EDFFF5] to-[rgba(133,213,237,0.74)] 
            text-transparent bg-clip-text"
        >
          DoodleQuest
        </h1>
        <div className="rounded-lg overflow-hidden shadow-2xl">
          <img
            className="w-80 h-auto object-cover"
            src="/images/child.jpg"
            alt="Child"
          />
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col justify-center px-8 py-12 bg-gray-50">
        <div className="max-w-md mx-auto w-full">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 mb-8 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>

          <div className="bg-white rounded-lg shadow-lg p-8 border border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Account Login
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              If you are already a member, log in with your email and password.
            </p>

            {error && (
              <p className="text-red-600 text-sm mb-4 font-medium">{error}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="sampleuser@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#3B17AB] hover:bg-[#170942]
                text-white font-semibold py-3 px-4 rounded-md transition-colors duration-200 disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <div className="text-center text-sm text-gray-600">
                Don’t have an account?{" "}
                <Link
                  to="/signup"
                  className="text-blue-600 hover:text-blue-800 underline font-medium"
                >
                  Sign up here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

