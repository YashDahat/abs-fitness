import HeroSection from '@/components/home/HeroSection';
import FacilitiesHighlight from '@/components/home/FacilitiesHighlight';
import TrainerSpotlight from '@/components/home/TrainerSpotlight';
import GoogleReviewsSection from '@/components/home/GoogleReviewsSection';
import LeadCaptureForm from '@/components/home/LeadCaptureForm';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FacilitiesHighlight />
      <TrainerSpotlight />
      <GoogleReviewsSection />
      <LeadCaptureForm />
    </div>
  );
}