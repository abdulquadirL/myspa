export default function Services() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto mt-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Spa Services</h2>
        <p className="mb-4 text-gray-700">
            At Nirvana De Spa, we offer a range of luxurious treatments designed to rejuvenate your body and mind. Explore our services below:
        </p>
        <ul className="space-y-4">
            <li className="border-b pb-4">
            <h3 className="text-xl font-semibold">Relaxing Massage</h3>
            <p className="text-gray-600">Experience deep relaxation with our signature massage techniques.</p>
            </li>
            <li className="border-b pb-4">
            <h3 className="text-xl font-semibold">Revitalizing Facial</h3>
            <p className="text-gray-600">Nourish your skin with our rejuvenating facial treatments.</p>
            </li>
            <li className="border-b pb-4">
            <h3 className="text-xl font-semibold">Holistic Body Treatments</h3>
            <p className="text-gray-600">Indulge in holistic therapies that promote overall wellness.</p>
            </li>
            <li className="border-b pb-4">
            <h3 className="text-xl font-semibold">Spa Packages</h3>
            <p className="text-gray-600">Enjoy a combination of our best services at a special rate.</p>
            </li>
        </ul>
        <div className="mt-6 text-center">
            <a href="/booking" className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full transition">
            Book Now
            </a>
        </div>
    </div>
  );
}