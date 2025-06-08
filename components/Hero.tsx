export default function Hero () {
    return (
        <section className="relative bg-amber-300 bg-cover bg-center bg-no-repeat">
            {/* <section className="relative w-full h-[60vh] overflow-hidden">
              {typeof window !== "undefined" && window.innerWidth > 768 && (


        <video
          className="absolute inset-0 w-full h-full object-cover"
          poster="/nirvana/salon.jpg"
          src="/nirvana/nirvhero.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold text-center px-4">
            Welcome to Our Showcase
          </h1>
        </div>
      </section> */}
      <div className="bg-[url(/nirvana/nails.jpg)] absolute inset-0 z-0" />

      <div className="relative z-10 px-7 py-20 text-center text-white max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight ">
          Reclaim Your Body. Refresh Your Mind.
        </h1>
        <p className="mt-4 text-lg md:text-xl bg-amber-300 text-black font-light px-4 py-2 rounded-lg shadow-lg">
          Experience premium massage therapy, facials, and holistic spa treatments in Abuja. Escape into wellness — you deserve it.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <a
            href="/booking"
            className="bg-black text-amber-300 font-semibold px-6 py-3 rounded-full shadow-lg transition animate-bounce hover:bg-amber-300 hover:text-black hover:transition-linear"
          >
            Book Now
          </a>
          <a
            href="/services"
            className="border border-white hover:bg-amber-300 hover:text-black hover:transition-linear text-white font-semibold px-6 py-3 rounded-full transition"
          >
            View Services
          </a>
        </div>
      </div>
    </section>
    );
}