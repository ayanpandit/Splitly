import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

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
  const [session, setSession] = useState(null)

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) {
        console.error('Error getting session:', error)
      }
      setSession(session)
      setUser(session?.user || null)
      setLoading(false)
    }

    getSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user || null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  // Generate random nickname using animal names
  const generateNickname = async () => {
    try {
      // Using a simple array of animal names as fallback
      const animalNames = [
        'Tiger', 'Lion', 'Elephant', 'Giraffe', 'Zebra', 'Kangaroo', 'Panda', 'Koala',
        'Dolphin', 'Whale', 'Shark', 'Eagle', 'Hawk', 'Owl', 'Penguin', 'Flamingo',
        'Butterfly', 'Bee', 'Ant', 'Spider', 'Rabbit', 'Fox', 'Wolf', 'Bear',
        'Deer', 'Horse', 'Cat', 'Dog', 'Monkey', 'Gorilla'
      ]
      
      const adjectives = [
        'Happy', 'Clever', 'Swift', 'Brave', 'Gentle', 'Funny', 'Smart', 'Quick',
        'Strong', 'Kind', 'Bright', 'Cool', 'Wild', 'Free', 'Bold', 'Calm',
        'Epic', 'Fast', 'Great', 'Lucky', 'Magic', 'Noble', 'Pure', 'Royal',
        'Super', 'Wise', 'Young', 'Zen', 'Cosmic', 'Divine'
      ]

      const randomAnimal = animalNames[Math.floor(Math.random() * animalNames.length)]
      const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)]
      const randomNumber = Math.floor(Math.random() * 99) + 1

      return `${randomAdjective}${randomAnimal}${randomNumber}`
    } catch (error) {
      console.error('Error generating nickname:', error)
      return `User${Math.floor(Math.random() * 9999)}`
    }
  }

  // Generate random avatar (1-30.jpg)
  const generateAvatar = () => {
    const avatarNumber = Math.floor(Math.random() * 30) + 1
    return `${avatarNumber}.jpg`
  }

  // Sign up function
  const signUp = async (email, password, fullName) => {
    try {
      setLoading(true)
      
      // Generate nickname and avatar
      const nickname = await generateNickname()
      const avatar = generateAvatar()

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            nickname: nickname,
            avatar: avatar
          }
        }
      })

      if (error) throw error

      // Create profile row (may already be created via trigger; attempt idempotent insert)
      if (data?.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: data.user.id,
            full_name: fullName,
            nickname,
            avatar
          }, { onConflict: 'id' })
        if (profileError) console.warn('Profile upsert warning:', profileError.message)
      }

      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  // Sign in function
  const signIn = async (email, password) => {
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  // Sign out function
  const signOut = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      setLoading(false)
    }
  }

  // Update password function
  const updatePassword = async (newPassword) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      })
      
      if (error) throw error
      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
