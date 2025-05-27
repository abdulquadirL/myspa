//import BookingForm from "@/components/BookingForm";

import BookingForm from "@/components/BookingForm";

export default function BookingPage() {
    return (
        <div className="max-w-xl mx-auto p-8">
            <h2 className="text-2xl font-bold mb-6">Book a Spa Session</h2>
            <p className="mb-4">
                Please fill out the form below to book your spa session. We look forward to welcoming you!
            </p>
            {/* BookingForm component would be imported and used here */}
            <BookingForm />
        </div>
    )
}