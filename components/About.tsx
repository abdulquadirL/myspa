import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

interface TeamMember {
  name: string;
  role: string;
  experience: string;
  specialties: string[];
}

export default function About() {
  const team: TeamMember[] = [
    {
      name: 'Sarah Johnson',
      role: 'Licensed Massage Therapist',
      experience: '8 years',
      specialties: ['Swedish Massage', 'Deep Tissue', 'Hot Stone'],
    },
    {
      name: 'Adenike Adebayo',
      role: 'Master Esthetician',
      experience: '6 years',
      specialties: ['Anti-Aging Facials', 'Chemical Peels', 'Microdermabrasion'],
    },
    {
      name: 'Hanifah Bello',
      role: 'Nail Specialist',
      experience: '5 years',
      specialties: ['Gel Manicures', 'Nail Art', 'Pedicure Treatments'],
    },
    {
      name: 'Jessica Okeke',
      role: 'Lash Specialist',
      experience: '4 years',
      specialties: ['Lash Extensions', 'Lash Lifts', 'Brow Shaping'],
    },
  ];

  return (
    <div className="min-h-screen bg-amber-100 dark:bg-gray-800 transition-colors duration-300">
      {/* Hero Section */}
      <section className="py-16 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-amber-300 dark:text-amber-200 mb-6 animate-fade-in">
            About Nirvana De Spa
          </h1>
          <p className="text-lg sm:text-xl text-gray-800 dark:text-amber-100 max-w-3xl mx-auto animate-fade-in">
            Your sanctuary for wellness, beauty, and rejuvenation in the heart of the city of Abuja.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 sm:py-20 bg-amber-100 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-2xl sm:text-3xl font-light text-amber-300 dark:text-amber-200 mb-6">Our Story</h2>
              <div className=" space-y-4 text-gray-700 dark:text-amber-100 leading-relaxed">
                <p>
                  Nirvana De Spa began as a vision to create a tranquil escape from the hustle and bustle of everyday life. Our founders, passionate about wellness and beauty, sought to establish a sanctuary where guests could truly unwind and reconnect with themselves.
                </p>
                <p>
                  Today, we're proud to offer a comprehensive range of luxury spa services in our state-of-the-art facility. From therapeutic massages to rejuvenating facials, precision nail care to stunning lash enhancements, every treatment is designed with your comfort and satisfaction in mind.
                </p>
                <p>
                  At Nirvana De Spa, we believe that self-care isn't a luxury—it's a necessity. Our mission is to provide you with an exceptional spa experience that leaves you feeling refreshed, renewed, and radiant.
                </p>
              </div>
            </div>
            <div className="w-full h-64 sm:h-96 bg-gradient-to-br from-amber-200 to-amber-400 dark:from-gray-700 dark:to-gray-900 rounded-2xl flex items-center justify-center animate-fade-in overflow-hidden">
              <Image
                src="/nirvana/reception.jpg"
                alt="Nirvana Spa Story"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 sm:py-20 bg-cream dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-light text-amber-300 dark:text-amber-200 text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-amber-300 dark:border-amber-200 hover:border-gray-500 dark:hover:border-amber-400 transition-all duration-300 hover-lift bg-white dark:bg-gray-800">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-300 to-amber-400 dark:from-amber-200 dark:to-amber-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl">✨</span>
                </div>
                <h3 className="text-xl font-light text-amber-300 dark:text-amber-200 mb-3">Excellence</h3>
                <p className="text-gray-700 dark:text-amber-100">
                  We maintain the highest standards in every treatment, using premium products and advanced techniques.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center border-amber-300 dark:border-amber-200 hover:border-gray-500 dark:hover:border-amber-400 transition-all duration-300 hover-lift bg-white dark:bg-gray-800">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-300 to-amber-400 dark:from-amber-200 dark:to-amber-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl">🤲</span>
                </div>
                <h3 className="text-xl font-light text-amber-300 dark:text-amber-200 mb-3">Care</h3>
                <p className="text-gray-700 dark:text-amber-100">
                  Your comfort and well-being are our top priorities. We listen to your needs and customize every experience.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center border-amber-300 dark:border-amber-200 hover:border-gray-500 dark:hover:border-amber-400 transition-all duration-300 hover-lift bg-white dark:bg-gray-800">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-300 to-amber-400 dark:from-amber-200 dark:to-amber-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl">🌿</span>
                </div>
                <h3 className="text-xl font-light text-amber-300 dark:text-amber-200 mb-3">Wellness</h3>
                <p className="text-gray-700 dark:text-amber-100">
                  We believe in holistic wellness that nurtures your body, mind, and spirit for lasting benefits.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-light text-amber-300 dark:text-amber-200 text-center mb-12">
            Meet Our Expert Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card
                key={member.name}
                className="text-center hover-lift border-amber-300 dark:border-amber-200 hover:border-gray-500 dark:hover:border-amber-400 transition-all duration-300 animate-fade-in bg-white dark:bg-gray-800"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="pt-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-amber-300 to-amber-400 dark:from-amber-200 dark:to-amber-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-2xl font-light">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-lg font-light text-amber-300 dark:text-amber-200 mb-2">{member.name}</h3>
                  <p className="text-sm text-amber-500 dark:text-amber-300 mb-2">{member.role}</p>
                  <p className="text-xs text-gray-500 dark:text-amber-100 mb-3">{member.experience} experience</p>
                  <div className="flex flex-wrap justify-center gap-1">
                    {member.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="inline-block bg-amber-100 dark:bg-gray-700 text-gray-700 dark:text-amber-100 text-xs px-2 py-1 rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
