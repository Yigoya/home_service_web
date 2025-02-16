"use client"

import { useState } from "react"

const locations = ["USA", "Canada", "India", "UK", "Australia", "Ireland", "New Zealand", "Switzerland"]

function Sidebar() {
  const [selectedLocation, setSelectedLocation] = useState(null)

  return (
    <div className="w-64 border-r bg-white">
      <div className="p-4">
        <h2 className="font-semibold mb-4">Location</h2>
        <div className="space-y-1">
          {locations.map((location) => (
            <button
              key={location}
              className={`w-full px-4 py-2 text-left rounded-md flex justify-between items-center ${
                selectedLocation === location ? "bg-gray-100" : "hover:bg-gray-50"
              }`}
              onClick={() => setSelectedLocation(location)}
            >
              {location}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          ))}
          <button className="w-full px-4 py-2 text-left rounded-md hover:bg-gray-50">View All</button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar

