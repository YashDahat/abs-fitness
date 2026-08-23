import SignupForm from '@/components/auth/SignupForm';

export default function SignupPage() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-[#1A1A1A]">Sign Up for ABS FITNESS</h1>
        <SignupForm />
      </div>
    </section>
  );
}