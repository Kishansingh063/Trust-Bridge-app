import { useState } from 'react'
import InputField from './InputField'
import Button from './Button'
import Loader from './Loader'

const OTPVerification = ({ email, onVerify, onResend, loading = false }) => {
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')

  const handleChange = (index, value) => {
    if (value.length > 1) return // Only allow single digit
    
    const newCode = [...code]
    newCode[index] = value.replace(/[^0-9]/g, '') // Only numbers
    setCode(newCode)
    setError('')

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      if (nextInput) nextInput.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      if (prevInput) prevInput.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6)
    const newCode = [...code]
    for (let i = 0; i < 6; i++) {
      newCode[i] = pastedData[i] || ''
    }
    setCode(newCode)
    
    // Focus last filled input or first empty
    const lastFilledIndex = newCode.findIndex((digit, idx) => !digit && idx > 0) - 1
    const focusIndex = lastFilledIndex >= 0 ? lastFilledIndex : newCode.length - 1
    const input = document.getElementById(`otp-${focusIndex}`)
    if (input) input.focus()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const otpCode = code.join('')
    
    if (otpCode.length !== 6) {
      setError('Please enter the complete 6-digit code')
      return
    }

    const result = await onVerify(otpCode)
    if (!result.success) {
      setError(result.message || 'Invalid code. Please try again.')
      // Clear code on error
      setCode(['', '', '', '', '', ''])
      document.getElementById('otp-0')?.focus()
    }
  }

  const handleResend = async () => {
    setCode(['', '', '', '', '', ''])
    setError('')
    await onResend()
    document.getElementById('otp-0')?.focus()
  }

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Enter Verification Code</h2>
        <p className="text-gray-600">
          We sent a 6-digit code to <span className="font-semibold">{email}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center gap-3 mb-4">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
              autoFocus={index === 0}
            />
          ))}
        </div>

        {error && (
          <div className="text-center">
            <p className="text-danger-500 text-sm">{error}</p>
          </div>
        )}

        <Button type="submit" className="w-full" disabled={loading || code.join('').length !== 6}>
          {loading ? (
            <span className="flex items-center justify-center">
              <Loader size="sm" className="mr-2" />
              Verifying...
            </span>
          ) : (
            'Verify Code'
          )}
        </Button>

        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">Didn't receive the code?</p>
          <button
            type="button"
            onClick={handleResend}
            className="text-primary-600 hover:text-primary-700 font-semibold text-sm"
            disabled={loading}
          >
            Resend Code
          </button>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
          <p className="text-sm text-yellow-800 text-center">
            💡 <strong>Development Mode:</strong> Check your browser console for the OTP code
          </p>
        </div>
      </form>
    </div>
  )
}

export default OTPVerification
