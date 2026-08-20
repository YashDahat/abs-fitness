import type { JSX } from 'react';
import React from 'react';

export default function WhyAbsFitnessSection(): JSX.Element {
  return (
    <section className="py-16 px-4 bg-[#F5F5F5]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12 text-[#1A1A1A]">
              Why Choose ABS FITNESS?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-200 hover:shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-map-pin h-12 w-12 text-[#FF5722] mb-4"
                >
                  <path d="M12 12V2H8C6.47 2 5.2 3.27 5.2 4.8V10.4C5.2 11.93 6.47 13.2 8 13.2H12Z" />
                  <path d="M19 12V2H15C13.47 2 12.2 3.27 12.2 4.8V10.4C12.2 11.93 13.47 13.2 15 13.2H19Z" />
                  <path d="M12 12V22H8C6.47 22 5.2 20.73 5.2 19.2V13.6C5.2 12.07 6.47 10.8 8 10.8H12Z" />
                  <path d="M19 12V22H15C13.47 22 12.2 20.73 12.2 19.2V13.6C12.2 12.07 13.47 10.8 15 10.8H19Z" />
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a10 10 0 0 0-9.25 6.07c.07.13.14.26.2.39l.76 1.51a1 1 0 0 0 .8.43h14.98a1 1 0 0 0 .8-.43l.76-1.51c.06-.13.13-.26.2-.39A10 10 0 0 0 12 2Z" />
                  <path d="M12 22a10 10 0 0 1 9.25-6.07c-.07-.13-.14-.26-.2-.39l-.76-1.51a1 1 0 0 0-.8-.43H3.41a1 1 0 0 0-.8.43l-.76 1.51c-.06.13-.13.26-.2.39A10 10 0 0 1 12 22Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <h3 className="text-xl font-semibold mb-2 text-[#1A1A1A]">Premium Location</h3>
                <p className="text-gray-600">
                  Conveniently located in the heart of the city with easy access and ample parking.
                </p>
              </div>
    
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-200 hover:shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-swimming-pool h-12 w-12 text-[#FF5722] mb-4"
                >
                  <path d="M12 20a2 2 0 0 0 2-2V7.5a2.5 2.5 0 0 0-5 0V18a2 2 0 0 0 2 2Z" />
                  <path d="M12 20c-1.5 0-7-2-7-6s5-6 7-6 7 2 7 6-5.5 6-7 6Z" />
                  <path d="M17 13c-1.25 0-2.5-.5-3.5-1.5" />
                  <path d="M17 17c-1.25 0-2.5-.5-3.5-1.5" />
                </svg>
                <h3 className="text-xl font-semibold mb-2 text-[#1A1A1A]">State-of-the-Art Swimming Pool</h3>
                <p className="text-gray-600">
                  Enjoy our pristine, temperature-controlled swimming pool for laps or relaxation.
                </p>
              </div>
    
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-200 hover:shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-dumbbell h-12 w-12 text-[#FF5722] mb-4"
                >
                  <path d="M14.4 14.4L9.6 9.6" />
                  <path d="M18.69 14.32a2.12 2.12 0 0 1-3.01 0L12.5 11.14 10.86 12.78 14 15.92a2.12 2.12 0 0 1 0 3.01 2.12 2.12 0 0 1-3.01 0L7.82 15.18 6.18 16.82 9.32 20a2.12 2.12 0 0 1 0 3.01 2.12 2.12 0 0 1-3.01 0L2.5 18.14 1.18 19.46a2.12 2.12 0 0 1 0-3.01 2.12 2.12 0 0 1 3.01 0L7.82 18.18 9.46 16.54 6.32 13.4a2.12 2.12 0 0 1 0-3.01 2.12 2.12 0 0 1 3.01 0L12.5 13.14 14.14 11.5 11 8.36a2.12 2.12 0 0 1 0-3.01 2.12 2.12 0 0 1 3.01 0L18.18 8.82 19.82 7.18 16.68 4.04a2.12 2.12 0 0 1 0-3.01 2.12 2.12 0 0 1 3.01 0L23.5 5.86 24.82 4.54a2.12 2.12 0 0 1 0 3.01 2.12 2.12 0 0 1-3.01 0L18.18 5.82 16.54 7.46 19.68 10.6a2.12 2.12 0 0 1 0 3.01 2.12 2.12 0 0 1-3.01 0Z" />
                </svg>
                <h3 className="text-xl font-semibold mb-2 text-[#1A1A1A]">Top-Tier Equipment</h3>
                <p className="text-gray-600">
                  Access the latest and most advanced fitness equipment for an effective workout every time.
                </p>
              </div>
            </div>
          </div>
        </section>
  );
}
