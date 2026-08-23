import GallerySection from '@/components/gallery/GallerySection';

export default function GalleryPage() {
  return (
    <section className="py-16 px-4 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#1A1A1A]">
          Our Gallery
        </h1>
        <p className="text-center text-lg text-gray-700 mb-12 max-w-3xl mx-auto">
          Explore our high-quality photos and videos showcasing our state-of-the-art facilities,
          energetic classes, and dedicated members in action. Get a glimpse of the ABS FITNESS
          experience!
        </p>

        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-center mb-8 text-[#1A1A1A]">Gym Facilities</h2>
          <GallerySection section="WEBSITE" />
        </div>

        <div>
          <h2 className="text-3xl font-semibold text-center mb-8 text-[#1A1A1A]">Events & Classes</h2>
          <GallerySection section="EVENT" />
        </div>
      </div>
    </section>
  );
}