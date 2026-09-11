import { createContext, useContext, useEffect, useState } from 'react'
import { login as loginRequest } from '../services/authService.js'

const AuthContext = createContext(null)
const STORAGE_KEY = 'elefez_auth'

function readSession() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY))
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(readSession)

  useEffect(() => {
    if (session) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [session])

  async function login(username, password) {
    const data = await loginRequest(username, password)
    setSession(data)
    return data.token
  }

  function logout() {
    setSession(null)
  }

  const value = {
    token: session?.token ?? null,
    user: session?.user ?? null,
    isAuthenticated: Boolean(session?.token),
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
