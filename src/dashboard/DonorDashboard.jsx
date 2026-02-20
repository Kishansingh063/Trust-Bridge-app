import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import StatsCard from '../components/StatsCard'
import DonationCard from '../components/DonationCard'
import CampaignCard from '../components/CampaignCard'
import Button from '../components/Button'

const DonorDashboard = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data - replace with API calls
  const stats = {
    totalDonated: 15000,
    campaignsSupported: 5,
    ngosJoined: 3,
    impactScore: 85,
  }

  const donations = [
    {
      id: 1,
      campaignName: 'Education for Underprivileged Children',
      ngoName: 'EduCare Foundation',
      amount: 5000,
      date: '2024-02-15',
      status: 'completed',
    },
    {
      id: 2,
      campaignName: 'Flood Relief in Assam',
      ngoName: 'Disaster Relief NGO',
      amount: 3000,
      date: '2024-02-10',
      status: 'completed',
    },
    {
      id: 3,
      campaignName: 'Medical Camp',
      ngoName: 'Health First',
      amount: 2000,
      date: '2024-02-05',
      status: 'completed',
    },
  ]

  const activeCampaigns = [
    {
      id: 1,
      title: 'Clean Water Initiative',
      description: 'Installing water purification systems',
      raised: 320000,
      target: 400000,
      ngo: { name: 'Water for All' },
      trustScore: 4.6,
    },
  ]

  const joinedNGOs = [
    { id: 1, name: 'EduCare Foundation', joinedDate: '2024-01-15' },
    { id: 2, name: 'Health First', joinedDate: '2024-01-20' },
    { id: 3, name: 'Disaster Relief NGO', joinedDate: '2024-02-01' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.name || 'Donor'}!</h1>
        <p className="text-gray-600">Track your donations and impact</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {['overview', 'donations', 'campaigns', 'ngos'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total Donated"
              value={`₹${(stats.totalDonated / 1000).toFixed(1)}K`}
              icon="💰"
            />
            <StatsCard
              title="Campaigns Supported"
              value={stats.campaignsSupported}
              icon="🎯"
            />
            <StatsCard
              title="NGOs Joined"
              value={stats.ngosJoined}
              icon="🏢"
            />
            <StatsCard
              title="Impact Score"
              value={stats.impactScore}
              icon="⭐"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Recent Donations</h2>
              <div className="space-y-4">
                {donations.slice(0, 3).map((donation) => (
                  <DonationCard key={donation.id} donation={donation} />
                ))}
              </div>
              <Link to="/dashboard/donor" onClick={() => setActiveTab('donations')}>
                <Button variant="outline" className="w-full mt-4">
                  View All Donations
                </Button>
              </Link>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Active Campaigns</h2>
              <div className="space-y-4">
                {activeCampaigns.map((campaign) => (
                  <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
              </div>
              <Link to="/campaigns">
                <Button variant="outline" className="w-full mt-4">
                  Browse More Campaigns
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Donations Tab */}
      {activeTab === 'donations' && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Donation History</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {donations.map((donation) => (
              <DonationCard key={donation.id} donation={donation} />
            ))}
          </div>
        </div>
      )}

      {/* Campaigns Tab */}
      {activeTab === 'campaigns' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Your Campaigns</h2>
            <Link to="/campaigns">
              <Button>Browse Campaigns</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        </div>
      )}

      {/* NGOs Tab */}
      {activeTab === 'ngos' && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Joined NGOs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {joinedNGOs.map((ngo) => (
              <div key={ngo.id} className="card">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-bold text-xl">
                      {ngo.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{ngo.name}</h3>
                    <p className="text-sm text-gray-600">
                      Joined {new Date(ngo.joinedDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default DonorDashboard
