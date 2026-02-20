const DonationCard = ({ donation }) => {
  return (
    <div className="card">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-800">{donation.campaignName}</h3>
          <p className="text-sm text-gray-600">{donation.ngoName}</p>
        </div>
        <span className="text-lg font-bold text-primary-600">₹{donation.amount.toLocaleString()}</span>
      </div>
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>{new Date(donation.date).toLocaleDateString()}</span>
        <span className={`px-2 py-1 rounded ${
          donation.status === 'completed' ? 'bg-success-100 text-success-700' :
          donation.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
          'bg-danger-100 text-danger-700'
        }`}>
          {donation.status}
        </span>
      </div>
    </div>
  )
}

export default DonationCard
