import { useState } from 'react'
import StatsCard from '../components/StatsCard'
import Button from '../components/Button'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data - replace with API calls
  const stats = {
    totalNGOs: 45,
    pendingVerifications: 8,
    totalReports: 3,
    platformFunds: 5000000,
  }

  const pendingNGOs = [
    {
      id: 1,
      name: 'New Education NGO',
      email: 'contact@newedu.org',
      submittedDate: '2024-02-15',
      documents: ['registration.pdf', 'tax_certificate.pdf'],
    },
    {
      id: 2,
      name: 'Community Health Initiative',
      email: 'info@chi.org',
      submittedDate: '2024-02-14',
      documents: ['registration.pdf'],
    },
  ]

  const fraudReports = [
    {
      id: 1,
      campaignId: 101,
      campaignName: 'Suspicious Campaign',
      reportedBy: 'donor@example.com',
      reason: 'Misuse of funds',
      status: 'pending',
      reportedDate: '2024-02-10',
    },
    {
      id: 2,
      campaignId: 102,
      campaignName: 'Another Campaign',
      reportedBy: 'donor2@example.com',
      reason: 'Fake NGO',
      status: 'investigating',
      reportedDate: '2024-02-08',
    },
  ]

  const handleVerifyNGO = (ngoId, verified) => {
    // Mock verification - replace with API call
    alert(`NGO ${verified ? 'verified' : 'rejected'} successfully`)
  }

  const handleReportAction = (reportId, action) => {
    // Mock action - replace with API call
    alert(`Report ${action} successfully`)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage platform operations and ensure transparency</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {['overview', 'verifications', 'reports', 'statistics'].map((tab) => (
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
              title="Total NGOs"
              value={stats.totalNGOs}
              icon="🏢"
            />
            <StatsCard
              title="Pending Verifications"
              value={stats.pendingVerifications}
              icon="⏳"
            />
            <StatsCard
              title="Fraud Reports"
              value={stats.totalReports}
              icon="🚨"
            />
            <StatsCard
              title="Platform Funds"
              value={`₹${(stats.platformFunds / 100000).toFixed(1)}L`}
              icon="💰"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Pending Verifications</h2>
              <div className="space-y-4">
                {pendingNGOs.slice(0, 3).map((ngo) => (
                  <div key={ngo.id} className="card">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold">{ngo.name}</h3>
                        <p className="text-sm text-gray-600">{ngo.email}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Submitted {new Date(ngo.submittedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="success"
                        className="flex-1 text-sm"
                        onClick={() => handleVerifyNGO(ngo.id, true)}
                      >
                        Verify
                      </Button>
                      <Button
                        variant="danger"
                        className="flex-1 text-sm"
                        onClick={() => handleVerifyNGO(ngo.id, false)}
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Recent Reports</h2>
              <div className="space-y-4">
                {fraudReports.slice(0, 3).map((report) => (
                  <div key={report.id} className="card">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">{report.campaignName}</h3>
                        <p className="text-sm text-gray-600">Reported by: {report.reportedBy}</p>
                        <p className="text-sm text-gray-600">Reason: {report.reason}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs ${
                        report.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        report.status === 'investigating' ? 'bg-blue-100 text-blue-700' :
                        'bg-success-100 text-success-700'
                      }`}>
                        {report.status}
                      </span>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" className="flex-1 text-sm">View Details</Button>
                      <Button variant="danger" className="flex-1 text-sm">Take Action</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Verifications Tab */}
      {activeTab === 'verifications' && (
        <div>
          <h2 className="text-2xl font-bold mb-6">NGO Verification Requests</h2>
          <div className="card">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">NGO Name</th>
                    <th className="text-left py-3 px-4">Email</th>
                    <th className="text-left py-3 px-4">Submitted Date</th>
                    <th className="text-left py-3 px-4">Documents</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingNGOs.map((ngo) => (
                    <tr key={ngo.id} className="border-b">
                      <td className="py-3 px-4">{ngo.name}</td>
                      <td className="py-3 px-4">{ngo.email}</td>
                      <td className="py-3 px-4">{new Date(ngo.submittedDate).toLocaleDateString()}</td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-2">
                          {ngo.documents.map((doc, idx) => (
                            <a key={idx} href="#" className="text-primary-600 hover:underline text-sm">
                              {doc}
                            </a>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button
                            variant="success"
                            className="text-sm"
                            onClick={() => handleVerifyNGO(ngo.id, true)}
                          >
                            Verify
                          </Button>
                          <Button
                            variant="danger"
                            className="text-sm"
                            onClick={() => handleVerifyNGO(ngo.id, false)}
                          >
                            Reject
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Fraud Reports</h2>
          <div className="space-y-4">
            {fraudReports.map((report) => (
              <div key={report.id} className="card">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{report.campaignName}</h3>
                    <p className="text-gray-600">Reported by: {report.reportedBy}</p>
                    <p className="text-gray-600">Reason: {report.reason}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Reported on {new Date(report.reportedDate).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    report.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    report.status === 'investigating' ? 'bg-blue-100 text-blue-700' :
                    'bg-success-100 text-success-700'
                  }`}>
                    {report.status}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">View Details</Button>
                  <Button variant="danger" className="flex-1">Investigate</Button>
                  <Button variant="success" className="flex-1">Resolve</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Statistics Tab */}
      {activeTab === 'statistics' && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Platform Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">Campaign Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Total Campaigns</span>
                  <span className="font-bold">150</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Campaigns</span>
                  <span className="font-bold">45</span>
                </div>
                <div className="flex justify-between">
                  <span>Completed Campaigns</span>
                  <span className="font-bold">105</span>
                </div>
              </div>
            </div>
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">Donation Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Total Donations</span>
                  <span className="font-bold">₹50L</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Donation</span>
                  <span className="font-bold">₹2,500</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Donors</span>
                  <span className="font-bold">2,500</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
