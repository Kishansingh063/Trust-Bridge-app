// OTP Service for generating and validating 6-digit magic codes
// In production, this would integrate with an email service

class OTPService {
  constructor() {
    this.otpStore = new Map() // In-memory store (use Redis in production)
    this.OTP_EXPIRY = 10 * 60 * 1000 // 10 minutes
  }

  generateOTP() {
    // Generate 6-digit code
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  storeOTP(email, code) {
    const expiry = Date.now() + this.OTP_EXPIRY
    this.otpStore.set(email, {
      code,
      expiry,
      attempts: 0,
    })
    
    // Clean up expired OTPs
    setTimeout(() => {
      this.otpStore.delete(email)
    }, this.OTP_EXPIRY)
  }

  validateOTP(email, code) {
    const stored = this.otpStore.get(email)
    
    if (!stored) {
      return { valid: false, message: 'OTP not found or expired' }
    }

    if (Date.now() > stored.expiry) {
      this.otpStore.delete(email)
      return { valid: false, message: 'OTP expired' }
    }

    if (stored.attempts >= 5) {
      this.otpStore.delete(email)
      return { valid: false, message: 'Too many attempts. Please request a new code.' }
    }

    stored.attempts++

    if (stored.code !== code) {
      return { valid: false, message: 'Invalid OTP code' }
    }

    // OTP is valid, remove it
    this.otpStore.delete(email)
    return { valid: true }
  }

  getOTP(email) {
    return this.otpStore.get(email)
  }

  // Mock email sending (replace with actual email service in production)
  async sendOTPEmail(email, code) {
    // In production, integrate with SendGrid, AWS SES, or similar
    console.log(`📧 Sending OTP to ${email}: ${code}`)
    
    // For development, log to console
    // In production, this would send an actual email
    return {
      success: true,
      message: `OTP sent to ${email}. Check console for development code: ${code}`,
    }
  }
}

export const otpService = new OTPService()
