import React, { useState } from 'react';
import { Building2, PenTool as Tool, Briefcase, Wrench, Search, ArrowRight, CheckCircle, Clock, Users, Shield } from 'lucide-react';

const services = [
  {
    title: 'Tender Services',
    icon: Building2,
    description: 'Professional bid management and tender submission services',
  },
  {
    title: 'Business Solutions',
    icon: Briefcase,
    description: 'Comprehensive business consulting and strategy services',
  },
  {
    title: 'Maintenance',
    icon: Tool,
    description: '24/7 maintenance and support services',
  },
  {
    title: 'Professional Services',
    icon: Wrench,
    description: 'Expert professional services across industries',
  },
];

const features = [
  {
    icon: CheckCircle,
    title: 'Quality Assured',
    description: 'Our services meet the highest industry standards with ISO 9001:2015 certification.',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round-the-clock customer support with guaranteed response times.',
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Highly qualified professionals with decades of combined experience.',
  },
  {
    icon: Shield,
    title: 'Secure Process',
    description: 'Enterprise-grade security protocols protecting your business data.',
  },
];

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="pt-16">
      <div className="relative">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            className="w-full h-[700px] object-cover"
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80"
            alt="Modern Office Building"
          />
          <div className="absolute h-[700px] inset-0 bg-gray-900/75"></div>
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              Building Tomorrow's
              <span className="block text-blue-500 mt-2">Business Solutions</span>
            </h1>
            
            <p className="mt-8 text-lg text-gray-300 leading-relaxed">
              Empowering businesses with innovative solutions and strategic expertise. 
              Partner with us to transform your business operations and achieve sustainable growth.
            </p>

            {/* Enhanced Search Section */}
            <div className="mt-10">
              <div className={`relative max-w-xl mx-auto transform transition-all duration-300 ${isFocused ? 'scale-105' : ''}`}>
                <div className="absolute inset-0 bg-blue-500 rounded-xl opacity-10 blur-lg transition-opacity duration-300"></div>
                <div className="relative flex items-center">
                  <Search className="absolute left-4 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search our services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="w-full pl-12 pr-32 py-4 bg-white rounded-2xl shadow-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  />
                  <button className="absolute right-2 bg-blue-600 text-white px-6 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <span className="hidden sm:inline">Search</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              {/* Popular Searches */}
              <div className="mt-6 flex justify-center gap-6 text-sm">
                <span className="text-gray-400">Popular:</span>
                <button className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
                  <ArrowRight className="h-4 w-4" />
                  Consulting
                </button>
                <button className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
                  <ArrowRight className="h-4 w-4" />
                  Enterprise Solutions
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Services Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <div
                key={service.title}
                className="group bg-white rounded-xl shadow-lg hover:shadow-2xl p-6 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex p-3 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors duration-300">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-blue-500 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-gray-50 py-24 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Why Choose Us
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              We deliver excellence through our comprehensive range of services
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="relative bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-500 rounded-full opacity-10 blur-lg"></div>
                    <div className="relative h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center text-white">
                      <feature.icon className="h-6 w-6" />
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-gray-900 text-center mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}