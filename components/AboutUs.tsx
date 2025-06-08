import Button from "./ui/Button";

export default function AboutPage() {
    return (
      <section className="bg-amber-100 text-gray-800 items-center mx-auto p-8 " aria-labelledby="about-heading">
        <div className=" max-w-4xl  p-6">
            <h2 id="about-heading" className="text-3xl font-bold mb-6">
            About Us
            </h2>
            <p className=" leading-relaxed">
            We are a company dedicated to providing the best services to our customers.
            Our team is passionate about delivering quality and excellence in everything we do.
            </p>
        </div>
        
      </section>
    );
  }