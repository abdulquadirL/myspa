import AboutPage from '@/components/AboutUs';
import Hero from '@/components/Hero';
import MapWithProximity from '@/components/MapWithProximity';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonial';
import React from 'react';

export default function Home() {
  return (
    <div
      className="min-h-screen items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/gold.jpg')" }}
    >
      <Hero />
      <Services />
      <AboutPage />
      <Testimonials/>
      <MapWithProximity/>
    </div>
  );
}
