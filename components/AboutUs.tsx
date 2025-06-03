import Button from "./ui/Button";

export default function AboutPage() {
    return (
      <section className="flex max-w-4xl items-center mx-auto p-8 " aria-labelledby="about-heading">
        <div className="  p-6">
            <h2 id="about-heading" className="text-2xl font-bold mb-4">
            About Us
            </h2>
            <p className=" text-black leading-relaxed">
            We are a company dedicated to providing the best services to our customers.
            Our team is passionate about delivering quality and excellence in everything we do.
            </p>
        </div>
        
      </section>
    );
  }