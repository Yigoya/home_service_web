import { Link } from "react-router-dom"
import { Star, CheckCircle, Award, Zap, Phone, MessageSquare } from "react-feather"

function BusinessCard({ business }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-6 bg-white hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-1/3">
          <Link to={`/business-detail/${business.id}`}>
            <img
              src={
                business.image ||
                business.images?.[0] ||
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-03-05%2019-12-21-8vAOv0DVglzk8mOdkTcdFYuuEBhNMB.png"
              }
              alt={business.name}
              className="w-full h-40 object-cover rounded-md"
            />
          </Link>
        </div>

        <div className="md:w-2/3">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-gray-800 text-white p-1 rounded-md text-xs">
              <Star size={14} />
            </span>
            <Link
              to={`/business-detail/${business.id}`}
              className="text-xl font-semibold text-black hover:text-blue-600 transition-colors"
            >
              {business.name}
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-3">
            <div className="flex items-center">
              <span className="text-white bg-green-600 px-2 py-1 rounded-md text-sm font-semibold flex items-center">
                {business.rating} <Star size={14} className="ml-1" />
              </span>
              <span className="ml-2 text-gray-600">{business.totalRatings} Ratings</span>
            </div>

            {business.isTrusted && (
              <span className="text-yellow-500 text-sm flex items-center">
                <Award size={14} className="mr-1" /> Trust
              </span>
            )}

            {business.isVerified && (
              <span className="text-blue-500 text-sm flex items-center">
                <CheckCircle size={14} className="mr-1" /> Verified
              </span>
            )}

            {business.isTopSearch && (
              <span className="text-orange-500 text-sm flex items-center">
                <Star size={14} className="mr-1" /> Top Search
              </span>
            )}

            {business.isPopular && (
              <span className="text-orange-500 text-sm flex items-center">
                <Award size={14} className="mr-1" /> Popular
              </span>
            )}

            {business.isResponsive && (
              <span className="text-orange-500 text-sm flex items-center">
                <Zap size={14} className="mr-1" /> Responsive
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 mb-3">
            <span className="text-gray-500">📍</span>
            <span className="text-gray-700">{business.address?.street || business.address}</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {business.services &&
              business.services.map((service, index) => (
                <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                  {service}
                </span>
              ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <a
              href={`tel:${business.phone || business.phoneNumber}`}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              <Phone size={16} />
              <span>{business.phone || business.phoneNumber}</span>
            </a>

            <button className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="0"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345z" />
                <path d="M20.52 3.449C12.831-3.984.106 1.407.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c9.756 0 17.664-7.89 17.667-17.647.001-4.708-1.83-9.13-5.198-12.45zm-5.19 27.151h-.005c-2.634-.001-5.213-.713-7.47-2.068l-.537-.319-5.558 1.448 1.457-5.325-.352-.563c-1.482-2.35-2.272-5.06-2.269-7.88.006-8.126 6.635-14.737 14.775-14.737 3.94.001 7.639 1.541 10.428 4.324 2.788 2.783 4.32 6.476 4.32 10.413-.002 8.126-6.635 14.738-14.788 14.738z" />
              </svg>
              <span>WhatsApp</span>
            </button>

            <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
              <MessageSquare size={16} />
              <span>Send Enquiry</span>
              <span className="text-xs bg-blue-600 px-1 rounded ml-1">Responds in 2 hours</span>
            </button>

            <div className="ml-auto flex items-center">
              <span className="text-sm text-gray-600">{business.enquiries} people recently enquired</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BusinessCard

