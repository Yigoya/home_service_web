import React from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '../Components/Navbar';
import Hero from '../Components/Hero';
import Features from '../Components/Features';
import Footer from '../Components/Footer';

function LandingPage() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
      </main>
    </div>
  );
}

export default LandingPage;