import { useState } from "react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { toast } from "sonner";

interface RazorpayPaymentProps {
  planName: string;
  amount: number;
  planId: string;
  userEmail: string;
  userName: string;
  userPhone: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function RazorpayPayment({
  planName,
  amount,
  planId,
  userEmail,
  userName,
  userPhone,
}: RazorpayPaymentProps) {
  const [loading, setLoading] = useState(false);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);

    // Load Razorpay script
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      toast.error("Failed to load payment gateway. Please try again.");
      setLoading(false);
      return;
    }

    try {
      // Create order on backend
      const orderResponse = await api.payment.createOrder(
        amount * 100, // Convert to paise
        planId,
        'razorpay'
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_xxxxxx", // Replace with actual key
        amount: amount * 100,
        currency: "INR",
        name: "EchoFort",
        description: `${planName} Plan - 24-Hour Free Trial`,
        image: "/logo.png",
        order_id: orderResponse.orderId,
        handler: async function (response: any) {
          try {
            // Verify payment on backend
            const verifyResponse = await api.payment.verifyPayment(
              response.razorpay_payment_id,
              response.razorpay_order_id,
              response.razorpay_signature
            );

            if (verifyResponse.success) {
              toast.success("Payment successful! Your 24-hour free trial has started.");
              // Redirect to dashboard
              window.location.href = "/dashboard/user";
            } else {
              toast.error("Payment verification failed. Please contact support.");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            toast.error("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: userName,
          email: userEmail,
          contact: userPhone,
        },
        notes: {
          plan: planName,
          trial_period: "24 hours",
        },
        theme: {
          color: "#6366f1",
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            toast.info("Payment cancelled");
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Failed to initiate payment. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={loading}
      className="w-full btn-hover-lift"
      size="lg"
    >
      {loading ? "Processing..." : `Start 24-Hour Free Trial - ₹${amount}`}
    </Button>
  );
}

