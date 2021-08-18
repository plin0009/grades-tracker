export type RationalNumber = [number, number]
export type MaybeRationalNumber = RationalNumber | undefined

export const RationalNumber = (
  numerator: number,
  denominator: number = 1
): RationalNumber => {
  // TODO: simplify
  return [numerator, denominator]
}

export const toDecimal = (
  rationalNumber: MaybeRationalNumber,
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
  rationalNumber: MaybeRationalNumber,
  decimalPlaces: number = 1
): string => {
  if (rationalNumber === undefined) return ''
  return toDecimal(rationalNumber, decimalPlaces) + '%'
}

export const add = (
  rn1: MaybeRationalNumber,
  rn2: MaybeRationalNumber
): MaybeRationalNumber => {
  if (rn1 === undefined) return rn2
  if (rn2 === undefined) return rn1
  return RationalNumber(rn1[0] * rn2[1] + rn2[0] * rn1[1], rn1[1] * rn2[1])
}

export const multiply = (
  rn1: MaybeRationalNumber,
  rn2: MaybeRationalNumber
): MaybeRationalNumber => {
  if (rn1 === undefined || rn2 === undefined) return undefined
  return RationalNumber(rn1[0] * rn2[0], rn1[1] * rn2[1])
}
export const divide = (
  rn1: MaybeRationalNumber,
  rn2: MaybeRationalNumber
): MaybeRationalNumber => {
  if (rn1 === undefined || rn2 === undefined) return undefined
  return RationalNumber(rn1[0] * rn2[1], rn1[1] * rn2[0])
}
