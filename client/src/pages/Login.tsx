import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, Mail, Lock, ArrowRight, Loader2, User, Eye, EyeOff } from "lucide-react";
import { Link } from "wouter";
import api from "@/lib/api";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || 'https://api.echofort.ai';

export default function Login() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<"identifier" | "otp" | "password">("identifier");
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginType, setLoginType] = useState<"customer" | "employee" | null>(null);

  // Detect if identifier is email or username
  const isEmail = (str: string) => {
    return str.includes('@') && str.includes('.');
  };

  const handleInitiateLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const isEmailLogin = isEmail(identifier);

    try {
      if (isEmailLogin) {
        // Customer login - Email + OTP
        setLoginType('customer');
        await api.auth.sendOTP(identifier);
        toast.success("OTP sent to your email!");
        setStep("otp");
      } else {
        // Employee/Admin login - Username + Password
        setLoginType('employee');
        setStep("password");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to process login");
    } finally {
      setLoading(false);
    }
  };

  const handleCustomerVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.auth.verifyOTP(identifier, otp);
      localStorage.setItem("auth_token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      
      toast.success("Login successful!");
      
      // Redirect based on user role
      const role = response.user.role;
      if (role === "super_admin") {
        setLocation("/super-admin");
      } else if (role === "admin") {
        setLocation("/admin");
      } else if (role === "employee") {
        setLocation("/employee");
      } else {
        setLocation("/dashboard");
      }
    } catch (error: any) {
      toast.error(error.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleEmployeeLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/simple-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: identifier,
          password
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem("auth_token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        toast.success("Login successful!");
        
        // Redirect based on role
        if (data.user.is_super_admin || data.user.role === "super_admin") {
          setLocation("/super-admin");
        } else if (data.user.role === "admin") {
          setLocation("/admin");
        } else {
          setLocation("/employee");
        }
      } else {
        toast.error(data.detail || data.message || 'Login failed');
      }
    } catch (error: any) {
      toast.error(error.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary text-primary-foreground p-12 flex-col justify-between relative overflow-hidden">
        <div className="animated-bg opacity-20" />
        
        <div className="relative z-10">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer mb-12">
              <Shield className="w-10 h-10" />
              <span className="text-3xl font-bold">EchoFort</span>
            </div>
          </Link>

          <h1 className="text-4xl font-bold mb-6">
            Welcome Back to India's Most Advanced Scam Protection
          </h1>
          <p className="text-xl opacity-90 mb-12">
            Login to access your dashboard and protect your family from scams.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">Bank-Grade Security</h3>
                <p className="text-sm opacity-80">Your data is encrypted and secure</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">OTP Authentication</h3>
                <p className="text-sm opacity-80">Secure login without passwords</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-sm opacity-80">
          <p>© 2025 EchoFort. All rights reserved.</p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer">
                <Shield className="w-8 h-8 text-primary" />
                <span className="text-2xl font-bold gradient-text">EchoFort</span>
              </div>
            </Link>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Login to Your Account</h2>
            <p className="text-muted-foreground">
              {step === "identifier" && "Enter your email or username to continue"}
              {step === "otp" && "Enter the OTP sent to your email"}
              {step === "password" && "Enter your password to continue"}
            </p>
          </div>

          {/* Step 1: Email or Username */}
          {step === "identifier" && (
            <form onSubmit={handleInitiateLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email or Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Enter your email or username"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  💡 Enter email for customer login or username for employee/admin login
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/signup" className="text-primary hover:underline">
                  Sign up
                </Link>
              </div>
            </form>
          )}

          {/* Step 2: OTP (for customers) */}
          {step === "otp" && (
            <form onSubmit={handleCustomerVerify} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Enter OTP
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="pl-10 text-center text-2xl tracking-widest"
                    maxLength={6}
                    required
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  OTP sent to {identifier}
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={loading || otp.length !== 6}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    Verify & Login
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => {
                  setStep("identifier");
                  setOtp("");
                }}
              >
                ← Back
              </Button>

              <Button
                type="button"
                variant="link"
                className="w-full"
                onClick={handleInitiateLogin}
                disabled={loading}
              >
                Resend OTP
              </Button>
            </form>
          )}

          {/* Step 3: Password (for employees/admin) */}
          {step === "password" && (
            <form onSubmit={handleEmployeeLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Employee/Admin authentication for {identifier}
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  <>
                    Login
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => {
                  setStep("identifier");
                  setPassword("");
                }}
              >
                ← Back
              </Button>
            </form>
          )}

          <div className="mt-8 p-4 bg-muted rounded-lg">
            <p className="text-sm text-center text-muted-foreground">
              🔒 Secure login powered by {loginType === 'customer' ? 'OTP authentication' : 'encrypted password'}. 
              {loginType === 'customer' && ' No passwords to remember or forget.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

