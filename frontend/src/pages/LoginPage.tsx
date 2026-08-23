import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <section className="py-16 px-4 bg-[#F5F5F5]">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md border border-gray-100 p-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-center mb-6 text-[#1A1A1A]">Login to Your Account</h1>
        <LoginForm />
      </div>
    </section>
  );
}