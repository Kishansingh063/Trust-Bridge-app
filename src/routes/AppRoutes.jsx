import { Routes, Route } from 'react-router-dom'
import Layout from '../layouts/Layout'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import CampaignsPage from '../pages/CampaignsPage'
import CampaignDetailsPage from '../pages/CampaignDetailsPage'
import DonationPage from '../pages/DonationPage'
import EventsPage from '../pages/EventsPage'
import JoinNGOPage from '../pages/JoinNGOPage'
import NearbyHelpPage from '../pages/NearbyHelpPage'
import DonorDashboard from '../dashboard/DonorDashboard'
import NGODashboard from '../dashboard/NGODashboard'
import AdminDashboard from '../dashboard/AdminDashboard'
import ProtectedRoute from '../components/ProtectedRoute'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="campaigns" element={<CampaignsPage />} />
        <Route path="campaign/:id" element={<CampaignDetailsPage />} />
        <Route path="donate/:id" element={<DonationPage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="join-ngo" element={<JoinNGOPage />} />
        <Route path="nearby-help" element={<NearbyHelpPage />} />
        <Route
          path="dashboard/donor"
          element={
            <ProtectedRoute>
              <DonorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="dashboard/ngo"
          element={
            <ProtectedRoute requiredRole="ngo">
              <NGODashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="dashboard/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  )
}

export default AppRoutes
