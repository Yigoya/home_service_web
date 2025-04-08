import React from 'react';
import { CheckCircle, Clock, Users, Shield } from 'lucide-react';

const features = [
  {
    name: 'Quality Assured',
    description: 'Our services meet the highest industry standards',
    icon: CheckCircle,
  },
  {
    name: '24/7 Support',
    description: 'Round-the-clock assistance for your business needs',
    icon: Clock,
  },
  {
    name: 'Expert Team',
    description: 'Highly qualified professionals at your service',
    icon: Users,
  },
  {
    name: 'Secure Process',
    description: 'Your business information is safe with us',
    icon: Shield,
  },
];

export default function FeaturesAuth() {
  return (
    <div className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Why Choose Us?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            We deliver excellence through our comprehensive range of services
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="relative group">
                <div className="absolute flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white transform transition-transform duration-300 group-hover:scale-110">
                  <feature.icon className="h-7 w-7" aria-hidden="true" />
                </div>
                <div className="ml-20">
                  <p className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {feature.name}
                  </p>
                  <p className="mt-2 text-base text-gray-500">
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