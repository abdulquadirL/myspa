"use client"

import React, { useState } from "react"
import Card from "./Card";


const cardsData = [
  {
    id: 1,
    title: "Massages",
    content: "This is card one.",
    imageUrl: "/nirvana/facials.jpg",
  },
  {
    id: 2,
    title: "Lashes",
    content: "This is card two.",
    imageUrl: "/nirvana/lash.jpg",
  },
  {
    id: 3,
    title: "Unisex Salon",
    content: "This is card three.",
    imageUrl: "/nirvana/salon.jpg",
  },
  
  {
    id: 5,
    title: "Manicures & Pedicures",
    content: "This is card three.",
    imageUrl: "/nirvana/pedicure.jpg",
  },
  {
    id: 6,
    title: "Nail Tech",
    content: "This is card three.",
    imageUrl: "/nirvana/nails.jpg",
  },
  {
    id: 4,
    title: "Waxing",
    content: "This is card three.",
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
                <h1 id="services-heading" className="text-3xl text-amber-300 text-center  font-bold mb-6">
                    Our Spa Services
                </h1>
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
            <div className="min-h-screen bg-amber-50 dark:bg-gray-100 p-6">
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