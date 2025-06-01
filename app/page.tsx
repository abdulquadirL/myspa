import AboutPage from '@/components/AboutUs';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
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
    </div>
  );
}
