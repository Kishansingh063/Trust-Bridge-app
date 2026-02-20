import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import InputField from '../components/InputField'
import Button from '../components/Button'

const DonationPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [amount, setAmount] = useState('')
  const [customAmount, setCustomAmount] = useState('')
  const [loading, setLoading] = useState(false)

  // Mock campaign data - replace with API call
  const campaign = {
    id: parseInt(id),
    title: 'Education for Underprivileged Children',
    ngo: { name: 'EduCare Foundation' },
  }

  const quickAmounts = [500, 1000, 2000, 5000, 10000]

  const handleAmountSelect = (amt) => {
    setAmount(amt.toString())
    setCustomAmount('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const donationAmount = customAmount || amount
    if (!donationAmount || parseFloat(donationAmount) <= 0) {
      alert('Please enter a valid donation amount')
      return
    }

    setLoading(true)
    // Mock donation - replace with actual API call
    setTimeout(() => {
      alert(`Thank you for your donation of ₹${parseFloat(donationAmount).toLocaleString()}!`)
      navigate(`/campaign/${id}`)
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-2">Make a Donation</h1>
        <p className="text-gray-600 mb-8">
          Supporting: <span className="font-semibold">{campaign.title}</span>
        </p>
        <p className="text-sm text-gray-600 mb-6">
          NGO: <span className="font-semibold">{campaign.ngo.name}</span>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Select Amount (₹)
            </label>
            <div className="grid grid-cols-5 gap-3 mb-4">
              {quickAmounts.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => handleAmountSelect(amt)}
                  className={`p-3 border-2 rounded-lg font-semibold transition-all ${
                    amount === amt.toString()
                      ? 'border-primary-600 bg-primary-50 text-primary-600'
                      : 'border-gray-300 hover:border-primary-300'
                  }`}
                >
                  ₹{amt.toLocaleString()}
                </button>
              ))}
            </div>

            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
              <InputField
                type="number"
                name="customAmount"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value)
                  setAmount('')
                }}
                placeholder="Enter custom amount"
                className="pl-8"
              />
            </div>
          </div>

          <div className="bg-primary-50 p-4 rounded-lg mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Donation Amount</span>
              <span className="text-2xl font-bold text-primary-600">
                ₹{(parseFloat(customAmount || amount) || 0).toLocaleString()}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Your donation will directly support this campaign. All transactions are secure and transparent.
            </p>
          </div>

          <div className="space-y-4">
            <Button type="submit" className="w-full text-lg py-3" disabled={loading}>
              {loading ? 'Processing...' : 'Proceed to Payment'}
            </Button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full btn-secondary text-lg py-3"
            >
              Cancel
            </button>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 text-center">
              🔒 Secure payment gateway. Your information is safe and encrypted.
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default DonationPage
