import HeroSection from '@/components/home/HeroSection';
import FacilitiesHighlight from '@/components/home/FacilitiesHighlight';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import LeadCaptureForm from '@/components/home/LeadCaptureForm';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <FacilitiesHighlight />
      <TestimonialsSection />
      <section className="py-16 px-4 bg-[#F5F5F5]" data-testid="lead-capture-section">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#1A1A1A] mb-4">Ready to Start Your Fitness Journey?</h2>
          <p className="text-lg text-[#1A1A1A] leading-relaxed mb-12">
            Fill out the form below to request a free trial or tour of our facilities.
          </p>
          <LeadCaptureForm />
        </div>
      </section>
    </div>
  );
}