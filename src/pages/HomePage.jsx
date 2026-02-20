import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import CampaignCard from '../components/CampaignCard'
import StatsCard from '../components/StatsCard'
import Button from '../components/Button'

const HomePage = () => {
  const [stats, setStats] = useState({
    totalRaised: 0,
    totalCampaigns: 0,
    totalNGOs: 0,
    totalDonors: 0,
  })

  // Mock data - replace with API call
  const campaigns = [
    {
      id: 1,
      title: 'Education for Underprivileged Children',
      description: 'Supporting education for 500 children in rural areas',
      raised: 250000,
      target: 500000,
      isEmergency: false,
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
      ngo: { name: 'Health First' },
      trustScore: 4.7,
    },
  ]

  const events = [
    { id: 1, title: 'Blood Donation Drive', location: 'Mumbai', date: '2024-03-15', type: 'blood' },
    { id: 2, title: 'Medical Camp', location: 'Delhi', date: '2024-03-20', type: 'medical' },
    { id: 3, title: 'Disaster Relief Camp', location: 'Kolkata', date: '2024-03-25', type: 'relief' },
  ]

  useEffect(() => {
    // Animate counter
    const animateCounter = (target, setter, duration = 2000) => {
      let start = 0
      const increment = target / (duration / 16)
      const timer = setInterval(() => {
        start += increment
        if (start >= target) {
          setter(target)
          clearInterval(timer)
        } else {
          setter(Math.floor(start))
        }
      }, 16)
    }

    animateCounter(5000000, (val) => setStats((s) => ({ ...s, totalRaised: val })))
    animateCounter(150, (val) => setStats((s) => ({ ...s, totalCampaigns: val })))
    animateCounter(45, (val) => setStats((s) => ({ ...s, totalNGOs: val })))
    animateCounter(2500, (val) => setStats((s) => ({ ...s, totalDonors: val })))
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Building Trust Through Transparency
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Connect with verified NGOs and make a real impact. Every donation is tracked, every rupee is accounted for.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/campaigns">
                <Button variant="success" className="text-lg px-8 py-3">
                  Donate Now
                </Button>
              </Link>
              <Link to="/join-ngo">
                <Button variant="outline" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-primary-600">
                  Join NGO
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Impact in Numbers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Total Funds Raised"
              value={`₹${(stats.totalRaised / 100000).toFixed(1)}L`}
              icon="💰"
              trend={12.5}
            />
            <StatsCard
              title="Active Campaigns"
              value={stats.totalCampaigns}
              icon="🎯"
              trend={8.3}
            />
            <StatsCard
              title="Verified NGOs"
              value={stats.totalNGOs}
              icon="🏢"
              trend={5.2}
            />
            <StatsCard
              title="Active Donors"
              value={stats.totalDonors.toLocaleString()}
              icon="❤️"
              trend={15.7}
            />
          </div>
        </div>
      </section>

      {/* Top Campaigns */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Top Campaigns</h2>
            <Link to="/campaigns" className="text-primary-600 hover:text-primary-700 font-semibold">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Campaigns */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Emergency Campaigns</h2>
          <div className="bg-danger-50 border-l-4 border-danger-500 p-6 rounded-lg mb-6">
            <div className="flex items-start">
              <span className="text-3xl mr-4">🚨</span>
              <div>
                <h3 className="text-xl font-bold text-danger-800 mb-2">
                  {campaigns.find((c) => c.isEmergency)?.title}
                </h3>
                <p className="text-danger-700 mb-4">
                  {campaigns.find((c) => c.isEmergency)?.description}
                </p>
                <Link to={`/campaign/${campaigns.find((c) => c.isEmergency)?.id}`}>
                  <Button variant="danger">Donate Now</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Upcoming Events & Free Camps</h2>
            <Link to="/events" className="text-primary-600 hover:text-primary-700 font-semibold">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event.id} className="card hover:scale-105 transition-transform">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">
                    {event.type === 'blood' ? '🩸' : event.type === 'medical' ? '🏥' : '🚑'}
                  </span>
                  <span className="text-sm text-gray-600">{event.date}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-4">📍 {event.location}</p>
                <Link to="/events">
                  <Button className="w-full">Join Event</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Join Us in Making a Difference</h2>
          <p className="text-xl mb-8 text-primary-100">
            Become a volunteer and help us create a better world
          </p>
          <Link to="/join-ngo">
            <Button variant="success" className="text-lg px-8 py-3">
              Volunteer Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage
