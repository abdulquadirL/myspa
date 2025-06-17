import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function Services() {
  return (
    <div className="bg-cream p-6 rounded-lg shadow-md max-w-4xl mx-auto mt-8">
        <h2 className="text-3xl font-bold text-center mb-6">Our Spa Services</h2>
        <section id="massage" className="py-8">
          <Card className="p-6 text-center bg-amber-50 dark:bg-gray-800">
            <h3 className="text-xl font-semibold text-center">Massage Therapy</h3>
            <p className="text-gray-600">Experience deep relaxation with our signature massage techniques.</p>
            < Image width={200} height={200} src="/nirvana/massage.jpeg" alt="Massage Therapy" className="w-full h-100 object-cover rounded-lg mt-4" />
          </Card>
        </section>
        <section id="massage" className="py-8">
          <Card className="p-6 text-center bg-amber-50 dark:bg-gray-800">
            <h3 className="text-xl text-center font-semibold">Unisex Salon</h3>
            <p className="text-gray-600">Experience our unisex salon services for all your grooming needs.</p>
            < Image width={200} height={200} src="/nirvana/salon.jpg" alt="Unisex Salon" className="w-full h-100 object-cover rounded-lg mt-4" />
          </Card>
        </section>
        <section id="nail" className="py-8">
          <Card className="p-6 text-center bg-amber-50 dark:bg-gray-800">
            <h3 className="text-xl text-center font-semibold">Nails Care </h3>
            <p className="text-gray-600">Pamper your nails with our expert nail care services.</p>
            < Image width={200} height={200} src="/nirvana/nails.jpg" alt="Nail Services" className="w-full h-100 object-cover rounded-lg mt-4" />
          </Card>
        </section>
        <section id="facials" className="py-8">
          <Card className="p-6 text-center bg-amber-50 dark:bg-gray-800">
            <h3 className="text-xl text-center font-semibold">Facials</h3>
            <p className="text-gray-600">Nourish your skin with our rejuvenating facial treatments.</p>
            <Image width={200} height={200} src="/nirvana/facials.jpg" alt="Facial Treatments" className="w-full h-100 object-cover rounded-lg mt-4" />
          </Card>
        </section>
        <section id="lash"  className="py-8">
          <Card className="p-6 text-center bg-amber-50 dark:bg-gray-800">
            <h3 className="text-xl font-semibold">Lashes</h3>
            <p className="text-gray-600">Enhance your beauty with our professional lash services.</p>
            < Image width={200} height={200} src="/nirvana/lash.jpg" alt="Lash Services" className="w-full h-100 object-cover rounded-lg mt-4" />
          </Card>
        </section>
        <section id="manicure" className="py-8 ">
          <Card className="p-6 text-center bg-amber-50 dark:bg-gray-800">
            <h3 className="text-xl font-semibold">Manicures & Pedicures</h3>
            <p className="text-gray-600">Indulge in our luxurious manicure and pedicure services.</p>
            < Image width={200} height={200} src="/nirvana/pedicure.jpg" alt="Manicure & Pedicure" className="w-full h-100 object-cover rounded-lg mt-4" />
          </Card>
        </section>
    </div>
  );
}