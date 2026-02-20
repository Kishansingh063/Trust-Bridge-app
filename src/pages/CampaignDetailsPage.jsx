import { useParams, Link } from 'react-router-dom'
import ProgressBar from '../components/ProgressBar'
import Button from '../components/Button'

const CampaignDetailsPage = () => {
  const { id } = useParams()

  // Mock data - replace with API call
  const campaign = {
    id: parseInt(id),
    title: 'Education for Underprivileged Children',
    description: 'This campaign aims to provide quality education to 500 underprivileged children in rural areas. We will provide books, uniforms, and school supplies, along with after-school tutoring programs.',
    fullDescription: `Our mission is to break the cycle of poverty through education. This comprehensive program includes:

- Providing free books and educational materials
- School uniforms and supplies
- After-school tutoring programs
- Computer literacy classes
- Scholarship programs for higher education

We work directly with local schools and communities to ensure maximum impact.`,
    raised: 250000,
    target: 500000,
    isEmergency: false,
    category: 'education',
    ngo: {
      name: 'EduCare Foundation',
      trustScore: 4.8,
      verified: true,
      description: 'A registered NGO working for children\'s education since 2010',
    },
    fundUsage: [
      { date: '2024-01-15', amount: 50000, description: 'Purchased books and supplies', proof: 'bill1.jpg' },
      { date: '2024-02-01', amount: 30000, description: 'School uniforms for 100 children', proof: 'bill2.jpg' },
      { date: '2024-02-15', amount: 40000, description: 'Tutoring program setup', proof: 'bill3.jpg' },
    ],
  }

  const progress = (campaign.raised / campaign.target) * 100

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {campaign.isEmergency && (
            <div className="bg-danger-500 text-white px-4 py-2 rounded-lg mb-4 inline-block">
              🚨 Emergency Campaign
            </div>
          )}

          <h1 className="text-4xl font-bold mb-4">{campaign.title}</h1>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">About This Campaign</h2>
            <p className="text-gray-700 mb-4">{campaign.description}</p>
            <p className="text-gray-700 whitespace-pre-line">{campaign.fullDescription}</p>
          </div>

          {/* NGO Info */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">NGO Information</h2>
              {campaign.ngo.verified && (
                <span className="bg-success-100 text-success-700 px-3 py-1 rounded-full text-sm font-semibold">
                  ✓ Verified
                </span>
              )}
            </div>
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-bold text-xl">
                  {campaign.ngo.name.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-semibold">{campaign.ngo.name}</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-500">⭐</span>
                  <span className="font-semibold">{campaign.ngo.trustScore}</span>
                  <span className="text-gray-600">Trust Score</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600">{campaign.ngo.description}</p>
          </div>

          {/* Fund Usage Proof */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Fund Usage Timeline</h2>
            <div className="space-y-4">
              {campaign.fundUsage.map((usage, index) => (
                <div key={index} className="border-l-4 border-primary-500 pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold">{usage.description}</p>
                      <p className="text-sm text-gray-600">{new Date(usage.date).toLocaleDateString()}</p>
                    </div>
                    <span className="font-bold text-primary-600">₹{usage.amount.toLocaleString()}</span>
                  </div>
                  <a href="#" className="text-sm text-primary-600 hover:underline">
                    View Proof →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <h2 className="text-2xl font-semibold mb-4">Campaign Progress</h2>

            <ProgressBar progress={progress} />

            <div className="mt-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Raised</span>
                <span className="text-2xl font-bold text-primary-600">
                  ₹{campaign.raised.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Target</span>
                <span className="text-xl font-semibold text-gray-800">
                  ₹{campaign.target.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between pt-4 border-t">
                <span className="text-gray-600">Remaining</span>
                <span className="text-xl font-semibold text-gray-800">
                  ₹{(campaign.target - campaign.raised).toLocaleString()}
                </span>
              </div>
            </div>

            <Link to={`/donate/${campaign.id}`} className="block mt-6">
              <Button className="w-full text-lg py-3">Donate Now</Button>
            </Link>

            <div className="mt-6 p-4 bg-primary-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>100% Transparent:</strong> All donations are tracked and fund usage is publicly visible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CampaignDetailsPage
