import { useState } from 'react'
import Button from '../components/Button'
import InputField from '../components/InputField'

const JoinNGOPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    type: 'volunteer',
  })
  const [submitted, setSubmitted] = useState(false)

  // Mock NGOs - replace with API call
  const ngos = [
    { id: 1, name: 'EduCare Foundation', focus: 'Education', trustScore: 4.8 },
    { id: 2, name: 'Health First', focus: 'Healthcare', trustScore: 4.7 },
    { id: 3, name: 'Disaster Relief NGO', focus: 'Disaster Relief', trustScore: 4.9 },
    { id: 4, name: 'Water for All', focus: 'Environment', trustScore: 4.6 },
  ]

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Mock submission - replace with API call
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', message: '', type: 'volunteer' })
    }, 3000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Join an NGO</h1>
        <p className="text-gray-600">Connect with verified NGOs and become a volunteer</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* NGO List */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6">Available NGOs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ngos.map((ngo) => (
              <div key={ngo.id} className="card">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{ngo.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">Focus: {ngo.focus}</p>
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-sm font-semibold">{ngo.trustScore}</span>
                      <span className="text-sm text-gray-600">Trust Score</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Application Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <h2 className="text-2xl font-bold mb-4">Apply as Volunteer</h2>
            {submitted ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">✅</div>
                <p className="text-lg font-semibold text-success-600">Application Submitted!</p>
                <p className="text-gray-600 mt-2">We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <InputField
                  label="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <InputField
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Application Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="volunteer">Volunteer</option>
                    <option value="partner">Partner Organization</option>
                    <option value="donor">Regular Donor</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="input-field"
                    placeholder="Tell us why you want to join..."
                  />
                </div>
                <Button type="submit" className="w-full">
                  Submit Application
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default JoinNGOPage
