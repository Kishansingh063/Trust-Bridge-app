import { Link } from 'react-router-dom'
import ProgressBar from './ProgressBar'

const CampaignCard = ({ campaign }) => {
  const progress = campaign.target > 0 ? (campaign.raised / campaign.target) * 100 : 0

  return (
    <div className="card hover:scale-105 transition-transform duration-300">
      {campaign.isEmergency && (
        <div className="absolute top-4 right-4 bg-danger-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
          Emergency
        </div>
      )}
      
      <div className="relative h-48 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg mb-4 overflow-hidden">
        {campaign.image ? (
          <img src={campaign.image} alt={campaign.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl">🎯</span>
          </div>
        )}
      </div>

      <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{campaign.title}</h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{campaign.description}</p>

      <div className="mb-4">
        <ProgressBar progress={progress} />
      </div>

      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-sm text-gray-600">Raised</p>
          <p className="text-lg font-bold text-primary-600">₹{campaign.raised.toLocaleString()}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Target</p>
          <p className="text-lg font-bold text-gray-800">₹{campaign.target.toLocaleString()}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
            <span className="text-primary-600 font-semibold text-sm">
              {campaign.ngo?.name?.charAt(0) || 'N'}
            </span>
          </div>
          <span className="text-sm text-gray-600">{campaign.ngo?.name || 'NGO'}</span>
        </div>
        {campaign.trustScore && (
          <div className="flex items-center space-x-1">
            <span className="text-yellow-500">⭐</span>
            <span className="text-sm font-semibold">{campaign.trustScore}</span>
          </div>
        )}
      </div>

      <Link
        to={`/campaign/${campaign.id}`}
        className="btn-primary w-full text-center block"
      >
        View Details
      </Link>
    </div>
  )
}

export default CampaignCard
