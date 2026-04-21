import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaKey, FaLock, FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import API from '../utils/axiosConfig';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  // Phase 1: Request OTP
  const handleRequestOTP = async (e) => {
    e.preventDefault();
    if (!email) return setError("Please enter your email address.");
    
    setLoading(true);
    setError('');
    try {
      await API.post('/auth/forgotpassword', { email });
      setSuccessMsg(`A 6-digit OTP has been sent to ${email}`);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send OTP. Is this email registered?');
    } finally {
      setLoading(false);
    }
  };

  // Phase 2: Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!otp || otp.length < 6) return setError("Please enter a valid 6-digit OTP.");
    
    setLoading(true);
    setError('');
    setSuccessMsg('');
    try {
      await API.post('/auth/verifyotp', { email, otp });
      setSuccessMsg('OTP Verified! Please set your new password.');
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid or expired OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Phase 3: Set New Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) return setError("Password must be at least 6 characters.");
    if (newPassword !== confirmPassword) return setError("Passwords do not match.");
    
    setLoading(true);
    setError('');
    try {
      await API.put('/auth/resetpassword', { email, otp, password: newPassword });
      setSuccessMsg('Password has been successfully reset! Redirecting to login...');
      setTimeout(() => {
        navigate('/Login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to reset password. Process may have expired.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 flex justify-center items-center min-h-[85vh] py-10 px-5 font-sans relative overflow-hidden">
      {/* Background Blobs matching Login.jsx */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-[rgb(7,81,89)] rounded-full mix-blend-multiply blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-8 sm:p-10 relative z-10 transition-all">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-[rgb(7,81,89)] tracking-tight mb-2">Password Reset</h1>
          <p className="text-sm text-slate-500 font-medium">
            {step === 1 && "Enter your email to receive a One-Time Password."}
            {step === 2 && "Enter the 6-digit code sent to your email."}
            {step === 3 && "Securely set up your new account password."}
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-rose-50 text-rose-500 border border-rose-200 rounded-xl p-3 text-sm font-medium animate-fade-in text-center">
            {error}
          </div>
        )}
        
        {successMsg && (
          <div className="mb-6 bg-green-50 text-green-600 border border-green-200 rounded-xl p-3 text-sm font-medium flex items-center justify-center gap-2 animate-fade-in text-center">
            <FaCheckCircle className="shrink-0" /> {successMsg}
          </div>
        )}

        {/* STEP 1: EMAIL */}
        {step === 1 && (
          <form onSubmit={handleRequestOTP} className="flex flex-col gap-5 animate-fade-in">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-2 mb-1 block flex items-center gap-2">
                <FaEnvelope className="text-[rgb(7,81,89)]" /> Account Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                required
                placeholder="name@example.com"
                className={`w-full border-2 ${error ? "border-rose-300" : "border-slate-200"} bg-slate-50 focus:bg-white rounded-xl px-4 py-3 outline-none focus:border-[rgb(7,81,89)] focus:ring-4 focus:ring-[rgb(7,81,89)]/10 transition-all font-medium text-slate-800`}
              />
            </div>
            <button
              type="submit"
              disabled={loading || !email}
              className={`w-full ${loading || !email ? "bg-slate-400 cursor-not-allowed" : "bg-[rgb(7,81,89)] hover:bg-[rgb(6,65,71)] hover:-translate-y-1 shadow-lg shadow-[rgb(7,81,89)]/20"} text-white font-black py-4 rounded-xl transition-all uppercase tracking-widest mt-2 flex items-center justify-center gap-2`}
            >
              {loading ? "Sending..." : "Send OTP"} <FaArrowRight />
            </button>
          </form>
        )}

        {/* STEP 2: OTP */}
        {step === 2 && (
          <form onSubmit={handleVerifyOTP} className="flex flex-col gap-5 animate-fade-in">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-2 mb-1 block flex items-center gap-2">
                <FaKey className="text-orange-500" /> Enter 6-Digit OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => { setOtp(e.target.value); setError(''); }}
                required
                maxLength="6"
                placeholder="• • • • • •"
                className={`w-full border-2 text-center tracking-[1em] text-2xl ${error ? "border-rose-300" : "border-slate-200"} bg-slate-50 focus:bg-white rounded-xl px-4 py-3 outline-none focus:border-[rgb(7,81,89)] focus:ring-4 focus:ring-[rgb(7,81,89)]/10 transition-all font-black text-[rgb(7,81,89)]`}
              />
            </div>
            <button
              type="submit"
              disabled={loading || otp.length < 6}
              className={`w-full ${loading || otp.length < 6 ? "bg-slate-400 cursor-not-allowed" : "bg-[rgb(7,81,89)] hover:bg-[rgb(6,65,71)] hover:-translate-y-1 shadow-lg shadow-[rgb(7,81,89)]/20"} text-white font-black py-4 rounded-xl transition-all uppercase tracking-widest mt-2`}
            >
              {loading ? "Verifying..." : "Verify Code"}
            </button>
            <button type="button" onClick={() => setStep(1)} className="text-xs font-bold text-[rgb(7,81,89)] hover:text-orange-500 transition-colors text-center w-full mt-2">
              Entered wrong email? Go back.
            </button>
          </form>
        )}

        {/* STEP 3: NEW PASSWORD */}
        {step === 3 && (
          <form onSubmit={handleResetPassword} className="flex flex-col gap-5 animate-fade-in">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-2 mb-1 block flex items-center gap-2">
                <FaLock className="text-[rgb(7,81,89)]" /> New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => { setNewPassword(e.target.value); setError(''); }}
                required
                placeholder="Enter new password"
                className={`w-full border-2 ${error ? "border-rose-300" : "border-slate-200"} bg-slate-50 focus:bg-white rounded-xl px-4 py-3 outline-none focus:border-[rgb(7,81,89)] focus:ring-4 focus:ring-[rgb(7,81,89)]/10 transition-all font-medium text-slate-800`}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-2 mb-1 block flex items-center gap-2">
                <FaLock className="text-gray-400" /> Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setError(''); }}
                required
                placeholder="Re-enter new password"
                className={`w-full border-2 ${error ? "border-rose-300" : "border-slate-200"} bg-slate-50 focus:bg-white rounded-xl px-4 py-3 outline-none focus:border-[rgb(7,81,89)] focus:ring-4 focus:ring-[rgb(7,81,89)]/10 transition-all font-medium text-slate-800`}
              />
            </div>
            <button
              type="submit"
              disabled={loading || !newPassword || !confirmPassword}
              className={`w-full ${loading || !newPassword || !confirmPassword ? "bg-slate-400 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-700 hover:-translate-y-1 shadow-lg shadow-emerald-600/20"} text-white font-black py-4 rounded-xl transition-all uppercase tracking-widest mt-2`}
            >
              {loading ? "Updating..." : "Save New Password"}
            </button>
          </form>
        )}

        <div className="text-center mt-8 text-sm font-medium text-slate-500 pt-6 border-t border-slate-100">
          Remember your password?{" "}
          <Link to="/Login" className="font-bold text-[rgb(7,81,89)] hover:text-orange-500 transition-colors">
            Return to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
