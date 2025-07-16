"use client";

import React, { useState } from "react";
import Card from "./Card";

const cardsData = [
  {
    id: 1,
    title: "Spa & Massage",
    content: "Experience deep relaxation with our signature massage techniques.",
    imageUrl: "/nirvana/massage.jpeg",
  },
  {
    id: 2,
    title: "Lash Extensions",
    content: "Enhance your beauty with our professional lash services.",
    imageUrl: "/nirvana/lash.jpg",
  },
  {
    id: 3,
    title: "Unisex Salon",
    content: "Experience our unisex salon services for all your grooming needs.",
    imageUrl: "/nirvana/salon.jpg",
  },
  {
    id: 4,
    title: "Manicures & Pedicures",
    content: "Indulge in holistic therapies that promote overall wellness.",
    imageUrl: "/nirvana/pedicure.jpg",
  },
  {
    id: 5,
    title: "Nails",
    content: "Pamper your nails with our expert nail care services.",
    imageUrl: "/nirvana/nails.jpg",
  },
  {
    id: 6,
    title: "Face Treatments",
    content: "Nourish your skin with our rejuvenating facial treatments.",
    imageUrl: "/nirvana/nirvanadespa03.jpg",
  },
  {
    id: 7,
    title: "Waxing",
    content: "Experience smooth skin with our professional waxing services.",
    imageUrl: "/nirvana/waxing.jpg",
  },
  {
    id: 8,
    title: "Body Scrub",
    content: "Exfoliate and rejuvenate your skin with our body scrub treatments.",
    imageUrl: "/nirvana/body-scrub.jpg",
  },
  {
    id: 9,
    title: "Teeth Whitening",
    content: "Brighten your smile with our effective teeth whitening services.",  
    imageUrl: "/nirvana/teeth-whitening.jpg",
  },
];

export default function Services() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <section
      className="mx-auto p-4 sm:p-6 md:p-8 bg-amber-200 dark:bg-gray-900 text-gray-800 dark:text-amber-300 rounded-lg shadow-lg transition-colors duration-300"
      aria-labelledby="services-heading"
    >
      <div className="max-w-6xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <header>
          <h2
            id="services-heading"
            className="text-2xl sm:text-3xl text-amber-400 dark:text-amber-300 text-center font-bold mb-6"
          >
            Our Spa Services
          </h2>
        </header>
        <p className="mb-4 text-base sm:text-lg text-center">
          At our spa, we offer a range of services designed to relax and rejuvenate you.
          From massages to facials, we have something for everyone.
        </p>
        
        <div className="w-full min-h-[60vh] ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {cardsData.map((card) => (
            <Card
              key={card.id}
              {...card}
              activeCard={activeCard}
              setActiveCard={setActiveCard}
            />
          ))}
        </div>
      </div>
      </div>
    
    </section>
  );
}