import { Link } from 'react-router-dom'
import Button from '../components/Button'

const EventsPage = () => {
  // Mock data - replace with API call
  const events = [
    {
      id: 1,
      title: 'Blood Donation Drive',
      description: 'Join us for a community blood donation drive. Every donation saves lives.',
      location: 'Mumbai Central',
      date: '2024-03-15',
      time: '10:00 AM - 4:00 PM',
      type: 'blood',
      organizer: 'Red Cross Society',
    },
    {
      id: 2,
      title: 'Free Medical Camp',
      description: 'Free health checkups, consultations, and basic medicines for all.',
      location: 'Delhi Community Center',
      date: '2024-03-20',
      time: '9:00 AM - 5:00 PM',
      type: 'medical',
      organizer: 'Health First NGO',
    },
    {
      id: 3,
      title: 'Disaster Relief Camp',
      description: 'Providing essential supplies and support to disaster-affected families.',
      location: 'Kolkata Relief Center',
      date: '2024-03-25',
      time: '8:00 AM - 6:00 PM',
      type: 'relief',
      organizer: 'Disaster Relief NGO',
    },
    {
      id: 4,
      title: 'Education Awareness Program',
      description: 'Raising awareness about the importance of education in rural areas.',
      location: 'Bangalore Rural',
      date: '2024-04-01',
      time: '11:00 AM - 3:00 PM',
      type: 'education',
      organizer: 'EduCare Foundation',
    },
  ]

  const getEventIcon = (type) => {
    const icons = {
      blood: '🩸',
      medical: '🏥',
      relief: '🚑',
      education: '📚',
    }
    return icons[type] || '📅'
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Events & Free Camps</h1>
        <p className="text-gray-600">Join upcoming events and make a difference in your community</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <div key={event.id} className="card hover:scale-105 transition-transform">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center text-3xl">
                  {getEventIcon(event.type)}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">{event.title}</h3>
                  <p className="text-sm text-gray-600">{event.organizer}</p>
                </div>
              </div>
            </div>

            <p className="text-gray-700 mb-4">{event.description}</p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-gray-600">
                <span className="mr-2">📍</span>
                <span>{event.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="mr-2">📅</span>
                <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="mr-2">🕐</span>
                <span>{event.time}</span>
              </div>
            </div>

            <Button className="w-full">Join Event</Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EventsPage
