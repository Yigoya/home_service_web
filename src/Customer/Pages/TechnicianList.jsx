import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../Components/SearchBar';
import TechnicianCard from '../Components/TechnicianCard';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
import { API_URL } from '../../Shared/api';
import LocationSelector from '../Components/LocationSelector';


function TechnicianList() {
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchTechnicians();
  }, []);

  const fetchTechnicians = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/search/service/1`);
      setTechnicians(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch technicians');
    } finally {
      setLoading(false);
    }
  };

  const searchTechnicians = async (selectedLocation, searchTerm) => {
    setIsSearching(true);
    console.log({params: {
      locationQuery: selectedLocation,
      name: searchTerm
    }})
    try {
      const { data } = await axios.get(`${API_URL}/search/technicians/1`, {
        params: {
          locationQuery: selectedLocation,
          name: searchTerm
        }
      });
      console.log(data);
      setSearchResults(data.content);
    } catch (err) {
      setError(err.response?.data?.message || 'Search failed');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearch = () => {
    if (searchTerm || selectedLocation) {
      searchTechnicians();
    } else {
      fetchTechnicians();
    }
  };

  const filteredTechnicians = searchResults ? searchResults : technicians;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-2">Error: {error}</p>
          <button 
            onClick={fetchTechnicians}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Find a Technician</h1>
        <p className="text-gray-600 mb-6">Connect with skilled professionals for your construction needs</p>
        <div className="flex gap-3 mb-3 mt-3">
          <LocationSelector selectedLocation={selectedLocation} onLocationChange={(location) => { setSelectedLocation(location); searchTechnicians(location, searchTerm) }} />
          <SearchBar searchTerm={searchTerm} onSearch={(searchTerm) => { setSearchTerm(searchTerm); searchTechnicians(selectedLocation, searchTerm) }} />
        </div>
      </div>

      {filteredTechnicians.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">No technicians found matching your criteria.</p>
          <button 
            onClick={() => {
              setSearchTerm('');
              setSelectedService('');
              setSelectedLocation('');
            }}
            className="mt-4 text-blue-600 hover:text-blue-800 underline"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className={`grid gap-6 ${filteredTechnicians.length > 1 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {filteredTechnicians.map((technician) => (
            <Link 
              key={technician.id} 
              to={`/technician-details/${technician.id}/1`}
              className="transform hover:scale-105 transition-transform duration-300"
            >
              <TechnicianCard technician={technician} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default TechnicianList;