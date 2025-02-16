import { BrowserRouter as Router } from "react-router-dom"
import SearchFilters from "./components/SearchFilter"
import TenderList from "./components/TenderList"
import Sidebar from "./components/SideBar"


function TenderPage() {
  return (

      <div className="flex min-h-screen bg-white">
        <Sidebar />
        <main className="flex-1">
          <div className="grid grid-cols-1 gap-4 p-4 md:p-6">
            <div className="overflow-hidden rounded-lg border">
              <div className="grid grid-cols-[1fr,2fr,2fr] bg-[#3498db] p-3 text-white">
                <div className="px-4 py-2">Location</div>
                <div className="px-4 py-2">Category</div>
                <div className="px-4 py-2">Mobile Application Development</div>
              </div>
              <div className="p-4">
                <SearchFilters />
                <TenderList />
              </div>
            </div>
          </div>
        </main>
      </div>

  )
}

export default TenderPage

