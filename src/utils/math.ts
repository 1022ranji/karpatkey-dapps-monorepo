export const RightPadWithZeros = (number: number, length: number) => {
  let myString = '' + number
  while (myString.length < length) {
    myString += '0'
  }

  return myString
}

export const RoundToCeilNearest = (number: number, padding = 2) => {
  const numberBeforeDot = number.toString().split('.')[0]
  const numberLengthBeforeDot = numberBeforeDot.length
  const nearest = +RightPadWithZeros(1, numberLengthBeforeDot - padding)
  return Math.ceil(number / nearest) * nearest
}

export const RoundToFloorNearest = (number: number, padding = 2) => {
  const numberBeforeDot = number.toString().split('.')[0]
  const numberLengthBeforeDot = numberBeforeDot.length
  const nearest = +RightPadWithZeros(1, numberLengthBeforeDot - padding)
  return Math.floor(number / nearest) * nearest
}
