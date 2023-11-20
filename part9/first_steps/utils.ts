export const isNumber = (arg: any) => !isNaN(arg)
export const isNumberArray = (arg: any[]) => arg.every(val => isNumber(val))

export default {
    isNumber,
    isNumberArray
}