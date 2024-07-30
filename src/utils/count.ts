import BigNumber from 'bignumber.js'
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})
// 判断一个值是否为 NaN
export function isNaN(value: string | number): boolean {
  return new BigNumber(`${value}`).isNaN()
}
// 判断一个值是否为数字类型。

export function isNumber(value: string | number): boolean {
  const isNaNResult = isNaN(value)
  return !isNaNResult
}
// 判断一个值是否为整数
export function isInteger(value: string | number): boolean {
  return new BigNumber(`${value}`).isInteger()
}
// 判断一个值是否为正数
export function isPositive(value: string | number): boolean {
  return new BigNumber(`${value}`).isPositive()
}
// 判断一个值是否为负数
export function isNegative(value: string | number): boolean {
  return new BigNumber(`${value}`).isNegative()
}
// 判断一个值是否为零
export function isZero(value: string | number): boolean {
  return new BigNumber(`${value}`).isZero()
}
// 计算一个数值的小数位数。
export function countDecimalPlaces(value: string | number): number | string {
  const res = new BigNumber(`${value}`).dp()
  if (res) {
    return res
  }
  return ''
}
//  将一个数值转换为字符串类型。
export function convertNumberToString(value: string | number): string {
  return new BigNumber(`${value}`).toString()
}
// 将一个字符串转换为数字类型。
export function convertStringToNumber(value: string | number): number {
  return new BigNumber(`${value}`).toNumber()
}
//  将一个十六进制数转换为字符串类型。
export function convertHexToString(hex: string): string {
  return new BigNumber(`${hex}`).toString()
}
// 将一个字符串转换为十六进制数
export function convertStringToHex(value: string | number): string {
  return new BigNumber(`${value}`).toString(16)
}
// 将一个十六进制数转换为数字类型
export function convertHexToNumber(hex: string): number {
  return convertStringToNumber(convertHexToString(hex))
}
// 判断一个数是否大于另一个数
export function greaterThan(
  numberOne: number | string,
  numberTwo: number | string
): boolean {
  return (
    new BigNumber(`${numberOne}`).comparedTo(new BigNumber(`${numberTwo}`)) ===
    1
  )
}
// 判断一个数是否大于或等于另一个数。
export function greaterThanOrEqual(
  numberOne: number,
  numberTwo: number
): boolean {
  return (
    new BigNumber(`${numberOne}`).comparedTo(new BigNumber(`${numberTwo}`)) >= 0
  )
}
// 判断一个数是否小于另一个数
export function smallerThan(
  numberOne: number | string,
  numberTwo: number | string
): boolean {
  return (
    new BigNumber(`${numberOne}`).comparedTo(new BigNumber(`${numberTwo}`)) ===
    -1
  )
}
// 判断一个数是否小于或等于另一个数
export function smallerThanOrEqual(
  numberOne: number,
  numberTwo: number
): boolean {
  return (
    new BigNumber(`${numberOne}`).comparedTo(new BigNumber(`${numberTwo}`)) <= 0
  )
}

// 判断一个数是否小于或等于另一个数
export function isLessThanOrEqual(number1: string | number, number2: string | number): boolean {
  // 创建 BigNumber 对象
  const bigNumber1 = new BigNumber(number1);
  const bigNumber2 = new BigNumber(number2);

  // 使用 comparedTo 方法比较大小
  const comparisonResult = bigNumber1.comparedTo(bigNumber2);

  // 判断是否小于或等于
  return comparisonResult <= 0;
}

//  将两个数相乘
export function multiply(
  numberOne: number | string,
  numberTwo: number | string
): string {
  return _truncateFloat(new BigNumber(`${numberOne}`)
    .times(new BigNumber(`${numberTwo}`)).toString(), 18)
}
// 将一个数除以另一个数
export function divide(
  numberOne: number | string,
  numberTwo: number | string
): string {
  return _truncateFloat((new BigNumber(`${numberOne}`)
    .dividedBy(new BigNumber(`${numberTwo}`))
    .toString()), 18)
}
// 将一个数模除另一个数，返回余数。
export function floorDivide(
  numberOne: number | string,
  numberTwo: number | string
): string {
  return new BigNumber(`${numberOne}`)
    .dividedToIntegerBy(new BigNumber(`${numberTwo}`))
    .toString()
}
// 将一个数模除另一个数，返回余数。
export function mod(
  numberOne: number | string,
  numberTwo: number | string
): string {
  return new BigNumber(`${numberOne}`)
    .mod(new BigNumber(`${numberTwo}`))
    .toString()
}
// 将两个数相加
export function add(
  numberOne: number | string,
  numberTwo: number | string
): string {
  return new BigNumber(`${numberOne}`)
    .plus(new BigNumber(`${numberTwo}`))
    .toString()
}
// 将一个数减去另一个数。
export function subtract(
  numberOne: number | string,
  numberTwo: number | string
): string {
  return new BigNumber(`${numberOne}`)
    .minus(new BigNumber(`${numberTwo}`))
    .toString()
}
// 将一个数值转换为原始数字，根据指定的小数位数进行计算。
export function convertAmountToRawNumber(
  value: string | number,
  decimals: number = 18
): string {
  return new BigNumber(`${value}`)
    .times(new BigNumber('10').pow(decimals))
    .toString()
}
// 将一个原始数字转换为数值，根据指定的小数位数进行计算
export function convertAmountFromRawNumber(
  value: string | number,
  decimals: number = 18
): string {
  return new BigNumber(`${value}`)
    .dividedBy(new BigNumber('10').pow(decimals))
    .toString()
}

// 对一个数值进行四舍五入，并处理显示的有效数字和小数位数。
export function handleSignificantDecimals(
  value: string,
  decimals: number,
  buffer?: number
): string | null {
  if (
    !new BigNumber(`${decimals}`).isInteger() ||
    (buffer && !new BigNumber(`${buffer}`).isInteger())
  ) {
    return null
  }
  buffer = buffer ? convertStringToNumber(buffer) : 3
  decimals = convertStringToNumber(decimals)
  const absolute = new BigNumber(`${value}`).abs().toNumber()
  if (smallerThan(absolute, 1)) {
    decimals = value.slice(2).search(/[^0]/g) + buffer
    decimals = decimals < 8 ? decimals : 8
  } else {
    decimals = decimals < buffer ? decimals : buffer
  }
  let result = new BigNumber(`${value}`).toFixed(decimals)
  result = new BigNumber(`${result}`).toString()

  return Number(new BigNumber(`${result}`).dp()) <= 2
    ? new BigNumber(`${result}`).toFormat(2)
    : new BigNumber(`${result}`).toFormat()
}
// 格式化一个数值，根据指定的小数位数进行四舍五入处理。
export function formatFixedDecimals(value: string, decimals: number): string {
  const _value = convertNumberToString(value)
  const _decimals = convertStringToNumber(decimals)
  const result = new BigNumber(
    new BigNumber(_value).toFixed(_decimals)
  ).toString()
  return result
}

// 格式化输入的数值，根据第二个参数（目标数值）的小数位数进行处理
export function formatInputDecimals(
  inputOne: string,
  inputTwo: string
): string {
  const _nativeAmountDecimalPlaces = countDecimalPlaces(inputTwo)
  const decimals =
    Number(_nativeAmountDecimalPlaces) > 8
      ? Number(_nativeAmountDecimalPlaces)
      : 8
  const result = new BigNumber(formatFixedDecimals(inputOne, decimals))
    .toFormat()
    .replace(/,/g, '')
  return result
}



export const toNumber = (n: number | string) => {
  return new BigNumber(n)
}




/**
 * Truncates a number or string to a specified precision.
 *
 * @param {number | string} input - The number or string to truncate.
 * @param {number} precision - The number of decimal places to keep.
 * @return {string} - The truncated number or string.
 */

export function _truncateFloat(input: number | string, precision: number): string {
  const num = new BigNumber(input);
  const numStr = num.toFixed();
  const decimalIndex = numStr.indexOf('.');

  if (precision === 0) {
    return decimalIndex === -1 ? numStr : numStr.slice(0, decimalIndex);
  } else {
    const end = decimalIndex === -1 ? numStr.length : decimalIndex + precision + 1;
    return numStr.slice(0, end);
  }
}


/**
 * 截取小数点后的指定位数数字。
 * @param input 输入数字，字符串或数字
 * @param decimalPlaces 要截取的小数位数
 * @returns 截取后的字符串表示形式
 */
export function _truncateDecimal(input: string | number, decimalPlaces: number): string {
  const bigNumber = new BigNumber(input.toString());
  return bigNumber.toFixed(decimalPlaces);
}



// export function compareAndFormatNumber(input: number | string, decimal?: number): string {
//   if (input === '0' || input === 0) {
//     return '0'
//   }
//   // 将输入值转换为 BigNumber 对象
//   const inputValue = new BigNumber(input);

//   // 创建一个 BigNumber 对象表示 0.0000001


//   const _decimal = decimal ? decimal : 6
//   const thresholdValue = new BigNumber(1).dividedBy(new BigNumber(10).pow(_decimal));
//   // 判断输入值是否小于 0.0000001
//   if (inputValue.isLessThan(thresholdValue)) {
//     return `< ${_decimal / (1000000 * _decimal)}`;
//   } else {
//     // 如果大于等于 0.0000001，则截取小数点后六位
//     // const formattedValue = inputValue.toFixed(6, BigNumber.ROUND_DOWN);
//     return _truncateFloat(input, _decimal);

//   }
// }

export function compareAndFormatNumber(input: number | string, decimal?: number): string {
  if (input === '0' || input === 0) {
    return '0';
  }

  // 将输入值转换为 BigNumber 对象
  const inputValue = new BigNumber(input);

  // 设置小数位数，默认为 6
  const _decimal = decimal ?? 6;

  // 创建一个 BigNumber 对象表示阈值，即 0.0000001
  const thresholdValue = new BigNumber(1).dividedBy(new BigNumber(10).pow(_decimal));

  // 判断输入值是否小于阈值
  if (inputValue.isLessThan(thresholdValue)) {
    return `< ${thresholdValue.toFixed(_decimal)}`;
  } else {
    // 截取小数点后指定位数的数字
    const formattedValue = inputValue.toFixed(_decimal,BigNumber.ROUND_DOWN);
    return formattedValue;
  }
}
