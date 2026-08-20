import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';
import LeadCaptureForm from '@/components/home/LeadCaptureForm';

export default function ContactPage() {
  const { address, phone, email, openingHours } = siteConfig.footer;

  return (
    <div className="min-h-screen bg-white">
      <section className="py-16 px-4 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#1A1A1A]">
            Contact Us
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="card bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col items-center text-center transition-all duration-200 hover:shadow-lg">
              <MapPin className="h-10 w-10 text-[#FF5722] mb-4" />
              <h2 className="text-xl font-semibold mb-2 text-[#1A1A1A]">Address</h2>
              <p className="text-[#1A1A1A] leading-relaxed">{address}</p>
            </div>

            <div className="card bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col items-center text-center transition-all duration-200 hover:shadow-lg">
              <Phone className="h-10 w-10 text-[#FF5722] mb-4" />
              <h2 className="text-xl font-semibold mb-2 text-[#1A1A1A]">Phone</h2>
              <p className="text-[#1A1A1A] leading-relaxed">{phone}</p>
            </div>

            <div className="card bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col items-center text-center transition-all duration-200 hover:shadow-lg">
              <Mail className="h-10 w-10 text-[#FF5722] mb-4" />
              <h2 className="text-xl font-semibold mb-2 text-[#1A1A1A]">Email</h2>
              <p className="text-[#1A1A1A] leading-relaxed">{email}</p>
            </div>

            <div className="card bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col items-center text-center transition-all duration-200 hover:shadow-lg lg:col-span-3">
              <Clock className="h-10 w-10 text-[#FF5722] mb-4" />
              <h2 className="text-xl font-semibold mb-2 text-[#1A1A1A]">Opening Hours</h2>
              <p className="text-[#1A1A1A] leading-relaxed">{openingHours}</p>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-3xl font-semibold text-center mb-8 text-[#1A1A1A]">
              Find Us on the Map
            </h2>
            <div className="aspect-w-16 aspect-h-9 w-full h-[400px] rounded-xl overflow-hidden shadow-lg border border-gray-100">
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&q=${siteConfig.footer.address}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map of ABS Fitness"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-8 text-[#1A1A1A]">
            Send Us an Enquiry
          </h2>
          <LeadCaptureForm />
        </div>
      </section>
    </div>
  );
}