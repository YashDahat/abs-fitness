import GallerySection from '@/components/gallery/GallerySection';
import SiteLayout from '@/shell/SiteLayout';
import { siteConfig } from '@/config/siteConfig';

export default function GalleryPage() {
  return (
    <SiteLayout config={siteConfig}>
      <div className="relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: 'url(/images/gallery-hero.jpg)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center text-white p-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4" data-testid="gallery-hero-heading">Our Gallery</h1>
          <p className="text-lg md:text-xl">Explore the vibrant world of ABS FITNESS</p>
        </div>
      </div>

      <GallerySection section="WEBSITE" title="Facility & Equipment" />
      <GallerySection section="EVENT" title="Classes & Events" />

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10 text-[#1A1A1A]">Experience the Energy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
              <iframe
                src="https://player.vimeo.com/video/875080833?h=d5e5e5e5e5&title=0&byline=0&portrait=0"
                title="Vimeo video player"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}