export function getLightColor (hex: string, factor: number): string {
  if (!/^#?([a-fA-F0-9]{6})$/.test(hex)) {
    throw new Error('Invalid format. Use a six digit hexadecimal.')
  }

  hex = hex.replace(/^#/, '')
  const n: number = parseInt(hex, 16)

  const r = Math.min(
    255,
    Math.max(0, (n >> 16) + Math.round((255 - (n >> 16)) * factor))
  )

  const g = Math.min(
    255,
    Math.max(
      0,
      ((n >> 8) & 0x00ff) + Math.round((255 - ((n >> 8) & 0x00ff)) * factor)
    )
  )

  const b = Math.min(
    255,
    Math.max(0, (n & 0x0000ff) + Math.round((255 - (n & 0x0000ff)) * factor))
  )

  const newColor = `#${((1 << 24) + (r << 16) + (g << 8) + b)
    .toString(16)
    .slice(1)}`

  return newColor.toUpperCase()
}
