import {useCallback, useState} from 'react';
import {AboutSection} from './components/AboutSection';
import {BookingSection} from './components/BookingSection';
import {ContactSection} from './components/ContactSection';
import {Footer} from './components/Footer';
import {HeroSection} from './components/HeroSection';
import {Navbar} from './components/Navbar';
import {ServiceAreaSection} from './components/ServiceAreaSection';
import {ServicesSection} from './components/ServicesSection';
import {WhyChooseUsSection} from './components/WhyChooseUsSection';
import type {ServiceTypeOption} from './config/emailConfig';

export default function App() {
  const [selectedService, setSelectedService] = useState<ServiceTypeOption | undefined>(undefined);

  const scrollToBooking = useCallback(() => {
    const bookingElement = document.getElementById('booking');
    if (bookingElement) {
      bookingElement.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  }, []);

  const handleRequestService = useCallback(
    (serviceType: ServiceTypeOption) => {
      setSelectedService(serviceType);
      scrollToBooking();
    },
    [scrollToBooking],
  );

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 overflow-x-hidden">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-3 focus:left-3 focus:px-4 focus:py-2 focus:bg-[#D9480F] focus:text-white focus:rounded-md focus:text-sm focus:font-semibold"
      >
        Skip to main content
      </a>

      <Navbar onBookClick={scrollToBooking} />

      <main id="main-content" className="flex-1">
        <HeroSection onBookClick={scrollToBooking} />
        <AboutSection />
        <ServicesSection onRequestService={handleRequestService} />
        <WhyChooseUsSection onBookClick={scrollToBooking} />
        <ServiceAreaSection />
        <BookingSection selectedService={selectedService} />
        <ContactSection onBookClick={scrollToBooking} />
      </main>

      <Footer />
    </div>
  );
}
