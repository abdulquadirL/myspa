'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    name: 'Amara O.',
    title: 'Lagos, Nigeria',
    quote:
      'From the moment I walked in, I felt like royalty. The ambiance, the massage, everything was perfect. Highly recommended!',
  },
  {
    name: 'Chinedu A.',
    title: 'Kubwa, Abuja',
    quote:
      'Hands down the best spa experience I’ve ever had. The staff is professional and attentive, and the environment is so calming.',
  },
  {
    name: 'Zainab K.',
    title: 'Maitama, Abuja',
    quote:
      'Every visit leaves me refreshed and recharged. The aromatherapy session was divine. I always look forward to coming back.',
  },
]

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
}

export default function TestimonialSlider() {
  const [[index, direction], setIndex] = useState([0, 0])

  const paginate = (newDirection: number) => {
    setIndex(([prevIndex]) => {
      const newIndex = (prevIndex + newDirection + testimonials.length) % testimonials.length
      return [newIndex, newDirection]
    })
  }

  useEffect(() => {
    const interval = setInterval(() => paginate(1), 7000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="bg-amber-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-amber-300 mb-6">What Our Clients Say</h2>
        <div className="relative h-56 md:h-48 overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6 }}
              className="absolute w-full"
            >
              <blockquote className="text-lg text-gray-800 italic px-6">
                “{testimonials[index].quote}”
              </blockquote>
              <div className="mt-4 text-amber-300 font-semibold">
                {testimonials[index].name}
              </div>
              <div className="text-sm text-gray-500">{testimonials[index].title}</div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-6 flex justify-center space-x-6">
          <button
            onClick={() => paginate(-1)}
            className="text-amber-300 hover:text-black transition"
            aria-label="Previous testimonial"
          >
            ← Prev
          </button>
          <button
            onClick={() => paginate(1)}
            className="text-black hover:text-amber transition"
            aria-label="Next testimonial"
          >
            Next →
          </button>
        </div>
      </div>
    </section>
  )
}
