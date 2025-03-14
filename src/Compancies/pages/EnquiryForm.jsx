function EnquiryForm({ title }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      <h2 className="text-lg font-semibold mb-2">
        {title} <span className="text-blue-500">Beauty Parlours</span>
      </h2>
      <p className="text-sm text-gray-600 mb-4">We'll send you contact details in seconds for free</p>

      <div className="mb-4">
        <p className="font-medium mb-2">What service are you interested in?</p>
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input type="radio" name="service" className="accent-blue-500" defaultChecked />
            <span>Hair styling</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="service" className="accent-blue-500" />
            <span>Skin care</span>
          </label>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            type="tel"
            placeholder="Mobile Number"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="w-full bg-blue-500 text-white py-3 rounded-md font-medium">Send Enquiry ≫</button>
      </div>
    </div>
  )
}

export default EnquiryForm

