import { createContext, useContext, useState, useEffect } from 'react'
import { db } from '../lib/instantdb'
import { otpService } from '../services/otpService'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authStep, setAuthStep] = useState('email') // 'email' or 'code'
  const [pendingEmail, setPendingEmail] = useState('')
  const [pendingRegistration, setPendingRegistration] = useState(null)

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = db.auth.onAuthStateChange(async (auth) => {
      if (auth?.userId) {
        // User is authenticated, fetch user data using reactive query
        fetchUserDataReactive(auth.userId)
      } else {
        setUser(null)
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  const fetchUserDataReactive = (userId) => {
    // Use reactive query subscription
    const unsubscribe = db.subscribeQuery(
      {
        users: {
          $: {
            where: { id: userId },
          },
        },
      },
      (data) => {
        if (data?.users?.[0]) {
          const userData = data.users[0]
          setUser({
            id: userData.id,
            email: userData.email,
            name: userData.name,
            role: userData.role || 'donor',
          })
        } else {
          // User doesn't exist, create profile if we have pending registration
          if (pendingRegistration) {
            createUserProfile(userId, pendingEmail, pendingRegistration.name, pendingRegistration.role)
          } else if (pendingEmail) {
            createUserProfile(userId, pendingEmail)
          }
        }
        setLoading(false)
      }
    )

    return unsubscribe
  }

  const createUserProfile = async (userId, email, name = '', role = 'donor') => {
    try {
      await db.transact(
        db.tx.users[userId].update({
          email,
          name: name || email.split('@')[0],
          role,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        })
      )
      
      // Refresh user data
      setTimeout(() => {
        fetchUserDataReactive(userId)
      }, 300)
    } catch (error) {
      console.error('Error creating user profile:', error)
      // Try alternative approach if userId update doesn't work
      try {
        const newId = db.id()
        await db.transact(
          db.tx.users[newId].update({
            id: userId,
            email,
            name: name || email.split('@')[0],
            role,
            createdAt: Date.now(),
            updatedAt: Date.now(),
          })
        )
      } catch (err) {
        console.error('Error with alternative user creation:', err)
      }
    }
  }

  const sendMagicCode = async (email, role = 'donor') => {
    try {
      setPendingEmail(email)
      
      // Generate our own 6-digit OTP
      const code = otpService.generateOTP()
      otpService.storeOTP(email, code)
      
      // Send OTP via email service (mock for now)
      await otpService.sendOTPEmail(email, code)
      
      // Also use InstantDB's magic code system
      await db.auth.sendMagicCode({ email })
      
      setAuthStep('code')
      return { success: true, message: 'Magic code sent to your email' }
    } catch (error) {
      console.error('Error sending magic code:', error)
      return { success: false, message: error.message || 'Failed to send magic code' }
    }
  }

  const verifyMagicCode = async (email, code) => {
    try {
      // First validate our OTP
      const validation = otpService.validateOTP(email, code)
      if (!validation.valid) {
        return { success: false, message: validation.message }
      }

      // Then verify with InstantDB
      const result = await db.auth.signInWithMagicCode({ email, code })
      
      if (result?.userId) {
        // Store pending registration if exists
        if (pendingRegistration) {
          await createUserProfile(
            result.userId,
            email,
            pendingRegistration.name,
            pendingRegistration.role
          )
          setPendingRegistration(null)
        } else {
          // Just login, fetch existing user data
          fetchUserDataReactive(result.userId)
        }
        
        setAuthStep('email')
        return { success: true }
      }
      
      return { success: false, message: 'Invalid magic code' }
    } catch (error) {
      console.error('Error verifying magic code:', error)
      return { success: false, message: error.message || 'Failed to verify magic code' }
    }
  }

  const register = async (email, name, role) => {
    try {
      // Store registration data
      setPendingRegistration({ email, name, role })
      
      // Send magic code
      const result = await sendMagicCode(email, role)
      return result
    } catch (error) {
      console.error('Error in registration:', error)
      return { success: false, message: error.message || 'Registration failed' }
    }
  }

  const completeRegistration = async (email, code, name, role) => {
    // Registration is completed in verifyMagicCode when pendingRegistration exists
    return await verifyMagicCode(email, code)
  }

  const logout = async () => {
    try {
      await db.auth.signOut()
      setUser(null)
      setAuthStep('email')
      setPendingEmail('')
      setPendingRegistration(null)
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  const value = {
    user,
    loading,
    authStep,
    pendingEmail,
    sendMagicCode,
    verifyMagicCode,
    register,
    completeRegistration,
    logout,
    setAuthStep,
    isAuthenticated: !!user,
    role: user?.role || null,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
