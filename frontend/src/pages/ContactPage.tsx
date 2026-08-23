import siteConfig from '@/config/siteConfig';
import LeadCaptureForm from '@/components/home/LeadCaptureForm';
import { Separator } from '@/components/ui/separator';

export default function ContactPage() {
  const { address, phone, email, openingHours, mapCoordinates } = siteConfig.footer;

  const googleMapsEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=${
    import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  }&q=${mapCoordinates.lat},${mapCoordinates.lng}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-600 mb-8">
            We'd love to hear from you! Reach out to us for any inquiries or to schedule a visit.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col items-start">
            <h2 className="text-3xl font-semibold text-[#1A1A1A] mb-6">Our Location & Contact</h2>
            <div className="space-y-4 text-lg text-gray-700">
              <p>
                <strong>Address:</strong> {address}
              </p>
              <p>
                <strong>Phone:</strong> <a href={`tel:${phone}`} className="text-[#FF5722] hover:underline">{phone}</a>
              </p>
              <p>
                <strong>Email:</strong> <a href={`mailto:${email}`} className="text-[#FF5722] hover:underline">{email}</a>
              </p>
              <div>
                <strong>Opening Hours:</strong>
                <ul className="list-disc list-inside ml-4">
                  {openingHours.map((hour, index) => (
                    <li key={index}>{hour}</li>
                  ))}
                </ul>
              </div>
            </div>
            <Separator className="my-8 w-full" />
            <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
              <iframe
                title="Google Map of ABS FITNESS"
                width="100%"
                height="100%"
                loading="lazy"
                allowFullScreen
                src={googleMapsEmbedUrl}
                className="border-0"
              ></iframe>
            </div>
          </div>

          <div className="flex flex-col items-start">
            <h2 className="text-3xl font-semibold text-[#1A1A1A] mb-6">Send Us a Message</h2>
            <LeadCaptureForm />
          </div>
        </div>
      </section>
    </div>
  );
}