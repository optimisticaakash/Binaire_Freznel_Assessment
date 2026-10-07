import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
      console.log("Account created successfully");
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("This email is already registered.");
          break;

        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;

        case "auth/weak-password":
          setError("Password must be at least 6 characters.");
          break;

        case "auth/network-request-failed":
          setError("Network error. Please check your internet connection.");
          break;

        default:
          setError("Unable to create account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-transition flex min-h-screen items-center justify-center bg-[#1b2838] px-6 text-white">
      <div className="w-full max-w-md bg-[#16202d] p-8">

        <div className="mb-6 text-center">
          <Link
            to="/"
            className="text-3xl font-bold tracking-wide"
            aria-label="MovieStore home"
          >
            🎬 <span className="text-gray-200">MOVIE</span>
            <span className="text-[#66c0f4]">STORE</span>
          </Link>

          <h1 className="mt-6 text-2xl font-semibold">Create Account</h1>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm text-gray-300">Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#32465a] px-4 py-3 outline-none focus:ring-2 focus:ring-[#66c0f4] focus-visible:ring-2 focus-visible:ring-[#66c0f4]"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">Password</label>

            <div className="flex">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full bg-[#32465a] px-4 py-3 outline-none focus:ring-2 focus:ring-[#66c0f4] focus-visible:ring-2 focus-visible:ring-[#66c0f4]"
                placeholder="Enter your password"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="bg-[#2a475e] px-4 text-sm text-[#66c0f4] hover:bg-[#3a5f7d]"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <p className="mt-2 text-xs text-gray-400">
              Password must be at least 6 characters.
            </p>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-b from-[#67c1f5] to-[#3b7da8] px-5 py-3 font-semibold transition hover:brightness-110 active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
