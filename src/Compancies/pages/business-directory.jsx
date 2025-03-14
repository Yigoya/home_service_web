"use client"

import { useState } from "react"
import { Search, MapPin, Phone, Mail, Globe, Clock, Check, Star, Facebook, Twitter, Instagram } from "lucide-react"
import { Badge } from "../../../components/ui/badge"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu"
import Image from "next/image"
import Link from "next/link"

// Sample data - in a real app, this would come from an API or props
const businesses = [
  {
    id: 1,
    name: "Coffee Haven",
    description: "A cozy coffee shop with premium blends.",
    ownerId: 4,
    categoryIds: [2, 1],
    location: {
      street: "123 Main St",
      city: "Addis Ababa",
      state: "Addis Ababa",
      postalCode: "1000",
      country: "Ethiopia",
      name: "Bole",
      type: null,
      parentLocationId: null,
      coordinates: null,
    },
    phoneNumber: "+251912345678",
    email: "contact@coffeehaven.com",
    website: "https://coffeehaven.com",
    openingHours: {
      mondayOpen: "08:00",
      mondayClose: "18:00",
      tuesdayOpen: "08:00",
      tuesdayClose: "18:00",
      wednesdayOpen: "08:00",
      wednesdayClose: "18:00",
      thursdayOpen: "08:00",
      thursdayClose: "18:00",
      fridayOpen: "08:00",
      fridayClose: "20:00",
      saturdayOpen: "09:00",
      saturdayClose: "20:00",
      sundayOpen: "09:00",
      sundayClose: "16:00",
    },
    socialMedia: {
      facebook: "facebook.com/coffeehaven",
      twitter: "twitter.com/coffeehaven",
      instagram: "instagram.com/coffeehaven",
      linkedin: null,
    },
    images: ["https://example.com/image1.jpg"],
    isVerified: false,
    isFeatured: false,
    phone: "+251912345678",
    businessType: null,
    logo: null,
    foundedYear: null,
    employeeCount: null,
    verified: false,
    industry: null,
    taxId: null,
  },
  {
    id: 2,
    name: "Coffee Haven",
    description: "A cozy coffee shop with premium blends.",
    ownerId: 4,
    categoryIds: [839, 1],
    location: {
      street: "123 Main St",
      city: "Addis Ababa",
      state: "Addis Ababa",
      postalCode: "1000",
      country: "Ethiopia",
      name: "Bole",
      type: null,
      parentLocationId: null,
      coordinates: null,
    },
    phoneNumber: "+251912345678",
    email: "contact@coffeehaven.com",
    website: "https://coffeehaven.com",
    openingHours: {
      mondayOpen: "08:00",
      mondayClose: "18:00",
      tuesdayOpen: "08:00",
      tuesdayClose: "18:00",
      wednesdayOpen: "08:00",
      wednesdayClose: "18:00",
      thursdayOpen: "08:00",
      thursdayClose: "18:00",
      fridayOpen: "08:00",
      fridayClose: "20:00",
      saturdayOpen: "09:00",
      saturdayClose: "20:00",
      sundayOpen: "09:00",
      sundayClose: "16:00",
    },
    socialMedia: {
      facebook: "facebook.com/coffeehaven",
      twitter: "twitter.com/coffeehaven",
      instagram: "instagram.com/coffeehaven",
      linkedin: null,
    },
    images: ["https://example.com/image1.jpg"],
    isVerified: false,
    isFeatured: false,
    phone: "+251912345678",
    businessType: null,
    logo: null,
    foundedYear: null,
    employeeCount: null,
    verified: false,
    industry: null,
    taxId: null,
  },
]

export default function BusinessDirectory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [viewType, setViewType] = useState("grid")

  // Filter businesses based on search term
  const filteredBusinesses = businesses.filter(
    (business) =>
      business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.location.city.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Function to format opening hours in a readable way
  const formatOpeningHours = (hours) => {
    const today = new Date().getDay()
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
    const todayName = days[today]

    const openKey = `${todayName}Open`
    const closeKey = `${todayName}Close`

    if (hours[openKey] && hours[closeKey]) {
      return `Today: ${hours[openKey]} - ${hours[closeKey]}`
    }
    return "Hours not available"
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Business Directory</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">Discover the best local businesses in Ethiopia</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search businesses..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Filter</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>All Businesses</DropdownMenuItem>
              <DropdownMenuItem>Verified Only</DropdownMenuItem>
              <DropdownMenuItem>Featured</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Tabs defaultValue="grid" className="w-[200px]" onValueChange={setViewType}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="grid">Grid</TabsTrigger>
              <TabsTrigger value="list">List</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {filteredBusinesses.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium">No businesses found</h3>
          <p className="text-muted-foreground mt-2">Try adjusting your search criteria</p>
        </div>
      ) : (
        <>
          {viewType === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBusinesses.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBusinesses.map((business) => (
                <BusinessListItem key={business.id} business={business} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

function BusinessCard({ business }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-48 w-full">
        <Image src="/placeholder.svg?height=400&width=600" alt={business.name} fill className="object-cover" />
        {business.isFeatured && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-amber-500 hover:bg-amber-600">
              <Star className="h-3 w-3 mr-1" /> Featured
            </Badge>
          </div>
        )}
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              {business.name}
              {business.isVerified && <Check className="h-4 w-4 text-green-500" />}
            </CardTitle>
            <CardDescription className="line-clamp-2 mt-1">{business.description}</CardDescription>
          </div>

          {business.logo ? (
            <div className="h-10 w-10 rounded-full overflow-hidden">
              <Image
                src={business.logo || "/placeholder.svg"}
                alt={`${business.name} logo`}
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
          ) : null}
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pb-2">
        <div className="flex items-start gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
          <span className="text-sm">
            {business.location.street}, {business.location.name}, {business.location.city}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{formatOpeningHours(business.openingHours)}</span>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between pt-2">
        <div className="flex space-x-2">
          {business.socialMedia.facebook && (
            <Link href={`https://${business.socialMedia.facebook}`} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </Button>
            </Link>
          )}

          {business.socialMedia.twitter && (
            <Link href={`https://${business.socialMedia.twitter}`} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Button>
            </Link>
          )}

          {business.socialMedia.instagram && (
            <Link href={`https://${business.socialMedia.instagram}`} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Button>
            </Link>
          )}
        </div>

        <Button variant="outline" size="sm">
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}

function BusinessListItem({ business }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="flex flex-col md:flex-row">
        <div className="relative h-48 md:h-auto md:w-48 flex-shrink-0">
          <Image src="/placeholder.svg?height=400&width=300" alt={business.name} fill className="object-cover" />
        </div>

        <div className="flex flex-col flex-grow p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-xl font-bold flex items-center gap-2">
                {business.name}
                {business.isVerified && <Check className="h-4 w-4 text-green-500" />}
              </h3>
              <p className="text-muted-foreground">{business.description}</p>
            </div>

            <div className="flex gap-1">
              {business.isFeatured && (
                <Badge className="bg-amber-500 hover:bg-amber-600">
                  <Star className="h-3 w-3 mr-1" /> Featured
                </Badge>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
              <span className="text-sm">
                {business.location.street}, {business.location.name}, {business.location.city}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{business.phoneNumber}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{formatOpeningHours(business.openingHours)}</span>
            </div>

            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{business.email}</span>
            </div>
          </div>

          <div className="flex justify-between items-center mt-auto">
            <div className="flex space-x-2">
              {business.socialMedia.facebook && (
                <Link href={`https://${business.socialMedia.facebook}`} target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Facebook className="h-4 w-4" />
                    <span className="sr-only">Facebook</span>
                  </Button>
                </Link>
              )}

              {business.socialMedia.twitter && (
                <Link href={`https://${business.socialMedia.twitter}`} target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Twitter className="h-4 w-4" />
                    <span className="sr-only">Twitter</span>
                  </Button>
                </Link>
              )}

              {business.socialMedia.instagram && (
                <Link href={`https://${business.socialMedia.instagram}`} target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Instagram className="h-4 w-4" />
                    <span className="sr-only">Instagram</span>
                  </Button>
                </Link>
              )}
            </div>

            <div className="flex gap-2">
              {business.website && (
                <Link href={business.website} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Globe className="h-4 w-4" />
                    Website
                  </Button>
                </Link>
              )}
              <Button variant="default" size="sm">
                View Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

function formatOpeningHours(hours) {
  const today = new Date().getDay()
  const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
  const todayName = days[today]

  const openKey = `${todayName}Open`
  const closeKey = `${todayName}Close`

  if (hours[openKey] && hours[closeKey]) {
    return `Today: ${hours[openKey]} - ${hours[closeKey]}`
  }
  return "Hours not available"
}

