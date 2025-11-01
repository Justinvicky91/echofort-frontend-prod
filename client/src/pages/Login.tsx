import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, Mail, Lock, ArrowRight, Loader2, User, Eye, EyeOff, Key, MessageCircle } from "lucide-react";
import { Link } from "wouter";
import api from "@/lib/api";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || 'https://api.echofort.ai';

export default function Login() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<"identifier" | "password" | "whatsapp-otp">("identifier");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [whatsappOtp, setWhatsappOtp] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginType, setLoginType] = useState<"customer" | "employee" | "super_admin" | null>(null);
  const [devMode, setDevMode] = useState(false);

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
        toast.info("Customer login not yet implemented");
        setLoading(false);
        return;
      } else {
        // Employee/Admin login - Username + Password
        const response = await fetch(`${API_URL}/auth/fixed/login/initiate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identifier })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.detail || 'Failed to initiate login');
        }

        if (data.user_type === 'super_admin') {
          setLoginType('super_admin');
          setUsername(data.username);
          toast.info("Super Admin detected - 2FA required");
        } else {
          setLoginType('employee');
        }

        setStep("password");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to process login");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/fixed/login/password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier,
          password,
          device_id: 'web-browser',
          device_name: navigator.userAgent
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Invalid password');
      }

      // Check if Super Admin (requires WhatsApp OTP)
      if (data.requires_otp) {
        setUsername(data.username);
        setDevMode(data.dev_mode || false);
        
        if (data.dev_mode) {
          toast.success(`Password verified! DEV MODE: Check console for OTP`);
        } else {
          toast.success("Password verified! WhatsApp OTP sent to your phone.");
        }
        
        setStep("whatsapp-otp");
      } else {
        // Regular employee - login complete
        localStorage.setItem("auth_token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("Login successful!");
        
        // Redirect based on role
        if (data.redirect) {
          setLocation(data.redirect);
        } else {
          setLocation("/dashboard");
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Password verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppOTPVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/fixed/login/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username || identifier,
          otp: whatsappOtp,
          device_id: 'web-browser',
          device_name: navigator.userAgent
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Invalid OTP');
      }

      // Super Admin login complete
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success("🎉 Super Admin 2FA login successful!");
      setLocation("/super-admin");

    } catch (error: any) {
      toast.error(error.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (step === "whatsapp-otp") {
      setStep("password");
      setWhatsappOtp("");
    } else if (step === "password") {
      setStep("identifier");
      setPassword("");
      setLoginType(null);
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
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">AI-Powered Protection</h3>
                <p className="opacity-80">Real-time scam detection using advanced AI</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Lock className="w-6 h-6 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Bank-Grade Security</h3>
                <p className="opacity-80">Your data is encrypted and secure</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MessageCircle className="w-6 h-6 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">WhatsApp 2FA</h3>
                <p className="opacity-80">Extra security layer for Super Admin</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-sm opacity-70">
          © 2025 EchoFort. Protecting India from scams.
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <Shield className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold">EchoFort</span>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">
              {step === "identifier" && "Sign In"}
              {step === "password" && (loginType === "super_admin" ? "Super Admin Login" : "Enter Password")}
              {step === "whatsapp-otp" && "WhatsApp 2FA Verification"}
            </h2>
            <p className="text-muted-foreground">
              {step === "identifier" && "Enter your email or username to continue"}
              {step === "password" && (loginType === "super_admin" ? "Enter your password to receive WhatsApp OTP" : "Enter your password to login")}
              {step === "whatsapp-otp" && "Enter the 6-digit code sent to your WhatsApp"}
            </p>
          </div>

          {/* Step 1: Identifier */}
          {step === "identifier" && (
            <form onSubmit={handleInitiateLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email or Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="admin@echofort.ai or username"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          )}

          {/* Step 2: Password */}
          {step === "password" && (
            <form onSubmit={handlePasswordVerify} className="space-y-6">
              {loginType === "super_admin" && (
                <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                    <Shield className="w-5 h-5" />
                    <span className="font-semibold">Super Admin Account Detected</span>
                  </div>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">
                    After password verification, you'll receive a WhatsApp OTP for 2FA security.
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
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
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={handleBack} className="w-1/3">
                  Back
                </Button>
                <Button type="submit" className="w-2/3" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      {loginType === "super_admin" ? "Send WhatsApp OTP" : "Login"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}

          {/* Step 3: WhatsApp OTP (Super Admin only) */}
          {step === "whatsapp-otp" && (
            <form onSubmit={handleWhatsAppOTPVerify} className="space-y-6">
              <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 text-green-700 dark:text-green-300 mb-2">
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-semibold">WhatsApp OTP Sent!</span>
                </div>
                <p className="text-sm text-green-600 dark:text-green-400">
                  {devMode 
                    ? "🔧 DEV MODE: Check browser console for OTP code"
                    : "Check your WhatsApp for a 6-digit verification code. It will expire in 5 minutes."}
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">WhatsApp OTP Code</label>
                <div className="relative">
                  <Key className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={whatsappOtp}
                    onChange={(e) => setWhatsappOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="pl-10 text-center text-2xl tracking-widest"
                    maxLength={6}
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Didn't receive the code? Check your WhatsApp or wait 60 seconds to resend.
                </p>
              </div>

              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={handleBack} className="w-1/3">
                  Back
                </Button>
                <Button type="submit" className="w-2/3" disabled={loading || whatsappOtp.length !== 6}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Verify & Login
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link href="/signup" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </div>

          <div className="text-center text-xs text-muted-foreground">
            By continuing, you agree to our{" "}
            <Link href="/terms" className="underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
