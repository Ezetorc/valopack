import { UserStore } from '../models/UserStore'
import { getUserStore } from '../stores/getUserStore'

export function useUser () {
  const userStore: UserStore = getUserStore()
  const { getCredits, setCredits } = userStore
  const credits: number = getCredits()

  const addCredits = (creditsToAdd: number): void => {
    const newCredits: number = Math.min(credits + creditsToAdd, 10000)
    setCredits(newCredits)
  }

  const removeCredits = (creditsToRemove: number): void => {
    const newCredits = Math.max(credits - creditsToRemove, 0)
    setCredits(newCredits)
  }

  return { ...userStore, addCredits, removeCredits }
}
