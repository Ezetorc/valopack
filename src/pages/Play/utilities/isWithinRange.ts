export  function isWithinRange (
  distance: number,
  range: [number, number]
): boolean {
  const [min, max] = range
  return distance >= min && distance <= max
}
