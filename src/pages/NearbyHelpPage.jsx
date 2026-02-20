import { useState } from 'react'
import Button from '../components/Button'

const NearbyHelpPage = () => {
  const [location, setLocation] = useState('')

  // Mock data - replace with Google Maps API integration
  const nearbyNGOs = [
    { id: 1, name: 'EduCare Foundation', distance: '2.5 km', category: 'Education', phone: '+91 9876543210' },
    { id: 2, name: 'Health First', distance: '3.1 km', category: 'Healthcare', phone: '+91 9876543211' },
    { id: 3, name: 'Disaster Relief NGO', distance: '5.2 km', category: 'Emergency', phone: '+91 9876543212' },
  ]

  const hospitals = [
    { id: 1, name: 'City General Hospital', distance: '1.8 km', phone: '+91 9876543220' },
    { id: 2, name: 'Community Health Center', distance: '2.3 km', phone: '+91 9876543221' },
  ]

  const emergencyContacts = [
    { name: 'Police', number: '100' },
    { name: 'Ambulance', number: '102' },
    { name: 'Fire', number: '101' },
    { name: 'Women Helpline', number: '1091' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Nearby Help</h1>
        <p className="text-gray-600">Find NGOs, hospitals, and emergency services near you</p>
      </div>

      {/* Location Input */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your location or enable GPS"
            className="input-field flex-1"
          />
          <Button>Search</Button>
          <Button variant="secondary">Use Current Location</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Map Placeholder */}
        <div className="lg:col-span-2">
          <div className="bg-gray-200 rounded-lg shadow-md h-96 flex items-center justify-center">
            <div className="text-center">
              <span className="text-5xl mb-4 block">🗺️</span>
              <p className="text-gray-600">Map integration coming soon</p>
              <p className="text-sm text-gray-500 mt-2">Google Maps API will be integrated here</p>
            </div>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div>
          <div className="bg-danger-50 border-l-4 border-danger-500 p-6 rounded-lg mb-6">
            <h2 className="text-xl font-bold mb-4 text-danger-800">Emergency Contacts</h2>
            <div className="space-y-3">
              {emergencyContacts.map((contact) => (
                <div key={contact.name} className="flex justify-between items-center">
                  <span className="font-semibold">{contact.name}</span>
                  <a
                    href={`tel:${contact.number}`}
                    className="text-danger-600 font-bold hover:text-danger-700"
                  >
                    {contact.number}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Nearby NGOs */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Nearby NGOs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nearbyNGOs.map((ngo) => (
            <div key={ngo.id} className="card">
              <h3 className="text-xl font-bold mb-2">{ngo.name}</h3>
              <p className="text-sm text-gray-600 mb-2">Category: {ngo.category}</p>
              <p className="text-sm text-gray-600 mb-4">📍 {ngo.distance} away</p>
              <a href={`tel:${ngo.phone}`} className="btn-primary w-full text-center block">
                Call Now
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Nearby Hospitals */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Nearby Hospitals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hospitals.map((hospital) => (
            <div key={hospital.id} className="card">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">{hospital.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">📍 {hospital.distance} away</p>
                </div>
                <span className="text-3xl">🏥</span>
              </div>
              <a href={`tel:${hospital.phone}`} className="btn-primary w-full text-center block">
                Call Hospital
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NearbyHelpPage
