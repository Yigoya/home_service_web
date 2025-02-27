"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { format } from "date-fns"
import { tenderListApi } from "../api"

function TenderList() {
  const [tenders, setTenders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchTenders = async () => {
      try {
        const response = await axios.get(`${tenderListApi}/78`)
        setTenders(response.data["content"])
      } catch (err) {
        setError("Failed to fetch tenders")
      } finally {
        setLoading(false)
      }
    }

    fetchTenders()
  }, [])

  if (loading) {
    return <div className="text-center py-8">Loading tenders...</div>
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>
  }

  return (
    <div className="space-y-4 mt-6">
{tenders.map((tender) => {
  const postedDate = new Date(tender.postedDate);
  const expiryDate = new Date(tender.expiryDate);
  const isPostedDateValid = !isNaN(postedDate);
  const isExpiryDateValid = !isNaN(expiryDate);

  return (
    <div key={tender.id} className="border rounded-lg p-4 hover:bg-gray-50">
      <h3 className="font-semibold text-lg mb-2">{tender.title}</h3>
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>
            Posted Date: {isPostedDateValid ? format(postedDate, "EEEE, dd MMMM, yyyy") : "Invalid Date"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>
            Expiry Date: {isExpiryDateValid ? format(expiryDate, "EEEE, dd MMMM, yyyy") : "Invalid Date"}
          </span>
        </div>
      </div>
    </div>
  );
})}
    </div>
  )
}

export default TenderList

