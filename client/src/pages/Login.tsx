import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, Mail, Lock, ArrowRight, Loader2, User, Eye, EyeOff, Key } from "lucide-react";
import { Link } from "wouter";
import api from "@/lib/api";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || 'https://api.echofort.ai';

export default function Login() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<"identifier" | "otp" | "password" | "mobile-otp" | "recovery" | "forgot-password" | "reset-password">("identifier");
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState("");
  const [mobileOtp, setMobileOtp] = useState("");
  const [recoveryCode, setRecoveryCode] = useState("");
  const [tempToken, setTempToken] = useState("");
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginType, setLoginType] = useState<"customer" | "employee" | null>(null);
  const [loginMethod, setLoginMethod] = useState<"otp" | "password">("otp");

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
        // Customer login - Email + OTP or Password
        setLoginType('customer');
        if (loginMethod === 'otp') {
          await api.initiateLogin(identifier);
          toast.success("OTP sent to your email!");
          setStep("otp");
        } else {
          // Password login
          setStep("password");
        }
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
      const response = await api.verifyLogin({ identifier, otp, device_id: 'web-browser', device_name: navigator.userAgent });
      
      // Check if user is Super Admin - require mobile OTP
      if (response?.user?.role === "super_admin") {
        setIsSuperAdmin(true);
        setTempToken(response.temp_token || response.token);
        
        // Send mobile OTP
        try {
          await fetch(`${API_URL}/auth/send-mobile-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              email: identifier,
              temp_token: response.temp_token || response.token 
            })
          });
          toast.success("Mobile OTP sent! Check your phone.");
          setStep("mobile-otp");
        } catch (err) {
          toast.error("Failed to send mobile OTP");
        }
      } else {
        // Regular users - login directly
        localStorage.setItem("auth_token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        toast.success("Login successful!");
        
        const role = response.user.role;
        if (role === "admin") {
          setLocation("/admin");
        } else if (role === "employee") {
          setLocation("/employee");
        } else {
          setLocation("/dashboard");
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleMobileOTPVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/verify-mobile-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: identifier,
          mobile_otp: mobileOtp,
          temp_token: tempToken
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem("auth_token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("Super Admin login successful!");
        setLocation("/super-admin");
      } else {
        toast.error(data.detail || "Invalid mobile OTP");
      }
    } catch (error: any) {
      toast.error(error.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRecoveryCodeVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/verify-recovery-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: identifier,
          recovery_code: recoveryCode,
          temp_token: tempToken
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem("auth_token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("Super Admin login successful via recovery code!");
        toast.info("Please update your mobile number in settings.");
        setLocation("/super-admin");
      } else {
        toast.error(data.detail || "Invalid recovery code");
      }
    } catch (error: any) {
      toast.error(error.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let data;
      
      if (loginType === 'customer') {
        // Customer password login
        data = await api.auth.loginWithPassword(identifier, password);
      } else {
        // Employee/Admin login
        const response = await fetch(`${API_URL}/auth/simple-login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: identifier,
            password
          })
        });
        data = await response.json();
        if (!response.ok) {
          throw new Error(data.detail || data.message || 'Login failed');
        }
      }

      if (data.ok || data.success) {
        localStorage.setItem("auth_token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user || { role: data.role, user_id: data.user_id, name: data.name }));
        
        toast.success("Login successful!");
        
        // Redirect based on role
        const role = data.user?.role || data.role;
        if (role === "super_admin" || data.user?.is_super_admin) {
          setLocation("/super-admin");
        } else if (role === "admin") {
          setLocation("/admin");
        } else if (role === "employee") {
          setLocation("/employee");
        } else {
          setLocation("/dashboard");
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

              {isEmail(identifier) && (
                <div className="flex items-center justify-center gap-4 p-3 bg-muted/50 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setLoginMethod('otp')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      loginMethod === 'otp'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-transparent hover:bg-muted'
                    }`}
                  >
                    🔐 Login with OTP
                  </button>
                  <button
                    type="button"
                    onClick={() => setLoginMethod('password')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      loginMethod === 'password'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-transparent hover:bg-muted'
                    }`}
                  >
                    🔑 Login with Password
                  </button>
                </div>
              )}

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
            <form onSubmit={handlePasswordLogin} className="space-y-6">
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

              {loginType === 'customer' && (
                <Button
                  type="button"
                  variant="link"
                  className="w-full text-sm"
                  onClick={() => setStep("forgot-password")}
                >
                  Forgot Password?
                </Button>
              )}
            </form>
          )}

          {/* Step 4: Mobile OTP (for Super Admin 2FA) */}
          {step === "mobile-otp" && (
            <form onSubmit={handleMobileOTPVerify} className="space-y-6">
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 mb-4">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-purple-400 mt-0.5" />
                  <div>
                    <p className="text-purple-400 font-semibold text-sm">Super Admin 2FA</p>
                    <p className="text-gray-300 text-xs mt-1">
                      Additional security layer required for Super Admin access
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  WhatsApp OTP
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={mobileOtp}
                    onChange={(e) => setMobileOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="pl-10 text-center text-2xl tracking-widest"
                    maxLength={6}
                    required
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  📱 OTP sent to WhatsApp: +91 936 144 0568
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={loading || mobileOtp.length !== 6}>
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
                variant="outline"
                className="w-full"
                onClick={() => setStep("recovery")}
              >
                Use Recovery Code Instead
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => {
                  setStep("identifier");
                  setMobileOtp("");
                  setOtp("");
                }}
              >
                ← Cancel Login
              </Button>
            </form>
          )}

          {/* Step 5: Recovery Code (backup for lost mobile) */}
          {step === "recovery" && (
            <form onSubmit={handleRecoveryCodeVerify} className="space-y-6">
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-4">
                <div className="flex items-start space-x-3">
                  <Key className="w-5 h-5 text-yellow-400 mt-0.5" />
                  <div>
                    <p className="text-yellow-400 font-semibold text-sm">Recovery Code Login</p>
                    <p className="text-gray-300 text-xs mt-1">
                      Use this if your mobile is lost or hacked. Each code can only be used once.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Recovery Code
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="XXXX-XXXX"
                    value={recoveryCode}
                    onChange={(e) => setRecoveryCode(e.target.value.toUpperCase())}
                    className="pl-10 text-center text-xl tracking-widest"
                    maxLength={9}
                    required
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Enter one of your backup recovery codes
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={loading || recoveryCode.length < 8}>
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
                variant="outline"
                className="w-full"
                onClick={() => setStep("mobile-otp")}
              >
                ← Back to Mobile OTP
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => {
                  setStep("identifier");
                  setRecoveryCode("");
                  setMobileOtp("");
                  setOtp("");
                }}
              >
                Cancel Login
              </Button>
            </form>
          )}

          {/* Step 6: Forgot Password */}
          {step === "forgot-password" && (
            <form onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
              try {
                await api.auth.forgotPassword(identifier);
                toast.success("Password reset OTP sent to your email!");
                setStep("reset-password");
              } catch (error: any) {
                toast.error(error.message || "Failed to send reset OTP");
              } finally {
                setLoading(false);
              }
            }} className="space-y-6">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-4">
                <p className="text-blue-400 text-sm">
                  We'll send a password reset OTP to <strong>{identifier}</strong>
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  <>
                    Send Reset OTP
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => {
                  setStep("password");
                }}
              >
                ← Back to Login
              </Button>
            </form>
          )}

          {/* Step 7: Reset Password */}
          {step === "reset-password" && (
            <form onSubmit={async (e) => {
              e.preventDefault();
              if (newPassword !== confirmNewPassword) {
                toast.error("Passwords do not match");
                return;
              }
              if (newPassword.length < 8) {
                toast.error("Password must be at least 8 characters");
                return;
              }
              setLoading(true);
              try {
                await api.auth.resetPassword(identifier, otp, newPassword);
                toast.success("Password reset successful! Please login.");
                setStep("identifier");
                setOtp("");
                setNewPassword("");
                setConfirmNewPassword("");
                setLoginMethod("password");
              } catch (error: any) {
                toast.error(error.message || "Failed to reset password");
              } finally {
                setLoading(false);
              }
            }} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Enter OTP
                </label>
                <Input
                  type="text"
                  placeholder="6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="text-center text-2xl tracking-widest"
                  maxLength={6}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  New Password
                </label>
                <Input
                  type="password"
                  placeholder="Minimum 8 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                {newPassword && (
                  <p className={`text-xs mt-1 ${
                    newPassword.length >= 8 ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {newPassword.length >= 8 ? '✓ Strong password' : '⚠ Password too short'}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Confirm New Password
                </label>
                <Input
                  type="password"
                  placeholder="Re-enter password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                />
                {confirmNewPassword && (
                  <p className={`text-xs mt-1 ${
                    newPassword === confirmNewPassword ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {newPassword === confirmNewPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={loading || otp.length !== 6}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Resetting...
                  </>
                ) : (
                  <>
                    Reset Password
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => {
                  setStep("forgot-password");
                  setOtp("");
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

