export const RightPadWithZeros = (number: number, length: number) => {
  let myString = '' + number
  while (myString.length < length) {
    myString += '0'
  }

  return myString
}

export const RoundToCeilNearest = (number: number) => {
  const numberBeforeDot = number.toString().split('.')[0]
  const numberLengthBeforeDot = numberBeforeDot.length
  const nearest = +RightPadWithZeros(1, numberLengthBeforeDot - 2)
  return Math.ceil(number / nearest) * nearest
}

export const RoundToFloorNearest = (number: number) => {
  const numberBeforeDot = number.toString().split('.')[0]
  const numberLengthBeforeDot = numberBeforeDot.length
  const nearest = +RightPadWithZeros(1, numberLengthBeforeDot - 2)
  return Math.floor(number / nearest) * nearest
}
