import { Card, CardContent } from '@/components/ui/card'

export default function About() {
  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Licensed Massage Therapist',
      experience: '8 years',
      specialties: ['Swedish Massage', 'Deep Tissue', 'Hot Stone']
    },
    {
      name: 'Emily Chen',
      role: 'Master Esthetician',
      experience: '6 years',
      specialties: ['Anti-Aging Facials', 'Chemical Peels', 'Microdermabrasion']
    },
    {
      name: 'Maria Rodriguez',
      role: 'Nail Specialist',
      experience: '5 years',
      specialties: ['Gel Manicures', 'Nail Art', 'Pedicure Treatments']
    },
    {
      name: 'Jessica Kim',
      role: 'Lash Specialist',
      experience: '4 years',
      specialties: ['Lash Extensions', 'Lash Lifts', 'Brow Shaping']
    }
  ]

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="bg-amber-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-light text-amber-300 dark:text-gray-800 mb-6 animate-fade-in">
            About Nirvana Spa
          </h1>
          <p className="text-xl text-gray-800 max-w-3xl mx-auto animate-fade-in">
            Your sanctuary for wellness, beauty, and rejuvenation in the heart of the city of Abuja.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-3xl font-light text-amber-300 mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Nirvana Spa began as a vision to create a tranquil escape from the hustle and bustle of everyday life. Our founders, passionate about wellness and beauty, sought to establish a sanctuary where guests could truly unwind and reconnect with themselves.
                </p>
                <p>
                  Today, we're proud to offer a comprehensive range of luxury spa services in our state-of-the-art facility. From therapeutic massages to rejuvenating facials, precision nail care to stunning lash enhancements, every treatment is designed with your comfort and satisfaction in mind.
                </p>
                <p>
                  At Nirvana Spa, we believe that self-care isn't a luxury—it's a necessity. Our mission is to provide you with an exceptional spa experience that leaves you feeling refreshed, renewed, and radiant.
                </p>
              </div>
            </div>
            <div className="w-full h-96 bg-spa-gradient rounded-2xl flex items-center justify-center animate-fade-in">
              <span className="text-white text-xl font-light">
                <img src="/nirvana/reception.jpg" alt="Nirvana Spa Story" className="w-full h-full object-cover rounded-2xl" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-cream dark:bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light text-amber-300 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-amber-300  dark:border-cream hover:border-gray-500 transition-all duration-300 hover-lift">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-spa-gradient rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl">✨</span>
                </div>
                <h3 className="text-xl font-light text-amber-300 mb-3">Excellence</h3>
                <p className="text-muted-foreground">
                  We maintain the highest standards in every treatment, using premium products and advanced techniques.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center border-amber-300  dark:border-cream hover:border-gray-500 transition-all duration-300 hover-lift">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-spa-gradient rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl">🤲</span>
                </div>
                <h3 className="text-xl font-light text-amber-300 mb-3">Care</h3>
                <p className="text-muted-foreground">
                  Your comfort and well-being are our top priorities. We listen to your needs and customize every experience.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center border-amber-300  dark:border-cream hover:border-gray-500 transition-all duration-300 hover-lift">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-amber-gradient rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl">🌿</span>
                </div>
                <h3 className="text-xl font-light text-amber-300 mb-3">Wellness</h3>
                <p className="text-muted-foreground">
                  We believe in holistic wellness that nurtures your body, mind, and spirit for lasting benefits.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light text-amber-300 text-center mb-12">Meet Our Expert Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={member.name} className={`text-center hover-lift border-amber-300  dark:border-cream hover:border-gray-500 transition-all duration-300 animate-fade-in`} style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="pt-6">
                  <div className="w-24 h-24 bg-spa-gradient rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-2xl font-light">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-lg font-light text-amber-300 mb-2">{member.name}</h3>
                  <p className="text-sm text-spa-gold mb-2">{member.role}</p>
                  <p className="text-xs text-muted-foreground mb-3">{member.experience} experience</p>
                  <div className="space-y-1">
                    {member.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="inline-block bg-spa-amber/10 text-spa-amber text-xs px-2 py-1 rounded-full mr-1 mb-1"
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
  )
}
