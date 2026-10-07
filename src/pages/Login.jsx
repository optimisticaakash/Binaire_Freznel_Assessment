import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-transition flex min-h-screen items-center justify-center bg-[#1b2838] px-6 text-white">
      <div className="w-full max-w-md bg-[#16202d] p-8">
        <h1 className="text-3xl font-semibold">Sign In</h1>

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
                aria-label={showPassword ? "Hide password" : "Show password"}
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
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#66c0f4] hover:text-white">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
