"use client";
import { useState } from 'react';

export default function BookingForm() {
const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    service: 'Masssage',
    specialRequests: '',
})

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
 setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  })
};
 
const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    alert(`Booking submitted:/n${JSON.stringify(formData, null, 2)}`);
    // Here you would typically send the form data to your server or API
}
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                className='w-full p-2 border border-gray-300 rounded'
                type="text"
                name='name'
                placeholder='Your Name'
                value={formData.name}
                onChange={handleChange}
                required
            />
            <input
                className='w-full p-2 border border-gray-300 rounded'
                type="email"
                name='email'
                placeholder='Your Email'
                value={formData.email}
                onChange={handleChange}
                required
            />
            <input
                className='w-full p-2 border border-gray-300 rounded'
                type="date"
                name='date'
                value={formData.date}
                onChange={handleChange}
                required
            />
            <select 
                className='w-full p-2 border border-gray-300 rounded'
                name='service'
                value={formData.service}
                onChange={handleChange}
                
            >
                <option value="Massage">Massage</option>
                <option value="Facial">Facial</option>
                <option value="Manicure">Manicure</option>
                <option value="Pedicure">Pedicure</option>
            </select>
            <button
                type="submit"
                className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600'>
                    Submit
                </button>
        </form>
    )
}
    