import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">DT</span>
              </div>
              <span className="text-xl font-bold text-gray-800">TrustBridge</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 transition-colors">
              Home
            </Link>
            <Link to="/campaigns" className="text-gray-700 hover:text-primary-600 transition-colors">
              Campaigns
            </Link>
            <Link to="/events" className="text-gray-700 hover:text-primary-600 transition-colors">
              Events
            </Link>
            <Link to="/join-ngo" className="text-gray-700 hover:text-primary-600 transition-colors">
              Join NGO
            </Link>
            <Link to="/nearby-help" className="text-gray-700 hover:text-primary-600 transition-colors">
              Nearby Help
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to={`/dashboard/${user.role}`}
                  className="text-gray-700 hover:text-primary-600 transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn-secondary text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary-600 transition-colors">
                  Login
                </Link>
                <Link to="/register" className="btn-primary text-sm">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden border-t border-gray-200">
        <div className="px-4 py-3 space-y-2">
          <Link to="/campaigns" className="block text-gray-700 hover:text-primary-600">
            Campaigns
          </Link>
          <Link to="/events" className="block text-gray-700 hover:text-primary-600">
            Events
          </Link>
          <Link to="/join-ngo" className="block text-gray-700 hover:text-primary-600">
            Join NGO
          </Link>
          <Link to="/nearby-help" className="block text-gray-700 hover:text-primary-600">
            Nearby Help
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
