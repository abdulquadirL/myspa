export default function Header() {
    return (
        <header className="bg-pink-800  p-4 shadow">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold text-white">
                    Nirvana De Spa
                </h1>
                <nav className="space-x-4">
                    <a href="/" className="mr-4 hover:text-white">Home</a>
                    <a href="/booking" className="text-white hover:text-pink-400">Book a Session</a>
                </nav>
            </div>
        </header>
    )
}