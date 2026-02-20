import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import InputField from '../components/InputField'
import Button from '../components/Button'
import OTPVerification from '../components/OTPVerification'

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'donor',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const { authStep, pendingEmail, sendMagicCode, verifyMagicCode, completeRegistration, setAuthStep, user } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name) newErrors.name = 'Name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    return newErrors
  }

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)
    const result = await sendMagicCode(formData.email, formData.role)
    setLoading(false)
    
    if (!result.success) {
      setErrors({ submit: result.message || 'Failed to send magic code' })
    }
  }

  const handleVerifyCode = async (code) => {
    setLoading(true)
    
    // First verify the magic code
    const verifyResult = await verifyMagicCode(pendingEmail, code)
    
    if (verifyResult.success) {
      // Then complete registration with name and role
      const regResult = await completeRegistration(pendingEmail, code, formData.name, formData.role)
      setLoading(false)
      
      if (regResult.success) {
        // Navigate based on role
        navigate(`/dashboard/${formData.role}`)
      }
      
      return regResult
    }
    
    setLoading(false)
    return verifyResult
  }

  const handleResendCode = async () => {
    setLoading(true)
    await sendMagicCode(formData.email, formData.role)
    setLoading(false)
  }

  const handleBackToForm = () => {
    setAuthStep('email')
    setErrors({})
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-xl">
        {authStep === 'email' ? (
          <>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
              <p className="mt-2 text-gray-600">Join us in making a difference</p>
            </div>

            <form onSubmit={handleEmailSubmit} className="mt-8 space-y-6">
              <InputField
                label="Full Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="John Doe"
                required
              />

              <InputField
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="you@example.com"
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  I want to register as
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: 'donor' })}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      formData.role === 'donor'
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-300 hover:border-primary-300'
                    }`}
                  >
                    <span className="text-2xl block mb-2">💝</span>
                    <span className="font-semibold">Donor</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: 'ngo' })}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      formData.role === 'ngo'
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-300 hover:border-primary-300'
                    }`}
                  >
                    <span className="text-2xl block mb-2">🏢</span>
                    <span className="font-semibold">NGO</span>
                  </button>
                </div>
              </div>

              {errors.submit && (
                <div className="text-danger-500 text-sm text-center">{errors.submit}</div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Sending Code...' : 'Send Magic Code'}
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary-600 hover:text-primary-500 font-semibold">
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </>
        ) : (
          <>
            <button
              onClick={handleBackToForm}
              className="text-primary-600 hover:text-primary-700 mb-4 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to form
            </button>
            <OTPVerification
              email={pendingEmail}
              onVerify={handleVerifyCode}
              onResend={handleResendCode}
              loading={loading}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default RegisterPage
