export type RationalNumber = [number, number]

export const RationalNumber = (
  numerator: number,
  denominator: number = 1
): RationalNumber => {
  // TODO: simplify
  return [numerator, denominator]
}

export const toDecimal = (
  rationalNumber: RationalNumber | undefined,
  decimalPlaces: number = 1
): string => {
  if (rationalNumber === undefined) return ''
  const result =
    '' +
    Math.round((rationalNumber[0] * 10 ** decimalPlaces) / rationalNumber[1])
  return decimalPlaces === 0
    ? result
    : result.slice(0, -decimalPlaces) + '.' + result.slice(-decimalPlaces)
}

export const toPercentage = (
  rationalNumber: RationalNumber | undefined,
  decimalPlaces: number = 1
): string => {
  if (rationalNumber === undefined) return ''
  return toDecimal(rationalNumber, decimalPlaces) + '%'
}

export const add = (
  rn1: RationalNumber | undefined,
  rn2: RationalNumber | undefined
): RationalNumber | undefined => {
  if (rn1 === undefined) return rn2
  if (rn2 === undefined) return rn1
  return RationalNumber(rn1[0] * rn2[1] + rn2[0] * rn1[1], rn1[1] * rn2[1])
}
