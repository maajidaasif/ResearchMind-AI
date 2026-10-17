
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BrainCircuit, Mail, Lock } from "lucide-react";
import { loginUser } from "../services/authService";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      toast.error("Please enter your email and password");
      return;
    }

    setLoading(true);

    try {
      // authService.js returns response.data directly
      const response = await loginUser({
        email: email.trim().toLowerCase(),
        password,
      });

      if (!response?.access_token || !response?.user) {
        throw new Error("Invalid login response from server");
      }

      // Store the JWT token and user details
      localStorage.setItem("token", response.access_token);
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("userName", response.user.full_name);

      toast.success(`Welcome back, ${response.user.full_name}!`);

      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error(
        "Login error:",
        error.response?.data || error
      );

      const message =
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please try again.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="bg-indigo-600 p-4 rounded-full">
            <BrainCircuit size={40} className="text-white" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-white">
          ResearchMind AI
        </h1>

        <p className="text-center text-gray-300 mt-2 mb-8">
          AI-Powered Research Assistant
        </p>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="text-gray-300 text-sm"
            >
              Email
            </label>

            <div className="flex items-center bg-white/10 rounded-xl px-4 mt-2">
              <Mail className="text-gray-400" size={20} />

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent outline-none text-white px-3 py-4 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="text-gray-300 text-sm"
            >
              Password
            </label>

            <div className="flex items-center bg-white/10 rounded-xl px-4 mt-2">
              <Lock className="text-gray-400" size={20} />

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-transparent outline-none text-white px-3 py-4 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition duration-300 rounded-xl py-4 text-white font-semibold"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          {/* Register Link */}
          <p className="text-center text-gray-300">
            Don't have an account?
            <Link
              to="/register"
              className="text-indigo-400 ml-2 hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
