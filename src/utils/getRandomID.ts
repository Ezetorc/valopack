export default function getRandomID (): string {
  const randomPart = Math.random().toString(36).substring(2, 8)
  const timePart = Math.floor(Date.now() / 1000).toString(36)
  return `${randomPart}${timePart}`
}
