import {
    Building2,
    Briefcase,
    HardHat,
    Users,
    Shield,
    Zap,
    Cog,
    Leaf,
    Map,
    Heart,
    Factory,
    FlaskRoundIcon as Flask,
    Radio,
    Droplet,
    PillIcon as Pills,
    Sun,
    RouteIcon as Road,
    Computer,
    GraduationCap,
    Droplets,
  } from "lucide-react"
  
  export default function TenderCategories() {
    const categories = [
      { icon: Building2, name: "Architecture" },
      { icon: Briefcase, name: "Business Management" },
      { icon: HardHat, name: "Construction" },
      { icon: Users, name: "Consultancy" },
      { icon: Shield, name: "Defence" },
      { icon: Zap, name: "Electrical" },
      { icon: Cog, name: "Engineering" },
      { icon: Leaf, name: "Environment And Pollution" },
      { icon: Map, name: "GIS GPS" },
      { icon: Heart, name: "Healthcare" },
      { icon: Factory, name: "Industrial Automation" },
      { icon: Flask, name: "Lab Equipment" },
      { icon: Radio, name: "Media" },
      { icon: Droplet, name: "Oil and gas" },
      { icon: Pills, name: "Pharmaceuticals" },
      { icon: Sun, name: "Renewable Energy" },
      { icon: Road, name: "Roads and Highways" },
      { icon: Computer, name: "Software Services" },
      { icon: GraduationCap, name: "Training" },
      { icon: Droplets, name: "Water and Sanitation" },
    ]
  
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-light text-center mb-10 underline underline-offset-8">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="flex-shrink-0">
                    <Icon className="w-9 h-9 text-[#7CA2CC]" />
                  </div>
                  <p className="text-gray-900 p-1">{category.name}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
  
  