export default function Services() {
    return (
        <section
            className="max-w-4xl mx-auto p-8 bg-cover bg-center"
            aria-labelledby="services-heading"
        >
            <header>
                <h1 id="services-heading" className="text-3xl font-bold mb-6 text-black">
                    Our Spa Services
                </h1>
            </header>
            <p className="mb-4 text-black/70 ">
                At our spa, we offer a range of services designed to relax and rejuvenate you. 
                From massages to facials, we have something for everyone.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-black">
                <li>Relaxing Massages</li>
                <li>Rejuvenating Facials</li>
                <li>Body Treatments</li>
                <li>Manicures and Pedicures</li>
                <li>Waxing Services</li>
                <li>Unisex Hair Saloon</li>
                <li>Wellness Packages</li>
            </ul>
        </section>
    );
}