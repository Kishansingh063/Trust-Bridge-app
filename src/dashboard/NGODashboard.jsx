import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import StatsCard from '../components/StatsCard'
import CampaignCard from '../components/CampaignCard'
import Button from '../components/Button'
import InputField from '../components/InputField'
import Modal from '../components/Modal'

const NGODashboard = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [showCreateCampaign, setShowCreateCampaign] = useState(false)
  const [campaignForm, setCampaignForm] = useState({
    title: '',
    description: '',
    target: '',
    category: 'education',
  })

  // Mock data - replace with API calls
  const stats = {
    totalRaised: 2500000,
    activeCampaigns: 5,
    totalDonors: 150,
    trustScore: 4.8,
  }

  const campaigns = [
    {
      id: 1,
      title: 'Education for Underprivileged Children',
      description: 'Supporting education for 500 children',
      raised: 250000,
      target: 500000,
      ngo: { name: user?.name || 'Your NGO' },
      trustScore: 4.8,
    },
    {
      id: 2,
      title: 'Medical Camp',
      description: 'Free health checkups',
      raised: 180000,
      target: 300000,
      ngo: { name: user?.name || 'Your NGO' },
      trustScore: 4.8,
    },
  ]

  const volunteers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', joinedDate: '2024-01-15', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', joinedDate: '2024-01-20', status: 'active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', joinedDate: '2024-02-01', status: 'pending' },
  ]

  const handleCreateCampaign = (e) => {
    e.preventDefault()
    // Mock creation - replace with API call
    alert('Campaign created successfully!')
    setShowCreateCampaign(false)
    setCampaignForm({ title: '', description: '', target: '', category: 'education' })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">NGO Dashboard</h1>
          <p className="text-gray-600">Manage your campaigns and track impact</p>
        </div>
        <Button onClick={() => setShowCreateCampaign(true)}>+ Create Campaign</Button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {['overview', 'campaigns', 'volunteers', 'funds'].map((tab) => (
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
              title="Total Funds Raised"
              value={`₹${(stats.totalRaised / 100000).toFixed(1)}L`}
              icon="💰"
            />
            <StatsCard
              title="Active Campaigns"
              value={stats.activeCampaigns}
              icon="🎯"
            />
            <StatsCard
              title="Total Donors"
              value={stats.totalDonors}
              icon="❤️"
            />
            <StatsCard
              title="Trust Score"
              value={stats.trustScore}
              icon="⭐"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Recent Campaigns</h2>
              <div className="space-y-4">
                {campaigns.slice(0, 2).map((campaign) => (
                  <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Recent Volunteers</h2>
              <div className="space-y-4">
                {volunteers.slice(0, 3).map((volunteer) => (
                  <div key={volunteer.id} className="card">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{volunteer.name}</h3>
                        <p className="text-sm text-gray-600">{volunteer.email}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Joined {new Date(volunteer.joinedDate).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        volunteer.status === 'active' ? 'bg-success-100 text-success-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {volunteer.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Campaigns Tab */}
      {activeTab === 'campaigns' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Your Campaigns</h2>
            <Button onClick={() => setShowCreateCampaign(true)}>+ Create Campaign</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="relative">
                <CampaignCard campaign={campaign} />
                <div className="mt-2 flex gap-2">
                  <Button variant="outline" className="flex-1 text-sm">Edit</Button>
                  <Button variant="outline" className="flex-1 text-sm">Upload Proof</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Volunteers Tab */}
      {activeTab === 'volunteers' && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Volunteers</h2>
          <div className="card">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Name</th>
                    <th className="text-left py-3 px-4">Email</th>
                    <th className="text-left py-3 px-4">Joined Date</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {volunteers.map((volunteer) => (
                    <tr key={volunteer.id} className="border-b">
                      <td className="py-3 px-4">{volunteer.name}</td>
                      <td className="py-3 px-4">{volunteer.email}</td>
                      <td className="py-3 px-4">{new Date(volunteer.joinedDate).toLocaleDateString()}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs ${
                          volunteer.status === 'active' ? 'bg-success-100 text-success-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {volunteer.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Button variant="outline" className="text-sm">View</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Funds Tab */}
      {activeTab === 'funds' && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Fund Usage Proof</h2>
          <div className="card mb-6">
            <h3 className="text-xl font-semibold mb-4">Upload Fund Usage Proof</h3>
            <form className="space-y-4">
              <InputField label="Description" name="description" placeholder="What was this fund used for?" />
              <InputField label="Amount Used (₹)" type="number" name="amount" placeholder="50000" />
              <InputField label="Date" type="date" name="date" />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Bill/Receipt</label>
                <input type="file" className="input-field" accept="image/*" />
              </div>
              <Button>Upload Proof</Button>
            </form>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Fund Usage Timeline</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="card">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">Medical supplies purchase</p>
                      <p className="text-sm text-gray-600">2024-02-15</p>
                    </div>
                    <span className="font-bold text-primary-600">₹50,000</span>
                  </div>
                  <a href="#" className="text-sm text-primary-600 hover:underline mt-2 inline-block">
                    View Proof →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Create Campaign Modal */}
      <Modal
        isOpen={showCreateCampaign}
        onClose={() => setShowCreateCampaign(false)}
        title="Create New Campaign"
      >
        <form onSubmit={handleCreateCampaign} className="space-y-4">
          <InputField
            label="Campaign Title"
            name="title"
            value={campaignForm.title}
            onChange={(e) => setCampaignForm({ ...campaignForm, title: e.target.value })}
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={campaignForm.description}
              onChange={(e) => setCampaignForm({ ...campaignForm, description: e.target.value })}
              rows="4"
              className="input-field"
              required
            />
          </div>
          <InputField
            label="Target Amount (₹)"
            type="number"
            name="target"
            value={campaignForm.target}
            onChange={(e) => setCampaignForm({ ...campaignForm, target: e.target.value })}
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              name="category"
              value={campaignForm.category}
              onChange={(e) => setCampaignForm({ ...campaignForm, category: e.target.value })}
              className="input-field"
            >
              <option value="education">Education</option>
              <option value="health">Health</option>
              <option value="disaster">Disaster Relief</option>
              <option value="environment">Environment</option>
              <option value="poverty">Poverty</option>
            </select>
          </div>
          <div className="flex gap-4">
            <Button type="submit" className="flex-1">Create Campaign</Button>
            <Button type="button" variant="secondary" onClick={() => setShowCreateCampaign(false)} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default NGODashboard
