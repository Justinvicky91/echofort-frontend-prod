import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "wouter";
import api from "@/lib/api";
import { toast } from "sonner";

export default function Login() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.auth.sendOTP(email);
      toast.success("OTP sent to your email!");
      setStep("otp");
    } catch (error: any) {
      toast.error(error.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.auth.verifyOTP(email, otp);
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
              Enter your email to receive a one-time password
            </p>
          </div>

          {step === "email" ? (
            <form onSubmit={handleSendOTP} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  <>
                    Send OTP
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
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
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
                    onChange={(e) => setOtp(e.target.value)}
                    className="pl-10 text-center text-2xl tracking-widest"
                    maxLength={6}
                    required
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  OTP sent to {email}
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
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
                onClick={() => setStep("email")}
              >
                Change Email
              </Button>

              <Button
                type="button"
                variant="link"
                className="w-full"
                onClick={handleSendOTP}
                disabled={loading}
              >
                Resend OTP
              </Button>
            </form>
          )}

          <div className="mt-8 p-4 bg-muted rounded-lg">
            <p className="text-sm text-center text-muted-foreground">
              🔒 Secure login powered by OTP authentication. 
              No passwords to remember or forget.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

