import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import { useApprovedReviews } from '@/hooks/reviewHooks';
import { Star } from 'lucide-react';

export default function ReviewsSection() {
  const { data: reviews, isLoading, isError } = useApprovedReviews();

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10">What Our Members Say</h2>
          <div className="flex justify-center">
            <Skeleton className="w-full max-w-4xl h-[300px]" />
          </div>
        </div>
      </section>
    );
  }

  if (isError || !reviews || reviews.length === 0) {
    return (
      <section className="py-16 px-4 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-10">What Our Members Say</h2>
          <p className="text-gray-600">No reviews available at the moment. Check back soon!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-[#F5F5F5]" data-testid="reviews-section">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10">What Our Members Say</h2>
        <Carousel
          opts={{
            align: 'start',
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {reviews.map((review) => (
              <CarouselItem key={review.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="h-full flex flex-col justify-between">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold">{review.author}</CardTitle>
                      <div className="flex items-center mt-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                            fill={i < review.rating ? '#FACC15' : 'none'}
                          />
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-[-50px] top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute right-[-50px] top-1/2 -translate-y-1/2" />
        </Carousel>
      </div>
    </section>
  );
}