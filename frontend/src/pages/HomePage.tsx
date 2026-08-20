import ClassHighlights from '@/components/home/ClassHighlights';
import HeroSection from '@/components/home/HeroSection';
import LeadCaptureForm from '@/components/home/LeadCaptureForm';
import MembershipTiers from '@/components/home/MembershipTiers';
import ReviewsSection from '@/components/home/ReviewsSection';
import WhyAbsFitnessSection from '@/components/home/WhyAbsFitnessSection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-[#1A1A1A]">
      <HeroSection />
      <WhyAbsFitnessSection />
      <ClassHighlights />
      <MembershipTiers />
      <ReviewsSection />
      <section className="py-16 px-4 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto">
          <LeadCaptureForm />
        </div>
      </section>
    </div>
  );
}