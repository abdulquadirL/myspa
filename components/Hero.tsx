export default function Hero () {
    return (
        <section className="relative bg-[url('/spa-bg.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="bg-black/60 absolute inset-0 z-0" />
      <div className="relative z-10 px-6 py-24 text-center text-white max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Rejuvenate Your Body. Refresh Your Mind.
        </h1>
        <p className="mt-4 text-lg md:text-xl text-amber-200">
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