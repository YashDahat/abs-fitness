import type { JSX } from 'react';
import React from 'react';

export default function AboutPage(): JSX.Element {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-[#1A1A1A]">About ABS FITNESS</h1>
        <p className="text-lg text-center text-gray-700 mb-12 leading-relaxed">
          Your journey to a healthier, stronger you starts here.
        </p>
    
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="md:order-2">
            <img
              src="https://images.unsplash.com/photo-1571019625476-f3d2be8b2c12?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Our Story"
              className="rounded-xl shadow-lg w-full h-auto object-cover"
            />
          </div>
          <div className="md:order-1">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#1A1A1A]">Our Story</h2>
            <p className="text-[#1A1A1A] leading-relaxed mb-4">
              Founded in 2005, ABS FITNESS began with a simple yet powerful vision: to create a fitness
              sanctuary where individuals of all levels could thrive. What started as a small community
              gym has grown into a state-of-the-art facility, driven by a passion for health and
              well-being. Over the years, we've helped thousands achieve their fitness goals, fostering
              a supportive environment that celebrates every milestone.
            </p>
            <p className="text-[#1A1A1A] leading-relaxed">
              Our journey has been one of continuous evolution, always adapting to the latest fitness
              innovations while staying true to our core belief that fitness is for everyone. We're proud
              of the community we've built and the positive impact we've had on countless lives.
            </p>
          </div>
        </div>
    
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16 bg-[#F5F5F5] p-8 rounded-xl shadow-sm">
          <div>
            <img
              src="https://images.unsplash.com/photo-1594381837583-b09b1192070e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Our Mission"
              className="rounded-xl shadow-lg w-full h-auto object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#1A1A1A]">Our Mission</h2>
            <p className="text-[#1A1A1A] leading-relaxed mb-4">
              At ABS FITNESS, our mission is to empower individuals to achieve their fullest physical
              and mental potential. We are dedicated to providing a world-class fitness experience
              through innovative programs, cutting-edge equipment, and a team of passionate, expert
              trainers. We believe in fostering a community where motivation thrives, goals are met,
              and healthy lifestyles are cultivated.
            </p>
            <p className="text-[#1A1A1A] leading-relaxed">
              We strive to inspire transformation, not just physically, but in every aspect of our
              members' lives, promoting resilience, confidence, and overall well-being.
            </p>
          </div>
        </div>
    
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="md:order-2">
            <img
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Our Values"
              className="rounded-xl shadow-lg w-full h-auto object-cover"
            />
          </div>
          <div className="md:order-1">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#1A1A1A]">Our Values</h2>
            <ul className="list-disc list-inside text-[#1A1A1A] leading-relaxed space-y-2">
              <li>
                <strong className="text-[#FF5722]">Excellence:</strong> We are committed to providing
                the highest standards in fitness training, facilities, and customer service.
              </li>
              <li>
                <strong className="text-[#FF5722]">Community:</strong> We build a supportive and
                inclusive environment where everyone feels welcome and motivated.
              </li>
              <li>
                <strong className="text-[#FF5722]">Integrity:</strong> We operate with honesty,
                transparency, and respect in all our interactions.
              </li>
              <li>
                <strong className="text-[#FF5722]">Innovation:</strong> We continuously seek new and
                effective ways to enhance the fitness journey for our members.
              </li>
              <li>
                <strong className="text-[#FF5722]">Passion:</strong> We are driven by a deep love for
                fitness and a desire to share its transformative power.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
