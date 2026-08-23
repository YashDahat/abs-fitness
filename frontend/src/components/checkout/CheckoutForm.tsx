import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { createPaymentOrder, verifyPayment } from '@/services/paymentService';
import { useCart } from '@/cart/CartContext';

interface CheckoutFormProps {
  onSubmit: () => Promise<void>;
}

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').max(15, 'Phone number cannot exceed 15 digits'),
});

const CheckoutForm = ({ onSubmit }: CheckoutFormProps) => {
  const { totals } = useCart();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  const handlePayment = async (values: z.infer<typeof formSchema>): Promise<void> => {
    setIsProcessingPayment(true);
    try {
      if (!totals.total || totals.total <= 0) {
        toast.error('Cart is empty or total is zero.');
        setIsProcessingPayment(false);
        return;
      }

      const orderResponse = await createPaymentOrder({
        amount: totals.total,
        currency: 'INR',
        referenceId: `membership-purchase-${Date.now()}`,
      });

      const options = {
        key: orderResponse.gatewayKeyId,
        amount: orderResponse.amount,
        currency: orderResponse.currency,
        name: 'ABS FITNESS',
        description: 'Membership Purchase',
        order_id: orderResponse.gatewayOrderId,
        handler: async function (response: any) {
          try {
            const verificationResponse = await verifyPayment({
              gatewayOrderId: response.razorpay_order_id,
              gatewayPaymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            });

            if (verificationResponse.verified) {
              toast.success('Payment successful!');
              await onSubmit();
            } else {
              toast.error('Payment verification failed.');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            toast.error('Failed to verify payment.');
          }
        },
        prefill: {
          name: values.name,
          email: values.email,
          contact: values.phone,
        },
        theme: {
          color: '#FF5722',
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment initiation failed:', error);
      toast.error('Failed to initiate payment. Please try again.');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handlePayment)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Name" {...field} data-testid="checkout-name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Your Email" {...field} data-testid="checkout-email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="Your Phone Number" {...field} data-testid="checkout-phone" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
          disabled={isProcessingPayment}
          data-testid="checkout-pay-now"
        >
          {isProcessingPayment ? 'Processing Payment...' : 'Pay Now'}
        </Button>
      </form>
    </Form>
  );
};

export default CheckoutForm;