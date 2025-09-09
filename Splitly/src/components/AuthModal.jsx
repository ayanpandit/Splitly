
import React, { useState } from 'react'
import { X, Eye, EyeOff, Mail, Lock, User, RefreshCw, Smartphone } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const AuthModal = ({ isOpen, onClose }) => {
  const [authMode, setAuthMode] = useState('login') // 'login', 'signup', 'reset', 'otp'
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    otp: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [resetEmailSent, setResetEmailSent] = useState(false)

  const { signIn, signUp, resetPassword, signInWithOTP, verifyOTP } = useAuth()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Email validation for all modes except OTP verification
    if (authMode !== 'otp' || !otpSent) {
      if (!formData.email) {
        newErrors.email = 'Email is required'
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email'
      }
    }

    // Password validation only for login and signup
    if (authMode === 'login' || authMode === 'signup') {
      if (!formData.password) {
        newErrors.password = 'Password is required'
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters'
      }
    }

    // OTP validation
    if (authMode === 'otp' && otpSent) {
      if (!formData.otp) {
        newErrors.otp = 'OTP is required'
      } else if (formData.otp.length !== 6) {
        newErrors.otp = 'OTP must be 6 digits'
      }
    }

    // Full name validation for signup
    if (authMode === 'signup' && !formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)

    try {
      let result

      switch (authMode) {
        case 'login':
          result = await signIn(formData.email, formData.password)
          if (result.error) {
            setErrors({ submit: result.error.message })
          } else {
            onClose()
          }
          break

        case 'signup':
          result = await signUp(formData.email, formData.password, formData.fullName)
          if (result.error) {
            setErrors({ submit: result.error.message })
          } else {
            setErrors({ submit: 'Account created successfully! Please check your email to verify your account.' })
          }
          break

        case 'reset':
          result = await resetPassword(formData.email)
          if (result.error) {
            setErrors({ submit: result.error.message })
          } else {
            setResetEmailSent(true)
            setErrors({ submit: 'Password reset link sent to your email!' })
          }
          break

        case 'otp':
          if (!otpSent) {
            // Send OTP
            result = await signInWithOTP(formData.email)
            if (result.error) {
              setErrors({ submit: result.error.message })
            } else {
              setOtpSent(true)
              setErrors({ submit: 'OTP sent to your email!' })
            }
          } else {
            // Verify OTP
            result = await verifyOTP(formData.email, formData.otp)
            if (result.error) {
              setErrors({ submit: result.error.message })
            } else {
              onClose()
            }
          }
          break

        default:
          setErrors({ submit: 'Invalid authentication mode' })
      }
    } catch (error) {
      setErrors({ submit: 'An unexpected error occurred. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      fullName: '',
      otp: ''
    })
    setErrors({})
    setOtpSent(false)
    setResetEmailSent(false)
  }

  const changeAuthMode = (mode) => {
    setAuthMode(mode)
    resetForm()
  }

  const getModalTitle = () => {
    switch (authMode) {
      case 'login': return 'Welcome Back'
      case 'signup': return 'Create Account'
      case 'reset': return 'Reset Password'
      case 'otp': return 'Sign in with OTP'
      default: return 'Authentication'
    }
  }

  const getModalDescription = () => {
    switch (authMode) {
      case 'login': return 'Sign in to your account to continue'
      case 'signup': return 'Join Splitly and start managing expenses with friends'
      case 'reset': return resetEmailSent ? 'Check your email for reset instructions' : 'Enter your email to reset your password'
      case 'otp': return otpSent ? 'Enter the 6-digit code sent to your email' : 'Enter your email to receive a login code'
      default: return ''
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-black border border-gray-800 rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h3 className="text-xl font-bold text-white">
            {getModalTitle()}
          </h3>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-900 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-400 mb-6 text-center">
            {getModalDescription()}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name (only for signup) */}
            {authMode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 bg-gray-900 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.fullName ? 'border-red-500' : 'border-gray-700'
                    }`}
                    placeholder="Enter your full name"
                    disabled={isLoading}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>
            )}

            {/* Email */}
            {(authMode !== 'otp' || !otpSent) && (
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 bg-gray-900 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-700'
                    }`}
                    placeholder="Enter your email"
                    disabled={isLoading || (authMode === 'otp' && otpSent)}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            )}

            {/* Password (only for login and signup) */}
            {(authMode === 'login' || authMode === 'signup') && (
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-12 py-3 bg-gray-900 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.password ? 'border-red-500' : 'border-gray-700'
                    }`}
                    placeholder="Enter your password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-sm mt-1">{errors.password}</p>
                )}
              </div>
            )}

            {/* OTP Input (only when OTP is sent) */}
            {authMode === 'otp' && otpSent && (
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Enter OTP
                </label>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    type="text"
                    name="otp"
                    value={formData.otp}
                    onChange={handleInputChange}
                    maxLength="6"
                    className={`w-full pl-10 pr-4 py-3 bg-gray-900 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg tracking-wider ${
                      errors.otp ? 'border-red-500' : 'border-gray-700'
                    }`}
                    placeholder="000000"
                    disabled={isLoading}
                  />
                </div>
                {errors.otp && (
                  <p className="text-red-400 text-sm mt-1">{errors.otp}</p>
                )}
                <p className="text-xs text-gray-500 mt-1 text-center">
                  Sent to {formData.email}
                </p>
              </div>
            )}

            {/* Submit Error */}
            {errors.submit && (
              <div className={`p-3 rounded-lg text-sm ${
                errors.submit.includes('successfully') 
                  ? 'bg-green-900 text-green-400 border border-green-800' 
                  : 'bg-red-900 text-red-400 border border-red-800'
              }`}>
                {errors.submit}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || (authMode === 'reset' && resetEmailSent)}
              className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  {authMode === 'login' && 'Signing In...'}
                  {authMode === 'signup' && 'Creating Account...'}
                  {authMode === 'reset' && 'Sending Reset Link...'}
                  {authMode === 'otp' && !otpSent && 'Sending OTP...'}
                  {authMode === 'otp' && otpSent && 'Verifying OTP...'}
                </span>
              ) : (
                <>
                  {authMode === 'login' && 'Sign In'}
                  {authMode === 'signup' && 'Create Account'}
                  {authMode === 'reset' && (resetEmailSent ? 'Email Sent' : 'Send Reset Link')}
                  {authMode === 'otp' && !otpSent && 'Send OTP'}
                  {authMode === 'otp' && otpSent && 'Verify OTP'}
                </>
              )}
            </button>

            {/* Forgot Password & OTP Login (only show on login) */}
            {authMode === 'login' && (
              <div className="flex flex-col gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => changeAuthMode('reset')}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                  disabled={isLoading}
                >
                  Forgot your password?
                </button>
                <button
                  type="button"
                  onClick={() => changeAuthMode('otp')}
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center justify-center gap-1"
                  disabled={isLoading}
                >
                  <Smartphone className="h-3 w-3" />
                  Sign in with OTP instead
                </button>
              </div>
            )}

            {/* Resend OTP (only show when OTP is sent) */}
            {authMode === 'otp' && otpSent && (
              <button
                type="button"
                onClick={() => {
                  setOtpSent(false)
                  setFormData(prev => ({ ...prev, otp: '' }))
                }}
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                disabled={isLoading}
              >
                Didn't receive OTP? Resend
              </button>
            )}
          </form>

          {/* Mode Toggle Links */}
          <div className="mt-6 text-center space-y-2">
            {authMode === 'login' && (
              <p className="text-gray-400">
                Don't have an account?{' '}
                <button
                  onClick={() => changeAuthMode('signup')}
                  className="text-blue-400 hover:text-blue-300 font-medium"
                  disabled={isLoading}
                >
                  Sign Up
                </button>
              </p>
            )}
            
            {authMode === 'signup' && (
              <p className="text-gray-400">
                Already have an account?{' '}
                <button
                  onClick={() => changeAuthMode('login')}
                  className="text-blue-400 hover:text-blue-300 font-medium"
                  disabled={isLoading}
                >
                  Sign In
                </button>
              </p>
            )}
            
            {(authMode === 'reset' || authMode === 'otp') && (
              <p className="text-gray-400">
                Remember your password?{' '}
                <button
                  onClick={() => changeAuthMode('login')}
                  className="text-blue-400 hover:text-blue-300 font-medium"
                  disabled={isLoading}
                >
                  Back to Sign In
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthModal
