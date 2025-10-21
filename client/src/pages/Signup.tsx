import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Mail, Phone, User, MapPin, CreditCard, AlertCircle, CheckCircle2 } from "lucide-react";
import { api } from "@/lib/api";

export default function Signup() {
  const [, navigate] = useLocation();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    plan: "personal",
    address: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
    idType: "aadhaar",
    idNumber: "",
    idProof: null as File | null,
    otp: "",
    termsAccepted: false,
    dataConsentAccepted: false,
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }
      setFormData(prev => ({ ...prev, idProof: file }));
      setError("");
    }
  };

  const validateStep1 = () => {
    if (!formData.fullName || !formData.email || !formData.phone) {
      setError("Please fill in all required fields");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      setError("Please enter a valid 10-digit phone number");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.address || !formData.city || !formData.state || !formData.country || !formData.pincode) {
      setError("Please fill in all address fields");
      return false;
    }
    if (!formData.idNumber) {
      setError("Please enter your government ID number");
      return false;
    }
    if (!formData.idProof) {
      setError("Please upload your government ID proof");
      return false;
    }
    if (!formData.termsAccepted || !formData.dataConsentAccepted) {
      setError("Please accept the Terms & Conditions and Data Consent");
      return false;
    }
    return true;
  };

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep1()) return;
    setStep(2);
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;
    
    setLoading(true);
    setError("");
    
    try {
      await api.auth.sendOTP(formData.email, formData.phone);
      setSuccess("OTP sent to your email and phone!");
      setStep(3);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.otp || formData.otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      await api.auth.signup({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        plan: formData.plan,
        address: {
          street: formData.address,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          pincode: formData.pincode,
        },
        governmentId: {
          type: formData.idType,
          number: formData.idNumber,
          proof: formData.idProof,
        },
        otp: formData.otp,
      });
      
      setSuccess("Account created successfully! Redirecting to payment...");
      setTimeout(() => {
        navigate(`/payment?plan=${formData.plan}`);
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="animated-bg" />

      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer">
                <img src="/logo.png" alt="EchoFort" className="w-16 h-16" />
                <span className="text-xl font-bold gradient-text">EchoFort</span>
              </div>
            </Link>
            <Link href="/login">
              <Button variant="ghost">Already have an account? Login</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-2xl">
          <div className="dashboard-card">
            <div className="text-center mb-8">
              <Shield className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h1 className="text-3xl font-bold mb-2">Create Your EchoFort Account</h1>
              <p className="text-muted-foreground">
                Start your 24-hour free trial • No credit card required
              </p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center gap-4">
                <div className={`flex items-center gap-2 ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-white' : 'bg-muted'}`}>
                    {step > 1 ? <CheckCircle2 className="w-5 h-5" /> : '1'}
                  </div>
                  <span className="text-sm font-medium hidden sm:inline">Personal Info</span>
                </div>
                <div className="w-8 sm:w-12 h-0.5 bg-muted" />
                <div className={`flex items-center gap-2 ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-white' : 'bg-muted'}`}>
                    {step > 2 ? <CheckCircle2 className="w-5 h-5" /> : '2'}
                  </div>
                  <span className="text-sm font-medium hidden sm:inline">Address & ID</span>
                </div>
                <div className="w-8 sm:w-12 h-0.5 bg-muted" />
                <div className={`flex items-center gap-2 ${step >= 3 ? 'text-primary' : 'text-muted-foreground'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-primary text-white' : 'bg-muted'}`}>
                    3
                  </div>
                  <span className="text-sm font-medium hidden sm:inline">Verify OTP</span>
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
              </div>
            )}
            {success && (
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-green-800 dark:text-green-200">{success}</p>
              </div>
            )}

            {/* Step 1 */}
            {step === 1 && (
              <form onSubmit={handleStep1Submit} className="space-y-6">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <div className="relative mt-2">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input id="fullName" type="text" placeholder="Enter your full name" className="pl-10" value={formData.fullName} onChange={(e) => handleInputChange('fullName', e.target.value)} required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input id="email" type="email" placeholder="your.email@example.com" className="pl-10" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <div className="relative mt-2">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input id="phone" type="tel" placeholder="10-digit mobile number" className="pl-10" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value.replace(/\D/g, '').slice(0, 10))} required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="plan">Choose Your Plan *</Label>
                  <Select value={formData.plan} onValueChange={(value) => handleInputChange('plan', value)}>
                    <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic - ₹399/month</SelectItem>
                      <SelectItem value="personal">Personal - ₹799/month (Popular)</SelectItem>
                      <SelectItem value="family">Family - ₹1,499/month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full" size="lg">Continue to Address & ID Verification</Button>
              </form>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <form onSubmit={handleStep2Submit} className="space-y-6">
                <h3 className="text-lg font-semibold">Address Information</h3>
                <div>
                  <Label htmlFor="address">Street Address *</Label>
                  <div className="relative mt-2">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input id="address" type="text" placeholder="House/Flat No., Street Name" className="pl-10" value={formData.address} onChange={(e) => handleInputChange('address', e.target.value)} required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input id="city" type="text" placeholder="City" className="mt-2" value={formData.city} onChange={(e) => handleInputChange('city', e.target.value)} required />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input id="state" type="text" placeholder="State" className="mt-2" value={formData.state} onChange={(e) => handleInputChange('state', e.target.value)} required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="country">Country *</Label>
                    <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                      <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="India">India</SelectItem>
                        <SelectItem value="USA">United States</SelectItem>
                        <SelectItem value="UK">United Kingdom</SelectItem>
                        <SelectItem value="Canada">Canada</SelectItem>
                        <SelectItem value="Australia">Australia</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="pincode">PIN/ZIP Code *</Label>
                    <Input id="pincode" type="text" placeholder="Postal Code" className="mt-2" value={formData.pincode} onChange={(e) => handleInputChange('pincode', e.target.value)} required />
                  </div>
                </div>

                <h3 className="text-lg font-semibold pt-4 border-t">Government ID Verification</h3>
                <div>
                  <Label htmlFor="idType">ID Type *</Label>
                  <Select value={formData.idType} onValueChange={(value) => handleInputChange('idType', value)}>
                    <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aadhaar">Aadhaar Card</SelectItem>
                      <SelectItem value="passport">Passport</SelectItem>
                      <SelectItem value="driving_license">Driving License</SelectItem>
                      <SelectItem value="voter_id">Voter ID</SelectItem>
                      <SelectItem value="pan">PAN Card</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="idNumber">ID Number *</Label>
                  <div className="relative mt-2">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input id="idNumber" type="text" placeholder="Enter your ID number" className="pl-10" value={formData.idNumber} onChange={(e) => handleInputChange('idNumber', e.target.value)} required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="idProof">Upload ID Proof * (Max 5MB)</Label>
                  <Input id="idProof" type="file" accept="image/*,.pdf" className="mt-2" onChange={handleFileUpload} required />
                  {formData.idProof && <p className="text-sm text-green-600 mt-2">✓ {formData.idProof.name} uploaded</p>}
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-start gap-3">
                    <Checkbox id="terms" checked={formData.termsAccepted} onCheckedChange={(checked) => handleInputChange('termsAccepted', checked)} />
                    <Label htmlFor="terms" className="text-sm cursor-pointer">
                      I accept the <Link href="/terms" className="text-primary hover:underline">Terms and Conditions</Link>
                    </Label>
                  </div>
                  <div className="flex items-start gap-3">
                    <Checkbox id="dataConsent" checked={formData.dataConsentAccepted} onCheckedChange={(checked) => handleInputChange('dataConsentAccepted', checked)} />
                    <Label htmlFor="dataConsent" className="text-sm cursor-pointer">
                      I consent that <strong>all data will be stored in EchoFort for future purposes</strong> including legal compliance, court evidence, AI training, and law enforcement cooperation as described in the <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                    </Label>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="w-full">Back</Button>
                  <Button type="submit" className="w-full" disabled={loading}>{loading ? "Sending OTP..." : "Send OTP"}</Button>
                </div>
              </form>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <form onSubmit={handleOTPSubmit} className="space-y-6">
                <div className="text-center mb-6">
                  <Mail className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">Verify Your Email & Phone</h3>
                  <p className="text-sm text-muted-foreground">
                    We've sent a 6-digit OTP to<br /><strong>{formData.email}</strong> and <strong>+91 {formData.phone}</strong>
                  </p>
                </div>
                <div>
                  <Label htmlFor="otp">Enter 6-Digit OTP *</Label>
                  <Input id="otp" type="text" placeholder="000000" className="mt-2 text-center text-2xl tracking-widest" maxLength={6} value={formData.otp} onChange={(e) => handleInputChange('otp', e.target.value.replace(/\D/g, '').slice(0, 6))} required />
                </div>
                <div className="flex gap-4">
                  <Button type="button" variant="outline" onClick={() => setStep(2)} className="w-full">Back</Button>
                  <Button type="submit" className="w-full" disabled={loading}>{loading ? "Verifying..." : "Verify & Create Account"}</Button>
                </div>
                <div className="text-center">
                  <button type="button" className="text-sm text-primary hover:underline" onClick={() => handleStep2Submit(new Event('submit') as any)}>
                    Didn't receive OTP? Resend
                  </button>
                </div>
              </form>
            )}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            By signing up, you agree to our Terms and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
