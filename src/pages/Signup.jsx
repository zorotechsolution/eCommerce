import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({ 
    username: "", 
    email: "", 
    phone: "", 
    password: "", 
    confirmPassword: "" 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if(error) setError(""); // reset error on typo fix
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    
    if (formData.username.trim() && formData.email.trim()) {
      setLoading(true);
      setError("");

      try {
        // Authenticating via an Axios POST Request to create a new user
        const response = await axios.post("https://fakestoreapi.com/users", {
          email: formData.email,
          username: formData.username,
          password: formData.password,
          phone: formData.phone,
          name: {
             firstname: formData.username,
             lastname: "User"
          },
          address: {
             city: "Chennai",
             street: "Example St",
             number: 1,
             zipcode: "600000"
          }
        });

        // Simulating the token normally generated upon signing up and auto-logging in
        const autoGenToken = `mock_reg_token_${response.data.id || Math.floor(Math.random() * 100)}`;

        dispatch(login({ username: formData.username, email: formData.email, token: autoGenToken }));
        navigate("/profile");

      } catch (err) {
        // Securely unwrap Axios Error format or default invalid credential error
        setError(err.response?.data?.message || err.response?.data || "Failed to register account.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <section className="bg-slate-50 flex justify-center items-center min-h-[90vh] py-10 px-5 font-sans relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-[rgb(7,81,89)] rounded-full mix-blend-multiply blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute bottom-10 left-20 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

        <div className="w-full max-w-lg bg-white/70 backdrop-blur-xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-8 sm:p-10 relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-black text-[rgb(7,81,89)] tracking-tight mb-2">Create Account</h1>
            <p className="text-sm text-slate-500 font-medium">Join us and start your holistic journey today.</p>
          </div>

          <form onSubmit={handleSignup} className="flex flex-col gap-5">
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
                placeholder="Choose a username"
                className={`w-full border-2 ${error ? "border-rose-300" : "border-slate-200"} bg-slate-50 focus:bg-white rounded-xl px-4 py-3 outline-none focus:border-[rgb(7,81,89)] focus:ring-4 focus:ring-[rgb(7,81,89)]/10 transition-all font-medium text-slate-800`}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-5">
              <div className="flex-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-2 mb-1 block">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="name@example.com"
                  className={`w-full border-2 ${error ? "border-rose-300" : "border-slate-200"} bg-slate-50 focus:bg-white rounded-xl px-4 py-3 outline-none focus:border-[rgb(7,81,89)] focus:ring-4 focus:ring-[rgb(7,81,89)]/10 transition-all font-medium text-slate-800`}
                />
              </div>
              <div className="flex-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-2 mb-1 block">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="+91 0000000000"
                  className={`w-full border-2 ${error ? "border-rose-300" : "border-slate-200"} bg-slate-50 focus:bg-white rounded-xl px-4 py-3 outline-none focus:border-[rgb(7,81,89)] focus:ring-4 focus:ring-[rgb(7,81,89)]/10 transition-all font-medium text-slate-800`}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-5">
              <div className="flex-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-2 mb-1 block">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  placeholder="Create password"
                  className={`w-full border-2 ${error ? "border-rose-300" : "border-slate-200"} bg-slate-50 focus:bg-white rounded-xl px-4 py-3 outline-none focus:border-[rgb(7,81,89)] focus:ring-4 focus:ring-[rgb(7,81,89)]/10 transition-all font-medium text-slate-800`}
                />
              </div>
              <div className="flex-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-2 mb-1 block">Confirm</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  placeholder="Repeat password"
                  className={`w-full border-2 ${error ? "border-rose-300" : "border-slate-200"} bg-slate-50 focus:bg-white rounded-xl px-4 py-3 outline-none focus:border-[rgb(7,81,89)] focus:ring-4 focus:ring-[rgb(7,81,89)]/10 transition-all font-medium text-slate-800`}
                />
              </div>
            </div>

            <div className="px-1 mt-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" required className="w-4 h-4 rounded text-[rgb(7,81,89)] focus:ring-[rgb(7,81,89)] border-slate-300 cursor-pointer" />
                <span className="text-xs text-slate-500 font-medium group-hover:text-slate-800 transition-colors">I agree to the Terms & Conditions</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${loading ? "bg-slate-400 cursor-not-allowed" : "bg-[rgb(7,81,89)] hover:bg-[rgb(6,65,71)] hover:-translate-y-1 shadow-lg shadow-[rgb(7,81,89)]/20"} text-white font-black py-4 rounded-xl transition-all uppercase tracking-widest mt-4`}
            >
              {loading ? "Creating Account..." : "Register Account"}
            </button>
          </form>

          <div className="text-center mt-8 text-sm font-medium text-slate-500">
            Already have an account?{" "}
            <Link to="/Login" className="font-bold text-[rgb(7,81,89)] hover:text-orange-500 transition-colors">
              Sign in instead
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
