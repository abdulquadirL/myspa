"use client"

import React, { useState } from "react"
import Card from "./Card";


const cardsData = [
  {
    id: 1,
    title: "Massages",
    content: "Experience deep relaxation with our signature massage techniques.",
    imageUrl: "/nirvana/massage.jpeg",
  },
  {
    id: 2,
    title: "Lashes",
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
    id: 5,
    title: "Manicures & Pedicures",
    content: "Indulge in holistic therapies that promote overall wellness",
    imageUrl: "/nirvana/pedicure.jpg",
  },
  {
    id: 6,
    title: "Nail Care",
    content: "Pamper your nails with our expert nail care services.",
    imageUrl: "/nirvana/nails.jpg",
  },
  {
    id: 4,
    title: "Facials",
    content: "Nourish your skin with our rejuvenating facial treatments.",
    imageUrl: "/nirvana/facials.jpg",
  },
];


export default function Services() {

    const [activeCard, setActiveCard] = useState<number | null>(null);

    return (
        <section
            className=" mx-auto p-8 bg-cover bg-amber-50 text-gray-800 dark:bg-gray-800 dark:text-amber-300 rounded-lg shadow-lg"
            aria-labelledby="services-heading"
        >
            <div className="w-4xl p-8 ">
                <header>
                <h2 id="services-heading" className="text-3xl text-amber-300 text-center font-bold mb-6">
                    Our Spa Services
                </h2>
                </header>
                <p className="mb-4 ">
                    At our spa, we offer a range of services designed to relax and rejuvenate you. 
                    From massages to facials, we have something for everyone.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Relaxing Massages</li>
                    <li>Rejuvenating Facials</li>
                    <li>Body Treatments</li>
                    <li>Manicures and Pedicures</li>
                    <li>Waxing Services</li>
                    <li>Unisex Hair Saloon</li>
                    <li>Wellness Packages</li>
                </ul>
                
            </div>
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center p-6">
                    
                
            </div> */}
            <div className="min-h-screen bg-[url(/nirvana/nails.jpg)] dark:bg-gray-100 p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
        </section>
    );
}