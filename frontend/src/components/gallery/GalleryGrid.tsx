import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnailUrl?: string;
  caption?: string;
}

interface GalleryGridProps {
  mediaItems: MediaItem[];
}

export default function GalleryGrid({ mediaItems }: GalleryGridProps): React.JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  const handleMediaClick = (item: MediaItem): void => {
    setSelectedMedia(item);
    setOpen(true);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {mediaItems.map((item) => (
        <Card key={item.id} className="overflow-hidden rounded-xl shadow-md border border-gray-100 p-0 transition-all duration-200 hover:shadow-lg">
          <CardContent className="p-0">
            <Dialog open={open && selectedMedia?.id === item.id} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <div
                  className="relative w-full h-60 cursor-pointer group"
                  onClick={() => handleMediaClick(item)}
                  data-testid={`gallery-item-${item.id}`}
                >
                  {item.type === 'image' ? (
                    <img
                      src={item.url}
                      alt={item.caption || 'Gallery image'}
                      className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                  ) : (
                    <div className="relative w-full h-full">
                      <img
                        src={item.thumbnailUrl}
                        alt={item.caption || 'Video thumbnail'}
                        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 group-hover:bg-opacity-70 transition-opacity duration-200">
                        <svg
                          className="h-16 w-16 text-white opacity-80 group-hover:opacity-100 transition-opacity duration-200"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}
                  {item.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {item.caption}
                    </div>
                  )}
                </div>
              </DialogTrigger>
              <DialogContent className={cn("sm:max-w-[800px] p-0 border-none bg-transparent")}>
                {selectedMedia?.type === 'image' ? (
                  <img
                    src={selectedMedia.url}
                    alt={selectedMedia.caption || 'Gallery image'}
                    className="w-full h-auto max-h-[80vh] object-contain"
                  />
                ) : (
                  <video
                    src={selectedMedia?.url}
                    controls
                    autoPlay
                    className="w-full h-auto max-h-[80vh] object-contain"
                  />
                )}
                {selectedMedia?.caption && (
                  <div className="absolute bottom-4 left-4 right-4 text-white text-center text-lg bg-black bg-opacity-70 p-2 rounded">
                    {selectedMedia.caption}
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}