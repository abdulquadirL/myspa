// 'use client'

// import { useState } from 'react'
// import emailjs from '@emailjs/browser'
// import { toast } from 'sonner'

// const SERVICES = [
//   { label: 'Massage', price: 15000 },
//   { label: 'Facial', price: 12000 },
//   { label: 'Salon Male', price: 10000 },
//   { label: 'Salon Female', price: 12000 },
//   { label: 'Body Treatment', price: 18000 },
//   { label: 'Manicure & Pedicure', price: 9000 },
//   { label: 'Full Spa Package', price: 35000 },
// ];

// export default function BookingModal() {
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     date: '',
//     services: [] as string[],
//   });
//   const [checkingOut, setCheckingOut] = useState(false);

//   const handleServiceChange = (service: string) => {
//     setForm((prev) => {
//       const exists = prev.services.includes(service);
//       return {
//         ...prev,
//         services: exists
//           ? prev.services.filter((s) => s !== service)
//           : [...prev.services, service],
//       };
//     });
//   };

//   const totalPrice = form.services.reduce(
//     (sum, label) =>
//       sum + (SERVICES.find((s) => s.label === label)?.price || 0),
//     0
//   );

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setCheckingOut(true);
//     await fetch('/api/book', {
//       method: 'POST',
//       body: JSON.stringify({ ...form, totalPrice }),
//     });
//     setCheckingOut(false);
//     alert('Booking Confirmed!');
//     document.getElementById('bookingModal')?.classList.add('hidden');
//     setForm({ name: '', email: '', date: '', services: [] });
//   };

//   return (
//     <div
//       id="bookingModal"
//       className="hidden fixed inset-0 bg-black/50 flex items-center justify-center z-50"
//     >
//       <div className="bg-white p-4 sm:p-6 rounded-xl w-full max-w-md space-y-4 shadow-lg relative">
//         <button
//           className="absolute top-2 right-3 text-gray-500 hover:text-black text-2xl"
//           onClick={() =>
//             document.getElementById('bookingModal')?.classList.add('hidden')
//           }
//           aria-label="Close booking modal"
//         >
//           ×
//         </button>
//         <h3 className="text-xl font-bold text-center mb-2">Book an Appointment</h3>
//         <form onSubmit={handleSubmit} className="space-y-3">
//           <input
//             type="text"
//             placeholder="Full Name"
//             required
//             value={form.name}
//             onChange={(e) => setForm({ ...form, name: e.target.value })}
//             className="w-full border px-3 py-2 rounded"
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             required
//             value={form.email}
//             onChange={(e) => setForm({ ...form, email: e.target.value })}
//             className="w-full border px-3 py-2 rounded"
//           />
//           <input
//             type="date"
//             required
//             value={form.date}
//             onChange={(e) => setForm({ ...form, date: e.target.value })}
//             className="w-full border px-3 py-2 rounded"
//           />
//           <div>
//             <label className="block mb-1 font-medium">Select Services</label>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//               {SERVICES.map((service) => (
//                 <label
//                   key={service.label}
//                   className={`flex items-center border rounded px-2 py-1 cursor-pointer transition ${
//                     form.services.includes(service.label)
//                       ? 'bg-amber-200 border-amber-400'
//                       : 'bg-white'
//                   }`}
//                 >
//                   <input
//                     type="checkbox"
//                     className="mr-2 accent-amber-400"
//                     checked={form.services.includes(service.label)}
//                     onChange={() => handleServiceChange(service.label)}
//                   />
//                   <span className="flex-1">{service.label}</span>
//                   <span className="ml-2 text-xs text-gray-500">
//                     ₦{service.price.toLocaleString()}
//                   </span>
//                 </label>
//               ))}
//             </div>
//           </div>
//           <div className="flex justify-between items-center mt-2">
//             <span className="font-semibold">Total:</span>
//             <span className="text-lg font-bold text-amber-600">
//               ₦{totalPrice.toLocaleString()}
//             </span>
//           </div>
//           <button
//             type="submit"
//             disabled={checkingOut || form.services.length === 0}
//             className={`w-full bg-amber-300 text-black py-2 rounded font-semibold hover:bg-black hover:text-amber-300 transition ${
//               checkingOut || form.services.length === 0
//                 ? 'opacity-60 cursor-not-allowed'
//                 : ''
//             }`}
//           >
//             {checkingOut ? 'Processing...' : 'Checkout & Confirm Booking'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


'use client'

import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { toast } from 'sonner'

const SERVICES = [
  { label: 'Massage', price: 15000 },
  { label: 'Facial', price: 12000 },
  { label: 'Salon Male', price: 10000 },
  { label: 'Salon Female', price: 12000 },
  { label: 'Body Treatment', price: 18000 },
  { label: 'Manicure & Pedicure', price: 9000 },
  { label: 'Full Spa Package', price: 35000 },
]

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

  const totalPrice = form.services.reduce(
    (sum, label) =>
      sum + (SERVICES.find((s) => s.label === label)?.price || 0),
    0
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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

      // Optional: send to your API endpoint too
      // await fetch('/api/book', {
      //   method: 'POST',
      //   body: JSON.stringify({ ...form, totalPrice }),
      // })

      toast.success('Booking confirmed and email sent!')
      setForm({ name: '', email: '', date: '', services: [] })
      document.getElementById('bookingModal')?.classList.add('hidden')
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong. Try again.')
    } finally {
      setCheckingOut(false)
    }
  }

  return (
    <div
      id="bookingModal"
      className="hidden fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div className="bg-white p-4 sm:p-6 rounded-xl w-full max-w-md space-y-4 shadow-lg relative">
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
        <form onSubmit={handleSubmit} className="space-y-3">
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
          <div>
            <label className="block mb-1 font-medium">Select Services</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SERVICES.map((service) => (
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
          <div className="flex justify-between items-center mt-2">
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
