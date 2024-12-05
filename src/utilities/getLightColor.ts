export function getLightColor (hex: string, factor: number): string {
  if (!/^#?([a-fA-F0-9]{6})$/.test(hex)) {
    throw new Error('Invalid format. Use a six digit hexadecimal.')
  }

  hex = hex.replace(/^#/, '')
  const n: number = parseInt(hex, 16)

  const red: number = Math.min(
    255,
    Math.max(0, (n >> 16) + Math.round((255 - (n >> 16)) * factor))
  )

  const green: number = Math.min(
    255,
    Math.max(
      0,
      ((n >> 8) & 0x00ff) + Math.round((255 - ((n >> 8) & 0x00ff)) * factor)
    )
  )

  const blue: number = Math.min(
    255,
    Math.max(0, (n & 0x0000ff) + Math.round((255 - (n & 0x0000ff)) * factor))
  )

  const newColor = `#${((1 << 24) + (red << 16) + (green << 8) + blue)
    .toString(16)
    .slice(1)}`

  return newColor.toUpperCase()
}
