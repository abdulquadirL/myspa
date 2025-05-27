export default function Header() {
    return (
        <header className="bg-blue-100  p-4 shadow">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold text-blue-800">
                    Tranquil Touch Spa
                </h1>
                <nav className="space-x-4">
                    <a href="/" className="mr-4 hover:text-blue-800">Home</a>
                    <a href="/booking" className="text-blue-600 hover:text-blue-800">Book a Session Now</a>
                </nav>
            </div>
        </header>
    )
}