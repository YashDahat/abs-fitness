"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCreateSubscription, useVerifySubscriptionPayment } from "@/hooks/membershipHooks";
import { useCart } from "@/cart/CartContext";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { VerifyPaymentRequest } from "@/types/verify";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => Razorpay;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
}

interface Razorpay {
  open: () => void;
  on: (event: string, callback: (response: any) => void) => void;
}

interface PaymentStepProps {
  totalAmount: number;
  onPaymentSuccess: (paymentDetails: VerifyPaymentRequest) => void;
}

export default function PaymentStep({
  totalAmount,
  onPaymentSuccess,
}: PaymentStepProps) {
  const { cartItems, clearCart } = useCart();
  const createSubscriptionMutation = useCreateSubscription();
  const verifySubscriptionPaymentMutation = useVerifySubscriptionPayment();
  const [razorpayLoaded, setRazorpayLoaded] = useState<boolean>(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      setRazorpayLoaded(true);
    };
    document.body.appendChild(script);
  }, []);

  const handlePayment = async (): Promise<void> => {
    if (!razorpayLoaded) {
      toast.error("Payment gateway not loaded. Please try again.");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty. Please add a membership plan to proceed.");
      return;
    }

    const membershipPlan = cartItems[0]; // Assuming only one membership plan in cart for this flow

    try {
      const orderResponse = await createSubscriptionMutation.mutateAsync(
        membershipPlan.id
      );

      const options: RazorpayOptions = {
        key: orderResponse.gatewayKeyId,
        amount: orderResponse.amount,
        currency: orderResponse.currency,
        name: "ABS FITNESS",
        description: membershipPlan.name,
        order_id: orderResponse.gatewayOrderId,
        handler: async (response) => {
          const verifyRequest: VerifyPaymentRequest = {
            gatewayOrderId: response.razorpay_order_id,
            gatewayPaymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          };
          await verifySubscriptionPaymentMutation.mutateAsync(verifyRequest);
          clearCart();
          onPaymentSuccess(verifyRequest);
        },
        prefill: {
          name: "Customer Name", // Replace with actual user name if available
          email: "customer@example.com", // Replace with actual user email if available
          contact: "9999999999", // Replace with actual user contact if available
        },
        theme: {
          color: "#FF5722",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error: any) {
      toast.error(error.message || "Payment initiation failed.");
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Payment Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 text-center">
          <p className="text-lg text-gray-700">Total Amount Due:</p>
          <p className="text-4xl font-bold text-[#FF5722]">
            {totalAmount.toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
            })}
          </p>
        </div>
        <Button
          onClick={handlePayment}
          disabled={
            createSubscriptionMutation.isPending ||
            verifySubscriptionPaymentMutation.isPending ||
            !razorpayLoaded
          }
          className="w-full bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold py-3 rounded-full transition-all duration-200"
          data-testid="pay-now-cta"
        >
          {createSubscriptionMutation.isPending ||
          verifySubscriptionPaymentMutation.isPending
            ? "Processing..."
            : "Pay Now"}
        </Button>
        {(createSubscriptionMutation.isError ||
          verifySubscriptionPaymentMutation.isError) && (
          <p className="text-red-500 text-sm mt-2 text-center">
            {createSubscriptionMutation.error?.message ||
              verifySubscriptionPaymentMutation.error?.message ||
              "An unexpected error occurred."}
          </p>
        )}
      </CardContent>
    </Card>
  );
}