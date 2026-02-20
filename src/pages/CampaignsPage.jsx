import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import CampaignCard from '../components/CampaignCard'
import InputField from '../components/InputField'
import Button from '../components/Button'

const CampaignsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [category, setCategory] = useState(searchParams.get('category') || 'all')

  // Mock data - replace with API call
  const campaigns = [
    {
      id: 1,
      title: 'Education for Underprivileged Children',
      description: 'Supporting education for 500 children in rural areas',
      raised: 250000,
      target: 500000,
      isEmergency: false,
      category: 'education',
      ngo: { name: 'EduCare Foundation' },
      trustScore: 4.8,
    },
    {
      id: 2,
      title: 'Flood Relief in Assam',
      description: 'Emergency relief for flood-affected families',
      raised: 1800000,
      target: 2000000,
      isEmergency: true,
      category: 'disaster',
      ngo: { name: 'Disaster Relief NGO' },
      trustScore: 4.9,
    },
    {
      id: 3,
      title: 'Medical Camp for Remote Villages',
      description: 'Free health checkups and medicines',
      raised: 450000,
      target: 600000,
      isEmergency: false,
      category: 'health',
      ngo: { name: 'Health First' },
      trustScore: 4.7,
    },
    {
      id: 4,
      title: 'Clean Water Initiative',
      description: 'Installing water purification systems',
      raised: 320000,
      target: 400000,
      isEmergency: false,
      category: 'environment',
      ngo: { name: 'Water for All' },
      trustScore: 4.6,
    },
  ]

  const categories = ['all', 'education', 'health', 'disaster', 'environment', 'poverty']

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = category === 'all' || campaign.category === category
    return matchesSearch && matchesCategory
  })

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchParams({ search: searchTerm, category })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">All Campaigns</h1>
        <p className="text-gray-600">Discover campaigns making a real impact</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <InputField
              type="text"
              name="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search campaigns..."
            />
          </div>
          <div className="md:w-48">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input-field"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <Button type="submit">Search</Button>
        </form>
      </div>

      {/* Campaigns Grid */}
      {filteredCampaigns.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No campaigns found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}

export default CampaignsPage
