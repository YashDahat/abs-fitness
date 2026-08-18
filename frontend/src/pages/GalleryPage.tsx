import GalleryGrid from '@/components/gallery/GalleryGrid';
import type { MediaItem } from '@/components/gallery/GalleryGrid';

const mediaItems: MediaItem[] = [
  { id: '1', type: 'image', url: 'https://images.unsplash.com/photo-1571019624847-ee523d4778f3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', caption: 'State-of-the-art equipment' },
  { id: '2', type: 'video', url: 'https://videos.pexels.com/video-files/3863116/3863116-hd_1920_1080_25fps.mp4', thumbnailUrl: 'https://images.pexels.com/videos/3863116/free-video-3863116.jpg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200', caption: 'Dynamic workout sessions' },
  { id: '3', type: 'image', url: 'https://images.unsplash.com/photo-1590487988256-9ddf1c08b848?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', caption: 'Expert trainers guiding you' },
  { id: '4', type: 'image', url: 'https://images.unsplash.com/photo-1549060279-7e16849b04c2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', caption: 'Spacious and clean facilities' },
  { id: '5', type: 'image', url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', caption: 'Group fitness classes' },
  { id: '6', type: 'video', url: 'https://videos.pexels.com/video-files/4167406/4167406-hd_1920_1080_25fps.mp4', thumbnailUrl: 'https://images.pexels.com/videos/4167406/free-video-4167406.jpg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200', caption: 'High-energy cardio' },
  { id: '7', type: 'image', url: 'https://images.unsplash.com/photo-1534438327276-14e5300d3a48?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', caption: 'Dedicated weightlifting zones' },
  { id: '8', type: 'image', url: 'https://images.unsplash.com/photo-1574680096145-d05b4747414c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', caption: 'Personalized training plans' },
  { id: '9', type: 'image', url: 'https://images.unsplash.com/photo-1550345332-09e3bb73d634?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', caption: 'Community and motivation' },
];

export default function GalleryPage() {
  return (
    <div className="bg-white text-[#1A1A1A]">
      {/* Hero Section */}
      <section
        className="relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571019624847-ee523d4778f3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4" data-testid="gallery-hero-headline">
            Witness Your Transformation
          </h1>
          <p className="text-lg md:text-xl">
            Explore the vibrant world of ABS FITNESS.
          </p>
        </div>
      </section>

      {/* Gallery Grid Section */}
      <section className="py-16 px-4 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12">Our Gallery</h2>
          <GalleryGrid mediaItems={mediaItems} />
        </div>
      </section>
    </div>
  );
}