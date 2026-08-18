import { useTestimonials } from '@/hooks/useContent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

export default function TestimonialsSection() {
  const { data: testimonials, isLoading, isError, error } = useTestimonials();

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-white" data-testid="testimonials-section">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#1A1A1A]">What Our Members Say</h2>
          <p className="mt-2 text-gray-600">Hear from our thriving community.</p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <CardHeader className="flex flex-row items-center gap-4 p-0 pb-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-16 px-4 bg-white" data-testid="testimonials-section">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#1A1A1A]">What Our Members Say</h2>
          <p className="mt-2 text-gray-600">Hear from our thriving community.</p>
          <p className="mt-8 text-red-500">Error loading testimonials: {error?.message}</p>
        </div>
      </section>
    );
  }

  if (!testimonials || testimonials.length === 0) {
    return (
      <section className="py-16 px-4 bg-white" data-testid="testimonials-section">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#1A1A1A]">What Our Members Say</h2>
          <p className="mt-2 text-gray-600">Hear from our thriving community.</p>
          <p className="mt-8 text-gray-500">No testimonials available yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-white" data-testid="testimonials-section">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#1A1A1A]">What Our Members Say</h2>
        <p className="mt-2 text-gray-600">Hear from our thriving community.</p>

        <div className="mt-10">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full max-w-4xl mx-auto"
            data-testid="testimonials-carousel"
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="bg-white rounded-xl shadow-md border border-gray-100 p-6 h-full flex flex-col">
                      <CardHeader className="flex flex-row items-center gap-4 p-0 pb-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={testimonial.imageUrl ?? undefined} alt={testimonial.authorName} />
                          <AvatarFallback>{testimonial.authorName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <CardTitle className="text-lg font-semibold text-[#1A1A1A]">{testimonial.authorName}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0 flex-grow">
                        <p className="text-gray-700 leading-relaxed italic">"{testimonial.quote}"</p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}