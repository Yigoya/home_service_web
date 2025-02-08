"use client"

import { useContext, useState } from "react"
import { FilterContext } from "../../Shared/Context/FilterContext"
import { API_URL } from "../../Shared/api"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { Star, Calendar, MapPin, Edit, AlertTriangle } from "lucide-react"

const ProfileContent = ({ jobs }) => {
  const { t } = useTranslation()
  const { filterStatus } = useContext(FilterContext)
  const jobArray = Array.isArray(jobs.content) ? jobs.content : []

  const [updatedJobs, setJobs] = useState(jobArray)

  const filteredJobs = updatedJobs.filter((job) => {
    if (filterStatus === "All") return true
    return job.status === filterStatus
  })

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800",
    Accepted: "bg-green-100 text-green-800",
    Completed: "bg-blue-100 text-blue-800",
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8">
      <main className="bg-white rounded-2xl shadow-lg max-w-4xl mx-auto p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
          {filteredJobs.length === 0 ? <p className="text-center">{t("no_booking")}</p> : <p>{t("track")}</p>}
        </h1>

        <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
          {filteredJobs.map((job) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-50 p-6 shadow-md rounded-xl hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
                <img
                  src={`${API_URL}/uploads/${job.technicianProfleImage}`}
                  alt="Provider"
                  className="w-24 h-24 rounded-full object-cover mx-auto md:mx-0 mb-4 md:mb-0"
                />
                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2 md:mb-0">{job.technicianName}</h2>
                    <span
                      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${statusColors[job.status]}`}
                    >
                      {job.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-1" />
                      {job.scheduledDate}
                    </span>
                    <span className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      {job.address?.city ?? "N/A"}
                    </span>
                  </div>
                  <p className="bg-gray-200 text-gray-800 inline-block rounded-lg px-3 py-1 text-sm">
                    {job.serviceName}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold text-gray-800 mb-2">{t("job_des")}</h3>
                <p className="text-sm text-gray-600">{job.description}</p>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                {(job.status === "Pending" || job.status === "Accepted") && (
                  <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center">
                    <Edit className="w-4 h-4 mr-2" />
                    {t("edit")}
                  </button>
                )}
                {job.status === "Accepted" && (
                  <select
                    value={job.status}
                    onChange={(e) => {
                      const updatedJobList = updatedJobs.map((j) =>
                        j.id === job.id ? { ...j, status: e.target.value } : j,
                      )
                      setJobs(updatedJobList)
                    }}
                    className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="started">{t("started")}</option>
                    <option value="halted">Halted</option>
                    <option value="Completed">{t("completed")}</option>
                  </select>
                )}
                {(job.status === "Pending" || job.status === "Accepted") && (
                  <button className="text-red-500 hover:text-red-600 font-semibold flex items-center transition-colors duration-300">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    {t("despute")}
                  </button>
                )}
              </div>

              {job.status === "Completed" && (
                <div className="mt-6 bg-gray-100 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">{t("review")}</h3>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < job.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">{job.review}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default ProfileContent

