import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import InputField from '../components/InputField'
import Button from '../components/Button'
import OTPVerification from '../components/OTPVerification'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { authStep, pendingEmail, sendMagicCode, verifyMagicCode, setAuthStep, user } = useAuth()
  const navigate = useNavigate()

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!email) {
      setError('Email is required')
      return
    }

    setLoading(true)
    const result = await sendMagicCode(email)
    setLoading(false)
    
    if (!result.success) {
      setError(result.message || 'Failed to send magic code')
    }
  }

  const handleVerifyCode = async (code) => {
    setLoading(true)
    const result = await verifyMagicCode(pendingEmail, code)
    setLoading(false)
    
    if (result.success) {
      // Navigate based on user role
      const role = user?.role || 'donor'
      navigate(`/dashboard/${role}`)
    }
    
    return result
  }

  const handleResendCode = async () => {
    setLoading(true)
    await sendMagicCode(pendingEmail)
    setLoading(false)
  }

  const handleBackToEmail = () => {
    setAuthStep('email')
    setEmail('')
    setError('')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-xl">
        {authStep === 'email' ? (
          <>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
              <p className="mt-2 text-gray-600">Enter your email to receive a magic code</p>
            </div>

            <form onSubmit={handleEmailSubmit} className="mt-8 space-y-6">
              <InputField
                label="Email Address"
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError('')
                }}
                error={error}
                placeholder="you@example.com"
                required
              />

              {error && (
                <div className="text-danger-500 text-sm text-center">{error}</div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Sending Code...' : 'Send Magic Code'}
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-primary-600 hover:text-primary-500 font-semibold">
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </>
        ) : (
          <>
            <button
              onClick={handleBackToEmail}
              className="text-primary-600 hover:text-primary-700 mb-4 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to email
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

export default LoginPage
