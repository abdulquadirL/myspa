
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "./ui/Button";

export default function Hero () {
  const images = [
    "/nirvana/facials.jpg",
    "/nirvana/massage.jpeg",
    "/nirvana/salon.jpg",
    "/nirvana/pedicure.jpg",
    "/nirvana/nails.jpg",
  ];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const openBookingModal = () => {
    const bookingModal = document.getElementById("bookingModal");
    if (bookingModal) {
      bookingModal.classList.remove("hidden");
      bookingModal.classList.add("flex");
    }
  }

    return (
        <section className="relative w-full h-[80vh] overflow-hidden">
          {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === currentImage ? "opacity-100 z-0" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />
         ))}
      
      <div className=" absolute inset-0 bg-black/50 z-10 flex flex-col justify-center items-center text-white text-center px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight ">Rejuvenate Your Body.</h1>
          <h1 className="text-4xl md:text-5xl font-extrabold text-amber-300">Refresh Your Mind.</h1> 
        
        <p className="max-w-3xl mt-4 text-lg md:text-xl text-amber-400 font-light px-4 py-2 rounded-lg shadow-lg">
          Experience premium massage therapy, facials, and holistic spa treatments in Abuja. Escape into wellness — you deserve it.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          {/* <Link
            href="/booking"
            className="bg-black text-amber-300 font-semibold px-6 py-3 rounded-full shadow-lg transition animate-bounce hover:bg-amber-300 hover:text-black hover:transition-linear"
          >
            Book Now
          </Link> */}
            <Button
              onClick={openBookingModal}
              variant="primary"
              className="bg-black text-amber-300 font-semibold px-6 py-3 rounded-full shadow-lg transition animate-bounce hover:bg-amber-300 hover:text-black hover:transition-linear"
            >
              Book Now
            </Button>
          <Link
            href="/services"
            className="border border-white hover:bg-amber-300 hover:text-black hover:transition-linear text-white font-semibold px-6 py-3 rounded-full transition"
          >
            View Services
          </Link>
          
        </div>
      </div>
    </section>
    );
}