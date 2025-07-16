
'use client'

import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { toast } from 'sonner'

const SERVICES_CATEGORIES = [
  
  {
    category: 'Facial',
    services: [
      { label: 'Hydrating Facial', price: 12000 },
      { label: 'Anti-Aging Facial', price: 15000 },
      { label: 'Brightening Facial', price: 13000 },
      { label: 'Acne Treatment Facial', price: 14000 },
    ]
  },
  {
    category: 'Female Salon',
    services: [
      { label: 'Loosening Weave', price: 1000 },
      { label: 'Loosening Braids', price: 3000 },
      { label: 'Natural Cornrows', price: 6000 },
      { label: 'Cornrows & Extensions', price: 8000 },
      { label: 'Wig Straightening(short)', price: 4000 },
      { label: 'Wig Straightening(Long)', price: 5000 },
      { label: 'Knotless Braids(Shoulder Length)', price: 15000 },
      { label: 'Knotless Braids(Back Length)', price: 22000 },
      { label: 'Knotless Braids(Waist Length)', price: 30000 },
      { label: 'French Curls(Shoulder Length)', price: 18000 },
      { label: 'French Curls(Back Length)', price: 22000 },
      { label: 'French Curls(Waist Length)', price: 30000 },
      { label: 'Boho Braids(Shoulder Length)', price: 15000 },
      { label: 'Boho Braids(Back Length)', price: 20000 },
      { label: 'Boho Braids(Waist Length)', price: 25000 },
      { label: 'Box Braids(Medium)', price: 12000 },
      { label: 'Box Braids(Long)', price: 16000 },
      { label: 'Kinky Braids(Medium)', price: 15000 },
      { label: 'Kinky Braids(Long)', price: 20000 },
      { label: 'Ghana Weave', price: 10000 },
      { label: 'Stitch & Sew in Braids', price: 16000 },
      { label: 'Stitch Braids(Long)', price: 18000 },
      { label: 'Stitch Braids(Short)', price: 15000 },
      { label: 'Fulani Braids(Simple)', price: 18000 },
      { label: 'Fulani Braids(Creative Style)', price: 22000 },
      { label: 'Sew In', price: 10000 },
      { label: 'Ponny Tail', price: 15000 },
      { label: 'Wiggling', price: 15000 },
      { label: 'Kinkloc', price: 10000 },
      { label: 'Crochet', price: 8000 },
      { label: 'Tuggling', price: 6000 },
      { label: 'Trimming', price: 3000 },
      { label: 'Fresh Locs', price: 45000 },
      { label: 'Relocking', price: 12000 },
    ]
  },
  {
    category: 'Male Salon',
    services: [
      { label: 'Haircut(Men)', price: 3000 },
      { label: 'Haircut(Female)', price: 4000 },
      { label: 'Haircut(Kiddies)', price: 2000 },
      { label: 'Beards/Moustache Grooming', price: 8000 },
      { label: 'Hair Cut & Black Dye', price: 7000 },
      { label: 'Mens Dreadlock', price: 20000 },
      { label: 'Carving', price: 2000 },
      { label: 'Texturizer(Men)', price: 4000 },
      { label: 'Men Salon Facials', price: 8000 },
      { label: 'Hair Cut(Washing Inclusive)', price: 4000 },
    ]
  },
  
  {
    category: 'Hair Treatment',
    services: [
      { label: 'Hair Retouching', price: 6000 },
      { label: 'Hair Steaming', price: 8000 },
      { label: 'Scalp Treatment', price: 7000 },
      { label: 'Keratin Treatment', price: 15000 },
      { label: 'Deep Conditioning & Washing', price: 4000 },
      { label: 'Revamping', price: 15000 },
      { label: 'Hair Dye(Black)', price: 10000 },
      { label: 'Hair Dye(Colored)', price: 15000 },
      { label: 'Wig Coloring', price: 15000 },
      { label: 'Natural Hair Treatment', price: 8000 },
    ]
  },

  {
    category: 'Massage',
    services: [
      { label: 'Swedish Massage', price: 25000 },
      { label: 'Deep Tissue Massage', price: 30000 },
      { label: 'Hot Stone Massage', price: 35000 },
      { label: 'Aromatherapy', price: 18000 },
      { label: 'Sports Massage Stretches', price: 40000 },
      { label: 'Lymphatic Drainage', price: 45000 },
      { label: 'Wooden Therapy', price: 30000 },
      { label: 'Four Hand Massage', price: 45000 },
      { label: 'Reflexology', price: 20000 },
      { label: 'Head Massage', price: 10000 },
      { label: 'Foot Massage', price: 8000 },
      { label: 'Couples Swedish Massage', price: 46000 },
      { label: 'Couples Deep Tissue Massage', price: 55000 },
      { label: 'Couples Hot Stone Massage', price: 67000 },
      { label: 'Couples Aromatherapy', price: 30000 },
      { label: 'Couples Sports Massage Stretches', price: 40000 },
    ]
  },

  {
    category: 'Nails',
    services: [
      { label: 'Gel (Short)', price: 5000 },
      { label: 'Gel (Long)', price: 7000 },
      { label: 'Poly Gel(Long)', price: 20000 },
      { label: 'Poly Gel(Medium)', price: 15000 },
      {label: 'Biab Nails(Short)', price: 8000 },
      {label: 'Biab Nails(Medium)', price: 10000 },
      {label: 'Biab Nails(Long)', price: 18000 },
      { label: 'Acrylic(Short)', price: 14000 },
      { label: 'Acrylic(Medium)', price: 24000 },
      { label: 'Acrylic(Long)', price: 18000 },
      { label: 'Plain Toe Nails', price: 2500 },
      { label: 'Toe Nails + Big Toe Fixed', price: 3500 },
      { label: 'Toe Nails + All Toe Fixed', price: 5000 },
      { label: 'Acrylic Toe Nails', price: 10000 },
      { label: 'Bow', price: 500 },
      { label: 'Charms', price: 1500 },
      { label: '3D Designs', price: 1500 },
    ]
  },
  
  {
    category: 'Pedicure',
    services: [
      { label: 'Classic Pedicure', price: 10000 },
      { label: 'Jelly Pedicure', price: 15000 },
      { label: 'Paraffin Pedicure', price: 22000 },
      { label: 'Manicure', price: 4000 },
      { label: 'Nirvana Luxury Pedicure', price: 25000 },
    ]
  },

  {
    category: 'Facial Treatment',
    services: [
      { label: 'Classic Facials(No Extraction)', price: 20000 },
      { label: 'GentleMen Facials', price: 20000 },
      { label: 'Brightening Facial', price: 30000 },
      { label: 'Acne Treatment (With Deep Extraction)', price: 35000 },
      { label: 'Hydra Facials', price: 30000 },
      { label: 'Derma Planning', price: 17500 },
      { label: 'Deep Cleanse', price: 30000 },
      { label: 'Nirvana De Spa Glow Facials With Derma Planning', price: 45000 },
    ]
  },
  
  {
    category: 'Waxing',
    services: [
      { label: 'Upper Lip Wax', price: 3000},
      { label: 'Chin Wax(Smooth)', price: 4000},
      { label: 'Chin Wax(Coarse Hair)', price: 7000},
      { label: 'Under Arm Wax', price: 9000},
      { label: 'Full Arm Wax(Smooth)', price: 12000},
      { label: 'Full Arm Wax(Coarse Hair)', price: 15000},
      { label: 'Full Leg Wax(Smooth)', price: 12000},
      { label: 'Full Leg Wax(Coarse Hair)', price: 15000},
      { label: 'Half Leg Wax', price: 12000},
      { label: 'Bikini Line Wax', price: 12000},
      { label: 'Chest Wax(Smooth)', price: 10000},
      { label: 'Chest Wax(Coarse Hair)', price: 10000},
      { label: 'Vijacial', price: 25000},
      { label: 'Full Body Wax', price: 45000},
    ]
  },

  {
    category: 'Full Spa Package',
    services: [
      { label: 'Spa Day Package', price: 50000 },
      { label: 'Couples Spa Package', price: 70000 },
      { label: 'Luxury Spa Retreat', price: 100000 },
    ]
  }
  
]

interface Service {
  label: string;
  price: number;
}

interface ServiceCategory {
  category: string;
  services: Service[];
}

export default function BookingModal() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    date: '',
    services: [] as string[],
  })

  const [checkingOut, setCheckingOut] = useState(false)

  const handleServiceChange = (service: string) => {
    setForm((prev) => {
      const exists = prev.services.includes(service)
      return {
        ...prev,
        services: exists
          ? prev.services.filter((s) => s !== service)
          : [...prev.services, service],
      }
    })
  }

  const allServices = SERVICES_CATEGORIES.flatMap((cat) => cat.services);

  const totalPrice = form.services.reduce(
    (sum, label) => {
      const found = allServices.find((s) => s?.label === label)?.price || 0;
      return sum + found;

    }, 0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.date) {
      toast.error('Please select a date for your appointment.')
      return;
    }
    setCheckingOut(true)

    try {
      // Send to EmailJS
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          name: form.name,
          email: form.email,
          services: form.services.join(', '),
          date: form.date,
          total: `₦${totalPrice.toLocaleString()}`,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )

      toast.success('Booking confirmed! 🎉')
      document.getElementById('bookingModal')?.classList.add('hidden');
      setForm({ name: '', email: '', date: '', services: [] });
    } catch (error) {
      toast.error('Booking failed. Please try again.');
      console.error(error);
    } finally {
      setCheckingOut(false);
    }
  };

      
  return (
    <div
      id="bookingModal"
      className="hidden fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div className="bg-white p-4 sm:p-6 rounded-xl w-full max-w-md shadow-lg relative max-h-[90vh] overflow-hidden flex flex-col">
        <button
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-2xl"
          onClick={() =>
            document.getElementById('bookingModal')?.classList.add('hidden')
          }
          aria-label="Close booking modal"
        >
          ×
        </button>
        <h3 className="text-xl font-bold text-center mb-2">Book an Appointment</h3>
        <form onSubmit={handleSubmit} className="space-y-3 flex-1 overflow-y-auto">
          <input
            type="text"
            placeholder="Full Name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />
            <input
            type="date"
            required
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />
            {...(SERVICES_CATEGORIES as ServiceCategory[]).map((category: ServiceCategory) => (
              <div key={category.category} className="mb-4">
                <h4 className="font-semibold text-lg mb-2">{category.category}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {category.services.map((service: Service) => (
                    <label
                      key={service.label}
                      className={`flex items-center border rounded px-2 py-1 cursor-pointer transition ${
                        form.services.includes(service.label)
                          ? 'bg-amber-200 border-amber-400'
                          : 'bg-white'
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="mr-2 accent-amber-400"
                        checked={form.services.includes(service.label)}
                        onChange={() => handleServiceChange(service.label)}
                      />
                      <span className="flex-1">{service.label}</span>
                      <span className="ml-2 text-xs text-gray-500">
                        ₦{service.price.toLocaleString()}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <div className='flex justify-between items-center mt-2'>
              <span className="font-semibold">Total:</span>
              <span className="text-lg font-bold text-amber-600">
                ₦{totalPrice.toLocaleString()}
              </span>
            </div>
    
            <button
              type="submit"
              disabled={checkingOut || form.services.length === 0}
              className={`w-full bg-amber-300 text-black py-2 rounded font-semibold hover:bg-black hover:text-amber-300 transition ${
                checkingOut || form.services.length === 0
                  ? 'opacity-60 cursor-not-allowed'
                  : ''
              }`}
            >
              {checkingOut ? 'Processing...' : 'Checkout & Confirm Booking'}
            </button>
        </form>
      </div>
    </div>
  )
}
