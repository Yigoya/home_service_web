"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { API_URL } from "../Shared/api" 
import { useParams } from "react-router-dom"


function TenderDetailPage() {
  const [tender, setTender] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const fetchTenderData = async () => {
      try {
        const response = await axios.get(`${API_URL}/tenders/${id}`);
        if (response.status !== 200) {
          throw new Error("Failed to fetch tender data");
        }
        setTender(response.data);
      } catch (err) {
        setError("Error loading tender details. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchTenderData()
  }, [])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="container mx-auto max-w-4xl py-8 px-4">
        <p>Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-4xl py-8 px-4">
        <p>{error}</p>
      </div>
    )
  }

  if (!tender) return null

  return (
    <div className="container mx-auto max-w-4xl py-4 px-4 mt-32">
      {/* Main Tender Information */}
      <div className="border rounded mb-4">
        <div className="border-b p-3 bg-gray-50">
          <h2 className="font-medium">{tender.title}</h2>
        </div>

        <div className="p-3">
          <p>
            Johannesburg Water South Africa has Released a tender for {tender.title} in Environment and Pollution. The
            tender was released on {formatDate(tender.datePosted)}.
          </p>

          <div className="mt-3">
            <p>
              <span className="font-medium">Country - </span>
              {tender.location}
            </p>
            <p>
              <span className="font-medium">Summary - </span>
              {tender.title}
            </p>
            <p>
              <span className="font-medium">Deadline - </span>
              {formatDate(tender.closingDate)}
            </p>
            <p>
              <span className="font-medium">GT reference number - </span>
              {tender.id}
            </p>
            <p>
              <span className="font-medium">Product classification - </span>
              {tender.categoryName}
            </p>
          </div>
        </div>
      </div>

      {/* Organization Details */}
      <div className="border rounded mb-4">
        <div className="border-b p-3 bg-gray-50">
          <h2 className="font-medium">Organization Details, Notice Details and Documents</h2>
        </div>

                <div className="p-3 relative">
          <div className="blur-sm transition-all duration-300">
            <p>
              <span className="font-medium">Contact: </span>
              {tender.contactInfo}
            </p>
            <p>
              <span className="font-medium">Contact Email: </span>
              {tender.contactInfo}
            </p>
            <p>
              <span className="font-medium">Phone number: </span>+251 911 123456
            </p>
            <p>
              <span className="font-medium">PO Box: </span>12345
            </p>
            <p>
              <span className="font-medium">Document Type: </span>Tender Notice
            </p>
          </div>
        
          <div className="flex justify-center mt-3 absolute inset-0 items-center">
            <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded">Login</button>
          </div>
        </div>
      </div>

      {/* Notice Details and Documents
      <div className="border rounded-md">
        <div className="border-b p-3 bg-gray-50">
          <h2 className="font-medium">Notice Details and Documents:</h2>
        </div>

        <div className="p-3">
          <p>
            <span className="font-medium">Description - </span>
            notice_title: {tender.title}
            local title:: RFQ {tender.title.toUpperCase()}
          </p>

          <div className="blur-sm transition-all duration-300 mt-2">
            <p>Additional information about the tender requirements and specifications.</p>
          </div>

          <p className="mt-2">
            <span className="font-medium">CPV code: </span>10405105
          </p>
          <p>
            <span className="font-medium">deadline: </span>
            {formatDate(tender.questionDeadline)}
          </p>

          <div className="flex justify-center mt-3">
          <button className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded">Login</button>
          </div>
        </div>
      </div>

      <div className="text-xs text-center mt-2 text-gray-500">
        Hover over blurred content to reveal sensitive information
      </div> */}
    </div>
  )
}

export default TenderDetailPage

