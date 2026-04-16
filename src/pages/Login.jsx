import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if(error) setError(""); // clear error when user types
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (formData.username.trim() && formData.password.trim()) {
      setLoading(true);
      setError("");

      try {
        // Authenticating via an Axios POST Request
        // Note: For testing dummy successful login, use username: "mor_2314" & password: "83r5^_"
        const response = await axios.post("https://fakestoreapi.com/auth/login", {
          username: formData.username,
          password: formData.password,
        });

        const receivedToken = response.data.token;

        dispatch(login({ 
          username: formData.username, 
          email: `${formData.username.toLowerCase()}@example.com`,
          token: receivedToken
        }));
        navigate("/profile");

      } catch (err) {
        // Securely unwrap Axios Error format or default invalid credential error
        setError(err.response?.data?.message || err.response?.data || "Invalid username or password.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <section className="bg-slate-50 flex justify-center items-center min-h-[85vh] py-10 px-5 font-sans relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-[rgb(7,81,89)] rounded-full mix-blend-multiply blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

        <div className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-8 sm:p-10 relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-[rgb(7,81,89)] tracking-tight mb-2">Welcome Back</h1>
            <p className="text-sm text-slate-500 font-medium">Please enter your details to access your account.</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            {error && (
              <div className="bg-rose-50 text-rose-500 border border-rose-200 rounded-xl p-3 text-sm font-medium">
                {error}
              </div>
            )}
            
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-2 mb-1 block">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                placeholder="Enter your username"
                className={`w-full border-2 ${error ? "border-rose-300" : "border-slate-200"} bg-slate-50 focus:bg-white rounded-xl px-4 py-3 outline-none focus:border-[rgb(7,81,89)] focus:ring-4 focus:ring-[rgb(7,81,89)]/10 transition-all font-medium text-slate-800`}
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-2 mb-1 block">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="Enter your password"
                className={`w-full border-2 ${error ? "border-rose-300" : "border-slate-200"} bg-slate-50 focus:bg-white rounded-xl px-4 py-3 outline-none focus:border-[rgb(7,81,89)] focus:ring-4 focus:ring-[rgb(7,81,89)]/10 transition-all font-medium text-slate-800`}
              />
            </div>

            <div className="flex justify-between items-center px-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded text-[rgb(7,81,89)] focus:ring-[rgb(7,81,89)] border-slate-300 cursor-pointer" />
                <span className="text-xs text-slate-500 font-medium group-hover:text-slate-800 transition-colors">Remember for 30 days</span>
              </label>
              <Link to="#" className="text-xs font-bold text-[rgb(7,81,89)] hover:text-orange-500 transition-colors">Forgot password?</Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${loading ? "bg-slate-400 cursor-not-allowed" : "bg-[rgb(7,81,89)] hover:bg-[rgb(6,65,71)] hover:-translate-y-1 shadow-lg shadow-[rgb(7,81,89)]/20"} text-white font-black py-4 rounded-xl transition-all uppercase tracking-widest mt-2`}
            >
              {loading ? "Authenticating..." : "Sign In"}
            </button>
          </form>

          <div className="text-center mt-8 text-sm font-medium text-slate-500">
            Don't have an account?{" "}
            <Link to="/Signup" className="font-bold text-[rgb(7,81,89)] hover:text-orange-500 transition-colors">
              Sign up today
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
