import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import UserContextType from '../models/UserContextType'

export function useUser () {
  const context: UserContextType | undefined = useContext(UserContext)
  if (!context) throw new Error("Context doesn't have a Provider")

  const { credits, setCredits } = context

  const addCredits = (creditsToAdd: number): void => {
    const newCredits: number = Math.min(credits + creditsToAdd, 10000)
    setCredits(newCredits)
  }

  const removeCredits = (creditsToRemove: number): void => {
    const newCredits = Math.max(credits - creditsToRemove, 0)
    setCredits(newCredits)
  }

  return { ...context, addCredits, removeCredits }
}
